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

  getSchedules() {
    // return this.http.get( '../assets/data.json' );
    return this.http.get( 'https://api.sportsdata.io/v3/nba/scores/json/Games/2020' );
  }

  getTeams() {
    // return this.http.get( `${ this.url }/teams` );
    return this.http.get( 'https://api.sportsdata.io/v3/nba/scores/json/teams' );
  }
  getGamesDay( date: Date ) {
    // const formatDate = `${date.getFullYear()}-${this.getFormatMonth(date.getMonth())}-${this.getFormatDay(date)}`;
    const formatDate = '2020-MAR-10';
    return this.http.get( `https://api.sportsdata.io/v3/nba/scores/json/GamesByDate/2020-MAR-10` );
  }

  getGamesDayPeriods( date: Date ) {
    const formatDate = `${date.getFullYear()}-${this.getFormatMonth(date.getMonth())}-${this.getFormatDay(date)}`;
    return this.http.get( `https://api.sportsdata.io/v3/nba/scores/json/GamesByDate/${ formatDate }` );
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
