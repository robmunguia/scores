import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { basketGames, basketLeagues } from '../../models/basket/league.model';
import { BasketService } from '../../services/basket.service';

@Component({
  selector: 'app-top-basket',
  templateUrl: './top-basket.component.html',
  styleUrls: ['./top-basket.component.css']
})
export class TopBasketComponent implements OnInit {

  today = moment(new Date(), "DD-MM-YYYY").format('yyyy-MM-DD');
  currentGames: basketGames[];
  games: basketGames[] = [];
  leagues: basketLeagues[];
  totalLeagues: number = 0;
  analizadas: number = 1;

  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
    this.getGames();
  }

  getGames() {
    this.basketService.getCurrentGames( this.today )
    .subscribe((data: any) => {
      this.totalLeagues = data.results;
      this.currentGames = data.response;
      this.getLeaguesInfo();
    });
  }

  getLeaguesInfo() {
    this.currentGames.forEach(item => {
      this.getSeasonGames( item.league );
    });
  }

  getSeasonGames( league: basketLeagues ) {
    const games = this.basketService.getGames( league )
    .subscribe((data: any) => {
      const games: basketGames = data.response;
    });
    console.log(this.games);
  }

}
