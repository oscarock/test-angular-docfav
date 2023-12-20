import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private url = 'https://www.freetogame.com/api/games';

  constructor(private httpClient: HttpClient) { }

  getAllGames(){
    return this.httpClient.get(this.url);
  }

}