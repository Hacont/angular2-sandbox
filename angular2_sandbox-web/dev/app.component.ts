import {Component} from '@angular/core';
import {AccountAdministration} from "./account-administration/account_administration.component";


@Component({
    selector: 'my-app',
    template: `
        <div class="ui-g">
            <div class="ui-g-2 ui-g-nopad">
                <div class="ui-g-12">Sidebar</div>   
            </div>
            <div class="ui-g-10 ui-g-nopad">
                <div class="ui-g-12">Header</div>
                <div class="ui-g-12">
                    <account-administration></account-administration>
                </div>
            </div>
            <div class="ui-g-12 ui-g-nopad">Footer</div>
        </div>
    `,
    directives: [AccountAdministration]
})
export class AppComponent {

}