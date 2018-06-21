import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { EmployeesService } from "./employees.service";

@Component({
  selector: 'addemployee-form',
  templateUrl: './addemployee-form.component.html'
})
export class AddEmployeeFormComponent {
  types: string[] = ["Capsule", "Tablet", "Syrup", "Gel"];

  constructor(private _employeeService: EmployeesService, private router: Router) { }

  onSubmit(formValue: any){
    console.log("Form Value = " + JSON.stringify(formValue, null, 4));
    //let employeeCount = this._employeeService.getEmployeeCount();
    let last= this._employeeService.lastEmployeeID();
    let newEmployee = {
          //id: employeeCount + 1,
          id: last + 1,
          name: formValue.name,
          manufacturer:formValue.manufacturer,
          type: formValue.type,
          batchno: formValue.batchno,
          expdate: formValue.expdate,
          price: formValue.price
        };
    this._employeeService.addEmployee(newEmployee);
    this.router.navigate(['employees']);
  }
}
