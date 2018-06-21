import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { EmployeesService } from "./employees.service";

@Component({
  selector: 'editemployee-form',
  templateUrl: './editemployee-form.component.html'
})
export class EditEmployeeFormComponent {
  types: string[] = ["Capsule", "Tablet", "Syrup", "Gel"];

  constructor(private _employeeService: EmployeesService, private route: ActivatedRoute, private router: Router) { }
  id: any;
  employee: any;

  ngOnInit(): void {
      this.route.params.forEach((params: Params) => {
          this.id = +params['id'];
      });
      this.employee = this._employeeService.getEmployee(this.id);
  }

  onSubmit(formValue: any){
    console.log("Form Value = " + JSON.stringify(formValue, null, 4));
    let updatedEmployee = {
        id: this.employee.id,
        name: formValue.name,
        manufacturer:formValue.manufacturer,
        type: formValue.type,
        batchno: formValue.batchno,
        expdate: formValue.expdate,
        price: formValue.price
        };
    this._employeeService.updateEmployee(updatedEmployee);
    this.router.navigate(['employees']);
  }
}
