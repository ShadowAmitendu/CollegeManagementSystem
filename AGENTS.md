# Project Overview

This project is a scalable enterprise-grade College Management System (CMS)
built using Angular standalone architecture, TailwindCSS, and Appwrite.

The application is multi-role and permission-driven.

This is NOT a small CRUD project.
Architecture consistency is extremely important.

## Tech Stack

Frontend:
- Angular (Standalone APIs)
- TailwindCSS
- Signals
- Angular Router
- ApexCharts
- Lucide Angular

Backend:
- Appwrite
- Appwrite Auth
- Appwrite TablesDB
- Appwrite Storage
- Appwrite Realtime

## Architectural Rules

Always follow:
- feature-driven architecture
- reusable UI
- strict separation of concerns
- scalable folder structure
- RBAC architecture

Never generate random flat structures.

## Folder Structure

Use this top-level application structure:

```text
src/app/
  core/
  shared/
  layout/
  features/
  dashboards/
  state/
```

## Core Folder Rules

`core/` contains:
- singleton services
- guards
- interceptors
- appwrite clients
- infrastructure logic

Never place feature business logic in `core/`.

Examples:
- auth service
- permissions service
- realtime service

## Shared Folder Rules

`shared/` contains reusable:
- UI components
- directives
- pipes
- analytics components

Shared components must:
- be dumb/presentational
- contain no business logic
- be reusable across modules

Good:
- `DataTableComponent`
- `ModalComponent`

Bad:
- `StudentTableComponent` inside `shared/`

## Feature Rules

`features/` is structured by business domain.

Examples:
- students
- faculty
- attendance
- library
- departments

Each feature contains:
- pages
- components
- services
- models
- routes

Do not structure by role.

Bad:
- `admin-students`
- `professor-students`

Good:
- `features/students`

Access control must be permission-driven.

## RBAC Rules

The application uses database-driven RBAC.

Never hardcode role checks like:

```ts
if (role === 'admin') {
  // ...
}
```

Always use:
- permissions
- role checks through helper services
- centralized authorization logic

Roles:
- admin
- principal
- hod
- professor
- student
- cr
- librarian
- staff

Users may have multiple roles.

## Routing Rules

Use standalone routing.

Prefer:
- lazy loading
- feature routes
- `CanMatch`
- `CanActivate`

URL philosophy:

```text
URL = business resource
```

Examples:
- `/students`
- `/students/:id`
- `/attendance`
- `/library/books`

Avoid:
- `/admin-students`
- `/getStudents`

## UI Rules

Design style inspiration:
- Cloudflare
- Linear
- GitHub
- Vercel

UI should be:
- clean
- whitespace-driven
- professional
- dashboard-oriented

Avoid:
- excessive gradients
- cluttered cards
- random colors

## Tailwind Rules

Prefer utility-first styling.

Avoid large custom CSS files unless necessary.

Use:
- `flex`
- `grid`
- `gap`
- spacing scale
- responsive utilities

Prefer:
- `rounded-xl`
- `rounded-2xl`
- `shadow-sm`
- `border`
- `bg-zinc-*`

Avoid inline styles.

## Component Rules

Pages:
- orchestrate data
- are route-aware
- are feature-specific

Shared components:
- are reusable
- are configurable
- are stateless where possible

Widgets:
- are dashboard-composable
- are analytics-focused

## Appwrite Rules

Never call the Appwrite SDK directly inside components.

Always use services or repositories.

Bad:

```ts
databases.listDocuments();
```

inside a component.

Good:

```ts
studentsService.getStudents();
```

## Database Philosophy

Database models represent business entities and relationships, not frontend pages.

Important entities:
- users
- roles
- permissions
- students
- faculty
- attendance_sessions
- attendance_records

## Attendance Architecture

Attendance is session-based.

Correct flow:

```text
course_offering
  -> attendance_session
  -> attendance_records
```

Never store attendance in giant arrays or JSON blobs.

## Media/File Rules

Use Appwrite Storage buckets.

Database stores:
- file IDs
- media relationships

Never store:
- base64 files
- giant blobs

## Naming Conventions

Components:
- `student-card.component.ts`

Services:
- `students.service.ts`

Models:
- `student.model.ts`

Pages:
- `student-list.component.ts`

Use kebab-case everywhere.

## Dashboard Philosophy

Dashboards are widget-based.

Widgets are reusable and composable.

Examples:
- `AttendanceWidget`
- `ResultsWidget`
- `ActivityWidget`

Different roles load different widgets dynamically.

## Security Rules

Never expose:
- Appwrite secrets
- admin keys
- internal tokens

Frontend may only use public Appwrite config values.

## Preferred Libraries

Icons:
- lucide-angular

Charts:
- ng-apexcharts

UI:
- TailwindCSS
- Angular CDK

## Important Principle

Optimize for scalability and maintainability, not quick hacks or short-term shortcuts.

## Code Generation Preferences

When generating code:
- strongly type models
- keep files small
- avoid giant components
- split reusable logic
- use feature-based organization

Prefer:
- composable architecture
- scalable abstractions
- reusable utilities

# Engineering Standards

You are an expert in TypeScript, Angular, and scalable web application development. You write functional, maintainable, performant, and accessible code following Angular and TypeScript best practices.

## TypeScript Best Practices

- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain

## Angular Best Practices

- Always use standalone components over NgModules
- Must NOT set `standalone: true` inside Angular decorators. It's the default in Angular v20+.
- Use signals for state management
- Implement lazy loading for feature routes
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead
- Use `NgOptimizedImage` for all static images.
  - `NgOptimizedImage` does not work for inline base64 images.

## Accessibility Requirements

- It MUST pass all AXE checks.
- It MUST follow all WCAG AA minimums, including focus management, color contrast, and ARIA attributes.

### Components

- Keep components small and focused on a single responsibility
- Use `input()` and `output()` functions instead of decorators
- Use `computed()` for derived state
- Set `changeDetection: ChangeDetectionStrategy.OnPush` in `@Component` decorator
- Prefer inline templates for small components
- Prefer Reactive forms instead of Template-driven ones
- Do NOT use `ngClass`, use `class` bindings instead
- Do NOT use `ngStyle`, use `style` bindings instead
- When using external templates/styles, use paths relative to the component TS file.

## State Management

- Use signals for local component state
- Use `computed()` for derived state
- Keep state transformations pure and predictable
- Do NOT use `mutate` on signals, use `update` or `set` instead

## Templates

- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Use the async pipe to handle observables
- Do not assume globals like (`new Date()`) are available.

## Services

- Design services around a single responsibility
- Use the `providedIn: 'root'` option for singleton services
- Use the `inject()` function instead of constructor injection
