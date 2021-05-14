import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { League } from '../models/soccer/league.model';

@Injectable({
  providedIn: 'root'
})
export class SoccerService {

  urlRoot: string = 'https://app.sportdataapi.com/api/v1/soccer/';
  apiKey: string = environment.soccerApiKey;

  constructor(private http: HttpClient) { }

  getCurrentSeason( leagueId: number ) {
    const url: string = `${this.urlRoot}seasons?apikey=${this.apiKey}&league_id=${leagueId}`;
    return this.http.get( url );
  }

  getGames( league: League ) {
    const url: string = `${this.urlRoot}matches?
          apikey=${this.apiKey}&season_id=${league.season_id}&date_from=${league.start_date}&date_to=${league.end_date}`;
    return this.http.get( url );
  }
}
