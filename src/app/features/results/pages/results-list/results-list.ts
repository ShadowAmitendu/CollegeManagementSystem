import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';

import { Permissions } from '../../../../core/services/permissions';
import { ResultCard } from '../../components/result-card/result-card';
import { ResultsTable } from '../../components/results-table/results-table';
import { type ResultStatusFilter } from '../../models/result.model';
import { Results } from '../../services/results';

@Component({
  selector: 'app-results-list',
  imports: [ResultCard, ResultsTable],
  templateUrl: './results-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class ResultsList {
  protected readonly results = inject(Results);
  private readonly permissions = inject(Permissions);
  private readonly router = inject(Router);

  protected readonly canPublishResults = computed(() => this.permissions.canAny(['results.create', 'results.update'] as const));

  protected onSearch(event: Event): void {
    this.results.setSearch((event.target as HTMLInputElement).value);
  }

  protected onDepartmentChange(event: Event): void {
    this.results.setDepartment((event.target as HTMLSelectElement).value);
  }

  protected onStatusChange(event: Event): void {
    this.results.setStatus((event.target as HTMLSelectElement).value as ResultStatusFilter);
  }

  protected openResult(resultId: string): void {
    void this.router.navigate(['/results', resultId]);
  }

  protected publishResult(resultId: string): void {
    if (this.canPublishResults()) {
      this.results.publishResult(resultId);
    }
  }
}
