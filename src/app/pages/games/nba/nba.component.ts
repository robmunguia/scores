import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { NbaService } from '../../../services/nba.service';
import { BasketUtil } from '../game.util';
import { BasketGames } from '../../../models/games.model';

@Component({
  selector: 'app-nba',
  templateUrl: './nba.component.html',
  styleUrls: ['./nba.component.css']
})
export class NbaComponent implements OnInit {

  monthGames: any[];
  games: BasketGames[];
  divider: number = 5;
  actualDate: Date = new Date(2020, 2, 10);
  dateGames = moment(this.actualDate).format('yyyy-MM-DD');
  maxDate = moment(this.actualDate, "DD-MM-YYYY").add(2, 'days').format('yyyy-MM-DD');
  midDate = moment(this.actualDate, "DD-MM-YYYY").add(1, 'days').format('MMM DD');
  endDate = moment(this.actualDate, "DD-MM-YYYY").add(2, 'days').format('MMM DD');
  selectedDate: string = 'TODAY';

  constructor(private dataService: NbaService) {
  }

  ngOnInit() {
    this.getGames();
  }

  getGames() {
    this.dataService.getTodayGames( this.maxDate )
    .subscribe((resp: any) => {
      this.monthGames = resp.result;
      const _date = moment('2020-03-06').format('yyyy-MM-DD');
      this.games = resp.result.filter(g => g.event_date === _date);
      this.analize();
    });
  }

  analize() {
    this.games.forEach(item => {
      BasketUtil.getLastGames( item.home_team_key, true, item, this.monthGames, this.dateGames, this.divider );
      BasketUtil.getLastGames( item.away_team_key, false, item, this.monthGames, this.dateGames, this.divider );
    });
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

}
