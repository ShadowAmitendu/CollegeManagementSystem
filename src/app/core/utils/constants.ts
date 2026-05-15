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
} as const;
