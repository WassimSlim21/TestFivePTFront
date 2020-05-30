import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Account } from 'src/app/core/models/account';
import { ApiService } from 'src/app/core/service/api.service';

declare interface Role {
  id: string;
  role: string;
}
export const Roles: Role[] = [
  { id: '1', role: 'admin'},
  { id: '2', role: 'super-admin'}
];
@Component({
  selector: 'app-espace-administarteur',
  templateUrl: './espace-administarteur.component.html',
  styleUrls: ['./espace-administarteur.component.scss']
})
export class EspaceAdministarteurComponent implements OnInit {
  isLoading = true;
  menuRoles: any[];
  displayedColumns: string[] = ['user_id', 'userName',  'role', 'email', 'change_role', 'delete'];
  dataSource: MatTableDataSource<Account>;
  accounts: Account[];
  selectedRole: string;
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.menuRoles = Roles.filter(menuItem => menuItem);

    this.getAllAccounts();
  }

  getAllAccounts() {
    this.apiService.apiGetAll('/account/get').subscribe(
      (response: any) => {
        if (response) {
          this.accounts = response;
          console.log(this.accounts);
          this.dataSource = new MatTableDataSource<Account>(this.accounts);

          this.isLoading = false;
        }
      },
    error => {
      console.log(error);
    });
  }

}
