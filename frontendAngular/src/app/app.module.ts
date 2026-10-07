import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PercorsoComponent } from './components/percorso/percorso.component';
import { MarkersComponent } from './components/markers/markers.component';
import { AddMezzoComponent } from './components/add-mezzo/add-mezzo.component';
import { MezziListComponent } from './components/mezzi-list/mezzi-list.component';
import { MezzoDetailsComponent } from './components/mezzo-details/mezzo-details.component';
import { TrackerComponent } from './components/tracker/tracker.component';

@NgModule({
  declarations: [
    AppComponent,
    PercorsoComponent,
    MarkersComponent,
    AddMezzoComponent,
    MezziListComponent,
    MezzoDetailsComponent,
    TrackerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
