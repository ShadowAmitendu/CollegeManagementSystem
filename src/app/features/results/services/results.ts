import { computed, Injectable, signal } from '@angular/core';

import { RESULTS } from '../data/results-static-data';
import { type Result, type ResultStatusFilter, type ResultSummary } from '../models/result.model';

@Injectable({ providedIn: 'root' })
export class Results {
  private readonly rowsSignal = signal<readonly Result[]>(RESULTS);
  private readonly searchSignal = signal('');
  private readonly statusSignal = signal<ResultStatusFilter>('all');
  private readonly departmentSignal = signal('all');

  readonly rows = this.rowsSignal.asReadonly();
  readonly search = this.searchSignal.asReadonly();
  readonly selectedStatus = this.statusSignal.asReadonly();
  readonly selectedDepartment = this.departmentSignal.asReadonly();

  readonly departments = computed(() =>
    Array.from(new Set(this.rowsSignal().map((result) => result.departmentName))).sort((first, second) =>
      first.localeCompare(second),
    ),
  );

  readonly filteredRows = computed(() => {
    const query = this.searchSignal().trim().toLowerCase();
    const status = this.statusSignal();
    const department = this.departmentSignal();

    return this.rowsSignal().filter((result) => {
      const matchesStatus = status === 'all' || result.status === status;
      const matchesDepartment = department === 'all' || result.departmentName === department;
      const matchesSearch =
        query.length === 0 ||
        [
          result.studentName,
          result.rollNumber,
          result.courseCode,
          result.courseTitle,
          result.examType,
          result.evaluatorName,
        ].some((value) => value.toLowerCase().includes(query));

      return matchesStatus && matchesDepartment && matchesSearch;
    });
  });

  readonly summary = computed<ResultSummary>(() => this.calculateSummary(this.rowsSignal()));

  readonly stats = computed(() => {
    const summary = this.summary();

    return [
      { label: 'Results', value: String(summary.total) },
      { label: 'Published', value: String(summary.published) },
      { label: 'Drafts', value: String(summary.draft) },
      { label: 'Average', value: `${summary.averagePercentage}%` },
      { label: 'Passed', value: String(summary.passCount) },
    ] as const;
  });

  async load(): Promise<void> {
    return Promise.resolve();
  }

  setSearch(value: string): void {
    this.searchSignal.set(value);
  }

  setStatus(value: ResultStatusFilter): void {
    this.statusSignal.set(value);
  }

  setDepartment(value: string): void {
    this.departmentSignal.set(value);
  }

  getResult(resultId: string): Result | undefined {
    return this.rowsSignal().find((result) => result.$id === resultId);
  }

  getStudentResults(studentId: string): readonly Result[] {
    return this.rowsSignal().filter((result) => result.studentId === studentId);
  }

  getPercentage(result: Result): number {
    return Math.round((result.marksObtained / result.maximumMarks) * 100);
  }

  isPassing(result: Result): boolean {
    return this.getPercentage(result) >= 40;
  }

  publishResult(resultId: string): void {
    this.rowsSignal.update((rows) =>
      rows.map((result) =>
        result.$id === resultId
          ? { ...result, status: 'published', publishedAt: new Date().toISOString(), $updatedAt: new Date().toISOString() }
          : result,
      ),
    );
  }

  private calculateSummary(rows: readonly Result[]): ResultSummary {
    const averagePercentage =
      rows.length === 0
        ? 0
        : Math.round(
            rows.reduce((sum, result) => sum + Math.round((result.marksObtained / result.maximumMarks) * 100), 0) /
              rows.length,
          );

    return {
      total: rows.length,
      published: rows.filter((result) => result.status === 'published').length,
      draft: rows.filter((result) => result.status === 'draft').length,
      locked: rows.filter((result) => result.status === 'locked').length,
      averagePercentage,
      passCount: rows.filter((result) => this.getPercentage(result) >= 40).length,
    };
  }
}
