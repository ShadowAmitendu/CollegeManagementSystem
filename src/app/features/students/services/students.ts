import { computed, inject, Injectable, signal } from '@angular/core';

import { StudentApi } from './student-api';
import { AppwriteAuth } from '../../../core/appwrite/appwrite-auth';
import { AppwriteDatabase } from '../../../core/appwrite/appwrite-database';
import { APPWRITE_CONFIG } from '../../../core/utils/constants';
import { type Student, type StudentFormValue, type StudentStatusFilter } from '../models/student.model';

@Injectable({
  providedIn: 'root',
})
export class Students {
  private readonly api = inject(StudentApi);
  private readonly appwriteAuth = inject(AppwriteAuth);
  private readonly database = inject(AppwriteDatabase);
  private readonly rowsSignal = signal<readonly Student[]>([]);
  private readonly searchSignal = signal('');
  private readonly departmentSignal = signal('all');
  private readonly statusSignal = signal<StudentStatusFilter>('all');

  readonly rows = this.rowsSignal.asReadonly();
  readonly search = this.searchSignal.asReadonly();
  readonly selectedDepartment = this.departmentSignal.asReadonly();
  readonly selectedStatus = this.statusSignal.asReadonly();

  constructor() {
    void this.load();
  }

  readonly departments = computed(() =>
    Array.from(new Set(this.rowsSignal().map((student) => student.departmentName))).sort((first, second) =>
      first.localeCompare(second),
    ),
  );

  readonly filteredRows = computed(() => {
    const query = this.searchSignal().trim().toLowerCase();
    const department = this.departmentSignal();
    const status = this.statusSignal();

    return this.rowsSignal().filter((student) => {
      const matchesDepartment = department === 'all' || student.departmentName === department;
      const matchesStatus = status === 'all' || student.status === status;
      const matchesSearch =
        query.length === 0 ||
        [
          student.firstName,
          student.lastName,
          student.email,
          student.admissionNumber,
          student.program,
          student.section,
          student.advisorName,
        ].some((value) => value.toLowerCase().includes(query));

      return matchesDepartment && matchesStatus && matchesSearch;
    });
  });

  readonly stats = computed(() => {
    const rows = this.rowsSignal();
    const active = rows.filter((student) => student.status === 'active').length;
    const averageAttendance =
      rows.length === 0 ? 0 : Math.round(rows.reduce((sum, student) => sum + student.attendancePercentage, 0) / rows.length);
    const averageCgpa = rows.length === 0 ? '0.0' : (rows.reduce((sum, student) => sum + student.cgpa, 0) / rows.length).toFixed(1);

    return [
      { label: 'Students', value: String(rows.length) },
      { label: 'Active', value: String(active) },
      { label: 'Departments', value: String(this.departments().length) },
      { label: 'Avg attendance', value: `${averageAttendance}%` },
      { label: 'Avg CGPA', value: averageCgpa },
    ] as const;
  });

  async load(): Promise<void> {
    try {
      const response = await this.api.list();
      let users = [];
      try {
        const usersResponse = await this.database.listRows<any>(APPWRITE_CONFIG.tables.users);
        users = usersResponse.rows;
      } catch (err) {
        console.warn('Could not load users for merging:', err);
      }

      const mergedStudents = response.rows.map((studentRow: any) => {
        const userRow = users.find((u: any) => u.userId === studentRow.userId);
        
        const nameParts = (userRow?.name || 'Unknown Student').split(' ');
        
        return {
          ...studentRow,
          // Map DB schema to UI schema expectations
          admissionNumber: studentRow.enrollmentNo || 'N/A',
          semester: studentRow.currentSemester || 1,
          enrollmentYear: parseInt(studentRow.batch) || 2024,
          departmentName: 'Computer Science', // Placeholder until departments join
          departmentId: 'dept_cs',
          program: studentRow.programId || 'B.Tech',
          section: 'A',
          advisorName: 'Dr. Alan Turing',
          cgpa: 8.5, // Placeholder
          attendancePercentage: 85, // Placeholder
          status: userRow?.status || 'active',
          
          // User profile fields
          firstName: nameParts[0],
          lastName: nameParts.slice(1).join(' ') || 'Student',
          email: userRow?.email || 'student@college.local',
          phone: '+1 234 567 8900',
        } as unknown as Student;
      });

      this.rowsSignal.set(mergedStudents);
    } catch (error) {
      console.error('Failed to load students', error);
    }
  }

  setSearch(value: string): void {
    this.searchSignal.set(value);
  }

  setDepartment(value: string): void {
    this.departmentSignal.set(value);
  }

  setStatus(value: StudentStatusFilter): void {
    this.statusSignal.set(value);
  }

  getStudent(studentId: string): Student | undefined {
    return this.rowsSignal().find((student) => student.$id === studentId);
  }

  async createStudent(value: StudentFormValue): Promise<Student> {
    const name = `${value.firstName} ${value.lastName}`;
    const password = 'Welcome@CMS123'; // Default password
    
    const account = await this.appwriteAuth.createAccount(value.email, password, name);
    const userId = account.$id;

    // Create user profile in users table
    try {
      await this.database.createRow<any>(
        APPWRITE_CONFIG.tables.users,
        {
          email: value.email,
          name: name,
          roleIds: ['student'],
          status: value.status || 'active'
        },
        userId
      );
    } catch (error) {
      console.warn('Failed to create user profile in users table', error);
    }

    // Create student record in students table matching Appwrite schema
    const studentDbPayload = {
      userId: userId,
      enrollmentNo: value.admissionNumber,
      programId: value.program || 'unassigned',
      currentSemester: Number(value.semester) || 1,
      batch: String(value.enrollmentYear || new Date().getFullYear()),
      isCR: false
    };

    const studentRow = await this.database.createRow<any>(
      APPWRITE_CONFIG.tables.students,
      studentDbPayload
    );

    // Create optimistic UI object
    const studentForUI: Student = {
      ...value,
      userId,
      $id: studentRow.$id,
      $collectionId: studentRow.$collectionId,
      $databaseId: studentRow.$databaseId,
      $createdAt: studentRow.$createdAt,
      $updatedAt: studentRow.$updatedAt,
      $permissions: studentRow.$permissions
    } as unknown as Student;

    this.rowsSignal.update((rows) => [studentForUI, ...rows]);
    return studentForUI;
  }

  async updateStudent(studentId: string, value: StudentFormValue): Promise<void> {
    const updated = await this.api.update(studentId, value);
    this.rowsSignal.update((rows) =>
      rows.map((student) => (student.$id === studentId ? updated : student)),
    );
  }

  async deleteStudent(studentId: string): Promise<void> {
    await this.api.delete(studentId);
    this.rowsSignal.update((rows) => rows.filter((student) => student.$id !== studentId));
  }
}
