import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { CookieService } from 'ngx-cookie-service';

import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { HttpClient, HttpHeaders, HttpEventType, HttpResponse } from '@angular/common/http';
import { UserServices } from 'src/app/services/user_services';
import { UploadService } from 'src/app/services/upload.service';
import { SuccessComponent } from '../success/success.component';
import { FormControl, FormGroup, Validators, FormControlName, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-submit-proposal',
  templateUrl: './submit-proposal.component.html',
  styleUrls: ['./submit-proposal.component.scss']
})
export class SubmitProposalComponent implements OnInit {
  startDate = new Date(2018, 1, 0);
  // form validation
  userType: string;
  isArchive: boolean;
  isUserSubmit: boolean;
  submitProposal: FormGroup;

  proposal = [];
  title: string;
  sdate: string;
  edate: string;
  beneficiary: string;
  bene_gender: string;
  program:string;
  partner: string;
  venue: string;
  proponents: string;
  accre_level: string;
  total_hours: string;
  budget_ustp: string;
  budget_partner: string;

  file: File = null;
  moa_file: File = null;
  signed: File = null;
  accomp: File = null;

  fileName: string;
  files: FileList = null;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<SubmitProposalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cookies: CookieService,
    private user: UserServices,
    private http: HttpClient,
    private upload: UploadService,
    private _formBuilder: FormBuilder
  ) {
    // check if gkan ba sa user or archive ba g click na button.
    this.userType = this.data.userType;
    if (this.userType === '1') {
      this.isArchive = true;
      this.isUserSubmit = false;
    } else {
      this.isArchive = false;
      this.isUserSubmit = true;
    }
  }

  showSuccess(page: string): void {
    const dialogRef = this.dialog.open(SuccessComponent, {
      width: '435px',
      panelClass: 'custom-dialog-success',
      data: {
        page: page
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

  ngOnInit() {
    this.submitProposal = this._formBuilder.group({
      titleVal: ['', [Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]],
      typeVal: ['', Validators.required],
      proponentsVal: ['', Validators.required],
      // programVal: ['', [Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]],
      programVal: ['', Validators.required],
      accreditationLevel: ['', Validators.required],
      sDate: ['', Validators.required],
      eDate: ['', Validators.required],
      tHours: ['', Validators.required],
      // tHours: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      tBenificiary: ['', [Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]],
      gBenificiary: ['', Validators.required],
      projectLocation: ['', Validators.required],
      budget_u_val: ['', Validators.required],
      budget_p_val: ['', Validators.required],
      partnerAgency: ['', [Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]],
      upload: ['', Validators.required],
      budgetUSTP: ['', Validators.pattern('^[0-9]*$')],
      budgetPartner: ['', Validators.pattern('^[0-9]*$')],
      uploadMoa: ['', Validators.required],
      uploadPC: ['', Validators.required],
      uploadAC: ['', Validators.required]
    });
  }

  save() {
    this.proposal = [];
    this.proposal.push({
      'title': this.title,
      'date_start': this.sdate,
      'date_end': this.edate,
      'b_target': this.beneficiary,
      'b_gender': this.bene_gender,
      'venue': this.venue,
      'token': this.cookies.get(this.cookies.get('id')),
      'filename': this.fileName,
      'program': this.program,
      'partner': this.partner,
      'proponents': this.proponents,
      'accre_level': this.accre_level,
      'total_hours': this.total_hours,
      'budget_ustp': this.budget_ustp,
      'budget_partner': this.budget_partner
      // 'file' : this.files[0]
    });
    this.user.submit_proposal(this.proposal).subscribe(
      (response) => {
        if (response) {
          console.log(response);
          const file = this.files[0];
          console.log(file);

          this.upload.uploadFile(file, 'proposal', this.title)
            .subscribe(
              event => {
                if (event.type === HttpEventType.UploadProgress) {
                  const percentDone = Math.round(100 * event.loaded / event.total);
                  console.log(`File is ${percentDone}% loaded.`);
                } else if (event instanceof HttpResponse) {
                  console.log('File is completely loaded!');
                }
              },
              (err) => {
                console.log('Upload Error:', err);
                this.dialogRef.close('Proposal Successfully Submitted');

              }, () => {
                console.log('Upload done');
                this.dialogRef.close('Proposal Successfully Submitted');
              }
            );
        }
      }
    );
    const page = 'fromProposal';
    this.showSuccess(page);
  }

  // upload(){
  //   this.user.file_upload().subscribe(
  //     (response) => {
  //       console.log(response);
  //     }
  //   )
  // }

  getFiles(event) {
    // this.file = files.item(0);
    this.files = event.target.files;
    console.log(this.files);
    if(this.files[0].size > 2000000){
      $('#fileName').val('File is greater than 2 MB, Choose another file');
      this.files = null;
    }else{
      this.fileName = this.files[0]['name'];
      $('#fileName').val(this.files[0]['name']);
    }

  }
  upload_moa(event) {

    // this.file = files.item(0);
    this.files = event.target.files;
    this.moa_file = this.files[0];
    this.fileName = this.files[0]['name'];
    $('#moaName').val(this.files[0]['name']);
  }
  upload_signed(event) {

    // this.file = files.item(0);
    this.files = event.target.files;
    this.signed = this.files[0];
    this.fileName = this.files[0]['name'];
    $('#signedName').val(this.files[0]['name']);
  }

  upload_accomp(event) {

    // this.file = files.item(0);
    this.files = event.target.files;
    this.accomp = this.files[0];
    this.fileName = this.files[0]['name'];
    $('#accompName').val(this.files[0]['name']);
  }


  // selectFile(event) {
  //   this.uploadFile(event.target.files);
  // }


  // uploadFile() {
  //   let file = this.files[0];
  //   console.log(file);

  //   this.upload.uploadFile('http://localhost/codeigniter/api/Users/file_upload', file,this.proposal)
  //     .subscribe(
  //       event => {
  //         if (event.type == HttpEventType.UploadProgress) {
  //           const percentDone = Math.round(100 * event.loaded / event.total);
  //           console.log(`File is ${percentDone}% loaded.`);
  //         } else if (event instanceof HttpResponse) {
  //           console.log('File is completely loaded!');
  //         }
  //       },
  //       (err) => {
  //         console.log("Upload Error:", err);
  //         this.dialogRef.close('Proposal Successfully Submitted');

  //       }, () => {
  //         console.log("Upload done");
  //         this.dialogRef.close('Proposal Successfully Submitted');
  //       }
  //     )
  // }

}


