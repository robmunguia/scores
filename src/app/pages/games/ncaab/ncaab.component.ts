import { Component, OnInit } from '@angular/core';
import { NCAABService } from '../../../services/ncaab.service';
import * as moment from 'moment';
import { BasketUtil } from '../game.util';
import { BasketGames } from '../../../models/games.model';

@Component({
  selector: 'app-ncaab',
  templateUrl: './ncaab.component.html',
  styleUrls: ['./ncaab.component.css']
})
export class NcaabComponent implements OnInit {

  monthGames: any[];
  games: BasketGames[];
  divider: number = 5;
  actualDate: Date = new Date();
  dateGames = moment(this.actualDate).format('yyyy-MM-DD');
  maxDate = moment(this.actualDate, "DD-MM-YYYY").add(2, 'days').format('yyyy-MM-DD');
  midDate = moment(this.actualDate, "DD-MM-YYYY").add(1, 'days').format('MMM DD');
  endDate = moment(this.actualDate, "DD-MM-YYYY").add(2, 'days').format('MMM DD');
  selectedDate: string = 'TODAY';
  payment: string = '';

  constructor(public dataService: NCAABService) { }

  ngOnInit() {
    this.getGames();
  }

  getGames() {
    this.dataService.getTodayGames( this.maxDate )
    .subscribe((resp: any) => {
      if (resp.error === '1') {
        this.payment = 'Please make the payment for your account';
      } else {
        this.monthGames = resp.result;
        this.games = resp.result.filter(g => g.event_date === this.dateGames);
        this.analize();
      }
    })
  }

  analize() {
    this.games.forEach(item => {
      const _aDate = moment(new Date()).format('yyyy-MM-DD');
      const _gDate = new Date(item.event_date);
      if ( this.compareDate(this.actualDate, _gDate) ) {
        BasketUtil.getLastGames( item.home_team_key, true, item, this.monthGames, this.dateGames, this.divider );
        BasketUtil.getLastGames( item.away_team_key, false, item, this.monthGames, this.dateGames, this.divider );
      }
    });
  }

  compareDate(date1: Date, date2: Date): number {
    // With Date object we can compare dates them using the >, <, <= or >=.
    // The ==, !=, ===, and !== operators require to use date.getTime(),
    // so we need to create a new instance of Date with 'new Date()'
    let d1 = new Date(date1); let d2 = new Date(date2);
    // Check if the dates are equal
    let same = d1.getTime() === d2.getTime();
    if (same) return 0;
    // Check if the first is greater than second
    if (d1 > d2) return 1;  
    // Check if the first is less than second
    if (d1 < d2) return -1;
  }

  changeDate( addDays: number ) {
    switch ( addDays ) {
      case 0:
        this.selectedDate = 'TODAY';
        // get games
        this.games = [];
        this.games = this.monthGames.filter(g => g.event_date === this.dateGames);
        this.analize();
        break;
      default:
        const realDate = moment(this.actualDate, "DD-MM-YYYY").add(addDays, 'days').format('yyyy-MM-DD');
        this.selectedDate = moment(this.actualDate, "DD-MM-YYYY").add(addDays, 'days').format('MMM DD');
        // get games
        this.games = [];
        this.games = this.monthGames.filter(g => g.event_date === realDate);
        this.analize();
        break;
    }
  }

  head2head( game: BasketGames ) {
    this.dataService.getHeadToHead( game.home_team_key, game.away_team_key )
    .subscribe((res: any) => {
      console.log(res);
      game.h2hGames = res.result.H2H;
    });
  }

}
