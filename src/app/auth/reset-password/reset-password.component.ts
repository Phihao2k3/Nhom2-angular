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
  selector: 'ngx-reset-password',
  styleUrls: ['./reset-password.component.scss'],
  templateUrl:'./reset-password.component.html',
})
export class ResetPasswordComponent  {


  

 


}
