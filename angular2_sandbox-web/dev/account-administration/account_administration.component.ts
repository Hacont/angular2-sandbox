/**
 * Created by Hacont on 22.07.2016.
 */
import {Component} from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';
import {InputText,DataTable,Button,Dialog,Column,Header,Footer} from 'primeng/primeng';
import {Account} from './account';
import {AccountService} from './account_service';


@Component({
    selector: 'account-administration',
    directives: [InputText,DataTable,Button,Dialog,Column,Header,Footer],
    providers: [HTTP_PROVIDERS, AccountService],
    template: `
        <p-dataTable [value]="accounts" selectionMode="single" [(selection)]="selectedAccount" (onRowSelect)="onRowSelect($event)" [paginator]="true" [rows]="10" [responsive]="true">
            <header>CRUD for Accounts</header>
            <p-column field="vin" header="Vin" [sortable]="true"></p-column>
            <p-column field="year" header="Year" [sortable]="true"></p-column>
            <p-column field="brand" header="Brand" [sortable]="true"></p-column>
            <p-column field="color" header="Color" [sortable]="true"></p-column>
            <footer><div class="ui-helper-clearfix" style="width:100%"><button type="button" pButton icon="fa-plus" style="float:left" (click)="showDialogToAdd()" label="Add"></button></div></footer>
        </p-dataTable>
        
        <p-dialog header="Account Details" [(visible)]="displayDialog" [responsive]="true" showEffect="fade" [modal]="true">
            <div class="ui-grid ui-grid-responsive ui-fluid ui-grid-pad" *ngIf="account">
                <div class="ui-grid-row">
                    <div class="ui-grid-col-4"><label for="vin">Vin</label></div>
                    <div class="ui-grid-col-8"><input pInputText id="vin" [(ngModel)]="account.vin" /></div>
                </div>
                <div class="ui-grid-row">
                    <div class="ui-grid-col-4"><label for="brand">Year</label></div>
                    <div class="ui-grid-col-8"><input pInputText id="brand" [(ngModel)]="account.year" /></div>
                </div>
                <div class="ui-grid-row">
                    <div class="ui-grid-col-4"><label for="brand">Brand</label></div>
                    <div class="ui-grid-col-8"><input pInputText id="brand" [(ngModel)]="account.brand" /></div>
                </div>
                <div class="ui-grid-row">
                    <div class="ui-grid-col-4"><label for="color">Color</label></div>
                    <div class="ui-grid-col-8"><input pInputText id="color" [(ngModel)]="account.color" /></div>
                </div>
            </div>
            <footer>
                <div class="ui-dialog-buttonpane ui-widget-content ui-helper-clearfix">
                    <button type="button" pButton icon="fa-close" (click)="delete()" label="Delete"></button>
                    <button type="button" pButton icon="fa-check" (click)="save()" label="Save"></button>
                </div>
            </footer>
        </p-dialog>
    `,
})


export class AccountAdministration {

    displayDialog: boolean;

    account: Account = new PrimeAccount();

    selectedAccount: Account;

    newAccount: boolean;

    accounts: Account[];

    constructor(private accountService: AccountService) { }

    ngOnInit() {
        this.accountService.getAccounts().then(accounts => this.accounts = accounts);
    }

    showDialogToAdd() {
        this.newAccount = true;
        this.account = new PrimeAccount();
        this.displayDialog = true;
    }

    save() {
        if(this.newAccount)
            this.accounts.push(this.account);
        else
            this.accounts[this.findSelectedAccountIndex()] = this.account;

        this.account = null;
        this.displayDialog = false;
    }

    delete() {
        this.accounts.splice(this.findSelectedAccountIndex(), 1);
        this.account = null;
        this.displayDialog = false;
    }

    onRowSelect(event) {
        this.newAccount = false;
        this.account = this.cloneAccount(event.data);
        this.displayDialog = true;
    }

    cloneAccount(c: Account): Account {
        let account = new PrimeAccount();
        for(let prop in c) {
            account[prop] = c[prop];
        }
        return account;
    }

    findSelectedAccountIndex(): number {
        return this.accounts.indexOf(this.selectedAccount);
    }
}

class PrimeAccount implements Account {

    constructor(public vin?, public year?, public brand?, public color?) {}
}