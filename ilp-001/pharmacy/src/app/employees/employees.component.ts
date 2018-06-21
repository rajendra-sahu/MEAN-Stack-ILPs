import { Component, OnInit } from '@angular/core';
import { EmployeesService } from "./employees.service";

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employees: any[];
  selectlist :number[]=[];
  namecheck:boolean=false;
  manufacturercheck:boolean=false;
  typecheck:boolean=false;
  batchnocheck:boolean=false;
  expdatecheck:boolean=false;
  pricecheck:boolean=false;

  

  constructor(private _employeeService: EmployeesService) { }
  

  ngOnInit() {
    this.employees = this._employeeService.getEmployees();
    console.log(this.employees);
  }
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

  dellist(empid:any){
    let len = this.selectlist.push(empid);
    
  }
  deleteEmployeeList(){
    //let len=this.selectlist.length;
    for(let list of this.selectlist)
    this._employeeService.deleteEmployee(list);
    
    this.employees = this._employeeService.getEmployees();
  }

  deleteEmployee(empid: any) {
    this._employeeService.deleteEmployee(empid);
    this.employees = this._employeeService.getEmployees();
  }
}
