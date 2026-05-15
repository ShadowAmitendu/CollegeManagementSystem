import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'hidden border-r border-zinc-200 bg-white lg:block' },
})
export class Sidebar {
  protected readonly navItems = signal([
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Students', path: '/students' },
    { label: 'Faculty', path: '/faculty' },
    { label: 'Departments', path: '/departments' },
    { label: 'Attendance', path: '/attendance' },
    { label: 'Library', path: '/library/books' },
    { label: 'Results', path: '/results' },
    { label: 'Notifications', path: '/notifications' },
    { label: 'Settings', path: '/settings/profile' },
  ]);
}
