import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from '../_model/user.model';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private userService:UserService,  private snackBar: MatSnackBar) { }

  ngOnInit(): void {


    var user:any=JSON.parse(localStorage.getItem("userInfo"));
    if(user==null){
    this.username='';
    this.password='';
    this.hide=true ;
  }
  else{
    if(user.type=='admin')
      this.router.navigate(['adminHome']);
    else if(user.type=='regular')
      this.router.navigate(['userHome']);
  }
}

  username:string;
  password:string;
  hide:boolean;

  login(){
    if(this.username=='' || this.password==''){
      this.snackBar.open("please fill all required fields",'Dismiss');
    }
    else{
      this.userService.login(this.username,this.password).subscribe((u:User)=>{
        if(!u){
          this.snackBar.open("invalid data",'Dismiss');
        }
        else{
          var userInfo={
            username:u.username,
            type:u.type
          }
          localStorage.setItem('userInfo',JSON.stringify(userInfo));
          console.log(u.type);
          if(u.type=='admin')
            this.router.navigate(['adminHome']);
          else if(u.type=='regular'){
            this.router.navigate(['userHome']);
          }
          
        }
      })
    }
  }
  
  register(){
    this.router.navigate(['register']);
  }

  /**/

}
