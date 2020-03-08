import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { ethers } from 'ethers';
declare var $: any;
@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit, AfterViewInit {
  provider = ethers.getDefaultProvider('kovan');
  private ethereum: any;
  private web3: any;
  public metaMaskSelectedAddress

  constructor() {

  }
  ngOnInit() {

    $(".navbar-toggler").on('click', function () {
      let body = $('body');
      if ($(body).hasClass('aside-header-menu-mobile--on')) {
        $(body).removeClass('aside-header-menu-mobile--on');
        $(".aside-header-menu-mobile-overlay").remove();
      }
      else {
        $(body).addClass('aside-header-menu-mobile--on');
        $('<div class="aside-header-menu-mobile-overlay"></div>').insertAfter("#navbarSupportedContent");
        $('#navbarSupportedContent').addClass('aside-header-menu-mobile--on');
      }
      $(".aside-header-menu-mobile-overlay").on('click', function () {
        $('body').removeClass('aside-header-menu-mobile--on');
        $(".aside-header-menu-mobile-overlay").remove();
        $('#navbarSupportedContent').removeClass('aside-header-menu-mobile--on');
      })
    })
    $("#aside_header_menu_mobile_close_btn").on('click', function () {
      $('body').removeClass('aside-header-menu-mobile--on');
      $(".aside-header-menu-mobile-overlay").remove();
      $('#navbarSupportedContent').removeClass('aside-header-menu-mobile--on');
    })
     
    this.initializeMetaMask();

  }

  async initializeMetaMask() {
    this.ethereum = window['ethereum'];
    await this.ethereum.enable();
    this.web3 = new ethers.providers.Web3Provider(this.ethereum);
    this.metaMaskSelectedAddress = this.web3.provider.selectedAddress;
    // this.startTimer();
    // this.setup();
  }
  ngAfterViewInit() {
    // $("#noMetaMaskModal").modal("show");
  }

}
