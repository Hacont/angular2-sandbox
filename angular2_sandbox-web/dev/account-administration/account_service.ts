import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Account} from './account';
import 'rxjs/add/operator/map'

@Injectable()
export class AccountService {

    constructor(private http: Http) {}

    getAccounts() {
        return this.http.get('http://localhost:8081/accounts')
            .map(res => <Account[]> res.json().data);
    }
}