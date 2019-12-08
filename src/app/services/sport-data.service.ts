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
    return this.http.get( `${ this.url }/teams` );
  }

  getGamesDay( date: Date ) {
    const formatDate = `${date.getFullYear()}-${this.getFormatMonth(date.getMonth())}-${this.getFormatDay(date)}`;
    return this.http.get( `${ this.url }/GamesByDate/${ formatDate }` );
  }

  getSchedules() {
    return this.http.get( '../assets/data.json' );
    // return this.http.get( `${this.url}/Games/2020REG` );
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
