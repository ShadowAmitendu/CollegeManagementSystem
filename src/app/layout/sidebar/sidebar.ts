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
  host: {
    '[class.w-16]': 'isCollapsed()',
    '[class.w-72]': '!isCollapsed()',
    '[class.hover:z-[100]]': 'isCollapsed()',
    'class': 'hidden lg:block shrink-0 transition-all duration-300 relative sticky top-0 h-dvh'
  },
})
export class Sidebar {
  protected readonly auth = inject(Auth);
  private readonly permissions = inject(Permissions);
  private readonly router = inject(Router);
  private readonly navItems = signal(DASHBOARD_NAV_ITEMS);
  protected readonly isCollapsed = signal(false);

  protected readonly visibleNavItems = computed(() =>
    this.navItems().filter((item) => !item.permission || this.permissions.can(item.permission)),
  );

  protected async signOut(): Promise<void> {
    await this.auth.logout();
    await this.router.navigateByUrl('/auth/login');
  }
}
