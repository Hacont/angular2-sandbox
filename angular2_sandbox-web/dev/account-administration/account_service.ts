import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Account} from './account';

@Injectable()
export class AccountService {

    constructor(private http: Http) {}

    getAccounts() {
        return this.http.get('./assets/resources/accounts.json')
            .toPromise()
            .then(res => <Account[]> res.json().data)
            .then(data => { return data; });
    }
}