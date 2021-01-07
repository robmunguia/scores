import { Component, OnInit } from '@angular/core';
import { League, SoccerGames } from '../../../models/soccer/league.model';
import { SoccerService } from '../../../services/soccer.service';
import { SoccerUtil } from '../soccer-util';

@Component({
  selector: 'app-bundesliga',
  templateUrl: './bundesliga.component.html',
  styleUrls: ['./bundesliga.component.css']
})
export class BundesligaComponent implements OnInit {

  bundesliga: League = { country_id: 48, league_id: 314 };
  games: SoccerGames[];
  currentGames: SoccerGames[];

  constructor(private soccerService: SoccerService) {
    soccerService.getCurrentSeason( this.bundesliga.league_id )
    .subscribe((result: any) => {
      this.bundesliga = result.data.filter(x => x.is_current === 1)[0];
      this.getGames();
    });
  }

  ngOnInit() {
  }

  getGames() {
    this.soccerService.getGames( this.bundesliga )
    .subscribe((result: any) => {
      this.games = result.data;
      this.currentGames = result.data.filter(x => x.round.is_current === 1);
      this.currentGames.sort( function( a, b ) {
        return new Date(a.match_start).getTime() - new Date(b.match_start).getTime();
      });
      this.analize();
    });
  }

  analize() {
    this.currentGames.forEach( game => {
      this.avgGames( game, true );
      this.avgGames( game, false );
    });
    console.log(this.currentGames);
  }

  avgGames( game: SoccerGames, isHome: boolean ) {
    SoccerUtil.avgGames( game, isHome, this.games );
  }

}
