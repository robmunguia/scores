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
  loading: boolean = false;
  date: Date = new Date();
  valueDay = 0;
  gameId: string = '';

  constructor(public dataService: SportDataService) {
    this.getShedules();
  }

  ngOnInit() {
    this.getTeams();
    this.getGames();
    // this.getShedules();
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
      .subscribe((data: any) => {
        this.loading = false;
        this.schedules = data.games;
        console.log(data.games);
        this.calculateAll();
      }, (err) => {
        console.log(err)
      });
    }
  }

  calculateAll() {
    this.games.forEach((item) => {
      item.resultHome = this.analyzeGames( item.home.id );
      item.resultAway = this.analyzeGames( item.away.id );
    });
    console.log(this.games);
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
      .subscribe((resp: any) => {
        this.games = resp.games;
        localStorage.setItem('games', JSON.stringify(this.games));
      }, (err) => {
        console.log(err)
      });
    }
  }

  analyzeGames( teamId: string ): number {
    const homeGames: Games[] = [];
    for ( const item of this.schedules.filter( g => g.home.id === teamId && g.status === 'closed')) {
      homeGames.push( item );
    }
    for ( const item of this.schedules.filter( g => g.away.id === teamId && g.status === 'closed')) {
      homeGames.push( item );
    }
    homeGames.sort( ( a, b ) => {
      const dateA: any = new Date(a.scheduled);
      const dateB: any = new Date(b.scheduled);
      return dateB - dateA;
    });
    let totalScores = 0;
    for ( let i = 0; i < 5; i++ ) {
      this.gameId = homeGames[i].id;
      if (homeGames[i].home.id === teamId) {
        totalScores += homeGames[i].home_points;
      } else {
        totalScores += homeGames[i].away_points;
      }
    }
    return totalScores / 5;
  }

}
