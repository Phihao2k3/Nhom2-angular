import { Component, Input, OnInit } from '@angular/core';
import { NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { EmployeesService } from 'app/@core/services/apis/employees.service';
import {
  NbToastrService,
  NbComponentStatus,
  NbGlobalPhysicalPosition,
} from '@nebular/theme';
@Component({
  selector: 'ngx-tree-grid',
  templateUrl: './employees-list.compoment.html',
  styleUrls: ['./employees-list.compoment.scss'],
})
export class EmployeeslistComponent implements OnInit {
  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,

    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
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
      email	: {
        title: 'Email',
      },
      phone_number: {
        title: 'Số điện thoại',
      }
      , hire_date: {
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
    
      },
      
      


    },
    actions: {
      // Define actions column
      title: 'Actions',
      type: 'html',
      filter: false,
      sort: false,
      add: false,
    },
  };

  data = [


  ];

  constructor(private EmployeesService: EmployeesService,
    private toastrService: NbToastrService
  ) { }

  ngOnInit(): void {
    this.getEmpoyees()
  }

  getEmpoyees() {
    this.EmployeesService.getallEmployees().subscribe(
      (res) => {
        res.employees.forEach((e) => {
          e.hire_date = e.hire_date.split('T')[0]
        })
        this.data = res.employees


        console.log(this.data);
      },
      (err) => {
        console.log(err);
      }
    )
  }
  onSaveConfirm(event) {
    this.EmployeesService.updateEmployees(event.data.employee_id, event.newData).subscribe(
      (res) => {
        this.showToast('success', 'Thành công', 'Sửa thành công');
        this.getEmpoyees();
      },
      (err) => {
        this.showToast('danger', 'Thất bại', 'Sửa thất bại');

      },
    )
  }

  onDeleteConfirm(event) {
    if (window.confirm('Bạn có chắc chắn muốn xóa không?')) {
      let id = event.data.employee_id;
      this.EmployeesService.deleteEmployees(id).subscribe((res) => {
          this.showToast('success', 'Thành công', 'Xóa loại thành công');
          this.getEmpoyees();
        },
        (err) => {
          this.showToast('danger', 'Thất bại', 'Xóa loại thất bại');
        },
          
        );
      }
    }






  private showToast(status: NbComponentStatus, title: string, message: string) {
    this.toastrService.show(message, title, {
      status,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
    });
  }
}

