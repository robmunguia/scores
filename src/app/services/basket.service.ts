import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { basketLeagues } from '../models/basket/league.model';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  urlRoot: string = 'https://api-basketball.p.rapidapi.com/';
  // urlRoot: string = 'https://v1.basketball.api-sports.io/';
  timeZone: string = environment.timeZone;

  constructor(private http: HttpClient) { }

  getCountries() {
    const url: string = this.urlRoot + 'countries';
    return this.http.get(url);
  }

  getLeagues() {
    // const url: string = this.urlRoot + 'leagues?country_id=' + countryId;
    const url: string = this.urlRoot + 'leagues';
    return this.http.get(url);
  }
  getLeagueById( leagueId: string ) {
    // const url: string = this.urlRoot + 'leagues?country_id=' + countryId;
    const url: string = this.urlRoot + 'leagues?id=' + leagueId;
    return this.http.get(url);
  }

  getGames( league: basketLeagues ) {
    const url: string = `${this.urlRoot}games?season=${league.currentSeason}&&timezone=${this.timeZone}&league=${league.id}`;
    return this.http.get( url );
  }
  getCurrentGames( date: string ) {
    const url: string = `${this.urlRoot}games?&timezone=${this.timeZone}&date=${date}`;
    return this.http.get( url );
  }
}
