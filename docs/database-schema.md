# Enterprise CMS - Database Schema Architecture

This document defines the normalized Appwrite database schema to support the complete sidebar architecture, role visibility, and granular RBAC.

## Database
- **Name:** `college-management`

---

## 1. User Management & RBAC

**`users` (Profiles)**
- `userId` (string, unique) -> Maps to Appwrite Auth ID
- `email` (string)
- `name` (string)
- `avatarId` (string)
- `status` (enum: active, suspended)
- `roleIds` (string[]) -> Array of Role IDs (e.g., ["student", "cr"])

**`roles`**
- `$id` (string) -> e.g., 'super_admin', 'hod', 'student'
- `name` (string)
- `description` (string)

**`permissions`**
- `roleId` (string) -> Reference to `roles.$id`
- `resource` (string) -> e.g., 'attendance', 'fees'
- `action` (string) -> 'create', 'read', 'update', 'delete'

---

## 2. Academics

**`departments`**
- `name` (string)
- `code` (string, unique)
- `hodId` (string) -> Reference to `users.userId`

**`programs`**
- `name` (string)
- `departmentId` (string) -> Reference to `departments.$id`
- `durationYears` (integer)

**`subjects`**
- `code` (string, unique)
- `name` (string)
- `credits` (integer)
- `programId` (string)
- `semester` (integer)
- `type` (enum: core, elective)

**`students`**
- `userId` (string, unique)
- `enrollmentNo` (string, unique)
- `programId` (string)
- `currentSemester` (integer)
- `batch` (string)
- `isCR` (boolean)

**`faculty`**
- `userId` (string, unique)
- `employeeId` (string, unique)
- `departmentId` (string)
- `designation` (string)

**`course_allocations`**
- `facultyId` (string)
- `subjectId` (string)
- `batch` (string)
- `semester` (integer)
- `academicYear` (string)

**`timetable`**
- `subjectId` (string)
- `facultyId` (string)
- `dayOfWeek` (integer)
- `startTime` (string)
- `endTime` (string)
- `roomNo` (string)

**`attendance_sessions`**
- `subjectId` (string)
- `facultyId` (string)
- `date` (datetime)
- `startTime` (string)
- `type` (enum: lecture, lab)

**`attendance_records`**
- `sessionId` (string)
- `studentId` (string)
- `status` (enum: present, absent, late, excused)
- `markedBy` (string) -> Used to track if marked by professor or delegated_cr

**`assignments`**
- `subjectId` (string)
- `facultyId` (string)
- `title` (string)
- `description` (string)
- `dueDate` (datetime)
- `totalMarks` (integer)

**`submissions`**
- `assignmentId` (string)
- `studentId` (string)
- `fileId` (string) -> Storage bucket reference
- `submittedAt` (datetime)
- `marks` (integer)

**`exams`**
- `subjectId` (string)
- `name` (string)
- `date` (datetime)
- `totalMarks` (integer)
- `type` (enum: mid_term, final)

**`results`**
- `studentId` (string)
- `examId` (string)
- `marksObtained` (integer)
- `status` (enum: pass, fail)

---

## 3. Communication

**`notifications`**
- `userId` (string)
- `title` (string)
- `body` (string)
- `isRead` (boolean)
- `link` (string)
- `createdAt` (datetime)

**`announcements`**
- `title` (string)
- `content` (string)
- `authorId` (string)
- `targetRoles` (string[]) -> Array of roles that can see this
- `attachmentIds` (string[])
- `priority` (enum: low, medium, high)

**`discussions`**
- `subjectId` (string)
- `authorId` (string)
- `title` (string)
- `content` (string)
- `isClosed` (boolean)

**`events`**
- `title` (string)
- `description` (string)
- `date` (datetime)
- `location` (string)
- `organizerId` (string)
- `targetRoles` (string[])

---

## 4. Library

**`books`**
- `isbn` (string)
- `title` (string)
- `author` (string)
- `category` (string)
- `totalCopies` (integer)
- `availableCopies` (integer)

**`book_issues`**
- `bookId` (string)
- `userId` (string)
- `issueDate` (datetime)
- `dueDate` (datetime)
- `returnDate` (datetime)
- `status` (enum: issued, returned, overdue)

**`fines`**
- `userId` (string)
- `issueId` (string)
- `amount` (double)
- `status` (enum: pending, paid, waived)

---

## 5. Finance

**`fees`**
- `studentId` (string)
- `amount` (double)
- `type` (enum: tuition, exam, hostel, transport)
- `dueDate` (datetime)
- `status` (enum: pending, partial, paid)

**`transactions`**
- `feeId` (string)
- `userId` (string)
- `amount` (double)
- `paymentMethod` (string)
- `transactionDate` (datetime)
- `receiptNo` (string)

---

## 6. Operations

**`requests`**
- `userId` (string)
- `type` (enum: leave, document, attendance_correction)
- `subject` (string)
- `description` (string)
- `status` (enum: pending, approved, rejected)
- `approvedBy` (string)

**`hostel_allocations`**
- `studentId` (string)
- `roomNo` (string)
- `block` (string)

**`transport_allocations`**
- `studentId` (string)
- `routeId` (string)
- `stopName` (string)

---

## Schema & Permissions Rule

All collections should utilize Appwrite's built-in **Document-Level Security (DLS)**.
Instead of using fixed roles at the Appwrite level, the backend services should assign Document permissions (e.g., `read("team:students")`, `update("user:{studentId}")`) upon document creation based on the active permissions matrix.
