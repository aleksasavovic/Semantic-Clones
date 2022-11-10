import { preserveWhitespacesDefault } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inactive-codes',
  templateUrl: './inactive-codes.component.html',
  styleUrls: ['./inactive-codes.component.css']
})
export class InactiveCodesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.pw = '';
  }
  pw: string;

  checkPw() {
    var numerics = 0;
    var upercase = 0;
    var lowercase = 0;
    var specials = 0;
    var err = false;
    var prevChar;
    var sameCharsInARow = 1;

    if (this.pw.length < 8 || this.pw.length > 12) {
      err = true;
    }
    else {
      for (var i = 0; i < this.pw.length; i++) {
        var ascii = this.pw.charCodeAt(i);
        if (i != 0 && ascii == prevChar) {
          sameCharsInARow++;
          if (sameCharsInARow == 3){
            err = true;
            break;
          }
        }
        else {
          prevChar = ascii;
          sameCharsInARow = 1;
        }
        if (ascii >= 65 && ascii <= 90)
          upercase++;
        else if (ascii >= 97 && ascii <= 122)
          lowercase++;
        else if (ascii >= 48 && ascii <= 57)
          numerics++;
        else if ((ascii >= 32 && ascii <= 47) || (ascii >= 58 && ascii <= 64) || (ascii >= 91 && ascii <= 96) || (ascii >= 123 && ascii <= 126))
          specials++;
        else {
          err = true;
          break;
        }
        if (i == 0 && upercase == 0 && lowercase == 0){
          err = true;
          break;
        }
          

      }


    }
    console.log(lowercase,upercase,numerics,specials);
        if (err || lowercase < 3 || upercase == 0 || numerics < 2 || specials < 2)
      alert("error");
    else alert(this.pw);

  }

}
