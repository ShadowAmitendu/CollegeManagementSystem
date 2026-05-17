import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  signal,
  viewChildren,
} from '@angular/core';
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
  styleUrl: './topbar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block border-b border-[#e6dfd8] bg-[#faf9f5]/95 backdrop-blur' },
})
export class Topbar implements AfterViewInit {
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

  /** Refs to the tab link elements inside the pill container */
  protected readonly tabLinks = viewChildren<ElementRef<HTMLAnchorElement>>('tabLink');

  /** Sliding indicator position/size */
  protected readonly indicatorStyle = signal<Record<string, string>>({});

  protected readonly currentSection = computed(() => {
    const currentPath = this.cleanPath(this.currentUrl());
    const matchingItems = DASHBOARD_NAV_ITEMS.filter(
      (item) => currentPath === item.sectionPath || currentPath.startsWith(`${item.sectionPath}/`),
    );

    return matchingItems.sort((first, second) => second.sectionPath.length - first.sectionPath.length)[0] ?? DASHBOARD_NAV_ITEMS[0];
  });

  protected readonly breadcrumbs = computed(() => {
    const section = this.currentSection();
    const currentPath = this.cleanPath(this.currentUrl());
    
    const crumbs = [
      { label: section.label, path: section.path }
    ];

    if (section.children) {
      const activeChild = section.children.find(item => this.isSubNavActive(item));
      if (activeChild) {
        crumbs.push({ label: activeChild.label, path: activeChild.path });
        
        if (currentPath === '/students/create') {
          crumbs.push({ label: 'Add Student', path: currentPath });
        } else if (currentPath === '/students/import') {
          crumbs.push({ label: 'Upload', path: currentPath });
        } else if (currentPath.startsWith('/students/') && currentPath.endsWith('/edit')) {
          crumbs.push({ label: 'Edit Student', path: currentPath });
        }
      }
    }

    return crumbs;
  });

  protected readonly displayBreadcrumbs = computed(() => {
    const crumbs = this.breadcrumbs();
    if (crumbs.length <= 2) return crumbs;
    
    return [
      crumbs[0],
      { label: '..', path: '#' },
      crumbs[crumbs.length - 1]
    ];
  });

  protected readonly visibleSubNavItems = computed(() => {
    const children = this.currentSection()?.children ?? [];
    const visibleChildren = children.filter((item) => !item.permission || this.permissions.can(item.permission));

    return visibleChildren.length > 1 ? visibleChildren : [];
  });

  /** Track which sub-nav item index is active */
  protected readonly activeIndex = computed(() => {
    const items = this.visibleSubNavItems();
    return items.findIndex((item) => this.isSubNavActive(item));
  });

  constructor() {
    // React to route changes — reposition the sliding indicator
    effect(() => {
      this.activeIndex(); // track dependency
      this.visibleSubNavItems(); // track dependency
      // Use setTimeout to allow DOM to settle after navigation
      setTimeout(() => this.updateIndicator(), 0);
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.updateIndicator(), 50);
  }

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

  private updateIndicator(): void {
    const links = this.tabLinks();
    const idx = this.activeIndex();
    if (idx < 0 || idx >= links.length) {
      this.indicatorStyle.set({ opacity: '0' });
      return;
    }
    const el = links[idx].nativeElement;
    const parent = el.parentElement;
    if (!parent) return;

    const parentRect = parent.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();

    this.indicatorStyle.set({
      opacity: '1',
      transform: `translateX(${elRect.left - parentRect.left}px)`,
      width: `${elRect.width}px`,
      height: `${elRect.height}px`,
    });
  }

  private cleanPath(url: string): string {
    return url.split('?')[0]?.split('#')[0] || '/dashboard';
  }
}
