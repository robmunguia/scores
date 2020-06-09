import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SportDataService {

  url = environment.url;

  constructor(private http: HttpClient) { }

  getTodayGames( maxDate: string) {
    const _apiKey = '3b77bff0f2fe648091566b1db5d4e745588c0fff852d682f1143a57e03e107a8';
    const _from = '2020-01-01';
    const _to = maxDate;
    const _timeZone = 'America/New_York';
    const _league = '792';
    const query: string = `https://allsportsapi.com/api/basketball/?met=Fixtures&APIkey=${_apiKey}&
                          from=${_from}&to=${_to}&timezone=${_timeZone}&leagueId=${_league}`;
    return this.http.get(query);
  }

}
