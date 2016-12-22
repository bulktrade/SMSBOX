import { Component, ModuleWithProviders, NgModule, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "ng2-translate";
import { MenubarModule } from "primeng/components/menubar/menubar";
import { MenuItem } from "primeng/components/common/api";
import { LanguageModel } from "../../../language-selector/language-selector.model";
import { SUPPORT_LANGUAGES } from "../../../language-selector/support-languages";
import { LanguageSelectorModule } from "../../../language-selector/language-selector.component";

@Component({
    selector: 'navbar',
    template: require('./navbar.component.html'),
    styles: [
        require('./navbar.component.scss')
    ]
})

export class NavbarComponent {

    @Input('items') items: MenuItem[];

    languages: LanguageModel[] = [];

    ngOnInit() {
        this.languages = SUPPORT_LANGUAGES;
    }
}

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        MenubarModule,
        LanguageSelectorModule
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
