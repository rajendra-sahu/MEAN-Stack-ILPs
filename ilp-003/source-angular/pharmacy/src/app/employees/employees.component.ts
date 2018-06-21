import { Component, OnInit } from '@angular/core';
import { EmployeesService } from "./employees.service";
//import {Observable} from 'rxjs/Observable';
import {Observable} from 'rxjs/Rx';
import { Emp } from "./emp";
//import {AddEmployeeFormComponent} from "./addemployee-form.component"

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employees: Observable<Emp[]>;
  //employees: Emp[];
  selectlist :number[]=[];
  namecheck:boolean=false;
  manufacturercheck:boolean=false;
  typecheck:boolean=false;
  batchnocheck:boolean=false;
  expdatecheck:boolean=false;
  pricecheck:boolean=false;

  

  constructor(private _employeeService: EmployeesService) {

   }
  
  ngOnInit() {
    //this.employees = this._employeeService.getEmployees();
    /*let timer = Observable.timer(10,100);
    timer.subscribe(()=>{this._employeeService.getEmployees().subscribe(
      (employees:any) =>  this.employees = employees,
      err => console.log(err)
    );});*/

    this._employeeService.getEmployees().subscribe(
      (employees:any) =>  this.employees = employees,
      err => console.log(err)
    );
  
    this._employeeService.event().subscribe((list) => {this.employees=list});
    //localStorage.setItem('employees', JSON.stringify(this.employees));
    //console.log(this.employees);
  }

  /*public receive():void {
   this._employeeService.getEmployees().subscribe(
      (employees:any) =>  this.employees = employees,
      err => console.log(err)
    );
    console.log("received")
    //this.employees=$event;
  }*/


  dispfilter(choice :number){
    if(choice==1)
    this.namecheck= !(this.namecheck);
    if(choice==2)
    this.manufacturercheck= !(this.manufacturercheck);
    if(choice==3)
    this.typecheck= !(this.typecheck);
    if(choice==4)
    this.batchnocheck= !(this.batchnocheck);
    if(choice==5)
    this.expdatecheck= !(this.expdatecheck);
    if(choice==6)
    this.pricecheck= !(this.pricecheck);


  }

  dellist(emp_id:any){
    if(!(this.selectlist.includes(emp_id)))
    {
      let len = this.selectlist.push(emp_id);
    }
    else {
      let i=this.selectlist.indexOf(emp_id);
      this.selectlist.splice(i);
    }
    
  }
  deleteEmployeeList(){
    //let len=this.selectlist.length;
    for(let list of this.selectlist)
    this._employeeService.deleteEmployee(list).subscribe(
      (employees:any) =>  this.employees = employees,
      err => console.log(err)
    );
    
    //this.employees = this._employeeService.getEmployees();
  }

  deleteEmployee(emp_id: any) {
    this._employeeService.deleteEmployee(emp_id).subscribe(
      (employees:any) =>  this.employees = employees,
      err => console.log(err)
    );
    //this.employees = this._employeeService.getEmployees();
  }
}
