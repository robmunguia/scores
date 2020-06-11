import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BblService {

  apiKey: string = environment.apiKey;
  url: string = environment.url;
  timeZone: string = environment.timeZone;

  constructor(private http: HttpClient) { }

  getTodayGames( maxDate: string) {
    const _from = '2020-01-01';
    const _to = maxDate;
    const _league = '679';
    const query: string = `${this.url}APIkey=${this.apiKey}&from=${_from}&to=${_to}&timezone=${this.timeZone}&leagueId=${_league}`;
    return this.http.get(query);
  }

  getHeadToHead( homeKey: string, awayKey: string ) {
    const _url: string = 'https://allsportsapi.com/api/basketball/';
    const query: string = `${_url}?met=H2H&APIkey=${this.apiKey}&firstTeamId=${homeKey}&secondTeamId=${awayKey}&timezone=${this.timeZone}`;
    return this.http.get(query);
  }
}
