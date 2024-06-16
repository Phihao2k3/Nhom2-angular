import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NbToastrService, NbGlobalPhysicalPosition } from '@nebular/theme';
import { ActivatedRoute } from '@angular/router';
import { AttendanceService } from 'app/@core/services/apis/attendance.service';

@Component({
  selector: 'app-attendance-update',
  templateUrl: './attendance-update.component.html',
  styleUrls: ['./attendance-update.component.scss'],
})
export class AttendanceUpdateComponent implements OnInit {
  formattendanceUpdate: FormGroup;
  id: number;
  constructor(
    private route: ActivatedRoute,
    private attendanceService: AttendanceService,
    private toastrService: NbToastrService,


  ) {
    this.id = route.snapshot.params.id;
    this.formattendanceUpdate = new FormGroup({
      employee_id: new FormControl('', Validators.required),
      store_id: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      check_in_time: new FormControl('', Validators.required),
      check_out_time: new FormControl('', Validators.required),
      message: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
    });
    this.attendanceService.getAttendanceById(this.id).subscribe((data) => {
      console.log(data);
      data.attendance[0].date = this.formatDate(data.attendance[0].date);
      this.formattendanceUpdate.patchValue(data.attendance[0]);
    });
  }

  ngOnInit(): void {}
  onSubmit() {
    this.attendanceService
      .updateAttendance(this.id, this.formattendanceUpdate.value)
      .subscribe((data) => {
        this.toastrService.show('', `Cập nhật thành công`, {
          status: 'success',
          position: NbGlobalPhysicalPosition.TOP_RIGHT,
        });
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
