import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { Auth } from '../../core/services/auth';

@Component({
  selector: 'app-topbar',
  imports: [RouterLink],
  templateUrl: './topbar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block border-b border-[#e6dfd8] bg-[#faf9f5]/95 backdrop-blur' },
})
export class Topbar {
  protected readonly auth = inject(Auth);
  private readonly router = inject(Router);

  protected async signOut(): Promise<void> {
    await this.auth.logout();
    await this.router.navigateByUrl('/auth/login');
  }
}
