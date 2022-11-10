import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Code } from '../_model/code.model';
import { User } from '../_model/user.model';
import { CodeService } from '../_services/code.service';

@Component({
  selector: 'app-view-code',
  templateUrl: './view-code.component.html',
  styleUrls: ['./view-code.component.css']
})
export class ViewCodeComponent implements OnInit {

  constructor(private codeService:CodeService,private router:Router) { }

  async ngOnInit() {
    this.userInfo=JSON.parse(localStorage.getItem("userInfo"));
   
    if(!this.userInfo || this.userInfo.type=='regular' || JSON.parse(localStorage.getItem("viewCode"))==null)
      this.router.navigate(['login']);
    else{
    this.codeId=JSON.parse(localStorage.getItem("viewCode"));
    this.index=0;
    this.initAll();
    
    }
  }

  async initAll(){
    await this.initMethodsCompare();
    this.rating=0;
    this.averageReviewTime=0;
    this.numberOfReviews=0;
    this.methodCombinations=this.code.methodsCombinations;
    var methodCombination:any=this.methodCombinations[this.index];
    var methods:Array<any>=this.code.methods;
    this.m1= methods[methodCombination.mth1];
    this.m2=methods[methodCombination.mth2];
    var reviews:Array<any> = methodCombination.reviews;
    this.numberOfReviews=reviews.length;
    reviews.forEach(review=>{
      this.rating+=review.rating;
      this.averageReviewTime+=review.time;
    });
    this.rating/=this.numberOfReviews;
    this.averageRaiting=Math.round(this.rating);
    this.averageReviewTime/=this.numberOfReviews;
    this.minutes=Math.floor(this.averageReviewTime/60);
    this.seconds=Math.round(this.averageReviewTime%60);
    console.log(this.m1);
  }


  async initMethodsCompare() {
    return new Promise((res, rej) => {
      
        this.codeService.getCodeById(this.codeId).subscribe((c:Code) => {
          this.code = c;
          res(1);
        })
    });
  }
  averageRaiting:number;
  numberOfReviews:number;
  minutes:number;
  seconds:number;
  index:number;
  rating:number;
  averageReviewTime:number;
  m1:string;
  m2:string;
  methodCombinations:Array<any>
  userInfo:any;
  code:Code;
  codeId:number;

  next(){
    this.index=(this.index+1)%this.methodCombinations.length;
    this.initAll();
  }
}
