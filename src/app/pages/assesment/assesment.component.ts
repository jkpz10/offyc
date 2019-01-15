import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { ViewPorposalComponent } from 'src/app/modal/view-porposal/view-porposal.component';

import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { UserServices } from 'src/app/services/user_services';


@Component({
  selector: 'app-assesment',
  templateUrl: './assesment.component.html',
  styleUrls: ['./assesment.component.scss']
})
export class AssesmentComponent implements OnInit {

  // data tables
  dataTable: any;

  // table data sample
  records: any[];
  proposals: any[];

  constructor(private http: HttpClient, private chRef: ChangeDetectorRef, private user: UserServices, public dialog: MatDialog) { } 

  viewProposal(): void {
    const dialogRef = this.dialog.open(ViewPorposalComponent, {
      width: '768px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }


  ngOnInit() {
    // this.token = this.cookies.get('set');
    // if (this.token === '1') {
    //   this.isUser = false;
    // } else {
    //   this.isAdmin = false;
    // }
    this.user.get_proposals().subscribe(
      (response)=>{
        console.log(response);

        if (response[0]){
          this.proposals = response[1];
        }
        console.log(this.proposals);

        this.chRef.detectChanges();
        // User
        // Display data tables
        // user
        const table: any = $('table');
        this.dataTable = table.dataTable();
      }
    )
  }

  loadTable() {
    console.log('table loaded');
    this.chRef.detectChanges();
    const table: any = $('table');
    this.dataTable = table.dataTable();
  }

}
