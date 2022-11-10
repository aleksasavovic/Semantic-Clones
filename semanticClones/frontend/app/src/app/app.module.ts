import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatRadioModule} from '@angular/material/radio';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { RegisterComponent } from './register/register.component';
import { MenuComponent } from './menu/menu.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ActiveCodesComponent } from './active-codes/active-codes.component';
import { InactiveCodesComponent } from './inactive-codes/inactive-codes.component';
import { AddCodeComponent } from './add-code/add-code.component';
import { CodeCompareComponent } from './code-compare/code-compare.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { ChooseCodeComponent } from './choose-code/choose-code.component';
import { StartedReviewsComponent } from './started-reviews/started-reviews.component';
import { ViewCodeComponent } from './view-code/view-code.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MenuComponent,
    AdminHomeComponent,
    UserHomeComponent,
    AddUserComponent,
    ActiveCodesComponent,
    InactiveCodesComponent,
    AddCodeComponent,
    CodeCompareComponent,
    ChooseCodeComponent,
    StartedReviewsComponent,
    ViewCodeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatMenuModule,
    MatGridListModule,
    MatRadioModule,
    MatSnackBarModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule,
    ScrollingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
