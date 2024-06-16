import { NgModule } from "@angular/core";
import { AuthRoutingModule } from "./auth-routing.module";
import { LoginModule } from "./login/login.module";
import { AuthComponent } from "./auth.component";
import { ThemeModule } from "../@theme/theme.module";
import { ForgotPasswordModule } from "./forgot-password/forgot-password.module";
import { ResetPasswordModule } from "./reset-password/reset-password.module";

@NgModule({
  imports: [
    AuthRoutingModule,
    LoginModule,
    ThemeModule,
    ForgotPasswordModule,
    ResetPasswordModule
  ],
  declarations: [
    AuthComponent
  ]
})
export class AuthModule {
}
