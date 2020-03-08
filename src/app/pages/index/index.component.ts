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
  provider = ethers.getDefaultProvider('kovan');
  private ethereum: any;
  private web3: any;
  public metaMaskSelectedAddress;
  public masterContract;
  public masterAddress = "0x5c77a6b38c049201aa842bf0169a90660e411651";
  public betKaroNaaAddress;
  public betDataAddress;
  public betContractAddress;
  public masterAbi = [{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"contractsActive","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"constant":true,"inputs":[{"name":"code","type":"bytes8"}],"name":"getAddressParameters","outputs":[{"name":"codeVal","type":"bytes8"},{"name":"val","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"masterInitialized","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_contractsName","type":"bytes2"},{"name":"_contractsAddress","type":"address"}],"name":"upgradeContract","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_add","type":"address"}],"name":"isInternal","outputs":[{"name":"check","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_add","type":"address"}],"name":"isOwner","outputs":[{"name":"check","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_masterAddress","type":"address"}],"name":"changeMasterAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"}],"name":"changeOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getVersionData","outputs":[{"name":"contractsName","type":"bytes2[]"},{"name":"contractsAddress","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_contractName","type":"bytes2"}],"name":"getLatestAddress","outputs":[{"name":"contractAddress","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_contractAddresses","type":"address[]"}],"name":"addNewVersion","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}];
  public betKaroNaaAbi = [{"constant":true,"inputs":[],"name":"ms","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_masterAddress","type":"address"}],"name":"changeMasterAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_question","type":"string"},{"name":"_betType","type":"uint256"},{"name":"_startTime","type":"uint256"},{"name":"_predictionValue","type":"uint256"},{"name":"_feedSource","type":"string"}],"name":"addNewBet","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[],"name":"changeDependentContractAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}];
  public betDataAbi = [{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"betTimeline","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"maxBet","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"minBet","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"ms","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_masterAddress","type":"address"}],"name":"changeMasterAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"allBets","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"betId","type":"address"},{"indexed":false,"name":"question","type":"string"},{"indexed":false,"name":"betType","type":"uint256"}],"name":"BetQuestion","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_type","type":"uint256"},{"indexed":false,"name":"betId","type":"address"}],"name":"BetClosed","type":"event"},{"constant":false,"inputs":[{"name":"_betAddress","type":"address"},{"name":"_question","type":"string"},{"name":"_type","type":"uint256"}],"name":"pushBet","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getAllBetsLen","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_val","type":"uint256"}],"name":"setMinBet","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_val","type":"uint256"}],"name":"setMaxBet","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_type","type":"uint256"},{"name":"_val","type":"uint256"}],"name":"updateBetTimeline","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_type","type":"uint256"}],"name":"updateRecentBetTypeExpire","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getRecentBetTypeExpire","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getAllClosedBets","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_type","type":"uint256"}],"name":"callCloseBetEvent","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"changeDependentContractAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}];
  public betContractAbi = [{"constant":true,"inputs":[],"name":"stockName","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"betType","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"maxBet","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"expireTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"result","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"startTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"userBettingPointsInFavour","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupplyAtClosing","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"minBet","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"disagreeToken","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"userClaimedReward","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"FeedSource","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"betClosed","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"agreeToken","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"AdminAccount","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"PredictionValue","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"userBettingPointsAgainst","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_minBet","type":"uint256"},{"name":"_maxBet","type":"uint256"},{"name":"_agree","type":"address"},{"name":"_disAgree","type":"address"},{"name":"_question","type":"string"},{"name":"_betType","type":"uint256"},{"name":"_startTime","type":"uint256"},{"name":"_expireTime","type":"uint256"},{"name":"_predictionValue","type":"uint256"},{"name":"_feedSource","type":"string"},{"name":"bdAdd","type":"address"},{"name":"_admin","type":"address"}],"payable":true,"stateMutability":"payable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"betId","type":"address"},{"indexed":false,"name":"question","type":"string"},{"indexed":false,"name":"betType","type":"uint256"}],"name":"BetQuestion","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_user","type":"address"},{"indexed":false,"name":"_betAmount","type":"uint256"},{"indexed":false,"name":"_prediction","type":"bool"}],"name":"Bet","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_user","type":"address"},{"indexed":false,"name":"_reward","type":"uint256"}],"name":"Claimed","type":"event"},{"constant":true,"inputs":[{"name":"prediction","type":"bool"}],"name":"getPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_prediction","type":"bool"}],"name":"placeBet","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[],"name":"claimReward","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_myid","type":"bytes32"},{"name":"_result","type":"string"}],"name":"__callback","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"myid","type":"bytes32"},{"name":"result","type":"string"},{"name":"proof","type":"bytes"}],"name":"__callback","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}];
  public agreeAbi=[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"operator","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"account","type":"address"},{"indexed":true,"name":"amount","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"account","type":"address"},{"indexed":true,"name":"amount","type":"uint256"}],"name":"Burn","type":"event"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newOperator","type":"address"}],"name":"changeOperator","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"account","type":"address"},{"name":"amount","type":"uint256"}],"name":"mint","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"value","type":"uint256"}],"name":"forceBurn","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}];
  public disagreeAbi=[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"operator","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"account","type":"address"},{"indexed":true,"name":"amount","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"account","type":"address"},{"indexed":true,"name":"amount","type":"uint256"}],"name":"Burn","type":"event"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newOperator","type":"address"}],"name":"changeOperator","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"account","type":"address"},{"name":"amount","type":"uint256"}],"name":"mint","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"value","type":"uint256"}],"name":"forceBurn","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}];

  public betKaroNaaContract;
  public betDataContract;
  public allBets
  @ViewChild('countdown') counter: CountdownComponent;
  constructor() {
  }
  // public low = {betType:'',stockName:'',startTime:0,expireTime:0,PredictionValue:0,FeedSource:''};
  // public medium = {betType:'',stockName:'',startTime:0,expireTime:0,PredictionValue:0,FeedSource:''};
  // public high = {betType:'',stockName:'',startTime:0,expireTime:0,PredictionValue:0,FeedSource:''};
  public low = {}
  public medium ={}
  public high = {}
  public lowAr = [];
  public mediumAr = [];
  public highAr = [];
  public type;
  public tknValue;
  public tokenBought;
  public tmpInstance;
  public tokenBoughtInETH=0;
  ngOnInit() {
    this.initializeMetaMask();
  }
  ngAfterViewInit() {
  }
  async initializeMetaMask() {
    this.ethereum = window['ethereum'];
    await this.ethereum.enable();
    this.web3 = new ethers.providers.Web3Provider(this.ethereum);
    this.metaMaskSelectedAddress = this.web3.selectedAddress;
    // this.startTimer();
    this.setup();
  }
   getType(i) {
     var str;
    if(i == 0) {
      str = "Low";
    }
    else if(i == 1) {
      str = "Medium";
    }
    else if(i == 2) {
      str = "High";
    }
    return str;
   }
  async setup() {
    this.masterContract = new ethers.Contract(this.masterAddress, this.masterAbi, this.web3.getSigner());

    this.betKaroNaaAddress = await this.masterContract.getLatestAddress('0x424b');
    this.betDataAddress = await this.masterContract.getLatestAddress('0x4244');

    this.betKaroNaaContract = new ethers.Contract(this.betKaroNaaAddress, this.betKaroNaaAbi, this.web3.getSigner());
    this.betDataContract = new ethers.Contract(this.betDataAddress, this.betDataAbi, this.web3.getSigner());
     let length = await this.betDataContract.getAllBetsLen();
     length = length.toNumber();
     for(let i = length -1; i >0; i--){
      let address = await this.betDataContract.allBets(i);
      var addressInstance = new ethers.Contract(address, this.betContractAbi, this.web3.getSigner());
      var betType = await addressInstance.betType();
      betType = betType.toNumber();
      if(betType == 0 && Object.keys(this.low).length == 0) {
        this.low['address'] = address;
        this.low['addressInstance'] = addressInstance;
       
        this.low['betType'] = this.getType(betType);
        this.low['stockName'] = await addressInstance.stockName();
        var startTime = await addressInstance.startTime();
        startTime = startTime.toNumber();
        this.low['startTime'] = startTime;
        var expireTime = await addressInstance.expireTime();
        expireTime = expireTime.toNumber();
        this.low['expireTime'] = expireTime;
        // if (this.low['expireTime'] > Math.floor(Date.now()/1000)) {
          this.low['expiryCountdown'] = `{leftTime: ${this.low['expireTime'] - Math.floor(Date.now()/1000)}, demand: true}`;

          var predictionVal = await addressInstance.PredictionValue();
          predictionVal = predictionVal.toNumber();
          this.low['PredictionValue'] = predictionVal;
          this.low['FeedSource'] = await addressInstance.FeedSource();
          var agreeToken = await addressInstance.agreeToken();
          var disagreeToken = await addressInstance.disagreeToken();
          var agreeInstance = new ethers.Contract(agreeToken, this.agreeAbi, this.web3.getSigner());
          var diagreeInstance = new ethers.Contract(disagreeToken, this.disagreeAbi, this.web3.getSigner());
          var totalSupplyAgrr = await agreeInstance.totalSupply();
          var totalSupplyDisAgrr = await diagreeInstance.totalSupply();
          this.low['agree'] = (totalSupplyAgrr/1e18).toFixed(4);
          this.low['disagree'] = (totalSupplyDisAgrr / 1e18).toFixed(4);
          this.lowAr.push(this.low);
        // }

          

      }
       else if(betType == 1 && Object.keys(this.medium).length == 0) {
        this.medium['address'] = address;
        this.medium['addressInstance'] = addressInstance;
        this.medium['betType'] = this.getType(betType);
        this.medium['stockName'] = await addressInstance.stockName();
        var startTime = await addressInstance.startTime();
        startTime = startTime.toNumber();
        this.medium['startTime'] = startTime;
        var expireTime = await addressInstance.expireTime();
        expireTime = expireTime.toNumber();
        this.medium['expireTime'] = expireTime;
        // if (this.medium['expireTime'] > Math.floor(Date.now()/1000)) {
          this.medium['expiryCountdown'] = `{leftTime: ${this.medium['expireTime'] - Math.floor(Date.now()/1000)}, demand: true}`;
          var predictionVal = await addressInstance.PredictionValue();
          predictionVal = predictionVal.toNumber();
          this.medium['PredictionValue'] = predictionVal;
          this.medium['FeedSource'] = await addressInstance.FeedSource();
          var agreeToken = await addressInstance.agreeToken();
          var disagreeToken = await addressInstance.disagreeToken();
          var agreeInstance = new ethers.Contract(agreeToken, this.agreeAbi, this.web3.getSigner());
         var diagreeInstance = new ethers.Contract(disagreeToken, this.disagreeAbi, this.web3.getSigner());
         var totalSupplyAgrr = await agreeInstance.totalSupply();
         var totalSupplyDisAgrr = await diagreeInstance.totalSupply();
         this.medium['agree'] = (totalSupplyAgrr/1e18).toFixed(4);
         this.medium['disagree'] = (totalSupplyDisAgrr / 1e18).toFixed(4);
          this.mediumAr.push(this.medium);
        // }
      }
       else if (betType == 2 && Object.keys(this.high).length == 0) {
        this.high['expiryCountdown'] = `{leftTime: ${this.high['expireTime'] - Math.floor(Date.now()/1000)}, demand: true}`;

        this.high['address'] = address;
        this.high['addressInstance'] = addressInstance;
        this.high['betType'] = this.getType(betType);
        this.high['stockName'] = await addressInstance.stockName();
        var startTime = await addressInstance.startTime();
        startTime = startTime.toNumber();
        this.high['startTime'] = startTime;
        var expireTime = await addressInstance.expireTime();
        expireTime = expireTime.toNumber();
        this.high['expireTime'] = expireTime;
        // if (this.high['expireTime'] > Math.floor(Date.now()/1000)) {
          var predictionVal = await addressInstance.PredictionValue();
          predictionVal = predictionVal.toNumber();
          this.high['PredictionValue'] = predictionVal;
          this.high['FeedSource'] = await addressInstance.FeedSource();
          var agreeToken = await addressInstance.agreeToken();
          var disagreeToken = await addressInstance.disagreeToken();
          var agreeInstance = new ethers.Contract(agreeToken, this.agreeAbi, this.web3.getSigner());
         var diagreeInstance = new ethers.Contract(disagreeToken, this.disagreeAbi, this.web3.getSigner());
         var totalSupplyAgrr = await agreeInstance.totalSupply();
         var totalSupplyDisAgrr = await diagreeInstance.totalSupply();
         this.high['agree'] = (totalSupplyAgrr/1e18).toFixed(4);
         this.high['disagree'] = (totalSupplyDisAgrr / 1e18).toFixed(4);
          this.highAr.push(this.lowAr);
        // }
      }
     }
  }

  startTimer() {
    this.counter.begin();
  }
  finishTest(event) {
    if (event.action == "done") {
      //do anything
    }
  }

  async clickedYes(param) {
    this.type = 'Yes';
    var addrInstance = param.addressInstance;
    this.tknValue = await addrInstance.getPrice(true);
    this.tknValue = (this.tknValue / 1e18).toFixed(5);
    this.tmpInstance = addrInstance;
  }

  async clickedNo(param) {
    this.type = 'No';
    var addrInstance = param.addressInstance;
    this.tknValue = await addrInstance.getPrice(false);
    this.tknValue = (this.tknValue / 1e18).toFixed(5);
    this.tmpInstance = addrInstance;
  }

  checkVal() {
    this.tokenBoughtInETH = this.tknValue * this.tokenBought;
  }

  async buyNow() {
    // this.tmpInstance.placeBet(false, {value: this.tokenBoughtInETH}, this.web3.getSigner(), function(error, result) {
    //   if(!error) {
    //     console.log(result);
    //   } else {
    //     console.log(error);
    //   }
    // }.bind(this));

    this.tmpInstance.placeBet(false).then((f) => {
      console.log(f)
    });

  }
}
