import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { EmployeesService } from "./employees.service";
import { Observable } from 'rxjs/Observable';
import {EmployeesComponent} from "./employees.component"
@Component({
  selector: 'editemployee-form',
  templateUrl: './editemployee-form.component.html'
})
export class EditEmployeeFormComponent {
  types: string[] = ["Capsule", "Tablet", "Syrup", "Gel"];

  constructor(private _employeeService: EmployeesService, private route: ActivatedRoute, private router: Router) { }
  id: any;
  //employee: any;
 employee: any = {};
 //employee:Observable<any>;

  ngOnInit(): void {
      this.route.params.forEach((params: Params) => {
          this.id = +params['id'];
      });
      //console.log(this.id);
      this._employeeService.getEmployee(this.id).subscribe((employee)=>{this.employee=employee,console.log(this.employee)},err => console.log(err));
      
  }
 

  onSubmit(formValue: any){
    console.log("Form Value = " + JSON.stringify(formValue, null, 4));
    let employees:any;
    let updatedEmployee = {
        id: this.id,
        //_id:this.employee._id,//for nonMongoDb application comment this line
        name: formValue.name,
        manufacturer:formValue.manufacturer,
        type: formValue.type,
        batchno: formValue.batchno,
        expdate: formValue.expdate,
        price: formValue.price
        };
        //console.log(updatedEmployee.id);
   // this._employeeService.updateEmployee(updatedEmployee).subscribe((temp)=>{employees=temp,console.log(employees)},err => console.log(err));
   this._employeeService.updateEmployee(updatedEmployee).then((value)=>{this._employeeService.newEvent(value),console.log(value)}).catch(e => {console.log(e)}).then((value)=>{console.log("meh")}).catch(e => {console.log(e);})
    this.router.navigate(['employees']);
  }
}
