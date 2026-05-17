import { environment } from '../../../environment';

export const APPWRITE_CONFIG = environment.appwrite;

export const ROUTE_PERMISSIONS = {
  dashboard: 'dashboard.read',
  students: 'students.read',
  faculty: 'faculty.read',
  departments: 'departments.read',
  attendance: 'attendance.read',
  library: 'library.read',
  results: 'results.read',
  notifications: 'notifications.read',
  settings: 'settings.read',
  designations: 'designations.read',
  assignments: 'assignments.read',
  examinations: 'examinations.read',
  timetable: 'timetable.read',
  communication: 'communication.read',
  finance: 'finance.read',
  operations: 'operations.read',
  analytics: 'analytics.read',
  reports: 'reports.read',
  userManagement: 'userManagement.read',
  system: 'system.read',
  account: 'account.read',
} as const;
