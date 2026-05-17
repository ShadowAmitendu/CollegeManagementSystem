# FULL ENTERPRISE CMS SIDEBAR WITH ROLE VISIBILITY

Format:

```txt
Section (Visible Roles)
```

---

# 1. DASHBOARD

```txt
Dashboard
├── Overview (all roles)
├── Activity Feed (all roles)
├── Quick Actions (all roles)
├── Calendar (all roles)
├── Recent Notifications (all roles)
├── Upcoming Events (all roles)
└── Personal Analytics (student, cr, professor, hod, principal)
```

---

# 2. ACADEMICS

```txt
Academics
```

---

## Students

```txt
Students (professor, hod, principal, admin, super_admin, staff)
├── Student List (professor, hod, principal, admin, super_admin, staff)
├── Student Details (professor, hod, principal, admin, super_admin, staff)
├── Add Student (admin, super_admin)
├── Student Analytics (hod, principal, admin, super_admin)
├── Defaulters (professor, hod, principal, admin)
├── CR Management (hod, admin, super_admin)
├── Attendance Summary (professor, hod, principal, admin)
└── Student Documents (staff, admin, super_admin)
```

---

## Faculty

```txt
Faculty (hod, principal, admin, super_admin)
├── Faculty List (hod, principal, admin, super_admin)
├── Faculty Profiles (hod, principal, admin, super_admin)
├── Assign Subjects (hod, admin, super_admin)
├── Faculty Workload (hod, principal, admin)
├── Faculty Analytics (hod, principal, admin)
└── Department Faculty (hod, principal, admin)
```

---

## Departments

```txt
Departments (hod, principal, admin, super_admin)
├── Department List (hod, principal, admin, super_admin)
├── Department Analytics (hod, principal, admin, super_admin)
├── Programs (hod, admin, super_admin)
├── HOD Management (admin, super_admin)
└── Department Reports (hod, principal, admin)
```

---

## Programs

```txt
Programs (hod, admin, super_admin)
├── Program List (hod, admin, super_admin)
├── Curriculum (hod, admin, super_admin)
├── Semesters (hod, admin, super_admin)
├── Credits Structure (admin, super_admin)
└── Academic Sessions (admin, super_admin)
```

---

## Subjects

```txt
Subjects (student, cr, professor, hod, principal, admin)
├── Subject List (student, cr, professor, hod, principal, admin)
├── Subject Allocation (hod, admin, super_admin)
├── Syllabus (student, cr, professor, hod)
├── Subject Analytics (professor, hod, principal, admin)
└── Electives (student, admin)
```

---

## Timetable

```txt
Timetable (all roles)
├── Daily Timetable (all roles)
├── Weekly Timetable (all roles)
├── Faculty Schedule (professor, hod, principal, admin)
├── Classroom Allocation (hod, admin)
├── Exam Schedule (student, cr, professor, hod, principal)
└── Schedule Requests (professor, hod)
```

---

## Attendance

```txt
Attendance (student, cr, professor, hod, principal, admin)
├── Mark Attendance (professor, delegated_cr)
├── Attendance Sessions (professor, hod, admin)
├── Attendance Reports (professor, hod, principal, admin)
├── Defaulters (professor, hod, principal, admin)
├── Attendance Analytics (hod, principal, admin)
├── Correction Requests (student, cr, professor)
└── Attendance Approval (hod, principal, admin)
```

---

## Assignments

```txt
Assignments (student, cr, professor, hod)
├── Assignment List (student, cr, professor, hod)
├── Create Assignment (professor)
├── Submissions (student, professor)
├── Assignment Analytics (professor, hod)
├── Pending Reviews (professor)
└── Grading (professor)
```

---

## Results

```txt
Results (student, professor, hod, principal, admin)
├── Marks Entry (professor)
├── Result List (student, professor, hod, principal, admin)
├── SGPA/CGPA (student, hod, principal)
├── Result Analytics (hod, principal, admin)
├── Approvals (hod, principal, admin)
├── Publish Results (admin, super_admin)
└── Transcripts (student, admin)
```

---

## Examinations

```txt
Examinations (professor, hod, principal, admin, exam_controller)
├── Exams (professor, hod, principal, admin)
├── Hall Tickets (student, admin, exam_controller)
├── Invigilation (professor, hod)
├── Seating Plans (admin, exam_controller)
├── Result Processing (admin, exam_controller)
├── Exam Analytics (principal, admin)
└── Exam Notices (all roles)
```

