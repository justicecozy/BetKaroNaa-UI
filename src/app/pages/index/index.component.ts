import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ethers } from 'ethers';
import { CountdownComponent } from 'ngx-countdown';
@Component({
  selector: '',
  templateUrl: './index.component.html'
})
export class IndexComponent implements OnInit, AfterViewInit {
  title = 'BetKaroNaa';
  provider = ethers.getDefaultProvider('kovan');
  private ethereum: any;
  private web3: any;
  public metaMaskSelectedAddress;
  @ViewChild('countdown') counter: CountdownComponent;
  constructor() {
  }
  ngOnInit() {
    this.initializeMetaMask();
  }
  ngAfterViewInit() {
  }
  async initializeMetaMask() {
    this.ethereum = window['ethereum'];
    await this.ethereum.enable();
    this.web3 = new ethers.providers.Web3Provider(this.ethereum);
    this.metaMaskSelectedAddress = this.web3._web3Provider.selectedAddress;
    this.startTimer();
    // this.setup();
  }
  startTimer() {
    this.counter.begin();
  }
  finishTest(event) {
    if (event.action == "done") {
      //do anything
    }
  }
}
