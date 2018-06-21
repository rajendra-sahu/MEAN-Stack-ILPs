import { Routes, RouterModule } from '@angular/router';

import {AboutComponent} from './about/about.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeComponent } from './employees/employee.component';
import { AddEmployeeFormComponent } from './employees/addemployee-form.component';
import { EditEmployeeFormComponent } from './employees/editemployee-form.component';

const appRoutes: Routes = [
  { path: '', component: AboutComponent },
  { path: 'employees', component: EmployeesComponent },
  { path: 'employees/:id', component: EmployeeComponent },
  { path: 'addEmployee', component: AddEmployeeFormComponent},
  { path: 'editEmployee/:id', component: EditEmployeeFormComponent}
];

export const routing = RouterModule.forRoot(appRoutes);
