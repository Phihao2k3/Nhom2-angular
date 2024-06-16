import { Component, OnInit } from '@angular/core';
import { AttendanceService } from 'app/@core/services/apis/attendance.service';
import {
  NbToastrService,
  NbComponentStatus,
  NbGlobalPhysicalPosition,
} from '@nebular/theme';

import { LocalDataSource } from 'ng2-smart-table';
import { IAttendance } from 'app/@core/interfaces/attendance.interface';
import { Router } from '@angular/router';
import { EmployeesService } from 'app/@core/services/apis/employees.service';
import { ButtonComponent } from '../button/button.component';
import { LocalStorageService } from 'app/@core/services/common';
import { UserService } from 'app/@core/services/apis/user.service';
@Component({
  selector: 'app-attendance-list',
  templateUrl: './attendance-list.component.html',
  styleUrls: ['./attendance-list.component.scss'],
})
export class AttendanceListComponent implements OnInit {
  attenDance: IAttendance[] = [];
  data = [];
  Employeesdata = [];
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
      attendance_id: {
        title: 'Mã chấm công',
        type: 'string',
        hide: true,
      },
      last_name: {
        title: 'Tên nhân viên',
        type: 'string',
      },
      employee_id: {
        title: 'Mã nhân viên',
        type: 'string',
        hide: true,
      },
      store_id: {
        title: 'Mã cửa hàng',
        type: 'string',
      },
      date: {
        title: 'Ngày',
        type: 'date',
      },
      check_in_time: {
        title: 'Giờ vào',
        type: 'time',
      },
      check_out_time: {
        title: 'Giờ ra',
        type: 'time',
      },
      message: {
        title: 'Ghi chú',
        type: 'string',
      },
      status: {
        title: 'Trạng thái',
        type: 'string',
        rowClassFunction: (row) => {
          if (row.data.status == 'Chờ duyệt từ quản lý') {
            return 'text-danger';
          }
          if (row.data.status == 'Đã chấm công') {
            return 'text-success';
          }
        }
      },
      detail: {
        title: 'Chi tiết',
        type: 'custom',
        renderComponent: ButtonComponent,
        filter: false,
        sort: false,
      },
    },
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
  };

  constructor(
    private attendanceService: AttendanceService,
    private toastrService: NbToastrService,
    private Router: Router,
    private EmployeesService: EmployeesService,
    private localStorageService: LocalStorageService,
    private userService: UserService
  ) {
    console.log(this.data);
  }

  ngOnInit(): void {
    this.getall_Attendance();
  }

  getall_Attendance() {
    this.attendanceService.getallAttendances().subscribe(
      (res) => {
        this.attenDance = res.attendance;
        this.data = this.attenDance;
        this.data.forEach((e) => {
          e.date = this.formatDate(e.date);
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  private showToast(
    status: NbComponentStatus,
    title: string,
    message: string
  ): void {
    this.toastrService.show(message, title, {
      status,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
    });
  }
  formatDate(date): string {
    const d = new Date(date);
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  }
  searchUser(e) {
    this.EmployeesService.timkiem(e.target.value).subscribe((data) => {
      this.Employeesdata = data.employees;
    });
  }
  attendance(id, name, storeid) {
    this.attendanceService.checkatt(id).subscribe((data) => {
      if (data.status) {
        this.showToast('warning', 'Thông báo', 'Bạn đã chấm công rồi');
        return;
      } else {
        console.log('chưa có');
        let time_start_work = new Date();
        let time_end_work = new Date();
        time_start_work.setHours(7);
        time_start_work.setMinutes(30);
        time_start_work.setSeconds(0);
        time_end_work.setHours(17);
        time_end_work.setMinutes(50);
        time_end_work.setSeconds(0);
        let time_now = new Date();
        this.Employeesdata = [];

        if (time_now < time_start_work) {
          this.showToast('warning', 'Thông báo', 'Chưa đến giờ làm việc');
          return;
        }
        if (time_now > time_end_work) {
          this.showToast('warning', 'Thông báo', 'Đã quá giờ làm việc');
          return;
        }
        if (this.checktimeover(time_start_work.getHours(), time_now)) {
          this.showToast('warning', 'Thông báo', 'Đã quá giờ làm việc');
          let att = {
            employee_id: id,
            store_id: storeid,
            date: this.formatDate(time_now), // Call function to format date
            check_in_time: this.formatTime(time_now), // Call function to format time
            message: 'Muộn hơn 30 phút +',
            status: 'Chờ duyệt từ quản lý',
          };
          this.attendanceService.createAttendance(att).subscribe((data) => {
            this.showToast(
              'danger',
              'Thông báo',
              'bạn đã chấm công thành công'
            );

            this.getall_Attendance();
          });
          return;
        } else {
          let att = {
            employee_id: id,
            store_id: storeid,
            date: this.formatDate(time_now), // Call function to format date
            check_in_time: this.formatTime(time_now), // Call function to format time
            message: 'Chấm công đúng giờ +',
            status: 'Đã chấm công',
          };
          this.attendanceService.createAttendance(att).subscribe((data) => {
            this.showToast(
              'success',
              'Thông báo',
              'bạn đã chấm công thành công'
            );
            this.getall_Attendance();
          });
          return;
        }
      }
    });
  }
  formatTime(date) {
    // Format the time as HH:mm:ss
    return `${this.padZero(date.getHours())}:${this.padZero(
      date.getMinutes()
    )}:${this.padZero(date.getSeconds())}`;
  }
  padZero(num) {
    return (num < 10 ? '0' : '') + num;
  }
  checkout(data) {
    if (data.status == 'Chờ duyệt từ quản lý') {
      this.showToast('warning', 'Thông báo', 'Chưa được duyệt');
      return;
    } else if (data.check_out_time != null) {
      this.showToast('warning', 'Thông báo', 'Đã kết thúc phiên làm việc');
      return;
    } else {
      let time_end_work = new Date();
      time_end_work.setHours(17);
      time_end_work.setMinutes(50);
      time_end_work.setSeconds(0);
      let currentDate = new Date();
      let time_now = this.formatTime(currentDate);
      let time_end = this.formatTime(time_end_work);

      if (time_now > time_end) {
        let att = {
          attendance_id: data.attendance_id,
          employee_id: data.employee_id,
          store_id: data.store_id,
          date: data.date,
          check_in_time: data.check_in_time,
          check_out_time: this.formatTime(currentDate),
          message: data.message,
          status: data.status,
        };

        this.showToast('warning', 'Thông báo', 'cảm ơn bạn đã làm việc');

        if (this.checktimeover(time_end_work.getHours(), currentDate)) {
          att.message += 'kết ca muộn 30 phút +';
          att.status = 'Chờ duyệt từ quản lý';
          this.attendanceService
            .updateAttendance(data.attendance_id, att)
            .subscribe(
              (data) => {
                this.getall_Attendance();
              },
              (err) => {
                console.log(err);
              }
            );
        } else {
          this.attendanceService
            .updateAttendance(data.attendance_id, att)
            .subscribe(
              (data) => {
                this.getall_Attendance();
              },
              (err) => {
                console.log(err);
              }
            );
        }
      } else {
        this.showToast('warning', 'Thông báo', 'Chưa đến giờ kết thúc');
        this.showToast('warning', 'Thông báo', 'vui lòng chờ đến 17h30');
      }
    }
  }
  checktimeover(time_start, time_now) {
    let time_start_work: any = new Date();
    time_start_work.setHours(time_start);
    time_start_work.setMinutes(0);
    time_start_work.setSeconds(0);
    let diffInMilliseconds = time_now - time_start_work;
    let diffInMinutes = diffInMilliseconds / 1000 / 60;

    // Kiểm tra nếu trễ hơn 30 phút
    if (diffInMinutes > 30) {
      return true;
    } else {
      return false;
    }
  }
  editProduct(data) {
    this.userService
      .getUserById(this.localStorageService.getItem('user_id'))
      .subscribe((data2) => {
        if (data2.users[0].role == 0) {
          this.Router.navigate([
            '/pages/attendance/attendance-update/',
            data.attendance_id,
          ]);
        }else{
          this.showToast('warning', 'Thông báo', 'Bạn không có quyền sửa');
        }
      });
  }
}
