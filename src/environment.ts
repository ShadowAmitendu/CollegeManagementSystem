export const environment = {
  production: false,
  appwrite: {
    endpoint: 'https://cloud.appwrite.io/v1',
    projectId: 'replace-with-dev-appwrite-project-id',
    databaseId: 'college-management-dev',
    buckets: {
      media: 'media-dev',
      avatars: 'avatars-dev',
      documents: 'documents-dev',
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
