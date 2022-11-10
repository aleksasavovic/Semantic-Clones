import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Code } from '../_model/code.model';
import { User } from '../_model/user.model';
import { CodeService } from '../_services/code.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-choose-code',
  templateUrl: './choose-code.component.html',
  styleUrls: ['./choose-code.component.css']
})
export class ChooseCodeComponent implements OnInit {

  constructor(private router: Router, private codeService: CodeService,private userService:UserService) { }

  async ngOnInit() {
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (this.userInfo && this.userInfo.type == 'regular') {
      await this.loadCode();
      await this.setProgress();
      this.codesOnPage = this.codes.slice(0, this.pageSize);
      this.readyToLoad = true;
    }
    else
      this.router.navigate(['login']);





  }
  async setProgress() {
    return new Promise((res, rej) => {
      this.userService.getProgressList(this.userInfo.username).subscribe((pl:any)=>{
        this.progressList=pl;
        this.codes.forEach(code => {
          code.progress = 0;
          var arr: Array<any> = pl;
          var i = 0;
          for (i = 0; i < arr.length; i++) {
            if (arr[i].codeId == code.id) {
              code.progress = arr[i].progress;
  
            }
          }
  
        });
        res(1);
  
      })
      })
      
  }
  async loadCode() {
    return new Promise((res, rej) => {
      this.codeService.getActiveCodes().subscribe((Codes: Array<Code>) => {
        this.codes = Codes;
        res(123);
      })
    })

  }
  progressList:Array<any>;
  readyToLoad = false;
  pageSize: number = 12;
  userInfo: any;
  codes: Array<Code>;
  startIndex: number;
  codesOnPage: Array<Code>;

  pageEvent(event: PageEvent) {
    this.startIndex = event.pageIndex * event.pageSize;

    let endIndex = this.startIndex + event.pageSize;
    if (endIndex > this.codes.length)
      endIndex = this.codes.length;
    this.codesOnPage = this.codes.slice(this.startIndex, endIndex);
  }

  review(code: Code) {
    localStorage.setItem("chosenCode", JSON.stringify(code.id));
    this.router.navigate(['codeCompare']);
  }
}
