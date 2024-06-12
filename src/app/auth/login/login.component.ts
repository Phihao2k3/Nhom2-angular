import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SpinnerService } from '../../@theme/components/spinner/spinner.service';
import { AuthService } from '../../@core/services/apis';
import { LocalStorageService } from '../../@core/services/common';
import { LOCALSTORAGE_KEY, ROUTER_CONFIG } from '../../@core/config';
import { IAlertMessage } from '../../@theme/components/alert/ngx-alerts.component';
import { finalize } from 'rxjs';

@Component({
  selector: 'ngx-login',
  styleUrls: ['./login.component.scss'],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  alertMessages: IAlertMessage[] = [];

  constructor(
    private router: Router,
    private spinner: SpinnerService,
    private auth: AuthService,
    private storageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.router.navigate([ROUTER_CONFIG.pages]).then();
      this.auth
        .login(this.loginForm.value)
        .pipe(
          finalize(() => {
            this.spinner.hide();
          })
        )
        .subscribe({
          next: this.handleLoginSuccess.bind(this),
          error: this.handleLoginFailed.bind(this),
        });
    }

  }

  protected handleLoginSuccess(res) {
    // let user = res.users[0];

    this.storageService.setItem(LOCALSTORAGE_KEY.user_id,res.users[0].user_id);
    this.storageService.setItem(LOCALSTORAGE_KEY.username,res.users[0].username);
    this.storageService.setItem(LOCALSTORAGE_KEY.first_name,res.users[0].first_name);
    this.storageService.setItem(LOCALSTORAGE_KEY.last_name,res.users[0].last_name);
    this.storageService.setItem(LOCALSTORAGE_KEY.email,res.users[0].email);

    this.storageService.setItem(LOCALSTORAGE_KEY.token, res.token);

    this.router.navigate(['/pages/dashboard'],{}).then();
    this.spinner.hide();
  }

  protected handleLoginFailed() {
    this.spinner.hide();
    this.alertMessages = [
      { status: 'danger', message: 'Tài khoản hoặc mật khẩu không chính xác' },
    ];
  }


}
