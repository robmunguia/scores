import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modulos
import { SharedModule } from '../shared/shared.module';
import { ServiceModule } from '../services/service.module';
// Rutas
import { PagesRouteModule } from './pages.routes';
// Componentes
import { PagesComponent } from './pages.component';
import { GamesComponent } from './games/games.component';
import { LeaguesComponent } from './leagues/leagues.component';
import { WnbaComponent } from './games/wnba/wnba.component';
import { NcaabComponent } from './games/ncaab/ncaab.component';

@NgModule({
  declarations: [
    PagesComponent,
    GamesComponent,
    LeaguesComponent,
    WnbaComponent,
    NcaabComponent
  ],
  imports: [
    CommonModule,
    PagesRouteModule,
    SharedModule,
    ServiceModule
  ]
})
export class PagesModule { }
