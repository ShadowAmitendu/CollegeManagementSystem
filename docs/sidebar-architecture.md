# FULL ENTERPRISE CMS SIDEBAR ARCHITECTURE

## Complete Navigation Structure

This is the FULL possible sidebar structure for your CMS.

Roles will see:

* only permitted sections
* only permitted pages
* dynamically filtered menus

---

# 1. DASHBOARD

```txt
Dashboard
├── Overview
├── Activity Feed
├── Quick Actions
├── Calendar
├── Recent Notifications
├── Upcoming Events
└── Personal Analytics
```

---

# 2. ACADEMICS

```txt
Academics
├── Students
│   ├── Student List
│   ├── Student Details
│   ├── Add Student
│   ├── Student Analytics
│   ├── Defaulters
│   ├── CR Management
│   ├── Attendance Summary
│   └── Student Documents
│
├── Faculty
│   ├── Faculty List
│   ├── Faculty Profiles
│   ├── Assign Subjects
│   ├── Faculty Workload
│   ├── Faculty Analytics
│   └── Department Faculty
│
├── Departments
│   ├── Department List
│   ├── Department Analytics
│   ├── Programs
│   ├── HOD Management
│   └── Department Reports
│
├── Programs
│   ├── Program List
│   ├── Curriculum
│   ├── Semesters
│   ├── Credits Structure
│   └── Academic Sessions
│
├── Subjects
│   ├── Subject List
│   ├── Subject Allocation
│   ├── Syllabus
│   ├── Subject Analytics
│   └── Electives
│
├── Timetable
│   ├── Daily Timetable
│   ├── Weekly Timetable
│   ├── Faculty Schedule
│   ├── Classroom Allocation
│   ├── Exam Schedule
│   └── Schedule Requests
│
├── Attendance
│   ├── Mark Attendance
│   ├── Attendance Sessions
│   ├── Attendance Reports
│   ├── Defaulters
│   ├── Attendance Analytics
│   ├── Correction Requests
│   └── Attendance Approval
│
├── Assignments
│   ├── Assignment List
│   ├── Create Assignment
│   ├── Submissions
│   ├── Assignment Analytics
│   ├── Pending Reviews
│   └── Grading
│
├── Results
│   ├── Marks Entry
│   ├── Result List
│   ├── SGPA/CGPA
│   ├── Result Analytics
│   ├── Approvals
│   ├── Publish Results
│   └── Transcripts
│
└── Examinations
    ├── Exams
    ├── Hall Tickets
    ├── Invigilation
    ├── Seating Plans
    ├── Result Processing
    ├── Exam Analytics
    └── Exam Notices
```

---

# 3. COMMUNICATION

```txt
Communication
├── Notifications
│   ├── Inbox
│   ├── Sent
│   ├── Broadcasts
│   ├── Templates
│   └── Notification Settings
│
├── Announcements
│   ├── Public Notices
│   ├── Department Notices
│   ├── Class Notices
│   ├── Scheduled Announcements
│   └── Archived Notices
│
├── Discussions
│   ├── Classroom Discussions
│   ├── Faculty Discussions
│   ├── Subject Forums
│   ├── Q&A
│   └── Moderation
│
├── Polls
│   ├── Active Polls
│   ├── Create Poll
│   ├── Poll Analytics
│   └── Archived Polls
│
├── Events
│   ├── Upcoming Events
│   ├── Event Calendar
│   ├── Registrations
│   ├── Event Management
│   └── Event Analytics
│
└── Messaging
    ├── Direct Messages
    ├── Group Chats
    ├── Faculty Groups
    ├── Class Groups
    └── Attachments
```

---

# 4. LIBRARY

```txt
Library
├── Books
│   ├── Book Catalog
│   ├── Categories
│   ├── Authors
│   ├── Publishers
│   └── Inventory
│
├── Issue Management
│   ├── Issue Book
│   ├── Returns
│   ├── Renewals
│   ├── Reservations
│   └── Due Books
│
├── Fines
│   ├── Pending Fines
│   ├── Fine History
│   ├── Waivers
│   └── Payments
│
├── Digital Library
│   ├── PDFs
│   ├── Research Papers
│   ├── Journals
│   └── E-Resources
│
└── Library Analytics
    ├── Borrow Trends
    ├── Popular Books
    ├── Inventory Usage
    └── Reports
```

---

# 5. FINANCE

```txt
Finance
├── Fees
│   ├── Fee Structure
│   ├── Pending Fees
│   ├── Payments
│   ├── Receipts
│   ├── Fee Analytics
│   └── Scholarships
│
├── Accounts
│   ├── Transactions
│   ├── Expense Tracking
│   ├── Revenue Reports
│   └── Financial Analytics
│
└── Payroll
    ├── Faculty Payroll
    ├── Staff Payroll
    ├── Payslips
    └── Payroll Reports
```

---

# 6. OPERATIONS

