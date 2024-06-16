import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'app/@core/services/apis/user.service';
import { IUsers } from 'app/@core/interfaces/users.interface';
import { NbToastrService, NbComponentStatus, NbGlobalPhysicalPosition } from '@nebular/theme';
import { SpinnerService } from 'app/@theme/components/spinner/spinner.service';


@Component({
  selector: 'ngx-tree-grid',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss'],
})
export class UpdateUserComponent implements OnInit {
  formUpdateUser: FormGroup;
  id: number;
  user: IUsers;

  ngOnInit(): void {
  }

  constructor(
    private user_service: UserService,
    private activatedRoute: ActivatedRoute,
    private toastrService: NbToastrService,
    private spinner: SpinnerService,
    private router: Router
  ) {

    this.id = this.activatedRoute.snapshot.params.id;

    this.formUpdateUser = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      first_name: new FormControl('', Validators.required),
      last_name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      updated_at: new FormControl('', Validators.required),
    });

    this.spinner.show();

    this.user_service.getUserById(this.id).subscribe((data) => {
      this.spinner.hide();

      this.user = data.users[0];
      console.log(this.user.email);
      

      this.formUpdateUser.patchValue({ 
        username: this.user.username,
        password: this.user.password,
        first_name: this.user.first_name,
        last_name: this.user.last_name,
        email: this.user.email,
        updated_at: this.formatDate(this.user.updated_at)
      });
    });
  }


  onSubmit() {
    if (this.formUpdateUser.valid) {
      this.spinner.show();
      this.user_service.updateUser(this.id, this.formUpdateUser.value).subscribe(
        (data) => {
          this.spinner.hide();
          this.showToast('success', 'Thành công', 'Cập nhật người dùng thành công!');
          this.router.navigate(['/pages/user/listuser/']);
        },
        (error) => {
          this.spinner.hide();
          this.showToast('danger', 'Thất bại', 'Cập nhật người dùng thất bại!');
        }
      );
    } else {
      this.showToast('danger', 'Thất bại', 'Vui lòng điền đầy đủ thông tin!');
    }
  }

  formatDate(date: string): string {
    const d = new Date(date);
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  }

  private showToast(status: NbComponentStatus, title: string, message: string) {
    this.toastrService.show(message, title, {
      status,
      position: NbGlobalPhysicalPosition.TOP_RIGHT
    })
  }

  data = [];
}

