import { Component, OnInit } from '@angular/core';
import { AttendanceService } from 'app/@core/services/apis/attendance.service';
import { NbToastrService, NbComponentStatus, NbGlobalPhysicalPosition } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { IAttendance } from 'app/@core/interfaces/attendance.interface';
import { Router } from '@angular/router';
import { EmployeesService } from 'app/@core/services/apis/employees.service';
@Component({
  selector: 'app-attendance-list',
  templateUrl: './attendance-list.component.html',
  styleUrls: ['./attendance-list.component.scss']
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
        hide: true

      }, last_name: {
        title: 'Tên nhân viên',
        type: 'string',

      },
      employee_id: {
        title: 'Mã nhân viên',
        type: 'string',
        hide: true
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
    private EmployeesService: EmployeesService
  ) {
    console.log(this.data);

  }

  ngOnInit(): void {
    this.getall_Attendance();



  }

  getall_Attendance() {
    this.attendanceService.getallAttendances().subscribe(res => {
      this.attenDance = res.attendance;
      this.data = this.attenDance;
      this.data.forEach((e) => {
        e.date = this.formatDate(e.date)
      })
    },
      (err) => {
        console.log(err);
      }
    )
  }


  private showToast(status: NbComponentStatus, title: string, message: string): void {
    this.toastrService.show(message, title, { status, position: NbGlobalPhysicalPosition.TOP_RIGHT });
  }
  formatDate(date: string): string {
    const d = new Date(date);
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  }
  searchUser(e) {
    console.log(e.target.value);
    this.EmployeesService.timkiem(e.target.value).subscribe((data) => {
      this.Employeesdata = data.employees

    })
  }
  attendance(id, name, storeid) {
    this.Employeesdata = []
    let currentDate = new Date();
    let att = {
      employee_id: id,
      store_id: storeid,
      date: currentDate,
      check_in_time: this.formatTime(currentDate), // Call function to format time
      message: ''
    };
    this.attendanceService.createAttendance(att).subscribe((data) => {
      this.getall_Attendance()
    })

  }
  formatTime(date) {
    // Format the time as HH:mm:ss
    return `${this.padZero(date.getHours())}:${this.padZero(date.getMinutes())}:${this.padZero(date.getSeconds())}`;
  }
  padZero(num) {
    return (num < 10 ? '0' : '') + num;
  }


}



