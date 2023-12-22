import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = `${environment.apiUrl}/games`;
  private urlDetails = `${environment.apiUrl}/game`;

  constructor(private httpClient: HttpClient) { }

  private buildUrlWithParams(url: string, params?: { [key: string]: string }): string {
    if (params) {
      const queryParams = Object.entries(params)
        .filter(([_, value]) => !!value)
        .map(([key, value]) => `${key}=${value}`)
        .join('&');
      return `${url}?${queryParams}`;
    }
    return url;
  }

  getAllGames(): Observable<any> {
    return this.httpClient.get(this.baseUrl);
  }

  getFilterGenre(genre: string): Observable<any> {
    const params = { category: genre };
    const url = this.buildUrlWithParams(this.baseUrl, params);
    return this.httpClient.get(url);
  }

  getFilterPlatform(platform: string): Observable<any> {
    const params = { platform };
    const url = this.buildUrlWithParams(this.baseUrl, params);
    return this.httpClient.get(url);
  }

  getDetailsGame(id: string): Observable<any> {
    const params = { id };
    const url = this.buildUrlWithParams(this.urlDetails, params);
    return this.httpClient.get(url);
  }
}
