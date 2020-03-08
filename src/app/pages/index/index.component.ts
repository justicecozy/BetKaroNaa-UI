import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ethers } from 'ethers';
// import Web3 from 'web3';
import { CountdownComponent } from 'ngx-countdown';
@Component({
  selector: '.wrapper',
  templateUrl: './index.component.html'
})
export class IndexComponent implements OnInit, AfterViewInit {
  title = 'BetKaroNaa';

  // provider = ethers.getDefaultProvider('kovan');
  private ethereum: any;
  private web3: any;
  public metaMaskSelectedAddress;
  public masterContract;
  public masterAddress = "0x0ac3b5cf95a2d8a13f59eb91e3d3e3a335486c9b";
  public betKaroNaaAddress;
  public betDataAddress;
  public betContractAddress;
  public masterAbi = [{ "constant": true, "inputs": [{ "name": "", "type": "address" }], "name": "contractsActive", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "constant": true, "inputs": [{ "name": "code", "type": "bytes8" }], "name": "getAddressParameters", "outputs": [{ "name": "codeVal", "type": "bytes8" }, { "name": "val", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "masterInitialized", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_contractsName", "type": "bytes2" }, { "name": "_contractsAddress", "type": "address" }], "name": "upgradeContract", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "_add", "type": "address" }], "name": "isInternal", "outputs": [{ "name": "check", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "_add", "type": "address" }], "name": "isOwner", "outputs": [{ "name": "check", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_masterAddress", "type": "address" }], "name": "changeMasterAddress", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "to", "type": "address" }], "name": "changeOwner", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "getVersionData", "outputs": [{ "name": "contractsName", "type": "bytes2[]" }, { "name": "contractsAddress", "type": "address[]" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "_contractName", "type": "bytes2" }], "name": "getLatestAddress", "outputs": [{ "name": "contractAddress", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_contractAddresses", "type": "address[]" }], "name": "addNewVersion", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }];
  public betKaroNaaAbi = [{ "constant": true, "inputs": [], "name": "ms", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_masterAddress", "type": "address" }], "name": "changeMasterAddress", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_question", "type": "string" }, { "name": "_betType", "type": "uint256" }, { "name": "_startTime", "type": "uint256" }, { "name": "_predictionValue", "type": "uint256" }, { "name": "_feedSource", "type": "string" }], "name": "addNewBet", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "changeDependentContractAddress", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }];
  public betDataAbi = [{ "constant": true, "inputs": [{ "name": "", "type": "uint256" }], "name": "betTimeline", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "maxBet", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "minBet", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "ms", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_masterAddress", "type": "address" }], "name": "changeMasterAddress", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "uint256" }], "name": "allBets", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "betId", "type": "uint256" }, { "indexed": false, "name": "question", "type": "string" }, { "indexed": false, "name": "betType", "type": "uint256" }], "name": "BetQuestion", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_type", "type": "uint256" }, { "indexed": false, "name": "betId", "type": "address" }], "name": "BetClosed", "type": "event" }, { "constant": false, "inputs": [{ "name": "_betAddress", "type": "address" }], "name": "pushBet", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "getAllBetsLen", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_val", "type": "uint256" }], "name": "setMinBet", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_val", "type": "uint256" }], "name": "setMaxBet", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_type", "type": "uint256" }, { "name": "_val", "type": "uint256" }], "name": "updateBetTimeline", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_type", "type": "uint256" }], "name": "updateRecentBetTypeExpire", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "getRecentBetTypeExpire", "outputs": [{ "name": "", "type": "uint256[]" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_type", "type": "uint256" }], "name": "callCloseBetEvent", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "changeDependentContractAddress", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }];
  public betContractAbi = [{ "constant": true, "inputs": [], "name": "betType", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "maxBet", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "expireTime", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "result", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "startTime", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }], "name": "userBettingPointsInFavour", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupplyAtClosing", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "minBet", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "disagreeToken", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }], "name": "userClaimedReward", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "FeedSource", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "betClosed", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "agreeToken", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "PredictionValue", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }], "name": "userBettingPointsAgainst", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [{ "name": "_minBet", "type": "uint256" }, { "name": "_maxBet", "type": "uint256" }, { "name": "_agree", "type": "address" }, { "name": "_disAgree", "type": "address" }, { "name": "_question", "type": "string" }, { "name": "_betType", "type": "uint256" }, { "name": "_startTime", "type": "uint256" }, { "name": "_expireTime", "type": "uint256" }, { "name": "_predictionValue", "type": "uint256" }, { "name": "_feedSource", "type": "string" }, { "name": "bdAdd", "type": "address" }], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "betId", "type": "address" }, { "indexed": false, "name": "question", "type": "string" }, { "indexed": false, "name": "betType", "type": "uint256" }], "name": "BetQuestion", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_user", "type": "address" }, { "indexed": false, "name": "_betAmount", "type": "uint256" }, { "indexed": false, "name": "_prediction", "type": "bool" }], "name": "Bet", "type": "event" }, { "constant": true, "inputs": [{ "name": "prediction", "type": "bool" }], "name": "getPrice", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_prediction", "type": "bool" }], "name": "placeBet", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_value", "type": "uint256" }], "name": "closeBet", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }];
  public betKaroNaaContract;
  public betDataContract;
  public allBets
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
    // this.metaMaskSelectedAddress = this.web3.selectedAddress;
    // this.startTimer();
    this.setup();
  }

  async setup() {
    this.masterContract = new ethers.Contract(this.masterAddress, this.masterAbi, this.web3.getSigner());
    // this.masterContract = this.web3.eth.contract(this.masterAbi).at(this.masterAddress);
    this.betKaroNaaAddress = await this.masterContract.getLatestAddress('0x424b');
    this.betDataAddress = await this.masterContract.getLatestAddress('0x4244');

    // let daiAddress = await this.poolContract.daiContract();
    this.betKaroNaaContract = new ethers.Contract(this.betKaroNaaAddress, this.betKaroNaaAbi, this.web3.getSigner());
    this.betDataContract = new ethers.Contract(this.betDataAddress, this.betDataAbi, this.web3.getSigner());

    // this.betKaroNaaContract = this.new ethers.Contract(this.betKaroNaaAbi).at(this.betKaroNaaAddress);
    // this.betDataContract = this.web3.eth.contract(this.betDataAbi).at(this.betDataAddress);

    // console.log(await this.betDataContract.minBet());
    this.allBets = this.betDataContract.filters.BetQuestion({},{fromBlock:0, toBlock:'latest'});
     console.log(this.allBets);
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
