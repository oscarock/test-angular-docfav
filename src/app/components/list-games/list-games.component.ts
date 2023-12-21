import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormFiltersComponent } from '../form-filters/form-filters.component';
import { SearchService } from '../../services/search.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-list-games',
  standalone: true,
  imports: [FormFiltersComponent],
  templateUrl: './list-games.component.html',
  styleUrl: './list-games.component.css'
})
export class ListGamesComponent {
  games: any;

  constructor(private service: ApiService, private searchService: SearchService) {}

  ngOnInit() {
    this.service.getAllGames()
    .pipe(
      map(response => this.extractGamesFromResponse(response))
    )
    .subscribe(response => {
      this.games = response;
      this.searchService.currentSearchName.subscribe(searchName => {
        // Si searchName está presente, filtra los juegos
        if (searchName) {
          this.games = response.filter(game =>
            game.title.toLowerCase().includes(searchName)
          );
        } else {
          // Si searchName está vacío, muestra todos los juegos
          this.games = response;
        }
      });
    });

    this.searchService.currentSearchGenre.subscribe(searchGenre => {
      this.service.getFilterGenre(searchGenre)
      .pipe(
        map(response => this.extractGamesFromResponse(response))
      )
      .subscribe(response => {
        this.games = response;
        if (searchGenre) {
          this.games = response.filter(game =>
            game.genre.toLowerCase().includes(searchGenre)
          );
        } else {
          // Si searchGenre está vacío, muestra todos los juegos
          this.games = response;
        }
      });
    });
  }

  private extractGamesFromResponse(response: any): any[] {
    return response;
  }
}
