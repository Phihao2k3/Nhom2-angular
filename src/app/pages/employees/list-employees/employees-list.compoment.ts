import { Component, Input, OnInit } from '@angular/core';
import {
  NbSortDirection,
  NbSortRequest,
  NbTreeGridDataSource,
  NbTreeGridDataSourceBuilder,
} from '@nebular/theme';
import { StoreService } from 'app/@core/services/apis/store.service';
import { EmployeesService } from 'app/@core/services/apis/employees.service';
import {
  NbToastrService,
  NbComponentStatus,
  NbGlobalPhysicalPosition,
} from '@nebular/theme';
import { ButtonComponent } from '../button/button.component';
import { Router } from '@angular/router';
@Component({
  selector: 'ngx-tree-grid',
  templateUrl: './employees-list.compoment.html',
  styleUrls: ['./employees-list.compoment.scss'],
})
export class EmployeeslistComponent implements OnInit {
  settings = {
    columns: {
      index: {
        title: 'STT',
        type: 'number',
        filter: false,
        editable: false,
        addable: false,
        valuePrepareFunction: (value, row, cell) => {
          return cell.row.index + 1;
        },
      },
      employee_id: {
        title: 'ID',
        hide: true,
      },
      first_name: {
        title: 'Tên',
      },
      last_name: {
        title: 'Họ',
      },
      email: {
        title: 'Email',
      },
      phone_number: {
        title: 'Số điện thoại',
      },
      hire_date: {
        title: 'Ngày',
      },
      job_title: {
        title: 'Công việc',
      },
      salary: {
        title: 'Lương',
      },
      store_id: {
        title: 'Store',
        hide: true,
      },
      store_name: {
        title: 'Cửa hàng',
      },
      customColumn: {
        title: '',
        type: 'custom',
        renderComponent: ButtonComponent,
        filter: false,
        sort: false,
      },
    },
    actions: {
      title: 'Actions',
      type: 'custom',
      position: 'right',
      add: false,
      edit: false,
      delete: false,
      selector: false,
    },
  };

  data = [];

  constructor(
    private EmployeesService: EmployeesService,
    private toastrService: NbToastrService,
    private router: Router,
    private store: StoreService
  ) {}

  ngOnInit(): void {
    this.getEmpoyees();
  }

  getEmpoyees() {
    this.EmployeesService.getallEmployees().subscribe(
      (res) => {
        res.employees.forEach((e) => {
          e.hire_date = e.hire_date.split('T')[0];
          e.salary = e.salary.toLocaleString('it-IT', {
            style: 'currency',
            currency: 'VND',
          });
        });
        this.data = res.employees;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  onSaveConfirm(event) {
    this.router.navigate([
      '/pages/employees/employees-update/',
      event.employee_id,
    ]);
  }

  onDeleteConfirm(event) {
    this.EmployeesService.deleteEmployees(event.employee_id).subscribe(
      (res) => {
        this.getEmpoyees();
      },
      (err) => {
        this.showToast('danger', 'Thất bại', 'Xóa loại thất bại');
      }
    );
  }

  private showToast(status: NbComponentStatus, title: string, message: string) {
    this.toastrService.show(message, title, {
      status,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
    });
  }
}
