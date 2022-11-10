import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CodeService {

  uri = 'http://localhost:4000';

  constructor(private http: HttpClient, private router: Router) { }

  addCode(methods, wholeCode, name) {
    var data = {
      name: name,
      methods: methods,
      wholeCode: wholeCode
    }
    return this.http.post(`${this.uri}/addCode2`, data);
  }

  sortReviewList(reviewList: Array<any>) {
    reviewList.sort((a, b) => {
      if (a.priority > b.priority)
        return 1;
      else return 0;
    })
  }
  getMethods(m1, m2, codeId) {
    var data = {
      m1: m1,
      m2: m2,
      id: codeId
    }
    return this.http.post(`${this.uri}/getMethods`, data);
  }

  getRandomMethods(username, fr) {

    var data = {
      username: username,
      fr: fr
    }
    return this.http.post(`${this.uri}/getRandomMethods`, data);
  }

  getActiveCodes() {
    return this.http.get(`${this.uri}/getActiveCodes`);
  }

  getRandomList() {
    return this.http.get(`${this.uri}/getRandomList`);
  }
  getMethodCombinationsForCode(id) {
    var data = {
      id: id
    }
    return this.http.post(`${this.uri}/getMethodCombinationsForCode`, data);
  }

  getMethodText(finishedReviews: Array<any>, reviewList: Array<any>, userStartedReviewsList: Array<any>,startIndex) {
    var exists = true;
    var reviewListIndex = -1;
    var everythingReviewed = false;
    for (var i = startIndex; i < reviewList.length && exists; i++) {
      exists=false;
      for (var j = 0; j < finishedReviews.length; j++) {
        if (reviewList[i].codeId == finishedReviews[j].codeId && reviewList[i].compareMethodsId == finishedReviews[j].compareMethodsId) {
          exists = true;
          break;
        }
      }
      if (!exists)
        reviewListIndex = i;
    }
    if(reviewListIndex==-1){
      for (var i:any = 0; i < startIndex && exists; i++) {
        exists = false;
        for (var j = 0; j < finishedReviews.length; j++) {
          if (reviewList[i].codeId == finishedReviews[j].codeId && reviewList[i].compareMethodsId == finishedReviews[j].compareMethodsId) {
            exists = true;
            break;
          }
  
        }
        if (!exists)
          reviewListIndex = i;
      }
    }
    console.log("prvi deo");
    var compareMethodsId;
    if (reviewListIndex == -1 && finishedReviews.length > 0)
      everythingReviewed = true;
    else {
      if (reviewListIndex == -1)
        reviewListIndex = 0;
      compareMethodsId = reviewList[reviewListIndex].id;
    }
    compareMethodsId = reviewList[reviewListIndex].compareMethodsId;
    var codeId = reviewList[reviewListIndex].codeId;
    var data = {
      compareMethodsId: compareMethodsId,
      codeId: codeId,
      userStartedReviewsList: userStartedReviewsList,
      everythingReviewed: everythingReviewed,
      reviewListIndex:reviewListIndex
    }
    return this.http.post(`${this.uri}/getMethodsText`, data);
  }
  getMethodTextForSelectedCode(finishedReviews: Array<any>, reviewList: Array<any>, codeId, userStartedReviewsList: Array<any>,startingIndex) {
    var exists = true;
    var reviewListIndex = -1;
    var everythingReviewed = false;
    for (var i = startingIndex; i < reviewList.length && exists; i++) {
      exists = false;
      for (var j = 0; j < finishedReviews.length; j++) {
        if (finishedReviews[j].codeId == codeId && reviewList[i].id == finishedReviews[j].compareMethodsId) {
          console.log("exists");
          exists = true;
          break;
        }

      }
      if (!exists)
        reviewListIndex = i;
    }
    if(reviewListIndex==-1){
      for (var i:any = 0; i < startingIndex && exists; i++) {
        exists = false;
        for (var j = 0; j < finishedReviews.length; j++) {
          if (finishedReviews[j].codeId == codeId && reviewList[i].id == finishedReviews[j].compareMethodsId) {
            console.log("exists");
            exists = true;
            break;
          }
        }
        if (!exists)
          reviewListIndex = i;
      }
    }

    var compareMethodsId;
    if (reviewListIndex == -1 && finishedReviews.length > 0)
      everythingReviewed = true;
    else {
      if (reviewListIndex == -1)
        reviewListIndex = 0;
      compareMethodsId = reviewList[reviewListIndex].id;
    }
    var data = {
      compareMethodsId: compareMethodsId,
      codeId: codeId,
      userStartedReviewsList: userStartedReviewsList,
      everythingReviewed: everythingReviewed,
      reviewListIndex:reviewListIndex
    }
    return this.http.post(`${this.uri}/getMethodsText`, data);
  }

  submitReview(username, time, codeId, compareMethodsId, rating) {
    var data = {
      username: username,
      time: time,
      codeId: codeId,
      compareMethodsId: compareMethodsId,
      rating: rating
    }
    return this.http.post(`${this.uri}/submitReview`, data);
  }

  getCodeById(id){
    var data={
      id:id
    }
    return this.http.post(`${this.uri}/getCodeById`, data);
  }


}
