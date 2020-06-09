import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NbaService {

  // url = environment.url;
  url: 'https://api.sportsdata.io/v3/nba/scores/json/Games/2019';

  constructor(private http: HttpClient) { }

  getTodayGames( maxDate: string ) {
    const _apiKey = '3b77bff0f2fe648091566b1db5d4e745588c0fff852d682f1143a57e03e107a8';
    const _from = '2020-01-01';
    const _to = maxDate;
    const _timeZone = 'America/New_York';
    const _league = '787';
    const query: string = `https://allsportsapi.com/api/basketball/?met=Fixtures&APIkey=${_apiKey}&
                          from=${_from}&to=${_to}&timezone=${_timeZone}&leagueId=${_league}`;
    return this.http.get(query);
  }


  getFormatDay( date: Date ): string {
    return ('0' + date.getDate()).slice(-2);
  }
  getFormatMonth( month: number ): string {
    switch ( month ) {
      case 0:
        return 'JAN';
      case 1:
        return 'FEB';
      case 2:
        return 'MAR';
      case 3:
        return 'APR';
      case 4:
        return 'MAY';
      case 5:
        return 'JUN';
      case 6:
        return 'JUL';
      case 7:
        return 'AUG';
      case 8:
        return 'SEP';
      case 9:
        return 'OCT';
      case 10:
        return 'NOV';
      case 11:
        return 'DEC';
        default:
          return 'DEC';
    }
  }
}
