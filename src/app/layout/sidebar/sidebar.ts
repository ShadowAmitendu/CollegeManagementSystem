import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { Permissions } from '../../core/services/permissions';
import { DASHBOARD_NAV_ITEMS } from '../navigation/navigation.config';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'hidden border-r border-[#e6dfd8] bg-[#faf9f5] lg:block' },
})
export class Sidebar {
  private readonly permissions = inject(Permissions);
  private readonly navItems = signal(DASHBOARD_NAV_ITEMS);

  protected readonly visibleNavItems = computed(() =>
    this.navItems().filter((item) => !item.permission || this.permissions.can(item.permission)),
  );
}
