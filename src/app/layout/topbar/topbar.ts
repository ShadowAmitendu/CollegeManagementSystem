import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, map } from 'rxjs';

import { Auth } from '../../core/services/auth';
import { Permissions } from '../../core/services/permissions';
import { DASHBOARD_NAV_ITEMS, type DashboardSubNavItem } from '../navigation/navigation.config';

@Component({
  selector: 'app-topbar',
  imports: [RouterLink],
  templateUrl: './topbar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block border-b border-[#e6dfd8] bg-[#faf9f5]/95 backdrop-blur' },
})
export class Topbar {
  protected readonly auth = inject(Auth);
  private readonly permissions = inject(Permissions);
  private readonly router = inject(Router);
  private readonly currentUrl = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects),
    ),
    { initialValue: this.router.url },
  );

  protected readonly currentSection = computed(() => {
    const currentPath = this.cleanPath(this.currentUrl());
    const matchingItems = DASHBOARD_NAV_ITEMS.filter(
      (item) => currentPath === item.sectionPath || currentPath.startsWith(`${item.sectionPath}/`),
    );

    return matchingItems.sort((first, second) => second.sectionPath.length - first.sectionPath.length)[0] ?? DASHBOARD_NAV_ITEMS[0];
  });

  protected readonly visibleSubNavItems = computed(() => {
    const children = this.currentSection()?.children ?? [];
    const visibleChildren = children.filter((item) => !item.permission || this.permissions.can(item.permission));

    return visibleChildren.length > 1 ? visibleChildren : [];
  });

  protected async signOut(): Promise<void> {
    await this.auth.logout();
    await this.router.navigateByUrl('/auth/login');
  }

  protected isSubNavActive(item: DashboardSubNavItem): boolean {
    const currentPath = this.cleanPath(this.currentUrl());
    const inactiveStartsWith = item.inactiveStartsWith ?? [];

    if (inactiveStartsWith.some((path) => currentPath === path || currentPath.startsWith(`${path}/`))) {
      return false;
    }

    if ((item.activeExact ?? []).includes(currentPath)) {
      return true;
    }

    return (item.activeStartsWith ?? [item.path]).some(
      (path) => currentPath === path || currentPath.startsWith(`${path}/`),
    );
  }

  protected subNavLinkClass(item: DashboardSubNavItem): string {
    const baseClass =
      'inline-flex min-h-9 shrink-0 items-center rounded-lg px-3 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-[#cc785c] focus:ring-offset-2 focus:ring-offset-[#faf9f5]';

    if (this.isSubNavActive(item)) {
      return `${baseClass} bg-[#181715] text-[#faf9f5]`;
    }

    return `${baseClass} text-[#6c6a64] hover:bg-[#f5f0e8] hover:text-[#141413]`;
  }

  private cleanPath(url: string): string {
    return url.split('?')[0]?.split('#')[0] || '/dashboard';
  }
}
