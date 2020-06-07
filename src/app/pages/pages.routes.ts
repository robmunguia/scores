import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// components
import { PagesComponent } from './pages.component';
import { LeaguesComponent } from './leagues/leagues.component';
import { WnbaComponent } from './games/wnba/wnba.component';
import { NcaabComponent } from './games/ncaab/ncaab.component';
import { NbaComponent } from './games/nba/nba.component';

const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            { path: 'ncaab', component: NcaabComponent },
            { path: 'wnba', component: WnbaComponent },
            { path: 'nba', component: NbaComponent },
            { path: 'leagues', component: LeaguesComponent },
            { path: '', redirectTo: '/leagues', pathMatch: 'full'  },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRouteModule { }
