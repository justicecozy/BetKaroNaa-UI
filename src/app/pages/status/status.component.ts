import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ethers } from 'ethers';
declare var cApp: any;
declare var $: any;
@Component({
  selector: '.wrapper',
  templateUrl: './status.component.html'
})
export class StatusComponent implements OnInit, AfterViewInit {
  provider = ethers.getDefaultProvider('kovan');
  private ethereum: any;
  private web3: any;
  public metaMaskSelectedAddress;
  public masterContract;
  public masterAddress = "0x9fd9761fe1f20040fb3710bffebaafe53ca407a4";
  public betDataAddress;
  public betDataContract;
  public masterAbi = [{ "constant": true, "inputs": [{ "name": "", "type": "address" }], "name": "contractsActive", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "constant": true, "inputs": [{ "name": "code", "type": "bytes8" }], "name": "getAddressParameters", "outputs": [{ "name": "codeVal", "type": "bytes8" }, { "name": "val", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "masterInitialized", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_contractsName", "type": "bytes2" }, { "name": "_contractsAddress", "type": "address" }], "name": "upgradeContract", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "_add", "type": "address" }], "name": "isInternal", "outputs": [{ "name": "check", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "_add", "type": "address" }], "name": "isOwner", "outputs": [{ "name": "check", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_masterAddress", "type": "address" }], "name": "changeMasterAddress", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "to", "type": "address" }], "name": "changeOwner", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "getVersionData", "outputs": [{ "name": "contractsName", "type": "bytes2[]" }, { "name": "contractsAddress", "type": "address[]" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "_contractName", "type": "bytes2" }], "name": "getLatestAddress", "outputs": [{ "name": "contractAddress", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_contractAddresses", "type": "address[]" }], "name": "addNewVersion", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }];
  public betDataAbi = [{ "constant": true, "inputs": [{ "name": "", "type": "uint256" }], "name": "betTimeline", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "maxBet", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "minBet", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "ms", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_masterAddress", "type": "address" }], "name": "changeMasterAddress", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "uint256" }], "name": "allBets", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "betId", "type": "address" }, { "indexed": false, "name": "question", "type": "string" }, { "indexed": false, "name": "betType", "type": "uint256" }], "name": "BetQuestion", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_type", "type": "uint256" }, { "indexed": false, "name": "betId", "type": "address" }], "name": "BetClosed", "type": "event" }, { "constant": false, "inputs": [{ "name": "_betAddress", "type": "address" }, { "name": "_question", "type": "string" }, { "name": "_type", "type": "uint256" }], "name": "pushBet", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "getAllBetsLen", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_val", "type": "uint256" }], "name": "setMinBet", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_val", "type": "uint256" }], "name": "setMaxBet", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_type", "type": "uint256" }, { "name": "_val", "type": "uint256" }], "name": "updateBetTimeline", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_type", "type": "uint256" }], "name": "updateRecentBetTypeExpire", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "getRecentBetTypeExpire", "outputs": [{ "name": "", "type": "uint256[]" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getAllClosedBets", "outputs": [{ "name": "", "type": "address[]" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_type", "type": "uint256" }], "name": "callCloseBetEvent", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "changeDependentContractAddress", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }];
  public betContractAbi = [{ "constant": true, "inputs": [], "name": "stockName", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "betType", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "maxBet", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "expireTime", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "result", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "startTime", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }], "name": "userBettingPointsInFavour", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupplyAtClosing", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "minBet", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "disagreeToken", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }], "name": "userClaimedReward", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "FeedSource", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "betClosed", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "agreeToken", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "AdminAccount", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "PredictionValue", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }], "name": "userBettingPointsAgainst", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [{ "name": "_minBet", "type": "uint256" }, { "name": "_maxBet", "type": "uint256" }, { "name": "_agree", "type": "address" }, { "name": "_disAgree", "type": "address" }, { "name": "_question", "type": "string" }, { "name": "_betType", "type": "uint256" }, { "name": "_startTime", "type": "uint256" }, { "name": "_expireTime", "type": "uint256" }, { "name": "_predictionValue", "type": "uint256" }, { "name": "_feedSource", "type": "string" }, { "name": "bdAdd", "type": "address" }, { "name": "_admin", "type": "address" }], "payable": true, "stateMutability": "payable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "betId", "type": "address" }, { "indexed": false, "name": "question", "type": "string" }, { "indexed": false, "name": "betType", "type": "uint256" }], "name": "BetQuestion", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_user", "type": "address" }, { "indexed": false, "name": "_betAmount", "type": "uint256" }, { "indexed": false, "name": "_prediction", "type": "bool" }], "name": "Bet", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "_user", "type": "address" }, { "indexed": false, "name": "_reward", "type": "uint256" }], "name": "Claimed", "type": "event" }, { "constant": true, "inputs": [{ "name": "prediction", "type": "bool" }], "name": "getPrice", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_prediction", "type": "bool" }], "name": "placeBet", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [], "name": "claimReward", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_myid", "type": "bytes32" }, { "name": "_result", "type": "string" }], "name": "__callback", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "myid", "type": "bytes32" }, { "name": "result", "type": "string" }, { "name": "proof", "type": "bytes" }], "name": "__callback", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }];
  public stockName = []
  public actions;
  constructor() {
  }
  ngOnInit() {
    this.ethereum = window['ethereum'];
    this.web3 = new ethers.providers.Web3Provider(this.ethereum);
    this.metaMaskSelectedAddress = this.web3.provider.selectedAddress;
   // this.setup();
  }
  ngAfterViewInit() {
    this.demo();
  }
  async setup() {
    this.masterContract = new ethers.Contract(this.masterAddress, this.masterAbi, this.web3.getSigner());
    this.betDataAddress = await this.masterContract.getLatestAddress('0x4244');
    this.betDataContract = new ethers.Contract(this.betDataAddress, this.betDataAbi, this.web3.getSigner());
    let length = await this.betDataContract.getAllBetsLen();
    length = length.toNumber();
    for (var i = length - 1; i > 0; i--) {
      let addressInstance = await this.betDataContract.allBets(i);
      let BetContractInstance = new ethers.Contract(addressInstance, this.betContractAbi, this.web3.getSigner());
      let stockName = await BetContractInstance.stockName();
      this.stockName.push({ stockName })
      if (this.actions == 0) {
        let points = await BetContractInstance.userBettingPointsInFavour(this.metaMaskSelectedAddress);
        this.stockName = this.stockName.filter(el => el["points"] = points)
      }
      else if (this.actions == 1) {
        let points = await BetContractInstance.userBettingPointsAgainst(this.metaMaskSelectedAddress);
        this.stockName = this.stockName.filter(el => el["points"] = points)
      }
    }
    this.demo();
  }

  demo() {

    var dataJSONArray = JSON.parse('[{"id":"1","date":"2020/03/08","prediction_name":"FB","action_taken":"Yes","eth_invested":"1.25","status":"Won"},{"id":"2","date":"2020/03/08","prediction_name":"TWTR","action_taken":"Yes","eth_invested":"1.25","status":"Claimed"}]');

    var datatable = $('#local_data').cDatatable({
      // datasource definition
      data: {
        type: 'local',
        source: dataJSONArray,
        pageSize: 10
      },

      // layout definition
      layout: {
        theme: 'default', // datatable theme
        class: '', // custom wrapper class
        scroll: false, // enable/disable datatable scroll both horizontal and vertical when needed.
        // height: 450, // datatable's body's fixed height
        footer: false // display/hide footer
      },

      // column sorting
      sortable: true,

      pagination: true,

      search: {
        input: $('#generalSearch')
      },

      // columns definition
      columns: [{
        field: "id",
        title: "ID",
        width: 50,
        sortable: false,
        selector: false,
        textAlign: 'center'
      },{
        field: "date",
        title: "Date",
        sortable: false,
        selector: false,
      }, {
        field: "prediction_name",
        title: "Prediction Name"
      }, {
        field: "action_taken",
        title: "Action Taken"
      }, {
        field: "eth_invested",
        title: "ETH Invested"
      }, {
        field: "status",
        title: "Status",
        template: function (row) {
          var status = {
            "Won": { 'title': 'Won', 'class': 'c-badge--success' },
            "Claimed": { 'title': 'Claimed', 'class': 'c-badge--success' },
            "Ongoing": { 'title': 'Ongoing', 'class': 'c-badge--warning' },
            "Lost": { 'title': 'Lost', 'class': 'c-badge--danger' }
          };
          return '<span class="c-badge ' + status[row.status].class + ' c-badge--wide">' + status[row.status].title + '</span>';
        }
      }, {
        field: "action",
        title: "Action",
        template: function (row) {
          if(row.status == "Won"){
            return '\
              <a id="trigger-claim-modal" prediction-id="' + row.id + '" class="btn btn-sm btn-primary-outline" title="Claim">\
                Claim\
              </a>\
            ';
          }
        }
      }]
    });

    // var query = datatable.getDataSourceQuery();

    // $('#c_form_status').on('change', function () {
    //   datatable.search($(this).val(), 'Status');
    // }).val(typeof query.Status !== 'undefined' ? query.Status : '');

    // $('#c_form_type').on('change', function () {
    //   datatable.search($(this).val(), 'Type');
    // }).val(typeof query.Type !== 'undefined' ? query.Type : '');

    // $('#c_form_status, #c_form_type').selectpicker();
    $('#local_data').on('click','#trigger-claim-modal', function (args,err) {
      event.preventDefault();
      $("#claimModal").modal('show');
      let predictionId=args.currentTarget.attributes["prediction-id"].value;
    }.bind(this));
  }
}
