import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CountdownModule } from 'ngx-countdown';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { IndexComponent  } from './pages/index/index.component';
import { StatusComponent  } from './pages/status/status.component';
import { LedgerComponent  } from './pages/ledger/ledger.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    "path": "index",
    component: IndexComponent
  },
  {
    "path": "status-of-prediction",
    component: StatusComponent
  },
  {
    "path": "ledger-account",
    component: LedgerComponent
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
    IndexComponent,
    StatusComponent,
    LedgerComponent
  ],
  exports: [
    HeaderComponent,
    RouterModule,
  ],
  imports: [
    BrowserModule,CountdownModule,RouterModule.forRoot(routes),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
