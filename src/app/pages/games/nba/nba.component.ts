import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { NbaService } from '../../../services/nba.service';

@Component({
  selector: 'app-nba',
  templateUrl: './nba.component.html',
  styleUrls: ['./nba.component.css']
})
export class NbaComponent implements OnInit {

  monthGames: any[];
  games: NbaGames[];
  divider: number = 5;

  date: Date;
  valueDay = 0;

  constructor(private dataService: NbaService) {
  }

  ngOnInit() {
    this.getGames();
  }

  getGames() {
    this.dataService.getTodayGames()
    .subscribe((resp: any) => {
      this.monthGames = resp.result;
      const _date = moment('2020-03-06').format('yyyy-MM-DD');
      this.games = resp.result.filter(g => g.event_date === _date);
      this.analize();
    });
  }

  analize() {
    this.games.forEach(item => {
      this.lastGames( item.home_team_key, true, item );
      this.lastGames( item.away_team_key, false, item );
    });
  }

  lastGames( teamId: string, isHome: boolean, game: NbaGames ) {
    const homeGames: any[] = this.monthGames.filter(g => g.home_team_key === teamId || g.away_team_key === teamId);
    let i: number = 0;
    let score: number = 0;
    homeGames.forEach( (item) => {
      if ( i < this.divider ) {
        const isHomeInGames: boolean = item.home_team_key === teamId ? true : false;
        score += this.getScores( isHomeInGames, item.scores )
        i++;
      }
    });
    if ( isHome) {
      game.homeTotalPoints = score;
      game.homeAveragePoints = score / this.divider;
    } else {
      game.awayTotalPoints = score;
      game.awayAveragePoints = score / this.divider;
    }
  }

  getScores( isHome: boolean, scores_result: any ): number {
    let points: number = 0;
    if ( isHome ) {
      points += Number(scores_result['1stQuarter'][0].score_home);
      points += Number(scores_result['2ndQuarter'][0].score_home);
      points += Number(scores_result['3rdQuarter'][0].score_home);
      points += Number(scores_result['4thQuarter'][0].score_home);
    } else {
      points += Number(scores_result['1stQuarter'][0].score_away);
      points += Number(scores_result['2ndQuarter'][0].score_away);
      points += Number(scores_result['3rdQuarter'][0].score_away);
      points += Number(scores_result['4thQuarter'][0].score_away);
    }
    return points;
  }

  changeDate( x: number ) {
    this.valueDay = x;
    console.log(moment(this.date));
    const date = new Date('2020-03-06');
    if (this.valueDay === -1 ) {
      this.date.setDate(this.date.getDate() - 1);
    } else {
      this.date.setDate(this.date.getDate() + 1);
    }
  }

  displayDate( x: number ): string {
    const date = new Date('2020-03-06');
    if (x === -1 ) {
      date.setDate(date.getDate() - 1);
    } else if (x === 1 ) {
      date.setDate(date.getDate() + 1);
    }
    return `${this.dataService.getFormatMonth( date.getMonth() )} ${this.dataService.getFormatDay(date)}`;
  }

}

interface NbaGames {
  event_key: string,
  event_date: string,
  event_time: string,
  event_home_team: string,
  home_team_key: string,
  event_home_team_logo: string,
  event_away_team: string,
  away_team_key: string,
  event_away_team_logo: string,

  analizeGames: NbaGames[],
  homeTotalPoints: number,
  awayTotalPoints: number,
  homeAveragePoints: number,
  awayAveragePoints: number,
}