---

# 3. COMMUNICATION

---

## Notifications

```txt
Notifications (all roles)
├── Inbox (all roles)
├── Sent (professor, hod, principal, admin)
├── Broadcasts (admin, principal, super_admin)
├── Templates (admin, super_admin)
└── Notification Settings (all roles)
```

---

## Announcements

```txt
Announcements (all roles)
├── Public Notices (all roles)
├── Department Notices (student, cr, professor, hod)
├── Class Notices (student, cr, professor)
├── Scheduled Announcements (admin, super_admin)
└── Archived Notices (all roles)
```

---

## Discussions

```txt
Discussions (student, cr, professor)
├── Classroom Discussions (student, cr, professor)
├── Faculty Discussions (professor, hod)
├── Subject Forums (student, cr, professor)
├── Q&A (student, cr, professor)
└── Moderation (cr, professor)
```

---

## Polls

```txt
Polls (cr, professor, hod)
├── Active Polls (student, cr, professor)
├── Create Poll (cr, professor)
├── Poll Analytics (professor, hod)
└── Archived Polls (professor, hod)
```

---

## Events

```txt
Events (all roles)
├── Upcoming Events (all roles)
├── Event Calendar (all roles)
├── Registrations (student, cr)
├── Event Management (cr, admin, event_manager)
└── Event Analytics (admin, principal)
```

---

## Messaging

```txt
Messaging (student, cr, professor, hod, principal)
├── Direct Messages (student, cr, professor, hod, principal)
├── Group Chats (student, cr, professor)
├── Faculty Groups (professor, hod)
├── Class Groups (student, cr, professor)
└── Attachments (all messaging-enabled roles)
```

---

# 4. LIBRARY

```txt
Library (student, cr, professor, librarian, admin)
├── Books (student, cr, professor, librarian)
├── Issue Management (librarian)
├── Fines (student, librarian, admin)
├── Digital Library (student, professor)
└── Library Analytics (librarian, admin, principal)
```

---

# 5. FINANCE

```txt
Finance (student, accounts_staff, admin, principal)
├── Fees (student, accounts_staff, admin)
├── Accounts (accounts_staff, admin)
└── Payroll (admin, super_admin)
```

---

# 6. OPERATIONS

```txt
Operations
├── Documents (staff, admin)
├── Requests (student, staff, admin)
├── Approvals (hod, principal, admin)
├── Hostel (hostel_warden, admin)
├── Transport (transport_manager, admin)
└── Inventory (lab_assistant, admin)
```

---

# 7. ANALYTICS

```txt
Analytics
├── Student Analytics (hod, principal, admin)
├── Faculty Analytics (hod, principal, admin)
├── Department Analytics (hod, principal, admin)
├── Financial Analytics (accounts_staff, admin)
├── Library Analytics (librarian, admin)
└── System Analytics (admin, super_admin)
```

---

# 8. USER MANAGEMENT

```txt
User Management (admin, super_admin)
├── Users (admin, super_admin)
├── Roles (admin, super_admin)
├── Permissions (admin, super_admin)
└── Access Control (super_admin)
```

---

# 9. REPORTS

```txt
Reports
├── Academic Reports (hod, principal, admin)
├── Attendance Reports (professor, hod, admin)
├── Result Reports (hod, principal, admin)
├── Financial Reports (accounts_staff, admin)
├── Faculty Reports (hod, principal, admin)
├── Library Reports (librarian, admin)
├── Operational Reports (staff, admin)
├── Audit Reports (admin, super_admin)
├── Custom Reports (admin, super_admin)
└── Scheduled Reports (admin, super_admin)
```

---

# 10. SYSTEM

```txt
System (admin, super_admin)
├── Settings (admin, super_admin)
├── Audit Logs (admin, super_admin)
├── Security (super_admin)
├── Storage (super_admin)
├── Integrations (super_admin)
└── Developer Tools (super_admin)
```

---

# 11. ACCOUNT

```txt
Account (all roles)
├── My Profile (all roles)
├── Security (all roles)
├── Sessions (all roles)
├── Notifications (all roles)
├── Preferences (all roles)
├── Appearance (all roles)
└── Logout (all roles)
```
