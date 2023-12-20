import { Component } from '@angular/core';
//import { CallApiService } from '../../services/call-api.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-list-games',
  standalone: true,
  imports: [],
  templateUrl: './list-games.component.html',
  styleUrl: './list-games.component.css'
})
export class ListGamesComponent {
  games: any;

  constructor(private service: ApiService) {}

  ngOnInit() {
    // Llama al método del servicio para obtener la lista de juegos
    /*this.callApiService.getAllGames().subscribe((data) => {
      this.games = data;
    });*/
    this.service.getAllGames()
    .subscribe(response => {
      this.games = response;
    });
  }
}
