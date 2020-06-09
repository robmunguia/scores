import { Component, OnInit } from '@angular/core';
import { BblService } from '../../../services/bbl.service';
import * as moment from 'moment';

@Component({
  selector: 'app-bbl',
  templateUrl: './bbl.component.html',
  styleUrls: ['./bbl.component.css']
})
export class BblComponent implements OnInit {

  monthGames: any[];
  games: NbaGames[];
  divider: number = 5;
  dateGames = moment(new Date()).format('yyyy-MM-DD');
  maxDate = moment(new Date(), "DD-MM-YYYY").add(2, 'days').format('yyyy-MM-DD');
  midDate = moment(new Date(), "DD-MM-YYYY").add(1, 'days').format('MMM DD');
  endDate = moment(new Date(), "DD-MM-YYYY").add(2, 'days').format('MMM DD');
  selectedDate: string = 'TODAY';


  date: Date;
  valueDay = 0;

  constructor(private bblService: BblService) { }

  ngOnInit() {
    this.getGames();
  }

  getGames() {
    this.maxDate = moment(new Date(), "DD-MM-YYYY").add(2, 'days').format('yyyy-MM-DD');
    this.bblService.getTodayGames( this.maxDate )
    .subscribe((resp: any) => {
      this.monthGames = resp.result;
      this.games = resp.result.filter(g => g.event_date === this.dateGames);
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
    const homeGames: any[] = this.monthGames.filter(g => (g.home_team_key === teamId || g.away_team_key === teamId) && g.event_status === 'Finished' && g.event_date !== this.dateGames);
    console.log(homeGames);
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

  changeDate( addDays: number ) {
    switch ( addDays ) {
      case 0:
        this.selectedDate = 'TODAY';
        // get games
        this.games = [];
        this.games = this.monthGames.filter(g => g.event_date === this.dateGames);
        this.analize();
        break;
      default:
        const realDate = moment(new Date(), "DD-MM-YYYY").add(addDays, 'days').format('yyyy-MM-DD');
        this.selectedDate = moment(new Date(), "DD-MM-YYYY").add(addDays, 'days').format('MMM DD');
        // get games
        this.games = [];
        this.games = this.monthGames.filter(g => g.event_date === realDate);
        this.analize();
        break;
    }
  }

}

interface NbaGames {
  event_key: string,
  event_date: string,
  event_time: string,
  event_final_result: string,
  event_status: string,
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