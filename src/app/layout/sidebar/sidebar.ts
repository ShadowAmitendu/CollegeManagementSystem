import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

import { Auth } from '../../core/services/auth';
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
  protected readonly auth = inject(Auth);
  private readonly permissions = inject(Permissions);
  private readonly router = inject(Router);
  private readonly navItems = signal(DASHBOARD_NAV_ITEMS);

  protected readonly visibleNavItems = computed(() =>
    this.navItems().filter((item) => !item.permission || this.permissions.can(item.permission)),
  );

  protected async signOut(): Promise<void> {
    await this.auth.logout();
    await this.router.navigateByUrl('/auth/login');
  }
}
