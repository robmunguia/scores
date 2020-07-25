import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modulos
import { SharedModule } from '../shared/shared.module';
import { ServiceModule } from '../services/service.module';
// Rutas
import { PagesRouteModule } from './pages.routes';

import { TabModule } from 'angular-tabs-component';

// Componentes
import { PagesComponent } from './pages.component';
import { GamesComponent } from './games/games.component';
import { LeaguesComponent } from './leagues/leagues.component';
import { WnbaComponent } from './games/wnba/wnba.component';
import { NcaabComponent } from './games/ncaab/ncaab.component';
import { NbaComponent } from './games/nba/nba.component';
import { BblComponent } from './games/bbl/bbl.component';
import { CflComponent } from './games/cfl/cfl.component';

@NgModule({
  declarations: [
    PagesComponent,
    GamesComponent,
    LeaguesComponent,
    WnbaComponent,
    NcaabComponent,
    NbaComponent,
    BblComponent,
    CflComponent
  ],
  imports: [
    CommonModule,
    PagesRouteModule,
    SharedModule,
    ServiceModule,
    TabModule,
  ]
})
export class PagesModule { }
