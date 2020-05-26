import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-leagues',
  templateUrl: './leagues.component.html',
  styleUrls: ['./leagues.component.css']
})
export class LeaguesComponent implements OnInit {

  leagues = [ { id: '1', title: 'NCAAB', route: 'ncaab', img: 'assets/images/ncaab.png' },
              { id: '2', title: 'NCAAF', route: null, img: 'assets/images/ncaaf.jpg' },
              { id: '3', title: 'NBA', route: null, img: 'assets/images/nba.png' },
              { id: '4', title: 'WNBA', route: 'wnba', img: 'assets/images/wnba.png' },
              { id: '5', title: 'CFL', route: null, img: 'assets/images/cfl_logo.jpg' } ];

  constructor(private route: Router) { }

  ngOnInit() {
  }

  openLeague( league ) {
    if ( league.route ) {
      this.route.navigate([league.route]);
    }
  }

}
