import { Component } from '@angular/core';
import { EmployeesService } from 'app/@core/services/apis/employees.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; // Sử dụng FormBuilder để tạo FormGroup
import { IEmployee } from 'app/@core/interfaces/employee.interface';
import {
  NbToastrService,
  NbComponentStatus,
  NbGlobalPhysicalPosition,
} from '@nebular/theme';
import { StoreService } from 'app/@core/services/apis/store.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-update-employees',
  templateUrl: './update-employees.component.html',
  styleUrls: ['./update-employees.component.scss'],
})
export class UpdateEmployeesComponent {
  formEmployeesUpdate: FormGroup;
  id: number;
  storelist: { store_id: number; store_name: string }[] = [];

  constructor(
    private Emp: EmployeesService,
    private router: Router,
    private toastrService: NbToastrService,
    private formBuilder: FormBuilder,
    private store: StoreService,
    private activatedRoute: ActivatedRoute
  ) {
    this.id = this.activatedRoute.snapshot.params.id;
    this.formEmployeesUpdate = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      hire_date: ['', Validators.required],
      job_title: ['', Validators.required],
      salary: ['', [Validators.required, Validators.min(0)]],
      store_id: ['', Validators.required],
    });

    this.getStore();
    this.Emp.ById(this.id).subscribe((data) => {
      this.formEmployeesUpdate.patchValue({
        first_name: data.employees[0].first_name,
        last_name: data.employees[0].last_name,
        email: data.employees[0].email,
        phone_number: data.employees[0].phone_number,
        hire_date: this.formatDate(data.employees[0].hire_date),
        job_title: data.employees[0].job_title,
        salary: data.employees[0].salary,
        store_id: data.employees[0].store_id,
      });
    });
  }

  onSubmit() {
    if (this.formEmployeesUpdate.valid) {
      this.Emp.updateEmployees(this.id,this.formEmployeesUpdate.value).subscribe(
        (res) => {
          this.showToast('success', 'Thành công', 'Cập nhật nhân viên thành công');
          this.router.navigate(['pages/employees/listEmployees']);
        },
        (err) => {
          console.log(err);
          this.showToast('danger', 'Thất bại', 'Cập nhật nhân viên thất bại');
        }
      );
    } else {
      this.showToast(
        'danger',
        'Lỗi',
        'Vui lòng điền đầy đủ thông tin cần thiết'
      );
    }
  }

  getStore() {
    this.store.getAllStore().subscribe(
      (res) => {
        this.storelist = res.stores;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  private showToast(status: NbComponentStatus, title: string, message: string) {
    this.toastrService.show(message, title, {
      status,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
    });
  }
  formatDate(date: string): string {
    const d = new Date(date);
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  }
}
