import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from '../_model/user.model';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(private router: Router, private userService: UserService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (this.userInfo && this.userInfo.type == 'admin')
      this.username = this.password = this.email = this.firstName = this.lastName = '';
    else
      this.router.navigate(['login']);
  }
  userInfo: any;
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  msg: string;

  addNew() {
    this.msg = '';
    if (this.username == '' || this.password == '' || this.email == '' || this.firstName == '' || this.lastName == '') {
      this.msg = 'please fill all required fields';
      this.snackBar.open(this.msg, 'Dismiss');

    }
    else if (!this.checkMailFormat(this.email)) {
      this.msg = 'invalid e-mail format';
      this.snackBar.open(this.msg, 'Dismiss');
    }
    else {
      this.userService.register(this.firstName, this.lastName, this.username, this.password, this.email, 'regular').subscribe(registerInfo => {
        this.msg = registerInfo['msg'];
        if (this.msg != '') {
          this.snackBar.open(this.msg, 'Dismiss');
        }
        else {
          this.snackBar.open("User successfully added", 'Dismiss');
          this.router.navigate(['adminHome']);
        }
      })
    }

  }
  checkMailFormat(email: string): boolean {
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return regex.test(email);
  }


}
