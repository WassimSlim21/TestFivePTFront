import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ApiService } from 'src/app/core/service/api.service';
import { EditProfilepopupComponent } from 'src/app/popup/editprofile/edit-profilepopup.component';
import { Router } from '@angular/router';
declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  children: any;
}
export const ROUTES: RouteInfo[] = [
  { path: '/users', title: 'Kpeiz Users', icon: 'person', class: '', children: [] },
  { path: '/companies', title: 'Companies', icon: 'apartment', class: '', children: [] },
  { path: '/tags', title: 'Tags', icon: 'local_offer', class: '', children: [] },
  { path: '/social-accounts', title: 'Brand Insight', icon: 'people_alt', class: '', children: [] },
  { path: '/benchmarks', title: 'Market Insight', icon: 'ballot', class: '', children: [] },
  { path: '/packs', title: 'Packs', icon: 'all_inbox', class: '', children: [] },
  { path: '/config', title: 'configurations', icon: 'settings', class: '', children: [] }

];
export const ROUTESMarket: RouteInfo[] = [
  {
    path: '/markcom', title: 'Marketing and Commercial', icon: 'web', class: '', children: [
      { path: '/files', title: 'Files', icon: 'attach_file', class: '' },
      { path: '/bug', title: 'Bugs', icon: 'bug_report', class: '' },
      { path: '/calendar', title: 'Calendar', icon: 'calendar_today', class: '' },

    ]
  },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  super_admin: any =   { path: '/espace-administarteur', title: 'Admin space',
   icon: 'admin_panel_settings', class: '', children: [] };
  menuItems: any[];
  marketmenuItems: any[];
  account: any;
  isExpanded = false;
  element: HTMLElement;
  constructor(public dialog: MatDialog,
    private authService: ApiService,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.loadAccount();
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.marketmenuItems = ROUTESMarket.filter(marketmenuItems => marketmenuItems);
    this.account = JSON.parse(localStorage.getItem('account'));

  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    if (this.router.url === '/markcom/bug') {
     return true;
    }
    return true;
  }
  sidebarClose() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('nav-open');
  }
  openDialog(): void {
    this.sidebarClose();
    const dialogRef = this.dialog.open(EditProfilepopupComponent, {
      disableClose: false,
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });

  }



  logout(): void {
    this.authService.setLoggedOut();
    this.router.navigate(['/login']);
  }
  loadAccount() {
    this.authService.apiGetAll(`account/get/${JSON.parse(localStorage.getItem('account'))._id}`).subscribe((response: any) => {
        localStorage.setItem('account', JSON.stringify(response));
        if ( response.role === 'super-admin') {
          this.menuItems.unshift(this.super_admin);
           }
    });
  }

}
