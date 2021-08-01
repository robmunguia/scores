import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-leagues',
  templateUrl: './leagues.component.html',
  styleUrls: ['./leagues.component.css']
})
export class LeaguesComponent implements OnInit {

  leagues = [ //{ id: '1', title: 'NCAAB', route: 'ncaab', img: 'assets/images/ncaab.png' },
              { id: '1', title: 'NBA', route: 'nba', img: 'assets/images/nba.png' },
              // { id: '2', title: 'World', route: 'filters', img: 'assets/images/find.png' },
              { id: '3', title: 'World', route: 'bbl', img: 'assets/images/find.png' },
              // { id: '4', title: 'WNBA', route: 'wnba', img: 'assets/images/wnba.png' },
              // { id: '5', title: 'NBA', route: 'nba', img: 'assets/images/nba.png' },
              { id: '6', title: 'Germany', route: 'bundesliga', img: 'assets/images/bundesliga.png' },
              { id: '7', title: 'Italy', route: 'serieA', img: 'assets/images/serie-a.png' },
              { id: '8', title: 'NCAAB Historial', route: 'topBasket', img: 'assets/images/fire.jpg' },
              // { id: '8', title: 'NCAAF', route: null, img: 'assets/images/ncaaf.jpg' },
              // { id: '9', title: 'CFL', route: 'cfl', img: 'assets/images/cfl_logo.jpg' },
            ];

  constructor(private route: Router) { }

  ngOnInit() {
  }

  openLeague( league ) {
    if ( league.route ) {
      this.route.navigate([league.route]);
    }
  }

}
