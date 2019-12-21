import { Component, OnInit } from '@angular/core';
import { SportDataService } from '../../services/service.index';
import { Games } from '../../models/games.model';
import { Team } from '../../models/teams.model';
import { Periods } from '../../models/periods.model';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  games: Games[] = null;
  schedules: Games[] = null;
  teams: Team[] = null;
  // variable
  date: Date = new Date();
  valueDay = 0;
  gameId = 0;

  constructor(public dataService: SportDataService) {
    // this.getShedules();
  }

  ngOnInit() {
    this.getTeams();
    this.getGames();
    this.getShedules();
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
    this.schedules = JSON.parse(localStorage.getItem('schedules'));
    if ( !localStorage.getItem('schedules') ) {
      this.dataService.getSchedules()
      .subscribe((data: Games[]) => {
        this.schedules = data;
        // localStorage.setItem('schedules', JSON.stringify(this.schedules));
        // console.log(this.schedules);
      });
    }
  }

  getTeams() {
    // if is empty, storage the data in local storage
    this.teams = JSON.parse(localStorage.getItem('teams'));
    if ( !localStorage.getItem('teams')) {
      this.dataService.getTeams()
      .subscribe((resp: Team[]) => {
        this.teams = resp;
        localStorage.setItem('teams', JSON.stringify(this.teams));
        console.log(this.teams);
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
        console.log(this.games);
      });
    }
  }

  async getGameScore( game: Games ): Promise<Games[]> {
    game.HomeTeamScore = 0;
    game.AwayTeamScore = 0;

    return new Promise<Games[]>( resolve => {
      this.dataService.getGamesDay( new Date(game.DateTime) )
      .subscribe((resp: Games[]) => {
        resolve(resp);
      });
    });

  }

  async calculateGame( homeTeam: number, awayTeam: number ): Promise<boolean> {
    // Home Team calc
    const homeGames: Games[] = [];
    for ( const item of this.schedules.filter( g => g.HomeTeamID === homeTeam && g.IsClosed)) {
      homeGames.push( item );
    }
    for ( const item of this.schedules.filter( g => g.AwayTeamID === homeTeam && g.IsClosed)) {
      homeGames.push( item );
    }
    homeGames.sort( ( a, b ) => {
      const dateA: any = new Date(a.DateTime);
      const dateB: any = new Date(b.DateTime);
      return dateB - dateA;
    });
    console.log(homeGames);
    for ( let i = 0; i < 5; i++ ) {
      this.gameId = homeGames[i].GameId;
      console.log(this.gameId);
      this.getPeriods( homeGames[i] );
      // let juegos: Games[] = [];
      // juegos = await this.getGameScore( homeGames[i] );
      // console.log(juegos);
      // if ( juegos !== null) {
      //   console.log(homeGames[i]);
      //   const gameScore: any = juegos.filter( g => g.GameId === this.gameId )[0];
      //   console.log(gameScore);
      //   homeGames[i].Periods = gameScore.Periods;
      // }
      // for (const p of gameScore.Periods) {
      //   if (p.Name === '1' || p.Name === '2') {
      //     game.HomeTeamScore += p.HomeScore;
      //     game.AwayTeamScore += p.AwayScore;
      //     // console.log(p.HomeScore);
      //     // console.log(p.AwayScore);
      //   }
      // }
      // console.log(homeGames[i]);
    }

    return new Promise( resolve => {
      resolve(true);
    });
  }

  async getPeriods( game: Games ) {
    console.log(this.gameId);
    let juegos: Games[] = [];
    juegos = await this.getGameScore( game );
    console.log(juegos);

  }

}
