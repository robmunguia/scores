import { Component, OnInit } from '@angular/core';
import { BasketGames } from '../../models/games.model';
import { BblService } from '../../services/bbl.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  games: BasketGames[];

  constructor(private bblService: BblService) {
  }

  ngOnInit() {
  }

  head2head( game: BasketGames ) {
    this.bblService.getHeadToHead( game.home_team_key, game.away_team_key )
    .subscribe((res: any) => {
      console.log(res);
      game.h2hGames = res.result.H2H;
    });
  }

}
