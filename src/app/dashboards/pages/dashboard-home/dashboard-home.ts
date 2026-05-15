import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';

import { Auth } from '../../../core/services/auth';

@Component({
  selector: 'app-dashboard-home',
  imports: [],
  templateUrl: './dashboard-home.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class DashboardHome {
  protected readonly auth = inject(Auth);
  protected readonly widgets = signal([
    { title: 'Attendance', value: '0 sessions', description: 'Session-based attendance summaries will render here.', tone: 'cream' },
    { title: 'Results', value: '0 records', description: 'Assessment publishing and review workflows are ready to connect.', tone: 'cream' },
    { title: 'Library', value: '0 issues', description: 'Book circulation signals can be composed into this dashboard.', tone: 'cream' },
    { title: 'Activity', value: 'Live', description: 'Realtime Appwrite events can feed this surface.', tone: 'dark' },
  ]);
}
