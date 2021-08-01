import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../../services/countries.service';
import { BasketGames } from '../../../models/games.model';
import * as moment from 'moment';
import { BasketUtil } from '../../games/game.util';

@Component({
  selector: 'app-filter-country',
  templateUrl: './filter-country.component.html',
  styleUrls: ['./filter-country.component.css']
})
export class FilterCountryComponent implements OnInit {

  // filters
  payment: string = '';
  countries: Data[] = null;
  leagues: Leagues[] = null;
  country: string = '254';
  leagueId: string = '';
  // analize
  monthGames: any[];
  games: BasketGames[];
  divider: number = 5;
  actualDate: Date = new Date();
  dateGames = moment(this.actualDate).format('yyyy-MM-DD');
  maxDate = moment(this.actualDate, "DD-MM-YYYY").add(2, 'days').format('yyyy-MM-DD');
  midDate = moment(this.actualDate, "DD-MM-YYYY").add(1, 'days').format('MMM DD');
  endDate = moment(this.actualDate, "DD-MM-YYYY").add(2, 'days').format('MMM DD');
  selectedDate: string = 'TODAY';

  constructor(private allServices: CountriesService) { }

  ngOnInit() {
    this.getCountries();
  }

  getCountries() {
    this.allServices.getCountries()
    .subscribe((resp: any) => {
      this.countries = resp.result;
      this.getLeagues( );
    });
  }

  getLeagues( ) {
    this.allServices.getLeagues( this.country )
    .subscribe((resp: any) => {
      this.leagues = resp.result;
      this.leagueId = this.leagues[0].league_key;
    })
  }

  changeCountry( ) {
    this.getLeagues();
  }

  // analize basket ball games
  getGames() {
    this.allServices.getTodayGames( this.leagueId, this.maxDate )
    .subscribe((resp: any) => {

      if (resp.error === "1") {
        this.payment = 'Please make the payment for your account'; 
      } else {
        this.monthGames = resp.result;
        this.games = resp.result.filter(g => g.event_date === this.dateGames);
        this.analize();
      }
    });
  }

  analize() {
    this.games.forEach(item => {
      BasketUtil.getLastGames( item.home_team_key, true, item, this.monthGames, this.dateGames, this.divider );
      BasketUtil.getLastGames( item.away_team_key, false, item, this.monthGames, this.dateGames, this.divider );
      //this.getOdds( item.event_key );
    });
  }

  head2head( game: BasketGames ) {
    this.allServices.getHeadToHead( game.home_team_key, game.away_team_key )
    .subscribe((res: any) => {
      game.h2hGames = res.result.H2H;
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

  getOdds( gameId: string ) {
    this.allServices.getOdds( gameId )
    .subscribe((data: any) => {
      console.log(data);
    });
  }

}

interface Data {
  country_key: string,
  country_name: string
}

interface Leagues { 
  league_key: string,
  league_name: string,
  country_key: string,
  country_name: string
}
