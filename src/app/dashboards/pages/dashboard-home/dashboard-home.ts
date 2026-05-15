import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { Auth } from '../../../core/services/auth';
import { Permissions } from '../../../core/services/permissions';
import { ActivityWidget } from '../../widgets/activity-widget/activity-widget';
import { AttendanceWidget } from '../../widgets/attendance-widget/attendance-widget';
import { CalendarWidget } from '../../widgets/calendar-widget/calendar-widget';
import { LibraryWidget } from '../../widgets/library-widget/library-widget';
import { NotificationWidget } from '../../widgets/notification-widget/notification-widget';
import { PerformanceWidget } from '../../widgets/performance-widget/performance-widget';
import { ResultsWidget } from '../../widgets/results-widget/results-widget';
import { TimetableWidget } from '../../widgets/timetable-widget/timetable-widget';

@Component({
  selector: 'app-dashboard-home',
  imports: [
    ActivityWidget,
    AttendanceWidget,
    CalendarWidget,
    LibraryWidget,
    NotificationWidget,
    PerformanceWidget,
    ResultsWidget,
    TimetableWidget,
  ],
  templateUrl: './dashboard-home.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class DashboardHome {
  protected readonly auth = inject(Auth);
  protected readonly permissions = inject(Permissions);
}
