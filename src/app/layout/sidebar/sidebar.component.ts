import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ApiService } from 'src/app/core/service/api.service';
import { Router } from '@angular/router';
import * as moment from 'moment';
declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  children: any;

}
export const ROUTES: RouteInfo[] = [
  { path: '/sondage', title: 'Sondage', icon: 'ballot', class: '', children: [] },

];
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  user: any;
  loadedSeen = false ;
  moment = moment ;
  account: any;
  notifications: any[] = [] ;
  location: Location;
  isExpanded = false;
  element: HTMLElement;
  constructor(public dialog: MatDialog,
              private authService: ApiService,
              private router: Router,
              public apiService: ApiService,

  ) {

  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('account'));
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.account = JSON.parse(localStorage.getItem('account'));

  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }
  sidebarClose() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('nav-open');
  }




  logout(): void {
    this.authService.setLoggedOut();
    this.router.navigate(['/login']);
  }

}
