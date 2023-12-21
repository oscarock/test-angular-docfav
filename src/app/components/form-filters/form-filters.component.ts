import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { SearchService } from '../../services/search.service';


@Component({
  selector: 'app-form-filters',
  standalone: true,
  imports: [ReactiveFormsModule, ],
  templateUrl: './form-filters.component.html',
  styleUrl: './form-filters.component.css'
})
export class FormFiltersComponent {
  games:any;

  constructor(private service: ApiService, private searchService: SearchService) {}

  ngOnInit() {
    this.setupSearchNameChange();
    this.searchGenre()
  }

  filtersForm = new FormGroup({
    searchName: new FormControl(''),
    searchGenre: new FormControl(''),
    searchPlatform: new FormControl(''),
  });

  setupSearchNameChange() {
    const searchNameControl = this.filtersForm.get('searchName');

    if (searchNameControl) {
      searchNameControl.valueChanges
        .pipe(
          debounceTime(300),
          distinctUntilChanged(),
          switchMap(searchName => {
            const normalizedSearchName = (searchName || '').toLowerCase();

            // Envía el valor del filtro al servicio SearchService
            this.searchService.changeSearchName(normalizedSearchName);

            return this.service.getAllGames().pipe(
              map(response => this.extractGamesFromResponse(response)),
              map(gamesArray => gamesArray.filter(game =>
                game.title.toLowerCase().includes(normalizedSearchName)
              ))
            );
          })
        )
        .subscribe(filteredGames => {
          this.games = filteredGames;
        });
    }
  }

  searchGenre() {
    const searchGenreControl = this.filtersForm.get('searchGenre');

    if (searchGenreControl) {
      searchGenreControl.valueChanges
        .pipe(
          debounceTime(300),
          distinctUntilChanged(),
          switchMap(searchGenre => {
            const normalizedSearchGenre = (searchGenre || '').toLowerCase();
            console.log(normalizedSearchGenre)

            // Envía el valor del filtro al servicio SearchService
            this.searchService.changeSearchGenre(normalizedSearchGenre);

            return this.service.getFilterGenre(normalizedSearchGenre).pipe(
              map(response => this.extractGamesFromResponse(response)),
              map(gamesArray => gamesArray.filter(game =>
                game.genre.toLowerCase().includes(normalizedSearchGenre)
              ))
            );
          })
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
