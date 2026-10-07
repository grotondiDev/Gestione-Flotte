import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Leaflet from 'leaflet';
import 'leaflet-routing-machine';


const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = Leaflet.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
Leaflet.Marker.prototype.options.icon = iconDefault;
@Component({
  selector: 'app-percorso',
  templateUrl: './percorso.component.html',
  styleUrls: ['./percorso.component.css']
})
export class PercorsoComponent implements OnInit, OnDestroy {
  title = 'MoniFlottaFrontend';
  map: Leaflet.Map;



  constructor() {}
  ngOnInit(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.setGeoLocation.bind(this));
    }


    this.map = Leaflet.map('map').setView([41.867201, 12.3722185], 17);
    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'edupala.com © Angular LeafLet'
    }).addTo(this.map);

    const routeControl = Leaflet.Routing.control({
      showAlternatives: true,
      fitSelectedRoutes: false,
      show: false,
      routeWhileDragging: true,
      waypoints: [
        Leaflet.latLng(41.86668, 12.372834),
        Leaflet.latLng(41.8687, 12.376549)
      ]
    }).addTo(this.map);



    routeControl.on('routesfound', (e) => {
      const routes = e.routes;
      console.log(routes);
      const summary = routes[0].summary;
      console.log(summary);
      // alert time and distance in km and minutes
      alert(
        'il percorso totale è di ' +
          summary.totalDistance / 1000 +
          ' km ed il temppo di percorrenze è  ' +
          Math.round((summary.totalTime % 3600) / 60) +
          ' minuti'
      );
    });
  }

  setGeoLocation = (position: { coords: { latitude: any; longitude: any } }) => {
    const {
      coords: { latitude, longitude }
    } = position;

    const control = Leaflet.Routing.control({
      waypoints: [
          Leaflet.latLng(latitude, longitude),
          Leaflet.latLng(41.86668, 12.372834)
      ],
      routeWhileDragging: true
  }).addTo(this.map);
    const posizione = Leaflet.marker([latitude, longitude])
      .addTo(this.map)
      .bindPopup('<strong>La tua Posizione</strong>')
      .openPopup();
    const circle = Leaflet.circle([41.86668, 12.372834], 50).addTo(this.map);
    const d = this.map.distance(posizione.getLatLng(), circle.getLatLng());

    const cerchio1 = new Leaflet.LatLng(41.86668, 12.372834);
    const tuaposizione = new Leaflet.LatLng(latitude, longitude);
    const bounds = new Leaflet.LatLngBounds(tuaposizione, cerchio1);
    this.map.fitBounds(bounds.pad(0.05));


    const isInside = d < circle.getRadius();
    if (isInside) {
      alert('sei sul percorso');
    } else {
      alert('Sei Fuori dal percorso');
    }
    circle.setStyle({
      fillColor: isInside ? 'green' : '#f03'
    });
  }

  ngOnDestroy(): void {
    this.map.remove();
  }
}
