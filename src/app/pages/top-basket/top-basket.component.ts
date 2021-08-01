import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { basketGames, basketLeagues } from '../../models/basket/league.model';
import { BasketService } from '../../services/basket.service';
import { BasketUtil } from '../games/basket.util';

@Component({
  selector: 'app-top-basket',
  templateUrl: './top-basket.component.html',
  styleUrls: ['./top-basket.component.css']
})
export class TopBasketComponent implements OnInit {

  // dates
  actualDate: Date = new Date('2021-02-19');
  dateGames = moment(this.actualDate).format('yyyy-MM-DD');
  maxDate = moment(this.actualDate, "DD-MM-YYYY").add(2, 'days').format('yyyy-MM-DD');
  midDate = moment(this.actualDate, "DD-MM-YYYY").add(1, 'days').format('MMM DD');
  endDate = moment(this.actualDate, "DD-MM-YYYY").add(2, 'days').format('MMM DD');
  selectedDate: string = 'TODAY';

  // filters
  payment: string = '';
  league: basketLeagues;

  // games
  games: basketGames[];
  currentGames: basketGames[];
  currentDate: Date = new Date('2021-02-19');

  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
    // NCAAB 116
    this.getLeague();
  }

  getLeague() {
    this.basketService.getLeagueById( '116' )
    .subscribe((data: any) => {
      this.league = data.response[0];
      this.isLeagueActive();
    });
  }

  isLeagueActive() {
    if (this.league) {
      const season = this.league.seasons[1];
      if ( season ) {
        this.league.currentSeason = season.season;
        this.getGames();
      }
    }
  }

  getGames() {
    this.basketService.getGames( this.league )
    .subscribe((data: any) => {
      this.games = data.response;
      this.selectedDate = 'TODAY';
      // get the current games
      this.currentGames = this.games.filter(x => moment(this.currentDate).format('yyyy-MM-DD') === moment(new Date(x.date)).format('yyyy-MM-DD'));
      this.analize();
    });
  }

  analize() {
    this.currentGames.forEach( game => {
      this.avgGames( game, true );
      this.avgGames( game, false );
    });
  }

  avgGames( game: basketGames, isHome: boolean ) {
    BasketUtil.avgGames( game, isHome, this.games );
  }

  changeDate( addDays: number ) {
    switch ( addDays ) {
      case 0:
        this.selectedDate = 'TODAY';
        // get games
        this.currentGames = [];
        this.currentGames = this.games.filter(g => moment(g.date).format('yyyy-MM-DD') === this.dateGames);
        this.analize();
        break;
      default:
        const realDate = moment(this.actualDate, "DD-MM-YYYY").add(addDays, 'days').format('yyyy-MM-DD');
        this.selectedDate = moment(this.actualDate, "DD-MM-YYYY").add(addDays, 'days').format('MMM DD');
        // get games
        this.currentGames = [];
        this.currentGames = this.games.filter(g => moment(g.date).format('yyyy-MM-DD') === realDate);
        this.analize();
        break;
    }
  }

}
