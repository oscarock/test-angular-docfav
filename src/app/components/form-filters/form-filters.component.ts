import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-form-filters',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-filters.component.html',
  styleUrl: './form-filters.component.css'
})

export class FormFiltersComponent implements OnInit {
  games: any;

  filtersForm = new FormGroup({
    searchName: new FormControl(''),
    searchGenre: new FormControl(''),
    searchPlatform: new FormControl(''),
  });

  constructor(private service: ApiService, private searchService: SearchService) {}

  ngOnInit() {
    this.setupSearchChange('searchName', 'title', this.searchService.changeSearchName.bind(this.searchService));
    this.setupSearchChange('searchGenre', 'genre', this.searchService.changeSearchGenre.bind(this.searchService));
    this.setupSearchChange('searchPlatform', 'platform', this.searchService.changeSearchPlatform.bind(this.searchService));
  }

  setupSearchChange(controlName: string, apiParam: string, searchServiceCallback: (value: string) => void) {
    const control = this.filtersForm.get(controlName);

    if (control) {
      control.valueChanges
        .pipe(
          debounceTime(300),
          distinctUntilChanged(),
          switchMap(value => {
            const normalizedValue = (value || '').toLowerCase();

            // Envía el valor del filtro al servicio SearchService
            searchServiceCallback(normalizedValue);

            // Utiliza directamente el método correspondiente
            switch (apiParam) {
              case 'title':
                return this.service.getAllGames();
              case 'genre':
                return this.service.getFilterGenre(normalizedValue);
              case 'platform':
                return this.service.getFilterPlatform(normalizedValue);
              default:
                return this.service.getAllGames();
            }
          }),
          map(response => this.extractGamesFromResponse(response))
        )
        .subscribe(filteredGames => {
          this.games = filteredGames;
        });
    }
  }

  extractGamesFromResponse(response: any): any[] {
    if (response && response.games) {
      return response.games;
    } else if (Array.isArray(response)) {
      return response;
    } else {
      return [];
    }
  }
}
