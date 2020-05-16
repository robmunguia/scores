import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SportDataService {

  url = environment.url;

  constructor(private http: HttpClient) { }

  getTeams() {
    // return this.http.get( `${ this.url }/teams` );
    return this.http.get( 'https://api.sportsdata.io/v3/cbb/scores/json/teams' );
  }

  getGamesDay( date: Date ) {
    return this.http.get( 'http://api.sportradar.us/ncaamb/trial/v7/en/games/2020/03/06/schedule.json?api_key=dxrnhbz26mwke439dfsz7stu');
  }

  getSchedules() {
    // return this.http.get( '../assets/data.json' );
    // return this.http.get( `${this.url}/Games/2020REG` );
    return this.http.get('http://api.sportradar.us/ncaamb/trial/v7/en/games/2019/REG/schedule.json?api_key=dxrnhbz26mwke439dfsz7stu');
  }


  /*  Metodos sin Api   */

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
