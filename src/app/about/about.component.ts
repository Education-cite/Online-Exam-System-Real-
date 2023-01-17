import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit{


  public loginData = {
    username: '',
    password: ''
  };

  constructor(private snack: MatSnackBar, private loginService: LoginService,private router:Router){}

  ngOnInit(): void {

  }


  
  formSubmit() {
    console.log("login form submitted");

    if (this.loginData.username.trim() == '' || this.loginData.username == null) {

      this.snack.open("User name is required", "", {
        duration: 3000,
      });
      return;
    }
    if (this.loginData.password.trim() == '' || this.loginData.password == null) {

      this.snack.open("Password is required", "", {
        duration: 3000,
      });
      return;
    }

    this.loginService.generateToken(this.loginData).subscribe(
      (data: any) => {
        console.log("Successfull.. ");
        console.log(data);


        //login

        this.loginService.loginUser(data.token);

        this.loginService.getCurrentUser().subscribe(
          (user: any) => {
            this.loginService.setUser(user);
            console.log(user);

            //rediret  to admin or normal dashboard

            if (this.loginService.getUserRole() == "ADMIN") {

              //admin dash
              //window.location.href = "/admin";
              this.router.navigate(['admin']);
              this.loginService.loginStatusSubject.next(true);
            } else if (this.loginService.getUserRole() == "NORMAL") {

              //usr dash
             // window.location.href = "/user-dashboard";
            this.router.navigate(['user-dashboard']);
            this.loginService.loginStatusSubject.next(true);

            } else {
              this.loginService.logout();
            }

          }
        )

      },
      (error) => {
        console.log(error);
        console.log("Error !-");
        this.snack.open("Login Faild !! Try again", "", {
          duration: 3000
        });
      }
    )

  }

}
