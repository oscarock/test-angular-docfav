import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListGamesComponent } from './components/list-games/list-games.component';
import { GameDetailsComponent } from '../app/components/game-details/game-details.component';


export const routes: Routes = [
    { path: '', redirectTo: '/games', pathMatch: 'full' },
    { path: 'games', component: ListGamesComponent },
    { path: 'game/:id', component: GameDetailsComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }