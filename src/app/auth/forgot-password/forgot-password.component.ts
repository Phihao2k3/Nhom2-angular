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
  selector: 'ngx-forgot-password',
  styleUrls: ['./forgot-password.component.scss'],
  templateUrl:'./forgot-password.component.html',
})
export class ForgotPasswordComponent implements OnInit {
  forgot_password: FormGroup;
  alertMessages: IAlertMessage[] = [];

  constructor(
    private router: Router,
    private spinner: SpinnerService,
    private auth: AuthService,
    private storageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.forgot_password = new FormGroup({
      email: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    if (this.forgot_password.valid) {
      this.router.navigate([ROUTER_CONFIG.pages]).then();
      this.auth
        .forgotPassword(this.forgot_password.value)
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
