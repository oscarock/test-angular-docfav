import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchNameSource = new BehaviorSubject<string>('');
  currentSearchName = this.searchNameSource.asObservable();

  changeSearchName(searchName: string) {
    this.searchNameSource.next(searchName);
  }
}