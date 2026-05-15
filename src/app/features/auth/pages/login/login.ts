import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { type StaticUser } from '../../../../core/auth/static-users';
import { Auth } from '../../../../core/services/auth';
import { StaticAccountCard } from '../../components/static-account-card/static-account-card';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, StaticAccountCard],
  templateUrl: './login.html',
  styleUrl: './login.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class Login {
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  protected readonly auth = inject(Auth);
  protected readonly submitted = signal(false);
  protected readonly developmentUsers = this.auth.staticUsers;

  protected readonly form = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  protected canSubmit(): boolean {
    return this.form.valid && !this.auth.loading();
  }

  protected async onSubmit(): Promise<void> {
    this.submitted.set(true);

    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    const { email, password } = this.form.getRawValue();
    await this.auth.login(email, password);
    await this.router.navigateByUrl('/dashboard');
  }

  protected useDevelopmentUser(user: StaticUser): void {
    this.form.setValue({
      email: user.email,
      password: user.password,
    });
    this.submitted.set(false);
  }

  protected async loginAsDevelopmentUser(user: StaticUser): Promise<void> {
    this.auth.loginAsStaticUser(user);
    await this.router.navigateByUrl('/dashboard');
  }
}
