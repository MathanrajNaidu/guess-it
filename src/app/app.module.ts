import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LookupService, BaseService } from 'app/_services';
import { HttpModule } from '@angular/http';
import { HallOfFameComponent } from './hall-of-fame/hall-of-fame.component';
import { RoutingModule } from 'app/_modules/app-routing.module';
import { GameComponent } from './game/game.component';

@NgModule({
  declarations: [
    AppComponent,
    HallOfFameComponent,
    GameComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,    
    ReactiveFormsModule,
    RoutingModule
  ],
  providers: [
    LookupService    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
