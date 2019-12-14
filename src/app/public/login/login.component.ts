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

  constructor(private router: Router) {}
  isAdmin: boolean;
  isTeacher: boolean;
  isStudent: boolean;
  ngOnInit() {}

  loginAdmin() {
    if (
      this.adminData.find(i => i.email === this.email) &&
      this.adminData.find(i => i.password === this.password)
    ) {
      console.log("Login Successfull");
      this.email = "";
      this.password = "";
      this.router.navigate(["/admin"]);
    } else {
      console.log("Their is something wrong");
    }
  }

  loginStudent() {
    if (
      this.adminData.find(i => i.email === this.email) &&
      this.adminData.find(i => i.password === this.password)
    ) {
      console.log("Login Successfull");
      this.email = "";
      this.password = "";
      this.router.navigate(["/student"]);
    } else {
      console.log("Their is something wrong");
    }
  }

  loginTeacher() {
    if (
      this.adminData.find(i => i.email === this.email) &&
      this.adminData.find(i => i.password === this.password)
    ) {
      console.log("Login Successfull");
      this.email = "";
      this.password = "";
      this.router.navigate(["/teacher"]);
    } else {
      console.log("Their is something wrong");
    }
  }
}
