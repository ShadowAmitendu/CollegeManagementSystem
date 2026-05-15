import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import { type StaticUser } from '../../../../core/auth/static-users';

@Component({
  selector: 'app-static-account-card',
  imports: [],
  templateUrl: './static-account-card.html',
  styleUrl: './static-account-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class StaticAccountCard {
  readonly user = input.required<StaticUser>();
  readonly fillUser = output<StaticUser>();
  readonly selectUser = output<StaticUser>();
}
