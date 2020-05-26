import { Component, OnInit } from '@angular/core';
import { SportDataService } from '../../services/service.index';
import { Games } from '../../models/games.model';
import { Team } from '../../models/teams.model';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  games: Games[] = null;
  schedules: Games[] = null;
  teams: Team[] = null;
  divider: number = 5;
  // variable
  loading: boolean = false;
  date: Date = new Date();
  valueDay = 0;
  gameId = 0;
  // homeScore: number = 0;
  homeGames: Games[] = [];
  awayGames: Games[] = [];

  constructor(public dataService: SportDataService) {
    this.getShedules();
  }

  ngOnInit() {
    this.getTeams();
    this.getGames();
  }

  changeDate( x: number ) {
    this.valueDay = x;
    this.date = new Date();
    if (this.valueDay === -1 ) {
      this.date.setDate(this.date.getDate() - 1);
    } else {
      this.date.setDate(this.date.getDate() + 1);
    }
  }

  displayDate( x: number ): string {
    const date = new Date();
    if (x === -1 ) {
      date.setDate(date.getDate() - 1);
    } else if (x === 1 ) {
      date.setDate(date.getDate() + 1);
    }
    return `${this.dataService.getFormatMonth( date.getMonth() )} ${this.dataService.getFormatDay(date)}`;
  }

  getTeam( id: number ): Team {
    if ( this.teams ) {
      return this.teams.filter( t => t.TeamID === id)[0];
    }
  }

  getShedules() {
    this.loading = true;
    this.schedules = JSON.parse(localStorage.getItem('schedules'));
    if ( !localStorage.getItem('schedules') ) {
      this.dataService.getSchedules()
      .subscribe((data: Games[]) => {
        this.loading = false;
        this.schedules = data;
        // this.calculateAll();
      });
    }
  }

  calculate(game: Games) {
    this.homeGames = [];
    this.awayGames = [];
    game.resultHome = 0;
    game.resultAway = 0;
    this.analyzeGames(game, game.HomeTeamID, true );
    this.analyzeGames(game, game.AwayTeamID, false );
  }

  calculateAll() {
    // this.games.forEach((item) => {
    //   item.resultHome = this.analyzeGames( item.HomeTeamID );
    //   item.resultAway = this.analyzeGames( item.AwayTeamID );
    // });
  }

  getTeams() {
    // if is empty, storage the data in local storage
    this.teams = JSON.parse(localStorage.getItem('teams'));
    if ( !localStorage.getItem('teams')) {
      this.dataService.getTeams()
      .subscribe((resp: Team[]) => {
        this.teams = resp;
        localStorage.setItem('teams', JSON.stringify(this.teams));
      });
    }
  }

  getGames() {
    // if is empty, storage the data in local storage
    this.games = JSON.parse(localStorage.getItem('games'));
    if ( !localStorage.getItem('games') ) {
      this.dataService.getGamesDay(this.date)
      .subscribe((resp: Games[]) => {
        this.games = resp;
        localStorage.setItem('games', JSON.stringify(this.games));
      });
    }
  }

  analyzeGames(game: Games, teamId: number, home: boolean ) {
    const homeGames: Games[] = [];
    for ( const item of this.schedules.filter( g => g.HomeTeamID === teamId && g.IsClosed)) {
      homeGames.push( item );
    }
    for ( const item of this.schedules.filter( g => g.AwayTeamID === teamId && g.IsClosed)) {
      homeGames.push( item );
    }
    homeGames.sort( ( a, b ) => {
      const dateA: any = new Date(a.DateTime);
      const dateB: any = new Date(b.DateTime);
      return dateB - dateA;
    });
    for ( let i = 0; i < this.divider; i++ ) {
      this.gameId = homeGames[i].GameId;
      const gameDate = new Date(homeGames[i].DateTime);
      this.getGameScore(game, gameDate, teamId, home );
    }
  }

  getGameScore(game: Games, gameDate: Date, teamId: number, isHome: boolean ) {
    return new Promise<Games[]>( resolve => {
      this.dataService.getGamesDayPeriods( new Date(gameDate) )
      .subscribe((resp: Games[]) => {
        const home: Games = resp.filter(g => g.HomeTeamID === teamId)[0];
        const away: Games = resp.filter(g => g.AwayTeamID === teamId)[0];
        // Totals scores
        if ( home ) {
          home.Periods.forEach(item => {
            if ( item.Name === '1' || item.Name === '2') {
              if (isHome) {
                game.resultHome += item.HomeScore;
              } else {
                game.resultAway += item.HomeScore;
              }
            }
          });
        } else if ( away ) {
          away.Periods.forEach(item => {
            if ( item.Name === '1' || item.Name === '2') {
              if ( isHome ) {
                game.resultHome += item.AwayScore;
              } else {
                game.resultAway += item.AwayScore;
              }
            }
          });
        }
        // push history games
        this.pushGame( isHome, home ? home : away);
      });
    });
  }

  pushGame( isHome: boolean, game: Games) {
    if (isHome) {
      this.homeGames.push( game );
    } else {
      this.awayGames.push( game );      
    }
  }

}