```txt
Operations
├── Documents
│   ├── Uploads
│   ├── Verification
│   ├── Certificates
│   ├── Student Documents
│   └── Faculty Documents
│
├── Requests
│   ├── Leave Requests
│   ├── Document Requests
│   ├── Approval Queue
│   ├── Escalations
│   └── Request History
│
├── Approvals
│   ├── Attendance Approvals
│   ├── Result Approvals
│   ├── Workflow Approvals
│   └── Escalations
│
├── Hostel
│   ├── Room Allocation
│   ├── Residents
│   ├── Complaints
│   ├── Attendance
│   └── Hostel Fees
│
├── Transport
│   ├── Bus Routes
│   ├── Vehicle Tracking
│   ├── Student Allocation
│   └── Transport Fees
│
└── Inventory
    ├── Equipment
    ├── Lab Inventory
    ├── Maintenance
    └── Asset Tracking
```

---

# 7. ANALYTICS

```txt
Analytics
├── Student Analytics
│   ├── Attendance Trends
│   ├── Performance Trends
│   ├── Enrollment Trends
│   └── Defaulter Analytics
│
├── Faculty Analytics
│   ├── Workload
│   ├── Performance
│   ├── Subject Analytics
│   └── Attendance Compliance
│
├── Department Analytics
│   ├── Department KPIs
│   ├── Performance Metrics
│   ├── Comparisons
│   └── Reports
│
├── Financial Analytics
│   ├── Revenue
│   ├── Fee Collection
│   ├── Expenses
│   └── Trends
│
├── Library Analytics
│   ├── Borrow Trends
│   ├── Popular Books
│   ├── Fine Collection
│   └── Usage Metrics
│
└── System Analytics
    ├── Active Users
    ├── Usage Metrics
    ├── Realtime Activity
    └── Logs
```

---

# 8. USER & ACCESS MANAGEMENT

```txt
User Management
├── Users
│   ├── User List
│   ├── User Profiles
│   ├── Create User
│   ├── Suspended Users
│   └── Activity Logs
│
├── Roles
│   ├── Role List
│   ├── Create Role
│   ├── Role Permissions
│   └── Delegation Rules
│
├── Permissions
│   ├── Permission List
│   ├── Assign Permissions
│   ├── Delegated Permissions
│   ├── Revoked Permissions
│   └── Permission Audit
│
└── Access Control
    ├── RBAC Overview
    ├── Permission Matrix
    ├── Security Policies
    └── MFA Policies
```

---

# 9. REPORTS

```txt
Reports
├── Academic Reports
├── Attendance Reports
├── Result Reports
├── Financial Reports
├── Faculty Reports
├── Library Reports
├── Operational Reports
├── Audit Reports
├── Custom Reports
└── Scheduled Reports
```

---

# 10. SYSTEM

```txt
System
├── Settings
│   ├── General Settings
│   ├── Academic Settings
│   ├── Notification Settings
│   ├── Branding
│   └── Workflow Settings
│
├── Audit Logs
│   ├── User Activity
│   ├── Permission Changes
│   ├── Login History
│   └── Security Events
│
├── Security
│   ├── MFA
│   ├── Session Management
│   ├── IP Restrictions
│   └── Security Policies
│
├── Storage
│   ├── File Buckets
│   ├── Media Usage
│   ├── Cleanup
│   └── Upload Policies
│
├── Integrations
│   ├── Appwrite
│   ├── Email Services
│   ├── SMS Services
│   ├── Payment Gateway
│   └── Webhooks
│
└── Developer Tools
    ├── API Keys
    ├── Realtime Monitor
    ├── Queue Monitor
    ├── Function Logs
    └── Environment Config
```

---

# 11. PROFILE & ACCOUNT

```txt
Account
├── My Profile
├── Security
├── Sessions
├── Notifications
├── Preferences
├── Appearance
└── Logout
```

---

# APPROXIMATE SCALE

| Type               | Count   |
| ------------------ | ------- |
| Main Sections      | 11      |
| Total Subsections  | 80–120+ |
| Dynamic Visibility | YES     |
| Permission Driven  | YES     |
| Role Filtered      | YES     |

---

# IMPORTANT

NO user should see all sections except:

```txt
super_admin
```

Every role sees:

* filtered sections
* filtered children
* permission-based menus

---

# RECOMMENDED IMPLEMENTATION

Use:

```txt
sidebar.config.ts
```

with:

```ts
permission
roles
children
badges
feature flags
```

for every item.

---

# IMPORTANT ENTERPRISE RULE

Sidebar rendering should depend on:

```txt
effective permissions
```

NOT hardcoded roles.

Because:

* users can have multiple roles
* delegated permissions exist
* temporary permissions exist
* revoked permissions exist

That is the correct scalable enterprise navigation architecture.

---

# ROLES

Based on the sidebar data, there are **11 roles** total:

1. `student`
2. `cr` (Class Representative)
3. `professor`
4. `hod` (Head of Department)
5. `principal`
6. `admin`
7. `super_admin`
8. `staff`
9. `librarian`
10. `accounts_staff`
11. `exam_controller`

*Contextual roles:* `delegated_cr` (for marking attendance) and `event_manager` (for event management) are sub-roles or permission states rather than standalone login roles.
