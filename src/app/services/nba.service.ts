import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NbaService {

  apiKey: string = environment.apiKey;
  url: string = environment.url;
  timeZone: string = environment.timeZone;

  constructor(private http: HttpClient) { }

  getTodayGames( maxDate: string ) {
    const _from = '2020-01-01';
    const _to = maxDate;
    const _league = '787';
    const query: string = `${this.url}APIkey=${this.apiKey}&from=${_from}&to=${_to}&timezone=${this.timeZone}&leagueId=${_league}`;
    return this.http.get(query);
  }

  getHeadToHead( homeKey: string, awayKey: string ) {
    const _url: string = 'https://allsportsapi.com/api/basketball/';
    const query: string = `${_url}?met=H2H&APIkey=${this.apiKey}&firstTeamId=${homeKey}&secondTeamId=${awayKey}&timezone=${this.timeZone}`;
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
