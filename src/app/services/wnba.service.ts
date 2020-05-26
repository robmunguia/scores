import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WnbaService {

  apiKey: string = environment.apiKeyWNBA;

  constructor(private http: HttpClient) { }

  getGames( date: Date ) {
    const month = this.zeroPad(date.getMonth() + 1, 2 );
    const day = this.zeroPad(date.getDate(), 2 );
    const url = `http://api.sportradar.us/wnba/trial/v7/en/games/${date.getFullYear()}/${ month }/${ day }/schedule.json?api_key=${this.apiKey}`;
    return this.http.get( url );
  }

  getHistorical( season: string ) {
    const url = `http://api.sportradar.us/wnba/trial/v7/en/games/${season}/REG/schedule.json?api_key=${this.apiKey}`;
    return this.http.get( url );
  }

  zeroPad(num, places) {
    var zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join('0') + num;
  }

}
