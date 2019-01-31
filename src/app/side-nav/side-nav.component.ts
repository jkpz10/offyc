import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { UserServices } from '../services/user_services';
import * as $ from 'jquery';


@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  read = [];
  unread = [];
  notif_count: any;


  isAdmin = true;
  token: any;
  hasNotif = true;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  // tslint:disable-next-line:max-line-length
  constructor(private breakpointObserver: BreakpointObserver, private cookies: CookieService, private router: Router, private user: UserServices) {}

  ngOnInit() {
    this.read = [];
    this.unread = [];
    this.token = this.cookies.get('set');
    if (this.token === '2') {
      this.isAdmin = false;
    } else {
    }

    this.user.getNotifs(this.cookies.get('id')).subscribe(
      (response) => {
        if (response[0]) {
          response[1].forEach(element => {
            if (element.notif_type_id === 1) {
              element.notif_type_id = 'sent an Extension Project Proposal';
            } else if (element.notif_type_id === 2) {
              element.notif_type_id = 'You\'re proposal for an Extension Project has been approved';
            } else if (element.notif_type_id === 3) {
              element.notif_type_id = 'You\'re proposal for an Extension Project has been denied';
            } else if (element.notif_type_id === 4) {
              element.notif_type_id = 'sent an Accomplishment Report';
            }
          });
          this.user.notifs = response[1];
          this.user.notifs.forEach(element => {
            if (element.notification_status === 1) {
              this.read.push(element);
            } else {
              this.unread.push(element);
            }

          });
          this.notif_count = this.unread.length;
        }


        if (this.unread.length > 0) {
          $('.notif-icon').addClass('unread');
        }
      }
    );
  }

  unblink() {
    $('.notif-icon').removeClass('unread');
  }

  check_notifs() {
    this.read = [];
    this.unread = [];

    this.user.getNotifs(this.cookies.get('id')).subscribe(
      (response) => {
        if (response[0]) {
          this.user.notifs = response[1];
          this.user.notifs.forEach(element => {
            if (element.notification_status === 1) {
              this.read.push(element);
            } else {
              this.unread.push(element);
            }
          });
          this.notif_count = this.unread.length;
        }
      }
    );
  }

  logout() {
    console.log('hello');
    this.cookies.deleteAll();
    this.router.navigate(['/']);
  }

}
