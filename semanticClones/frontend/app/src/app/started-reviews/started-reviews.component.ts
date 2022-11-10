import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../_model/user.model';
import { CodeService } from '../_services/code.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-started-reviews',
  templateUrl: './started-reviews.component.html',
  styleUrls: ['./started-reviews.component.css']
})
export class StartedReviewsComponent implements OnInit,OnDestroy {

  constructor(private userService:UserService, private codeService:CodeService, private router:Router) { }

  ngOnInit(): void {
    this.userInfo=JSON.parse(localStorage.getItem("userInfo"));
    if(this.userInfo && this.userInfo.type=='regular'){
    this.index=0;
    this.initAll();
  }
  else
    this.router.navigate(['login']);
  }
    
  initAll(){
    
    this.userService.getUserByUsername(this.userInfo.username).subscribe((u:User)=>{

      
    this.started = false;
    this.addedTime = 0;
    this.rating = -1;
    this.submited = false;
    this.startedReviewsList=u.startedReviews;
    if(this.startedReviewsList.length==0)
      this.nothingLeftToCompare=true;
    else{
      this.index=(this.index+1)%this.startedReviewsList.length;
    this.compareMethodsId=this.startedReviewsList[this.index].compareMethodsId;
    this.codeId=this.startedReviewsList[this.index].codeId;
    this.reviewTime=this.startedReviewsList[this.index].time;
    this.nothingLeftToCompare=false;
    this.userService.getMethodText(this.compareMethodsId,this.codeId).subscribe((retObj)=>{
        this.m1 = retObj["m1"];
        this.m2 = retObj["m2"];
    })
  }
})
}
  

  nothingLeftToCompare:boolean;
  startedReviewsList:Array<any>
  index:number;
  m1:string;
  m2:string;
  reviewTime;
  addedTime;
  userInfo:any;
  started:boolean;
  rating:number;
  codeId:number;
  compareMethodsId:number;
  submited:boolean;



  start() {
    this.started = true;
    this.addedTime = performance.now();

  }

  stop() {
    this.started = false;
    this.reviewTime += ((performance.now() - this.addedTime) / 1000);
  }
  rate(rating) {
    this.rating = rating;
  }

  confirm() {
    if (this.started)
      this.reviewTime += ((performance.now() - this.addedTime) / 1000);
    this.codeService.submitReview(this.userInfo.username, this.reviewTime, this.codeId, this.compareMethodsId, this.rating).subscribe((u: User) => {
      this.submited = true;
      this.initAll();
    })

  }

  next() {
    this.saveTime();
    this.index=(this.index+1)%this.startedReviewsList.length;
    this.initAll();

  }

  saveTime() {
    if (this.started)
          this.reviewTime += ((performance.now() - this.addedTime) / 1000);
  
      if (!this.submited) {
          this.userService.updateStartedList(this.userInfo.username, this.codeId, this.compareMethodsId, this.reviewTime).subscribe((u: User) => {
          });
      }
  }


  ngOnDestroy() {
    if(this.userInfo && this.userInfo.type=='regular')
      this.saveTime();

  }

}
