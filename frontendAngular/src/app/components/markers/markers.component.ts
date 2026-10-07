import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Leaflet from 'leaflet';
import { PosizioniService } from 'src/app/_services/posizioni.service';
import { MezziService } from 'src/app/_services/mezzi.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-markers',
  templateUrl: './markers.component.html',
  styleUrls: ['./markers.component.css']
})
export class MarkersComponent implements OnInit, OnDestroy {
  map: Leaflet.Map;
  posizioniList = [];
  posizioniListmezzi = [];
  targa = [];
  ultimoagg = [];

  constructor(
    private posizioniService: PosizioniService,
    private mezzoService: MezziService
  ) {}

  ngOnInit(): void {
    
    setInterval(()=>{

        this.getPosizioneMezzo();
 }, 10000);

  
    this.map = new Leaflet.Map('map').setView([41.868604, 12.376669], 10);
    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'edupala.com © Angular LeafLet'
    }).addTo(this.map);
  }

  
 


  getPosizioneMezzo(): void {
    this.mezzoService.getAllposizioni().subscribe(
      data => {
        this.posizioniListmezzi = data;
        const greenIcon = Leaflet.icon({
          iconUrl: '../../../assets/marker-icon.png',
          shadowUrl: '../../../assets/marker-shadow.png',

          iconSize: [38, 65], // dimensione icona
          shadowSize: [50, 64], // dimensione ombra
          iconAnchor: [22, 94], // punto di ancoraggio dell'icona dove corrisponde la location
          shadowAnchor: [4, 62], // punto di ancoraggio dell'ombra dove corrisponde la location
          popupAnchor: [-3, -76] // punto dove dovrebbe aprire il popup
        });

        for (let i = 0; i < this.posizioniListmezzi.length; i++) {
          console.log(this.posizioniListmezzi[i].posizioni[0].latitudine);
          Leaflet.marker(
            [
              this.posizioniListmezzi[i].posizioni[0].latitudine,
              this.posizioniListmezzi[i].posizioni[0].longitudine
            ],
            { icon: greenIcon }
          )
            .addTo(this.map)
            .bindPopup(
              '<strong>Targa veicolo : </strong>' +
                this.posizioniListmezzi[i].targa +
                ' <br> <strong>ultimo aggiornamento posizione : </strong>' +
                this.posizioniListmezzi[i].posizioni[0].data_ora
            )
            .openPopup();
        }
      },
      error => {
        console.log(error);
      }
    );
  }
  /*


        }) */

  ngOnDestroy(): void {
    this.map.remove();
  }
}
