import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActiveCodesComponent } from './active-codes/active-codes.component';
import { AddCodeComponent } from './add-code/add-code.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { ChooseCodeComponent } from './choose-code/choose-code.component';
import { CodeCompareComponent } from './code-compare/code-compare.component';
import { InactiveCodesComponent } from './inactive-codes/inactive-codes.component';


import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { StartedReviewsComponent } from './started-reviews/started-reviews.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { ViewCodeComponent } from './view-code/view-code.component';

const routes: Routes = [
  {path: "", component: LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:'adminHome', component:AdminHomeComponent},
  {path:'userHome', component:UserHomeComponent},
  {path:'addUser',component:AddUserComponent},
  {path:'addCode',component:AddCodeComponent},
  {path:'activeCodes',component:ActiveCodesComponent},
  {path:'inactiveCodes',component:InactiveCodesComponent},
  {path:'codeCompare',component:CodeCompareComponent},
  {path:'chooseCode', component:ChooseCodeComponent},
  {path:'startedReviews',component:StartedReviewsComponent},
  {path:'viewCode',component:ViewCodeComponent},
  {path: '**', component: LoginComponent } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
