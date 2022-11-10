import { Time } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../_model/user.model';
import { CodeService } from '../_services/code.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-code-compare',
  templateUrl: './code-compare.component.html',
  styleUrls: ['./code-compare.component.css']
})
export class CodeCompareComponent implements OnInit, OnDestroy {

  constructor(private codeService: CodeService, private userService: UserService,private router:Router) { }

  async ngOnInit() {
    this.userInfo=JSON.parse(localStorage.getItem("userInfo"));
    if(this.userInfo && this.userInfo.type=='regular'){
    
    this.reviewIndex = 0;
    this.initAll();

  }
  else
    this.router.navigate(['login']);
}

  async initAll() {
    this.started = false;
    this.addedTime = 0;
    this.rating = -1;
    this.submited = false;
    // this.codeService.getRandomMethods(this.user.username,this.user.finishedReviews).subscribe(k=>{
    //   this.m1=k["m1"];
    //   this.m2=k["m2"];
    // });
    await this.initMethodsCompare();
    this.userService.getUserByUsername(this.userInfo.username).subscribe((u:User)=>{
    this.startedReviews=u.startedReviews;
    this.finishedReviews=u.finishedReviews;
    if (this.choosenCode == -1) {//random
      if(this.methodsCompare.length>0){
      this.codeService.getMethodText(this.finishedReviews, this.methodsCompare, this.startedReviews, this.reviewIndex).subscribe(retObj => {
        if (retObj) {
          this.nothingLeftToCompare = false;
          this.m1 = retObj["m1"];
          this.m2 = retObj["m2"];
          this.reviewTime = retObj['time'];
          this.reviewIndex = retObj['reviewListIndex'];
          this.compareMethodsId = retObj['compareMethodsId'];
          this.codeId = retObj['codeId'];
          if (this.reviewTime == 0)
            this.firstTime = true;
        }
        else {
          console.log("Nemaa");
          this.nothingLeftToCompare = true;
        }
      });
    }
    else{
      this.nothingLeftToCompare=true;
    }

    }
    else {//selektovan kod
      this.codeService.getMethodTextForSelectedCode(this.finishedReviews, this.methodsCompare, this.choosenCode, this.startedReviews, this.reviewIndex).subscribe(retObj => {
        if (retObj) {
          this.nothingLeftToCompare = false;
          this.m1 = retObj["m1"];
          this.m2 = retObj["m2"];
          this.reviewTime = retObj['time'];
          this.compareMethodsId = retObj['compareMethodsId'];
          this.codeId = retObj['codeId'];
          this.reviewIndex = retObj['reviewListIndex'];
          if (this.reviewTime == 0)
            this.firstTime = true;
        }
        else {
          this.nothingLeftToCompare = true;
        }
      });
    }
  })
  }



  async initMethodsCompare() {
    return new Promise((res, rej) => {
      if (localStorage.getItem("chosenCode")) {
        this.choosenCode = JSON.parse(localStorage.getItem("chosenCode"));
        this.codeService.getMethodCombinationsForCode(this.choosenCode).subscribe((mc: Array<Object>) => {
          this.methodsCompare = mc;
          res(1);
        })
      } else {
        this.choosenCode = -1;
        this.codeService.getRandomList().subscribe((mc: Array<Object>) => {
          this.methodsCompare = mc;
          res(1);
        });
      }

    });
  }
  startedReviews:Array<any>
  finishedReviews:Array<any>
  nothingLeftToCompare: boolean;
  reviewIndex: number;
  firstTime: boolean;
  submited: boolean;
  reviewTime;
  addedTime;
  started: boolean;
  rating: number;
  userInfo: any;
  startedReviewIndex: number;
  methodsCompare: Array<object>
  choosenCode: number;
  m1: string;
  m2: string;
  codeId;
  compareMethodsId;

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
    this.reviewIndex=(this.reviewIndex+1)%this.methodsCompare.length;
    this.initAll();

  }

  saveTime() {
    if (this.started)
          this.reviewTime += ((performance.now() - this.addedTime) / 1000);
    if (this.reviewTime > 0) {
      if (!this.submited) {
        if (this.firstTime) {
          this.userService.addToStartedList(this.userInfo.username, this.codeId, this.compareMethodsId, this.reviewTime).subscribe((u: User) => {
  
          });
        }
        else {
          this.userService.updateStartedList(this.userInfo.username, this.codeId, this.compareMethodsId, this.reviewTime).subscribe((u: User) => {
          });
        }

      }
    }
  }


  ngOnDestroy() {
    if(this.userInfo && this.userInfo.type=='regular')
      this.saveTime();

  }

}


