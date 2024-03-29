import { Component, OnInit } from '@angular/core';
import { WnbaService } from '../../../services/wnba.service';
import * as moment from 'moment';
import { BasketUtil } from '../game.util';
import { BasketGames } from '../../../models/games.model';

@Component({
  selector: 'app-wnba',
  templateUrl: './wnba.component.html',
  styleUrls: ['./wnba.component.css']
})
export class WnbaComponent implements OnInit {

  monthGames: any[];
  games: BasketGames[];
  divider: number = 5;
  actualDate: Date = new Date();
  dateGames = moment(this.actualDate).format('yyyy-MM-DD');
  maxDate = moment(this.actualDate, "DD-MM-YYYY").add(2, 'days').format('yyyy-MM-DD');
  midDate = moment(this.actualDate, "DD-MM-YYYY").add(1, 'days').format('MMM DD');
  endDate = moment(this.actualDate, "DD-MM-YYYY").add(2, 'days').format('MMM DD');
  selectedDate: string = 'TODAY';

  constructor(private wnbaService: WnbaService) {
  }

  ngOnInit() {
    this.getGames();
  }

  getGames() {
    this.wnbaService.getTodayGames( this.maxDate )
    .subscribe((resp: any) => {
      this.monthGames = resp.result;
      this.games = resp.result.filter(g => g.event_date === this.dateGames);
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
        this.games.filter( g => g.analizeAwayGames = []);
        this.games.filter( g => g.analizeHomeGames = []);
        this.games = [];
        this.games = this.monthGames.filter(g => g.event_date === this.dateGames);
        this.analize();
        break;
      default:
        const realDate = moment(this.actualDate, "DD-MM-YYYY").add(addDays, 'days').format('yyyy-MM-DD');
        this.selectedDate = moment(this.actualDate, "DD-MM-YYYY").add(addDays, 'days').format('MMM DD');
        // get games
        this.games.filter( g => g.analizeAwayGames = []);
        this.games.filter( g => g.analizeHomeGames = []);
        this.games = [];
        this.games = this.monthGames.filter(g => g.event_date === realDate);
        this.analize();
        break;
    }
  }

  head2head( game: BasketGames ) {
    this.wnbaService.getHeadToHead( game.home_team_key, game.away_team_key )
    .subscribe((res: any) => {
      game.h2hGames = res.result.H2H;
    });
  }

}
