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

  getGameScore( date: Date, gameID: number ) {
    this.dataService.getGamesDay( date )
    .subscribe((resp: Games[]) => {
      const periods: Periods = resp.filter( g => g.GameId === gameID )[0].Periods;
      console.log(periods);
    });
  }

  calculateGame( homeTeam: number, awayTeam: number ) {
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
    for ( const g of homeGames.slice(-5) ) {
      this.getGameScore( new Date(g.DateTime), g.GameId );
    }
    console.log(homeGames);
  }

}
