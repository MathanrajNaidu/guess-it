
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from 'app/app.component';
import { HallOfFameComponent } from 'app/hall-of-fame/hall-of-fame.component';
import { GameComponent } from 'app/game/game.component';

const routes: Routes = [
  {
    path: '',
    component: GameComponent,
    pathMatch: 'full'
  },
  {
    path: 'halloffame',
    component: HallOfFameComponent
  }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class RoutingModule { }
