import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../_model/user.model';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private router:Router, private userService:UserService) { }

  ngOnInit(): void {
    this.userInfo=JSON.parse(localStorage.getItem('userInfo'));
    
  }

  login(){
    this.router.navigate(['login']);
  }
  register(){
    this.router.navigate(['register']);
  }

  adminHome(){
    this.router.navigate(['adminHome']);
  }
  addUser(){
    this.router.navigate(['addUser']);
  }
  logout(){
    this.userService.logout();
  }
  addNewCode(){
    this.router.navigate(['addCode']);
  }
  activeCodes(){
    this.router.navigate(['activeCodes']);
  }
  inactiveCodes(){
    this.router.navigate(['inactiveCodes']);
  }
  random(){
    localStorage.removeItem("chosenCode");
    this.router.navigate(['codeCompare']);
  }

  chooseFromExistingCodes(){
    this.router.navigate(['chooseCode']);
  }

  userHome(){
    this.router.navigate(['userHome']);
  }
  startedReviews(){
    this.router.navigate(['startedReviews']);
  }
  addNewUser(){
    this.router.navigate(['addUser']);
  }
  // async viewProfile(){
  //   await this.changePrio();
  //   console.log("mar")
  // }
  // async changePrio(){
  //   return new Promise((res,rej)=>{
  //     this.userService.login("123","123").subscribe(u=>{
  //       console.log("sel");
  //       res("123");
  //     });
  //   })
  // }

  userInfo:any;


}
