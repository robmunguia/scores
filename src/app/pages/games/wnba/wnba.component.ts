import { Component, OnInit } from '@angular/core';
import { WnbaService } from '../../../services/wnba.service';
import { WNBAGames } from '../../../models/wnba-games';


@Component({
  selector: 'app-wnba',
  templateUrl: './wnba.component.html',
  styleUrls: ['./wnba.component.css']
})
export class WnbaComponent implements OnInit {

  day: Date = new Date(2019, 8 - 1, 1);
  divider = 5;
  games: WNBAGames[] = null;
  historical = null;

  homeScore: number = 0;
  awayScore: number = 0;

  constructor(private wnbaService: WnbaService) {
    this.getGames();
  }

  ngOnInit() {
  }

  getGames() {
    this.wnbaService.getGames( this.day )
    .subscribe((resp: any) => {
      this.games = resp.games;
      console.log(this.games);
      this.delay( 800 );
    });
  }

  getHistorical() {
    this.wnbaService.getHistorical( '2019' )
    .subscribe((resp: any) => {
      this.historical = resp.games;
      this.calculateGames();
    });
  }

  async delay( ms: number ) {
    await new Promise(resolve => setTimeout(()=>resolve(), ms)).then(()=> {
      this.getHistorical();
    });
  }

  // analize
  calculateGames() {
    // debug mode
    // this.analyzeGames( this.games[0] );

    this.games.forEach(item => {
      this.analyzeGames( item );
    });
  }

  analyzeGames( game: WNBAGames ) {
    this.getLastGames( game.home.id, game, true );
    this.getLastGames( game.away.id, game, false );
  }

  getLastGames( teamId: string, game: WNBAGames, isHome: boolean ) {
    const totalGames: WNBAGames[] = [];
    for ( const item of this.historical.filter( g => g.home.id === teamId && g.status === 'closed' && new Date(g.scheduled) < this.day )) {
      totalGames.push( item );
    }
    for ( const item of this.historical.filter( g => g.away.id === teamId && g.status === 'closed' && new Date(g.scheduled) < this.day)) {
      totalGames.push( item );
    }
    console.log(totalGames);
    totalGames.sort( ( a, b ) => {
      const dateA: any = new Date(a.scheduled);
      const dateB: any = new Date(b.scheduled);
      return dateB - dateA;
    });
    for ( let i = 0; i < this.divider; i++ ) {
      if ( game.resultHome === undefined)
      game.resultHome = 0;
      if ( game.resultAway === undefined)
        game.resultAway = 0;
      this.getGameScore( totalGames[i], teamId, game, isHome );
    }
  }

  getGameScore(game: any, teamId: string, localGame: WNBAGames, isHome: boolean ) {
    if ( game.home.id === teamId ) {
      if ( isHome ) {
        localGame.resultHome += game.home_points;
      } else {
        localGame.resultAway += game.home_points;
      }
    } else if ( game.away.id === teamId ) {
      if ( isHome ) {
        localGame.resultHome += game.away_points;
      } else {
        localGame.resultAway += game.away_points;
      }
    }
  }

}
