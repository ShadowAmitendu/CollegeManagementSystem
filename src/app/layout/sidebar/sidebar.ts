import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { Permissions } from '../../core/services/permissions';
import { ROUTE_PERMISSIONS } from '../../core/utils/constants';
import { type PermissionCode } from '../../core/utils/permissions';

interface NavItem {
  readonly label: string;
  readonly path: string;
  readonly permission?: PermissionCode;
}

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'hidden border-r border-[#e6dfd8] bg-[#faf9f5] lg:block' },
})
export class Sidebar {
  private readonly permissions = inject(Permissions);

  private readonly navItems = signal<readonly NavItem[]>([
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Students', path: '/students', permission: ROUTE_PERMISSIONS.students },
    { label: 'Faculty', path: '/faculty', permission: ROUTE_PERMISSIONS.faculty },
    { label: 'Departments', path: '/departments', permission: ROUTE_PERMISSIONS.departments },
    { label: 'Attendance', path: '/attendance', permission: ROUTE_PERMISSIONS.attendance },
    { label: 'Library', path: '/library/books', permission: ROUTE_PERMISSIONS.library },
    { label: 'Results', path: '/results', permission: ROUTE_PERMISSIONS.results },
    { label: 'Notifications', path: '/notifications', permission: ROUTE_PERMISSIONS.notifications },
    { label: 'Settings', path: '/settings/profile', permission: ROUTE_PERMISSIONS.settings },
  ]);

  protected readonly visibleNavItems = computed(() =>
    this.navItems().filter((item) => !item.permission || this.permissions.can(item.permission)),
  );
}
