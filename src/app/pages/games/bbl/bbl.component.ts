import { Component, OnInit } from '@angular/core';
import { BasketService } from '../../../services/basket.service';
import * as moment from 'moment';
import { basketCountry, basketLeagues, basketGames } from '../../../models/basket/league.model';
import { BasketUtil } from '../basket.util';

@Component({
  selector: 'app-bbl',
  templateUrl: './bbl.component.html',
  styleUrls: ['./bbl.component.css']
})
export class BblComponent implements OnInit {

  // dates
  actualDate: Date = new Date();
  dateGames = moment(this.actualDate).format('yyyy-MM-DD');
  maxDate = moment(this.actualDate, "DD-MM-YYYY").add(2, 'days').format('yyyy-MM-DD');
  midDate = moment(this.actualDate, "DD-MM-YYYY").add(1, 'days').format('MMM DD');
  endDate = moment(this.actualDate, "DD-MM-YYYY").add(2, 'days').format('MMM DD');
  selectedDate: string = 'TODAY';

  // filters
  payment: string = '';
  countries: basketCountry[] = null;
  leagues: basketLeagues[] = null;
  countryLeagues: basketLeagues[] = null;
  countryId: number = 1;
  league: basketLeagues;
  leagueId: number;
  activeLeague: boolean = false;

  // games
  games: basketGames[];
  currentGames: basketGames[];
  currentDate: Date = new Date();

  constructor(private basketservices: BasketService) {
    this.getCountries();
    this.getLeagues();
  }

  ngOnInit() {
  }

  getCountries() {
    this.basketservices.getCountries()
    .subscribe((data: any) => {
      this.countries = data.response;
    });
  }
  getLeagues() {
    this.basketservices.getLeagues()
    .subscribe((data: any) => {
      this.leagues = data.response;
      this.getLeagueByCountry();
    });
  }

  getLeagueByCountry() {
    this.countryLeagues = null;
    this.countryLeagues = this.leagues.filter(l => l.country.id === Number(this.countryId));
    this.league = this.countryLeagues[0];
    this.leagueId = this.league.id;
    this.isLeagueActive();
  }

  leagueChange() {
    this.league = this.countryLeagues.filter(l => l.id === Number(this.leagueId))[0];
    this.isLeagueActive();
  }

  isLeagueActive() {
    this.activeLeague = false;
    if (this.league) {
      const season = this.league.seasons.filter(s =>
        moment(new Date()).format('yyyy-MM-DD') >= moment(s.start).format('yyyy-MM-DD')
        && moment(new Date()).format('yyyy-MM-DD') <= moment(s.end).format('yyyy-MM-DD')
        )[0];
      if ( season ) {
        this.activeLeague = true;
        this.league.currentSeason = season.season;
      }
    }
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

  head2head( game: any ) {
  }

}
