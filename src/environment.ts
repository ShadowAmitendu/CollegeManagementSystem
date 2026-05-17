export const environment = {
  production: false,
  auth: {
    strategy: 'appwrite',
  },
  appwrite: {
    endpoint: 'https://sgp.cloud.appwrite.io/v1',
    projectId: '6a095234003402d1d270',
    databaseId: 'college-management',
    buckets: {
      media: 'media',
      avatars: 'avatars',
      documents: 'documents',
    },
    tables: {
      users: 'users',
      roles: 'roles',
      permissions: 'permissions',
      students: 'students',
      faculty: 'faculty',
      departments: 'departments',
      courseOfferings: 'course_offerings',
      attendanceSessions: 'attendance_sessions',
      attendanceRecords: 'attendance_records',
      books: 'books',
      bookIssues: 'book_issues',
      results: 'results',
      notifications: 'notifications',
      activity: 'activity',
    },
  },
} as const;
