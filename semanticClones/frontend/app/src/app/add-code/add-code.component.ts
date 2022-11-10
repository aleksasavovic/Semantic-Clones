import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from '../_model/user.model';
import { CodeService } from '../_services/code.service';

@Component({
  selector: 'app-add-code',
  templateUrl: './add-code.component.html',
  styleUrls: ['./add-code.component.css']
})
export class AddCodeComponent implements OnInit {

  constructor(private codeService: CodeService, private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (this.userInfo && this.userInfo.type == 'admin')
      this.javaCode = this.name = '';
    else this.router.navigate(['login']);

  }
  userInfo: any;
  javaCode: string;
  methods: Array<string>;
  name: string;
  parseJavaCode() {
    if (this.javaCode == '' || this.name == '') {
      this.snackBar.open("Please fill all required fields", 'Dismiss');
    }

    else {
      var except = "throwsExcepin";
      this.methods = new Array<string>();
      var strPars = "";
      var lastChar = '{';
      var bracesCounter = 0;
      var inFunction = false;
      for (var i = 0; i < this.javaCode.length; i++) {
        var currentChar = this.javaCode[i];
        if (!inFunction) {
          if ((currentChar == ';') || ((currentChar.charCodeAt(0) == 10) && (lastChar != ')')) || (currentChar == '{' && lastChar != ')')) {
            strPars = '';
            lastChar = '{';
          }
          else {
            strPars += currentChar;
            if (currentChar == '{' && lastChar == ')') {
              inFunction = true;
              bracesCounter = 1;
            }
            else {
              var ascii = currentChar.charCodeAt(0);
              if (!(lastChar == ')' && (ascii == 10 || ascii == 9 || ascii == 32 || except.includes(currentChar)))) {
                lastChar = currentChar;
              }


            }

          }

        }
        else {
          strPars += currentChar;
          if (currentChar == '{')
            bracesCounter++;
          if (currentChar == '}') {
            bracesCounter--;
            if (bracesCounter == 0) {
              this.methods.push(strPars);
              strPars = '';
              lastChar = '{';
              inFunction = false;
            }
          }
        }
      }
      if (this.methods.length > 1) {
        this.codeService.addCode(this.methods, this.javaCode, this.name).subscribe(ret => {
          this.snackBar.open(ret['ret'], 'Dismiss');
          this.router.navigate(['adminHome']);
        })
      }
      else {
        this.snackBar.open("Code must have at least two methods", 'Dismiss');
      }

    }

  }
}
