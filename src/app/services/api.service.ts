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

  getFilterGenre(genre:string){
    if(genre){
      return this.httpClient.get(this.url + "?category=" + genre);
    }else{
      return this.httpClient.get(this.url);
    }
  }

  getFilterPlatform(platform:string){
    if(platform){
      return this.httpClient.get(this.url + "?platform=" + platform);
    }else{
      return this.httpClient.get(this.url);
    }
  }
}