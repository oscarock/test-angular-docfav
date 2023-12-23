import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormFiltersComponent } from '../form-filters/form-filters.component';
import { SearchService } from '../../services/search.service';
import { map, switchMap, distinctUntilChanged, takeUntil, startWith } from 'rxjs/operators';
import { RouterModule } from '@angular/router';
import { Subject, Observable, combineLatest, of } from 'rxjs';

@Component({
  selector: 'app-list-games',
  standalone: true,
  imports: [FormFiltersComponent,RouterModule],
  templateUrl: './list-games.component.html',
  styleUrl: './list-games.component.css',
})
export class ListGamesComponent implements OnInit, OnDestroy {
  games: any;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private service: ApiService, private searchService: SearchService) {}

  ngOnInit() {
    this.subscribeToSearchChanges('currentSearchName', 'title');
    this.subscribeToSearchChanges('currentSearchGenre', 'genre');
    this.subscribeToSearchChanges('currentSearchPlatform', 'platform');
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private subscribeToSearchChanges(searchType: string, propertyName: string) {
    const searchService = this.searchService as any;
    searchService[searchType].pipe(
      distinctUntilChanged(),
      switchMap((searchValue: string) => {
        if (searchValue) {
          if (propertyName === 'title') {
            return this.loadGames(searchValue);
          } else {
            return this.filterGames(searchValue, propertyName);
          }
        } else {
          return this.loadGames(); // Cargar todos los juegos cuando el valor de búsqueda es vacío
        }
      }),
      takeUntil(this.destroy$)
    ).subscribe((response: any) => {
      this.games = response;
    });
  }

  private loadGames(title?: string): Observable<any> {
    return this.service.getAllGames().pipe(
      map(response => this.extractGamesFromResponse(response)),
      map((games: any[]) => {
        if (title) {
          return games.filter(game => game.title.toLowerCase().includes(title.toLowerCase()));
        }
        return games;
      })
    );
  }

  private filterGames(searchValue: string, propertyName: string): Observable<any> {
    let filterObservable: Observable<any>;

    switch (propertyName) {
      case 'title':
        filterObservable = this.loadGames(); // Llamamos a loadGames para cargar todos los juegos
        break;
      case 'genre':
        filterObservable = this.service.getFilterGenre(searchValue);
        break;
      case 'platform':
        filterObservable = this.service.getFilterPlatform(searchValue);
        break;
      default:
        throw new Error('Nombre de propiedad no válido');
    }

    return filterObservable.pipe(
      map(response => this.extractGamesFromResponse(response as any[]))
    );
  }

  private extractGamesFromResponse(response: any): any[] {
    return response;
  }

  clearSearch(): void {
    this.searchService.changeSearchName('');
  }
}