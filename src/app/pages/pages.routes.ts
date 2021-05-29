import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';

// components
import { PagesComponent } from './pages.component';
import { LeaguesComponent } from './leagues/leagues.component';
import { WnbaComponent } from './games/wnba/wnba.component';
import { NcaabComponent } from './games/ncaab/ncaab.component';
import { NbaComponent } from './games/nba/nba.component';
import { BblComponent } from './games/bbl/bbl.component';
import { CflComponent } from './games/cfl/cfl.component';
import { FilterCountryComponent } from './leagues/filter-country/filter-country.component';
import { SerieAComponent } from './soccer/serieA/serieA.component';
import { BundesligaComponent } from './soccer/bundesliga/bundesliga.component';
import { TopBasketComponent } from './top-basket/top-basket.component';

const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            { path: 'ncaab', component: NcaabComponent },
            { path: 'wnba', component: WnbaComponent },
            { path: 'nba', component: NbaComponent },
            { path: 'leagues', component: LeaguesComponent },
            { path: 'bbl', component: BblComponent },
            { path: 'cfl', component: CflComponent },
            { path: 'filters', component: FilterCountryComponent },
            { path: 'serieA', component: SerieAComponent },
            { path: 'bundesliga', component: BundesligaComponent },
            { path: 'topBasket', component: TopBasketComponent },
            { path: '', redirectTo: '/leagues', pathMatch: 'full' },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRouteModule { }
