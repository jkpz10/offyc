import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class UserServices {
    private serverUrl = 'http://localhost/';
    // private serverUrl = 'http://192.168.43.31/';
    isLoggedIn: boolean = false;
    admin: boolean = false;
    user: boolean = false;
    fileToGo: File = null;
    tempo: any;
    pending: boolean;
    approved: boolean;
    notifs: any[];
    read = [];
    unread = [];


    constructor(private http: HttpClient) { }

    getall() {
        return this.http.get(this.serverUrl + 'codeigniter/api/Users/getall');
        // return params;
        // return this.http.post(this.serverUrl + 'restserver-ci/api/user/users', {'params':params});
    }
    login(params) {
        // console.log(params);
        // tslint:disable-next-line:max-line-length
        return this.http.post(
            this.serverUrl + 'codeigniter/api/Users/login', 
            {'username': params[0].username, 'password' : params[0].password},
            {reportProgress : true}
        );
    }
    register(params) {
        // console.log(params[0]);
        return this.http.post(this.serverUrl + 'codeigniter/api/Users/register', {
            'id' : params[0].id,
            'pass' : params[0].pass,
            'email' : params[0].email,
            'position' : params[0].position,
            'college' : params[0].college,
            'dept' : params[0].dept,
            'fName': params[0].fName,
            'mName': params[0].mName,
            'lName': params[0].lName,
            'bDay': params[0].bDay,
            'gender': params[0].gender,
            'cNumber': params[0].cNumber,
            'type' : 2
        });
    }

    check_login(params) {
        return this.http.post(this.serverUrl + 'codeigniter/api/Users/check_login', {'token': params});
        // return {'loggedin':'yes'};
    }


    submit_proposal(params) {
        // this.fileToGo = params[0].file;
        console.log(params);
        return this.http.post(this.serverUrl + 'codeigniter/api/Users/submit_proposal', {
            'title': params[0].title,
            'date_start': params[0].date_start,
            'date_end': params[0].date_end,
            'b_target': params[0].b_target,
            'b_gender': params[0].b_gender,
            'venue': params[0].venue,
            'trans_type': 1,
            'token': params[0].token,
            'fileName': params[0].filename,
            'partner': params[0].partner,
            'proponents': params[0].proponents,
            'accre_level': params[0].accre_level,
            'total_hours': params[0].total_hours,
            'budget_ustp': params[0].budget_ustp,
            'budget_partner': params[0].budget_partner
        });
    }
    update_proposal(params) {
        // this.fileToGo = params[0].file;
        console.log(params);
        return this.http.post(this.serverUrl + 'codeigniter/api/Users/update_proposal', {
            'title': params[0].title,
            'date_start': params[0].date_start,
            'date_end': params[0].date_end,
            'b_target': params[0].b_target,
            'b_gender': params[0].b_gender,
            'venue': params[0].venue,
            'trans_type': 1,
            'token': params[0].token,
            'fileName': params[0].filename,
            'partner': params[0].partner,
            'proponents': params[0].proponents,
            'accre_level': params[0].accre_level,
            'total_hours': params[0].total_hours,
            'budget_ustp': params[0].budget_ustp,
            'budget_partner': params[0].budget_partner,
            'prop_id': params[0].prop_id,
        });
    }
    proposal_approval(params) {
        console.log(params);
        return this.http.post(this.serverUrl + 'codeigniter/api/Users/proposal_approval', {
            'id' : params[0].id,
            'decision': params[0].decision,
            'title' : params[0].title
        });
    }

    get_des_proposals() {
        return this.http.get(this.serverUrl + 'codeigniter/api/Users/get_des_proposals');
    }
    get_proposals() {
        return this.http.get(this.serverUrl + 'codeigniter/api/Users/get_proposals');
    }
    get_proposal(params) {
        return this.http.post(this.serverUrl + 'codeigniter/api/Users/get_proposal', {'id': params});
    }

    get_proposals_user(params) {
        return this.http.post(this.serverUrl + 'codeigniter/api/Users/get_proposals_user', {'user_id': params});
    }

    getEvents() {
        return this.http.get(this.serverUrl + 'codeigniter/api/Users/get_events');
    }

    getNotifs(params) {
        return this.http.post(this.serverUrl + 'codeigniter/api/Users/getNotifs', {'id': params});
    }

    get_prexc(params) {
        return this.http.post(this.serverUrl + 'codeigniter/api/Users/get_prexc', {'quarter': params});
    }
    get_hemis(params) {
        return this.http.post(this.serverUrl + 'codeigniter/api/Users/get_hemis', { 'quarter': params });
    }

    revise_proposal(prop_id, comment) {
        return this.http.post(this.serverUrl + 'codeigniter/api/Users/revise_proposal', { 'prop_id': prop_id, 'comment': comment });
    }

    update_proj_stat(params) {
        console.log(params);
        return this.http.post(this.serverUrl + 'codeigniter/api/Users/update_project_status', { 'id': params.id, 'status': params.status });
    }
    implementation_status(status, prop_id) {
        return this.http.post(this.serverUrl + 'codeigniter/api/Users/implementation_status', { 'prop_id': prop_id, 'status': status });
    }

    get_unregistered(){
        return this.http.get(this.serverUrl + 'codeigniter/api/Users/get_unregistered');
    }

    approve_registration(id,status){
        return this.http.post(this.serverUrl + 'codeigniter/api/Users/approve_registration', { 'id': id, 'status': status });

    }
}
