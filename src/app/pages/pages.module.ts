import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modulos
import { SharedModule } from '../shared/shared.module';
import { ServiceModule } from '../services/service.module';
// Rutas
import { PagesRouteModule } from './pages.routes';

import { TabModule } from 'angular-tabs-component';
import { FormsModule } from '@angular/forms';

// Componentes
import { PagesComponent } from './pages.component';
import { GamesComponent } from './games/games.component';
import { LeaguesComponent } from './leagues/leagues.component';
import { WnbaComponent } from './games/wnba/wnba.component';
import { NcaabComponent } from './games/ncaab/ncaab.component';
import { NbaComponent } from './games/nba/nba.component';
import { BblComponent } from './games/bbl/bbl.component';
import { CflComponent } from './games/cfl/cfl.component';
import { FilterCountryComponent } from './leagues/filter-country/filter-country.component';
import { SerieAComponent } from './soccer/serieA/serieA.component';
import { BundesligaComponent } from './soccer/bundesliga/bundesliga.component';

@NgModule({
  declarations: [
    PagesComponent,
    GamesComponent,
    LeaguesComponent,
    WnbaComponent,
    NcaabComponent,
    NbaComponent,
    BblComponent,
    CflComponent,
    FilterCountryComponent,
    SerieAComponent,
    BundesligaComponent
  ],
  imports: [
    CommonModule,
    PagesRouteModule,
    SharedModule,
    ServiceModule,
    TabModule,
    FormsModule
  ]
})
export class PagesModule { }
