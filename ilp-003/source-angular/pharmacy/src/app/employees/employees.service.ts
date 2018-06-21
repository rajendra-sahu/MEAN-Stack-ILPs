  import { Injectable} from '@angular/core';
import { Init } from "./initial-employees";
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';
import { Emp } from "./emp";
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
//import{EmployeesComponent} from"./employees.component";
//import { async } from '@angular/core/testing';
//import { AsyncPipe } from '@angular/common/src/pipes/async_pipe';
import { Subject } from 'rxjs/Subject';
@Injectable()
export class EmployeesService extends Init {
  private _employeesUrl = "http://localhost:4200/medicine";
  private _subject = new Subject<any>();
  constructor(private _http: HttpClient, ) {
    super();
    console.log("Initializing Employees service ...");
    this.load();
    
    
  }
  newEvent(list:any):any {
    this._subject.next(list);
  }
  event():Observable<any> {
    return this._subject.asObservable();
  }


 /* getEmployeeCount() {
    //let employees = JSON.parse(localStorage.getItem('employees'));
    let employees = JSON.parse(JSON.stringify(this._http.get(this._employeesUrl)));
    return employees.length;
  }*/

  getEmployees() {
    //let employees = JSON.parse(localStorage.getItem('employees'));
    let employees = this._http.get(this._employeesUrl);
    
    return employees;
  }

  lastEmployeeID():Promise<number>{
    //let employees = JSON.parse(localStorage.getItem('employees'));
    //let last:Observable<number>;
    //let temp= this._http.get(this._employeesUrl).subscribe((employees:any) =>  last=employees[employees.length-1].id,err => console.log(err));

    //let employees = JSON.parse(JSON.stringify(temp));
    //let last=employees[employees.length-1].id;
    //let len= temp.count();

    //let last=temp[temp.length-1].id;
    //return last;
    //return temp.length;
    return new Promise((resolve, reject) => {
      this._http.get(this._employeesUrl)
      .toPromise()
      .then(
        res => { // Success
          let employees =res;
         resolve(employees[employees.length-1].id);
        },
        msg => { // Error
        reject(msg);
        }
      )
  });

    
  }


  /*lastEmployeeID(): Observable<any>
  {
    return new Observable(observer => 
      {
      this._http.get(this._employeesUrl).subscribe(employees => 
        {
        observer.next(employees[employees.length-1].id )
        }, err => {console.log(err),observer.error(err)})
      });
  }*/

  getEmployee(id: any):Observable<any> {
    //let employees = JSON.parse(JSON.stringify(this._http.get(this._employeesUrl)));
    //let employee:any = null;
   // let employee:Observable<any> = null;
   let employee: any = {};
   return new Observable(observer=>
    {
    this._http.get(this._employeesUrl).subscribe(employees=>
      {
        for (let i = 0; i < employees.length; i++) 
        {
          if (employees[i].id == id) 
          {
            employee = employees[i];
            break;
          }
        }
       observer.next(employee);
      
      },
      err => console.log(err))
    });
    //let employees= this._http.get(this._employeesUrl).subscribe(err => console.log(err));
    


    
    /*for (let i = 0; i < employees.length; i++) 
    {
      if (employees[i].id == id) {
        employee = employees[i];
        break;
      }
    }
    return employee;*/
  }

  addEmployee(newEmployee: any):Promise<any> {
    //let employees = JSON.parse(localStorage.getItem('employees'));
    //let employees = JSON.parse(JSON.stringify(this._http.get(this._employeesUrl)));
    //this.employeescomponent.employees.push(newEmployee);
    //let employees1= this._http.post("http://localhost:4200/medicine/create",newEmployee).subscribe(err => console.log(err));
    //let employees1= this._http.get("http://localhost:4200/medicine/").subscribe(err => console.log(err));
    //console.log(newEmployee.id);
   /* return new Observable(observer => 
      {
      this._http.post("http://localhost:4200/medicine/create",newEmployee).subscribe(err => console.log(err)) });*/
    
      return new Promise((resolve, reject) => {
        this._http.post("http://localhost:4200/medicine/create",newEmployee)
        .toPromise()
        .then(
          res => { // Success
           resolve(res);
          },
          msg => { // Error
          reject(msg);
          }
        )
    });


    //localStorage.setItem('employees', JSON.stringify(employees));

  }

  updateEmployee(updatedEmployee: any):Promise<any>
   {
    //let employees = JSON.parse(localStorage.getItem('employees'));
   // let employees = this._http.get(this._employeesUrl).subscribe(err => console.log(err)) ;
    /*for (let i = 0; i < employees.length; i++) 
    {
      if (employees[i].id == updatedEmployee.id)
       {
        employees[i] = updatedEmployee;
      }
    }*/
    //localStorage.setItem('employees', JSON.stringify(employees));
    console.log(updatedEmployee.id); //for mongoDB appln make it _id
    //this._http.post("http://localhost:4200/medicine/edit/"+String(updatedEmployee.id),updatedEmployee)
    return new Promise((resolve, reject) => {
    this._http.post("http://localhost:4200/medicine/edit/"+String(updatedEmployee.id),updatedEmployee)//.subscribe(value=>employees=value,err => console.log(err)) ;
    .toPromise()
        .then(
          res => { // Success
           resolve(res);
          },
          msg => { // Error
          reject(msg);
          }
        )
    });
  }

  deleteEmployee(id: any) {
    /*let employees = JSON.parse(localStorage.getItem('employees'));
    for (let i = 0; i < employees.length; i++) {
      if (employees[i].id == id) {
        employees.splice(i, 1);
      }
    }
    localStorage.setItem('employees', JSON.stringify(employees));*/
    let temp = this._http.get("http://localhost:4200/medicine/delete/"+String(id));
    return temp;
  }
}
