import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';


@Component({
  selector: 'app-game-details',
  standalone: true,
  imports: [],
  templateUrl: './game-details.component.html',
  styleUrl: './game-details.component.css'
})
export class GameDetailsComponent implements OnInit {
  gameId: any;
  gameDetails: any = {};

  constructor(private route: ActivatedRoute, private service: ApiService) { }

  ngOnInit() {
    this.gameId = this.route.snapshot.paramMap.get('id');
    this.getGameDetails();
  }

  getGameDetails() {
    this.service.getDetailsGame(this.gameId)
      .subscribe(details => {
        this.gameDetails = details;
      });
  }
}
