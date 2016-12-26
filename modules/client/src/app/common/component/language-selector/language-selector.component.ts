import { Component, ModuleWithProviders, NgModule, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateModule, TranslateService } from "ng2-translate";
import { LanguageModel } from "./language-selector.model";

@Component({
    selector: 'language-selector',
    template: require('./language-selector.component.html'),
    styles: [
        require('./language-selector.component.scss')
    ],
    host: {
        '(document:click)': 'onClick($event)'
    }
})

export class LanguageSelectorComponent {

    @Input('languages') languages: LanguageModel[];

    @Input('currentLanguage') currentLanguage: LanguageModel;

    toggle: boolean = false;

    constructor(private translate: TranslateService) {
    }

    ngOnInit() {
        // set default language
        if (!this.currentLanguage) {
            this.currentLanguage = <LanguageModel>{
                languageName: 'language.' + this.translate.currentLang,
                languageCode: this.translate.currentLang,
            };
        }
    }

    onClick(event) {
        this.toggle = false;
    }

    changeLanguage(language: LanguageModel) {
        this.currentLanguage = language;
        this.translate.use(language.languageCode);
    }
}

@NgModule({
    imports: [
        CommonModule,
        TranslateModule
    ],
    exports: [LanguageSelectorComponent],
    declarations: [LanguageSelectorComponent],
})
export class LanguageSelectorModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: LanguageSelectorModule,
            providers: []
        };
    }
}
