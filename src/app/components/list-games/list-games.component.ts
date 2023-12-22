import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { SearchService } from '../../services/search.service';
import { map, switchMap } from 'rxjs/operators';
import { ApiServiceMethods } from '../../services/api.service.types';

@Component({
  selector: 'app-list-games',
  templateUrl: './list-games.component.html',
  styleUrls: ['./list-games.component.css']
})
export class ListGamesComponent implements OnInit {
  games: any;

  constructor(
    private service: ApiService,
    private searchService: SearchService
  ) {}

  ngOnInit() {
    this.searchService.currentSearchName
      .pipe(
        switchMap(searchName => this.getFilteredGames('title', searchName))
      )
      .subscribe(response => this.games = response);

    this.searchService.currentSearchGenre
      .pipe(
        switchMap(searchGenre => this.getFilteredGames('genre', searchGenre))
      )
      .subscribe(response => this.games = response);

    this.searchService.currentSearchPlatform
      .pipe(
        switchMap(searchPlatform => this.getFilteredGames('platform', searchPlatform))
      )
      .subscribe(response => this.games = response);
  }

  private getFilteredGames(filterType: string, filterValue: string) {
    const filterMethod = this.getFilterMethod(filterType);

    return (this.service as any)[filterMethod](filterValue)
      .pipe(
        map(response => this.extractGamesFromResponse(response))
      );
  }

  private getFilterMethod(filterType: string): keyof ApiServiceMethods {
    switch (filterType) {
      case 'title':
        return 'getAllGames';
      case 'genre':
        return 'getFilterGenre';
      case 'platform':
        return 'getFilterPlatform';
      default:
        return 'getAllGames';
    }
  }

  private extractGamesFromResponse(response: any): any[] {
    return response;
  }
}
