import { Component, ModuleWithProviders, NgModule, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "ng2-translate";
import { MenuItem } from "primeng/components/common/api";
import { LanguageModel } from "../language-selector/language-selector.model";
import { SUPPORT_LANGUAGES } from "../language-selector/support-languages";
import { LanguageSelectorModule } from "../language-selector/language-selector.component";
import { TokenService } from "../../../services/auth/token.service";
import { Router, RouterModule } from "@angular/router";
import { MenubarModule } from "./menubar/menubar.component";

@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html',
    styleUrls: [
        './navbar.component.scss'
    ]
})

export class NavbarComponent {

    @Input('items') items: MenuItem[];

    languages: LanguageModel[] = [];

    constructor(private tokenService: TokenService,
                private router: Router) {
    }

    ngOnInit() {
        this.languages = SUPPORT_LANGUAGES;
    }

    logout() {
        this.tokenService.resetToken();
        this.router.navigateByUrl('/login');
    }
}

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        MenubarModule,
        RouterModule,
        LanguageSelectorModule,
    ],
    exports: [NavbarComponent],
    declarations: [NavbarComponent],
})
export class NavbarModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: NavbarModule,
            providers: []
        };
    }
}
