import { Component, OnInit, AfterViewInit } from '@angular/core';
declare var cApp: any;
declare var $: any;
@Component({
  selector: '.wrapper',
  templateUrl: './status.component.html'
})
export class StatusComponent implements OnInit, AfterViewInit {
  constructor() {
  }
  ngOnInit() {
  }
  ngAfterViewInit() {
    this.demo();
  }
  demo() {

    var dataJSONArray = JSON.parse('[{"id":"1","date":"2020/02/20","prediction_name":"lorem ipsum doller sit amet","action_taken":"Yes","eth_invested":"1.25","status":"Won"}]');

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
