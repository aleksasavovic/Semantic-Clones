import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Code } from '../_model/code.model';
import { User } from '../_model/user.model';
import { CodeService } from '../_services/code.service';

@Component({
  selector: 'app-active-codes',
  templateUrl: './active-codes.component.html',
  styleUrls: ['./active-codes.component.css']
})
export class ActiveCodesComponent implements OnInit {

  constructor(private router: Router, private codeService: CodeService) { }

  async ngOnInit() {
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (this.userInfo && this.userInfo.type == 'admin') {
      await this.loadCodes();
      this.codesOnPage = this.codes.slice(0, this.pageSize);
      this.readyToLoad = true;
    }
    else {
      this.router.navigate(['login']);
    }
  }
  async loadCodes() {
    return new Promise((res, rej) => {
      this.codeService.getActiveCodes().subscribe((Codes: Array<Code>) => {
        this.codes = Codes;
        res(123);
      })
    })
  }
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

  viewCode(code: Code) {
    localStorage.setItem("viewCode", JSON.stringify(code.id));
    this.router.navigate(['viewCode']);
  }

}
