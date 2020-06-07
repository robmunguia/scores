import { Component, OnInit } from '@angular/core';
import { Games } from '../../../models/games.model';
import { Team } from '../../../models/teams.model';
import { NbaService } from '../../../services/nba.service';

@Component({
  selector: 'app-nba',
  templateUrl: './nba.component.html',
  styleUrls: ['./nba.component.css']
})
export class NbaComponent implements OnInit {

  gamesDate: Date = new Date('2020-03-10');
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

  constructor(private dataService: NbaService) {
    this.getShedules();
  }

  getShedules() {
    this.loading = true;
    this.dataService.getSchedules()
    .subscribe((data: Games[]) => {
      this.loading = false;
      this.schedules = data;
    });
  }

  ngOnInit() {
    this.getTeams();
    this.getGames();
  }

  getTeams() {
    this.dataService.getTeams()
    .subscribe((resp: Team[]) => {
      this.teams = resp;
    });
  }
  getGames() {
    this.dataService.getGamesDay(this.date)
    .subscribe((resp: Games[]) => {
      this.games = resp;
    });
  }
  getTeam( id: number ): Team {
    if ( this.teams ) {
      return this.teams.filter( t => t.TeamID === id)[0];
    }
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
  calculate(game: Games) {
    this.homeGames = [];
    this.awayGames = [];
    game.resultHome = 0;
    game.resultAway = 0;
    this.analyzeGames(game, game.HomeTeamID, true );
    this.analyzeGames(game, game.AwayTeamID, false );
  }

  analyzeGames(game: Games, teamId: number, home: boolean ) {
    const homeGames: Games[] = [];
    for ( const item of this.schedules.filter( g => g.HomeTeamID === teamId && g.IsClosed && new Date(g.DateTime) < this.gamesDate)) {
      homeGames.push( item );
    }
    for ( const item of this.schedules.filter( g => g.AwayTeamID === teamId && g.IsClosed && new Date(g.DateTime) < this.gamesDate)) {
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
          home.Quarters.forEach(item => {
            if ( item.Name === '1' || item.Name === '2' || item.Name === '3' || item.Name === '4') {
              if (isHome) {
                game.resultHome += item.HomeScore;
              } else {
                game.resultAway += item.HomeScore;
              }
            }
          });
        } else if ( away ) {
          away.Quarters.forEach(item => {
            if ( item.Name === '1' || item.Name === '2' || item.Name === '3' || item.Name === '4') {
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
      console.log(this.homeGames);
    } else {
      this.awayGames.push( game );      
    }
  }

}
