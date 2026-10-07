import { Component, OnInit } from '@angular/core';
import { MezziService } from 'src/app/_services/mezzi.service';
import { Mezzo } from 'src/app/models/mezzo.model';

@Component({
  selector: 'app-add-mezzo',
  templateUrl: './add-mezzo.component.html',
  styleUrls: ['./add-mezzo.component.css']
})
export class AddMezzoComponent implements OnInit {
  mezzo: Mezzo = {
    sistema_operativo:'',
    targa:'',
    scadenza_assicurazione:'',
    scadenza_bollo:''
  };
  submitted=false;

  constructor(private mezziService: MezziService) { }

  ngOnInit():void {
  }


 

  saveMezzo(): void {
    const data = {
      sistema_operativo: this.mezzo.sistema_operativo,
      targa: this.mezzo.targa,
      scadenza_assicurazione:this.mezzo.scadenza_assicurazione,
      scadenza_bollo: this.mezzo.scadenza_bollo
    };

    this.mezziService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }



  newMezzo(): void {
    this.submitted = false;
    this.mezzo = {
      sistema_operativo: '',
      targa: '',
      scadenza_assicurazione:'',
      scadenza_bollo: ''
    };
  }

}