import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NCAABService {

  apiKey: string = environment.apiKey;
  url: string = environment.url;
  timeZone: string = environment.timeZone;

  constructor(private http: HttpClient) { }

  getTodayGames( maxDate: string) {
    const _from = '2020-01-01';
    const _to = maxDate;
    const _league = '792';
    const query: string = `${this.url}APIkey=${this.apiKey}&from=${_from}&to=${_to}&timezone=${this.timeZone}&leagueId=${_league}`;
    return this.http.get(query);
  }

}
