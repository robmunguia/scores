import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  apiKey: string = environment.apiKey;
  url: string = 'https://allsportsapi.com/api/basketball/?met=';
  timeZone: string = environment.timeZone;

  constructor(private http: HttpClient) { }

  getCountries() {
    const query: string = `${this.url}Countries&APIkey=${this.apiKey}`;
    return this.http.get(query);
  }

  getLeagues( countryId: string ) {
    const query = `${this.url}Leagues&APIkey=${this.apiKey}&countryId=${countryId}`;
    return this.http.get(query);
  }

  getTodayGames( leagueID: string, maxDate: string ) {
    const _from = '2020-01-01';
    const _url = environment.url;
    const _to = maxDate;
    const query: string = `${_url}APIkey=${this.apiKey}&from=${_from}&to=${_to}&timezone=${this.timeZone}&leagueId=${leagueID}`;
    return this.http.get(query);
  }

  getHeadToHead( homeKey: string, awayKey: string ) {
    const _url: string = 'https://allsportsapi.com/api/basketball/';
    const query: string = `${_url}?met=H2H&APIkey=${this.apiKey}&firstTeamId=${homeKey}&secondTeamId=${awayKey}&timezone=${this.timeZone}`;
    return this.http.get(query);
  }

  getOdds( gameID: string ) {
    const _url: string = `https://allsportsapi.com/api/basketball/?&met=Odds&matchId=${gameID}&APIkey=${this.apiKey}`;
    return this.http.get( _url );
  }


}
