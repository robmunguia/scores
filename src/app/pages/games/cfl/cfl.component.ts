import { Component, OnInit } from '@angular/core';
import { CflService } from '../../../services/cfl.service';

@Component({
  selector: 'app-cfl',
  templateUrl: './cfl.component.html',
  styleUrls: ['./cfl.component.css']
})
export class CflComponent implements OnInit {

  constructor(private cflService: CflService) {
    this.getAllGames();
  }

  ngOnInit() {
  }

  getAllGames() {
    this.cflService.getAllGames()
    .subscribe((games: any[]) => {
      console.log(games);
    });
  }

}
