import { Component, OnInit } from '@angular/core';
import { BasketGames } from '../../models/games.model';
import { BblService } from '../../services/bbl.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
