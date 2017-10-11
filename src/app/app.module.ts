import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CharacterService } from './character.service';
import { DashboardComponent } from './dashboard.component';
import { CharactersComponent } from './characters.component';
import { CharacterDetailComponent } from './character-detail.component';
import { CharacterSearchComponent } from './character-search.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService, { delay: 600 })
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    CharacterSearchComponent,
    CharactersComponent,
    CharacterDetailComponent
  ],
  providers: [CharacterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
