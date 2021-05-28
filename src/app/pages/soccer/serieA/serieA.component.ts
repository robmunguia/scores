import { Component, OnInit } from '@angular/core';
import { League, SoccerGames } from 'src/app/models/soccer/league.model';
import { SoccerService } from '../../../services/soccer.service';
import { SoccerUtil } from '../soccer-util';

@Component({
  selector: 'app-premier',
  templateUrl: './serieA.component.html',
  styleUrls: ['./serieA.component.css']
})
export class SerieAComponent implements OnInit {

  serieA: League = { country_id: 62, league_id: 392 };
  games: SoccerGames[];
  currentGames: SoccerGames[];

  constructor(private soccerService: SoccerService) {
    soccerService.getCurrentSeason( this.serieA.league_id )
    .subscribe((result: any) => {
      this.serieA = result.data.filter(x => x.is_current === 1)[0];
      this.getGames();
    });
  }

  ngOnInit() {
  }

  getGames() {
    this.soccerService.getGames( this.serieA )
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
