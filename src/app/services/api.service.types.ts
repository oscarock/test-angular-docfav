import { Observable } from 'rxjs';

export interface ApiServiceMethods {
    getAllGames(): Observable<any>;
    getFilterGenre(genre: string): Observable<any>;
    getFilterPlatform(platform: string): Observable<any>;
    getDetailsGame(id: string): Observable<any>;
}