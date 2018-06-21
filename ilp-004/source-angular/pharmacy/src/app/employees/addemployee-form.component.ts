import { Component , Output, EventEmitter} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { EmployeesService } from "./employees.service";
import { Observable } from 'rxjs/Observable';
import { Emp } from "./emp";
import 'rxjs/add/operator/map'
import {EmployeesComponent} from "./employees.component"
import { Input } from '@angular/core/src/metadata/directives';


@Component({
  selector: 'addemployee-form',
  templateUrl: './addemployee-form.component.html'
})
export class AddEmployeeFormComponent {
  types: string[] = ["Capsule", "Tablet", "Syrup", "Gel"];
  //let last :any;
  //newEmployee:Emp;
  //@Output() jsonEvent :EventEmitter<any[]> = new EventEmitter();
  constructor(private _employeeService: EmployeesService, private router: Router /*,private empcomp: EmployeesComponent*/ ) { }
  //employee: any = {};
  //@Input()eref:app-employees;
  

  onSubmit(formValue: any){
    console.log("Form Value = " + JSON.stringify(formValue, null, 4));
    //let employeeCount = this._employeeService.getEmployeeCount();
    //last: new Observable<any>;
    let newEmployee:any={};
    let last :number;
    
     this._employeeService.lastEmployeeID().then((value)=>{last=value;//console.log(last);
      newEmployee={
          id:last+1,
          name: formValue.name,
          manufacturer:formValue.manufacturer,
          type: formValue.type,
          batchno: formValue.batchno,
          expdate: formValue.expdate,
          price: formValue.price
      };
      //this.newEmployee.id=value+1;
      /*newEmployee.name= formValue.name;
      newEmployee.manufacturer=formValue.manufacturer;
      newEmployee.type= formValue.type;
      newEmployee.batchno= formValue.batchno;
      newEmployee.expdate= formValue.expdate;
      newEmployee.price= formValue.price;*/
      console.log(newEmployee);
    }).catch(e => {
      console.log(e);
  }).then(()=>{this._employeeService.addEmployee(newEmployee).then((value)=>{this._employeeService.newEvent(value),console.log(value)}).catch(e => {console.log(e);}).then((value)=>{console.log("meh")}).catch(e => {console.log(e);})

    //console.log(last);
   //this._employeeService.lastEmployeeID().subscribe((last:number)=>{console.log(last+3)},err => console.log(err+1));
     //this._employeeService.lastEmployeeID().subscribe((last:number)=>last=last,err => console.log(err));
     //last=this._employeeService.lastEmployeeID().pipe
     /*this._employeeService.addEmployee(newEmployee).subscribe(()=>
     {
      this._employeeService.lastEmployeeID().subscribe((last:number)=> {console.log(last+3),newEmployee.id=last+3,
      newEmployee.name= formValue.name
      newEmployee.manufacturer=formValue.manufacturer,
      newEmployee.type= formValue.type,
      newEmployee.batchno= formValue.batchno,
      newEmployee.expdate= formValue.expdate,
      newEmployee.price= formValue.price
      }
     ,err => console.log(err));
      },err => console.log(err));*/

    



    // last=JSON.parse(JSON.stringify(last));
    //console.log(last);
   // let employee :any = {};
     /*newEmployee = {
          //id: employeeCount + 1,
          id: last +1,
          name: formValue.name,
          manufacturer:formValue.manufacturer,
          type: formValue.type,
          batchno: formValue.batchno,
          expdate: formValue.expdate,
          price: formValue.price
        };*/
       //console.log(newEmployee.id );
    //let temp= this._employeeService.addEmployee(newEmployee).subscribe(err => console.log(err));
    //this.empcomp.receive();
    
    this.router.navigate(['employees']);
  }
 
}
