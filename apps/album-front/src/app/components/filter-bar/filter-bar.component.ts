import { Component, Output, EventEmitter, ChangeDetectionStrategy, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterState } from '../../models/sticker.model';
import { AlbumService } from '../../services/album.service';
import { ReactWrapperComponent } from '../react-wrapper/react-wrapper.component';
import { FilterBarReact } from './FilterBarReact';

@Component({
  selector: 'app-filter-bar',
  standalone: true,
  imports: [CommonModule, ReactWrapperComponent],
  template: `
    <app-react-wrapper 
      [component]="FilterBarReact" 
      [props]="reactProps"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterBarComponent {
  albumService = inject(AlbumService);
  @Input() sections: string[] = [];
  @Output() filtersChanged = new EventEmitter<FilterState>();

  readonly FilterBarReact = FilterBarReact;

  get reactProps() {
    return {
      sections: this.sections,
      initialFilters: {
        search: '',
        status: 'all',
        section: ''
      },
      onFilterChange: (filters: FilterState) => this.filtersChanged.emit(filters),
      onExpandAll: () => this.albumService.expandAll(),
      onCollapseAll: () => this.albumService.collapseAll(),
      onExpandGroups: () => this.albumService.expandGroups(),
      onCollapseGroups: () => this.albumService.collapseGroups()
    };
  }
}
