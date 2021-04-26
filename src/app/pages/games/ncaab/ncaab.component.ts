import { Component, OnInit } from '@angular/core';
import { NCAABService } from '../../../services/ncaab.service';
import * as moment from 'moment';
import { BasketGames } from '../../../models/games.model';
import { BasketService } from '../../../services/basket.service';
import { basketLeagues, basketGames } from '../../../models/basket/league.model';
import { BasketUtil } from '../basket.util';

@Component({
  selector: 'app-ncaab',
  templateUrl: './ncaab.component.html',
  styleUrls: ['./ncaab.component.css']
})
export class NcaabComponent implements OnInit {

  // dates
  actualDate: Date = new Date();
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
  currentDate: Date = new Date();

  constructor(private basketservices: BasketService) {
    this.getLeague();
  }

  getLeague() {
    this.basketservices.getLeagueById( '116' )
    .subscribe((data: any) => {
      this.league = data.response[0];
      this.isLeagueActive();
    });
  }

  isLeagueActive() {
    if (this.league) {
      const season = this.league.seasons.filter(s =>
        moment(new Date()).format('yyyy-MM-DD') >= moment(s.start).format('yyyy-MM-DD')
        && moment(new Date()).format('yyyy-MM-DD') <= moment(s.end).format('yyyy-MM-DD')
        )[0];
      if ( season ) {
        this.league.currentSeason = season.season;
        this.getGames();
      }
    }
  }

  ngOnInit() {
  }

  getGames() {
    this.basketservices.getGames( this.league )
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

  head2head( game: BasketGames ) {
    // this.dataService.getHeadToHead( game.home_team_key, game.away_team_key )
    // .subscribe((res: any) => {
    //   game.h2hGames = res.result.H2H;
    // });
  }

}
