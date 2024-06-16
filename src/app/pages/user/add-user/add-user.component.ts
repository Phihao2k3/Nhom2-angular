import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/@core/services/apis/user.service';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NbToastrService, NbComponentStatus, NbGlobalPhysicalPosition } from '@nebular/theme';
import * as bcrypt from 'bcryptjs';
@Component({
  selector: 'ngx-form-inputs',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  formAddUser: FormGroup;

  constructor(private user: UserService, private router: Router, private toastrService: NbToastrService) {
    this.formAddUser = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      first_name: new FormControl('', Validators.required),
      last_name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      created_at: new FormControl('', Validators.required),
    })
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.formAddUser.valid) {
      const user = {...this.formAddUser.value};

      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(user.password, salt);
      user.password = hashedPassword;

      this.user.createUser(user).subscribe((res) => {
        this.showToast('success', 'Thành công', 'Thêm thành công');
        this.router.navigate(['/pages/user/listuser'])
      },
        (err) => {
          console.log(err);
        }
      )
    }
    else {
      this.showToast('success', 'Thất bại', 'Vui lòng điền đủ thông tin!');
    }
    console.log(this.formAddUser.value);
  }

  private showToast(status: NbComponentStatus, title: string, message: string) {
    this.toastrService.show(message, title, {
      status,
      position: NbGlobalPhysicalPosition.TOP_RIGHT
    })
  }
}
