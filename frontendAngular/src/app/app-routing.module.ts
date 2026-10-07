import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PercorsoComponent } from './components/percorso/percorso.component';
import { MarkersComponent } from './components/markers/markers.component';
import { AddMezzoComponent } from './components/add-mezzo/add-mezzo.component';
import { MezziListComponent } from './components/mezzi-list/mezzi-list.component';
import { TrackerComponent } from './components/tracker/tracker.component';

const routes: Routes = [
  { path: '', redirectTo: 'markers', pathMatch: 'full' },
  { path: 'percorso', component: PercorsoComponent },
  { path: 'markers', component: MarkersComponent },
  { path: 'mezzi', component: MezziListComponent },
  { path: 'mezzi/aggiungi', component: AddMezzoComponent }, 
  { path: 'tracker/:targa', component: TrackerComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
