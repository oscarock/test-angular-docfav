import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchNameSource = new BehaviorSubject<string>('');
  currentSearchName = this.searchNameSource.asObservable();

  private searchGenreSource = new BehaviorSubject<string>('');
  currentSearchGenre = this.searchGenreSource.asObservable();

  changeSearchName(searchName: string) {
    this.searchNameSource.next(searchName);
  }

  changeSearchGenre(searchGenre: string) {
    this.searchGenreSource.next(searchGenre);
  }
}