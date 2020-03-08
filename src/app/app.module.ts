import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CountdownModule } from 'ngx-countdown';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { IndexComponent  } from './pages/index/index.component';


const routes: Routes = [
  {
    "path": "index",
    component: IndexComponent
  },
  {
    "path": "",
    "redirectTo": "index",
    "pathMatch": "full"
  }
];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    IndexComponent
  ],
  exports: [
    HeaderComponent,
    RouterModule
  ],
  imports: [
    BrowserModule,CountdownModule,RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
