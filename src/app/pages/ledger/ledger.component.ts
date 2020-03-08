import { Component, OnInit, AfterViewInit } from '@angular/core';
declare var cApp: any;
declare var $: any;
@Component({
  selector: '.wrapper',
  templateUrl: './ledger.component.html'
})
export class LedgerComponent implements OnInit, AfterViewInit {
  constructor() {
  }
  ngOnInit() {
  }
  ngAfterViewInit() {
    this.demo();
  }
  demo() {

    var dataJSONArray = JSON.parse('[{"id":"1","date":"2020/02/20","particulars":"From 0x0s55s To 0x5448","debit":"1.54 ETH","credit":"1.25 ETH"}]');

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
        field: "particulars",
        title: "Particulars"
      }, {
        field: "debit",
        title: "Debit"
      }, {
        field: "credit",
        title: "Credit"
      }]
    });
  }
}
