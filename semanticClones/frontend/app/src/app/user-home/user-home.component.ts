import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../_model/user.model';
import { CodeService } from '../_services/code.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {

  constructor(private router:Router, private codeService:CodeService) { }

  ngOnInit(): void {
    this.userInfo=JSON.parse(localStorage.getItem("userInfo"));
    if(!(this.userInfo && this.userInfo.type=='regular'))
      this.router.navigate(['login']);
  }
  userInfo:any;

  random(){
    localStorage.removeItem('chosenCode');
    this.router.navigate(['codeCompare']);
    // this.codeService.getRandomMethods(this.user.username,this.user.finishedReviews).subscribe(k=>{

    // })
  }
  selected(){
    this.router.navigate(['chooseCode']);
  }

  continue(){
    this.router.navigate(['startedReviews']);
  }

}
