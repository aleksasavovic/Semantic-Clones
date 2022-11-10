import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from '../_model/user.model';
import { CodeService } from '../_services/code.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  constructor(private codeService: CodeService, private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (!(this.userInfo && this.userInfo.type == 'admin'))
      this.router.navigate(['login']);

  }
  userInfo: any;
  activeCodes() {
    this.router.navigate(['activeCodes']);
  }
  inactiveCodes() {
    this.router.navigate(['inactiveCodes']);
  }
  addCode() {
    this.router.navigate(['addCode']);
  }
  addNewUser(){
    this.router.navigate(['addUser']);
  }



}
