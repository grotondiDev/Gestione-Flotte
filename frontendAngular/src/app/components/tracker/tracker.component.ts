import { Component, OnInit, Testability } from '@angular/core';
import { PosizioniService } from '../../_services/posizioni.service';
import { ActivatedRoute } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import * as Leaflet from 'leaflet';
import { Posizione } from 'src/app/models/posizione.model';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.css']
})
export class TrackerComponent implements OnInit {
  pos: Posizione = {
    mezzoId: '',
    tipoposId: '',
    latitudine: '',
    longitudine: ''
  };
  test: Subscription;
  targa: any = this.activatedRoute.snapshot.params.targa;
  currLat: any;
  currLng: any;
  statusTraking = 0;
  map: Leaflet.Map;
  constructor(
    private posizioni: PosizioniService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.map = Leaflet.map('map').setView([28.3949, 84.124], 10);
    const osm = Leaflet.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }
    );
    osm.addTo(this.map);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.setGeoLoc.bind(this));
    }
  }

  startTraking = () => {
    console.log(this.targa);
    this.statusTraking = 1;

    this.test = interval(1000).subscribe(x => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          this.currLat = position.coords.latitude;
          this.currLng = position.coords.longitude;

          navigator.geolocation.getCurrentPosition(this.setGeoLoc.bind(this));
          this.setGeoLocation(this.currLat, this.currLng, this.targa);
          console.log('traking operativo!');
        });
      }
    });
  }

  stopTraking = () => {
    this.statusTraking = 0;

    this.test.unsubscribe();
  }
  setGeoLoc = (position: { coords: { latitude: any; longitude: any } }) => {
    const {
      coords: { latitude, longitude }
    } = position;
    const posizione = Leaflet.marker([latitude, longitude])
      .addTo(this.map)
      .bindPopup('<strong>La tua Posizione</strong>')
      .openPopup();
    this.map.panTo(new Leaflet.LatLng(latitude, longitude));
  }
  setGeoLocation = (latitude, longitude, targa) => {
    const data = {
      mezzoId: targa,
      ID_tipoPos: 'Inizio',
      latitudine: latitude,
      longitudine: longitude
    };

    this.posizioni.create(targa, data).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }
}
