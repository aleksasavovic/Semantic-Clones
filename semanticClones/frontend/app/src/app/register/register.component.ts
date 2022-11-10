import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from '../_model/user.model';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router, private userService: UserService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    var user:User=JSON.parse(localStorage.getItem("user"));
    if(user==null){
    this.username = this.password = this.pwRepeat = this.email = this.firstName = this.lastName = '';
    this.hide = this.hideRepeat = true;
    }
    else{
      if(user.type=='admin')
        this.router.navigate(['adminHome']);
      else if(user.type=='regular')
        this.router.navigate(['userHome']);
      
    }
  }

  username: string;
  password: string;
  pwRepeat: string;
  hide: boolean;
  hideRepeat: boolean;
  firstName: string;
  lastName: string;
  email: string;
  msg: string;

  login() {
    this.router.navigate(['']);
  }
  register() {
    this.msg='';
    if (this.username == '' || this.password == '' || this.email == '' || this.firstName == '' || this.lastName == '' || this.pwRepeat == '') {
      this.msg = 'please fill all required fields';
      this.snackBar.open(this.msg, 'Dismiss');
    }
    else {
      if (this.password != this.pwRepeat) {
        this.msg = "passwords don't match";
        this.snackBar.open(this.msg, 'Dismiss');
      }
      else if (!this.checkMailFormat(this.email)) {
        this.msg = 'invalid e-mail format';
        this.snackBar.open(this.msg, 'Dismiss');
      }
      else {
        this.userService.register(this.firstName,this.lastName,this.username,this.password,this.email,'regular').subscribe(registerInfo=>{
          this.msg=registerInfo['msg'];
          if(this.msg!=''){
            this.snackBar.open(this.msg, 'Dismiss');
          }
          else{
            this.snackBar.open("Account successfully created",'Dismiss');
            this.router.navigate(['login']);
          }
        })
      }
    }
  }

  checkMailFormat(email: string): boolean {
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return regex.test(email);
  }

}
