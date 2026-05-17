import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { Auth } from '../../../../core/services/auth';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class Login {
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  protected readonly auth = inject(Auth);
  protected readonly submitted = signal(false);

  protected readonly testAccounts = [
    { role: 'Admin', email: 'admin@college.local', password: 'password123' },
    { role: 'Principal', email: 'principal@college.local', password: 'password123' },
    { role: 'HOD', email: 'hod@college.local', password: 'password123' },
    { role: 'Professor', email: 'professor@college.local', password: 'password123' },
    { role: 'Student', email: 'student@college.local', password: 'password123' },
    { role: 'CR', email: 'cr@college.local', password: 'password123' },
    { role: 'Librarian', email: 'librarian@college.local', password: 'password123' },
    { role: 'Staff', email: 'staff@college.local', password: 'password123' },
  ];

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

  protected async fastLogin(account: { email: string; password: string }): Promise<void> {
    this.form.setValue({
      email: account.email,
      password: account.password,
    });
    await this.onSubmit();
  }
}
