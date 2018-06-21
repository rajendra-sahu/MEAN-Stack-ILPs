import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { Location } from "@angular/common";
import { EmployeesService } from "./employees.service";

import "rxjs/add/operator/map";

@Component({
    templateUrl: './employee.component.html',
    styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
    id: any;
    employee: any;
    
    constructor(private _employeeService: EmployeesService, private route: ActivatedRoute, private location: Location) {
    }

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            this.id = +params['id'];
        });
        this.employee = this._employeeService.getEmployee(this.id);
    }

    goBack(): void {
        this.location.back();
    }
}
