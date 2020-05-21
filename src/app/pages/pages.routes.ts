import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';
import { GamesComponent } from './games/games.component';
import { LeaguesComponent } from './leagues/leagues.component';

const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            { path: 'games', component: GamesComponent },
            { path: 'leagues', component: LeaguesComponent },
            { path: '', redirectTo: '/games', pathMatch: 'full'  },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRouteModule { }
