import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Clinc } from 'src/app/models/clinic';
import { ClinicService } from '../../services/clinic.service';

@Component({
  selector: 'app-clinic-edit',
  templateUrl: './clinic-edit.component.html',
  styleUrls: ['./clinic-edit.component.css']
})
export class ClinicEditComponent implements OnInit {
  clinicId = (this.route.snapshot.paramMap.get('id'));
  updateClinic: Clinc = new Clinc("","","","","",[]);
  constructor(
    public clincSer: ClinicService,
    public route: ActivatedRoute,
    public router: Router,
    public ar:ActivatedRoute
  ) {}
  update() {
    if( confirm("are you sure?") == true){
      this.ar.params.subscribe(data=>{
        console.log(data['id']);
        this.clincSer.editClinic(data['id'],this.updateClinic).subscribe({
              next: (res) => {
                console.log(res);
                this.clinicId = "";
              },
              error: (err) => {
                console.log(err);
              },
              complete: () => {
                console.log('update one');
              },
            });
        this.router.navigate(['admin/list_clinic']);
        // console.log(this.updateClinic)
      })
    }else{
      this.router.navigate(['admin/list_clinic']);
    }

  }
  ngOnInit(): void {
    if (this.clinicId != "") {
      this.clincSer.getClinicById(this.clinicId!).subscribe({
        next: (res) => {
          console.log(res);
          this.updateClinic = res;
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          console.log('get one');
        },
      });
    }
  }
}
