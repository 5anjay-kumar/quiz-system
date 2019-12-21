import { constants } from './../../app.constants';
import { EmitterService } from './../../core/services/emitter.service';
import { LoginUser } from "./../../core/model/login-user";
import { AppService } from "./../../core/services/app.service";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from "@angular/forms";
import { AuthService } from "./../../core/services/auth.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  adminData = [
    {
      email: "test",
      password: "test"
    }
  ];

  email: string;
  password: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder,
    private emitterService: EmitterService
  ) {}
  isAdmin: boolean;
  isTeacher: boolean;
  isStudent: boolean;
  loginForm: FormGroup;

  ngOnInit() {
    this.loadLoginForm();
  }

  loadLoginForm() {
    this.loginForm = this.fb.group({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    });
  }

  login(loginAs: string) {
    AppService.markAsDirty(this.loginForm);
    if (!this.loginForm.valid) {
      return;
    }
    const data = this.loginForm.value;
    data.loginAs = loginAs;
    this.authService.login(data).subscribe((loginUser: LoginUser) => {
      console.log(loginUser);
      const landingPage = AppService.getDefaultRouteForLoggedInUser(loginUser);
      this.emitterService.emit(constants.events.loadLoggedInUser);
      this.router.navigate([landingPage]);
    });
  }
}
