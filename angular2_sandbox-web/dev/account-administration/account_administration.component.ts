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
        <!-- Table -->
        <p-dataTable [value]="accounts" selectionMode="single" [(selection)]="selectedAccount" (onRowSelect)="onRowSelect($event)" [paginator]="true" [rows]="20" [responsive]="true">
            <header>Kontenplan</header>
            <p-column field="account_no" header="Kontonummer" [sortable]="true"></p-column>
            <p-column field="description" header="Beschreibung" [sortable]="true"></p-column>
            <footer><div class="ui-helper-clearfix" style="width:100%"><button type="button" pButton icon="fa-plus" style="float:right" (click)="showDialogToAdd()" label="Konto hinzufügen"></button></div></footer>
        </p-dataTable>
        
        <!-- Dialog -->
        <p-dialog header="Account Details" [(visible)]="displayDialog" [responsive]="true" showEffect="fade" [modal]="true">
            <div class="ui-grid ui-grid-responsive ui-fluid ui-grid-pad" *ngIf="account">
                <div class="ui-grid-row">
                    <div class="ui-grid-col-4"><label for="account_no">Kontonummer</label></div>
                    <div class="ui-grid-col-8"><input pInputText id="account_no" [(ngModel)]="account.account_no" /></div>
                </div>
                <div class="ui-grid-row">
                    <div class="ui-grid-col-4"><label for="brand">Konto</label></div>
                    <div class="ui-grid-col-8"><input pInputText id="description" [(ngModel)]="account.description" /></div>
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
        this.accountService.getAccounts().subscribe(
            data => this.accounts = data),
            error => alert(error)
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
    constructor(public account_no?, public description?) {}
}