import { Component, OnInit } from '@angular/core';
import { BblService } from '../../../services/bbl.service';
import * as moment from 'moment';
import { BasketUtil } from '../game.util';
import { BasketGames } from '../../../models/games.model';

@Component({
  selector: 'app-bbl',
  templateUrl: './bbl.component.html',
  styleUrls: ['./bbl.component.css']
})
export class BblComponent implements OnInit {

  monthGames: any[];
  games: BasketGames[];
  divider: number = 5;
  dateGames = moment(new Date()).format('yyyy-MM-DD');
  maxDate = moment(new Date(), "DD-MM-YYYY").add(2, 'days').format('yyyy-MM-DD');
  endDate = moment(new Date(), "DD-MM-YYYY").add(2, 'days').format('MMM DD');
  midDate = moment(new Date(), "DD-MM-YYYY").add(1, 'days').format('MMM DD');
  selectedDate: string = 'TODAY';

  constructor(private bblService: BblService) { }

  ngOnInit() {
    this.getGames();
  }

  getGames() {
    this.maxDate = moment(new Date(), "DD-MM-YYYY").add(2, 'days').format('yyyy-MM-DD');
    this.bblService.getTodayGames( this.maxDate )
    .subscribe((resp: any) => {
      this.monthGames = resp.result;
      this.games = resp.result.filter(g => g.event_date === this.dateGames);
      this.analize();
    });
  }

  analize() {
    this.games = [];
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
        this.games = this.monthGames.filter(g => g.event_date === this.dateGames);
        break;
      default:
        const realDate = moment(new Date(), "DD-MM-YYYY").add(addDays, 'days').format('yyyy-MM-DD');
        this.selectedDate = moment(new Date(), "DD-MM-YYYY").add(addDays, 'days').format('MMM DD');
        // get games
        this.games = [];
        this.games = this.monthGames.filter(g => g.event_date === realDate);
        break;
    }
  }

  head2head( game: BasketGames ) {
    this.bblService.getHeadToHead( game.home_team_key, game.away_team_key )
    .subscribe((res: any) => {
      console.log(res);
      game.h2hGames = res.result.H2H;
    });
  }

}
