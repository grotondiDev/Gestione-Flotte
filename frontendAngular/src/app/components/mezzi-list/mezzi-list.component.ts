import { Component, OnInit } from '@angular/core';
import { MezziService } from 'src/app/_services/mezzi.service';

@Component({
  selector: 'app-mezzi-list',
  templateUrl: './mezzi-list.component.html',
  styleUrls: ['./mezzi-list.component.css']
})
export class MezziListComponent implements OnInit {

  mezzi: any;
  currentMezzo = null;
  currentIndex = -1;
  targa = '';

  constructor(private mezziService: MezziService) { }

  ngOnInit(): void {
    this.retrieveMezzi();
  }

  retrieveMezzi(): void {
    this.mezziService.getAll()
      .subscribe(
        data => {
          this.mezzi = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refreshList(): void {
    this.retrieveMezzi();
    this.currentMezzo = null;
    this.currentIndex = -1;
  }

  setActiveMezzo(mezzo, index): void {
    this.currentMezzo = mezzo;
    this.currentIndex = index;
  }

  removeAllMezzi(): void {
    this.mezziService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.retrieveMezzi();
        },
        error => {
          console.log(error);
        });
  }

  searchTarga(): void {
    this.mezziService.findByTitle(this.targa)
      .subscribe(
        data => {
          this.mezzi = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
}