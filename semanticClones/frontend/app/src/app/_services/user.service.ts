import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  uri = 'http://localhost:4000';

  constructor(private http: HttpClient, private router:Router) { }

  login(username,password){
    console.log(username,password);
    const data={
      username:username,
      password:password
    }
    return this.http.post(`${this.uri}/login`, data);
  }

  register(firstName,lastName,username,password,email,type){
    const data={
      firstName:firstName,
      lastName:lastName,
      username:username,
      password:password,
      email:email,
      type:type,
    }
    return this.http.post(`${this.uri}/register`, data);
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['login']);
  }

  initPendingList(username){
    
    const data={
      username:username

    }
    return this.http.post(`${this.uri}/initPendingReviewList`, data);
  }

  addToStartedList(username,codeId,compareMethodsId,time){
    const data={
      username:username,
      codeId:codeId,
      compareMethodsId:compareMethodsId,
      time:time
    }
    return this.http.post(`${this.uri}/addToStartedList`, data);
  }
  updateStartedList(username,codeId,compareMethodsId,time){
    const data={
      username:username,
      codeId:codeId,
      compareMethodsId:compareMethodsId,
      time:time
    }
    return this.http.post(`${this.uri}/updateStartedList`, data);
  }

  getStartedList(username){
    var data={
      username:username
    }
    return this.http.post(`${this.uri}/startedList`, data);
  }

  getMethodText(compareMethodsId,codeId){
    var data = {
      compareMethodsId: compareMethodsId,
      codeId: codeId,
    
  
    }
    return this.http.post(`${this.uri}/getMethodsTextForStarted`, data);
  }
  
  getProgressList(username){
    var data={
      username:username
    }
    return this.http.post(`${this.uri}/getProgressList`, data);
  }

  getUserByUsername(username){
    var data={
      username:username
    }
    return this.http.post(`${this.uri}/getUserByUsername`, data);
  }
 
}
