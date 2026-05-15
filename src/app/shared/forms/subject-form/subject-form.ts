import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'app-subject-form',
  imports: [],
  templateUrl: './subject-form.html',
  styleUrl: './subject-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class SubjectForm {
  protected readonly eyebrow = signal('Shared UI Component');
  protected readonly title = signal('Subject Form');
  protected readonly description = signal('Boilerplate surface ready for Appwrite-backed data, permission checks, and feature-specific orchestration.');
  protected readonly metrics = signal([
    { label: 'Records', value: '0', tone: 'bg-zinc-950 text-white' },
    { label: 'Pending', value: '0', tone: 'bg-amber-100 text-amber-900' },
    { label: 'Healthy', value: '100%', tone: 'bg-emerald-100 text-emerald-900' },
  ]);
}
