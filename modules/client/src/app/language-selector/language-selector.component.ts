import { Component, ModuleWithProviders, NgModule, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateModule, TranslateService } from "ng2-translate";
import { LanguageModel } from "./language-selector.model";

@Component({
    selector: 'language-selector',
    template: require('./language-selector.component.html'),
    styles: [
        require('./language-selector.component.scss')
    ]
})

export class LanguageSelectorComponent {
    @Input('languages') languages: LanguageModel[];
    @Input('defaultLanguage') defaultLanguage: LanguageModel;

    constructor(private translate: TranslateService) {
    }

    ngOnInit() {
        // set default language
        if (!this.defaultLanguage) {
            let userLang = navigator.language.split('-')[1].toLowerCase();

            this.defaultLanguage = <LanguageModel>{
                languageName: 'language.' + userLang,
                languageCode: userLang,
            };

            this.translate.setDefaultLang(userLang);
            this.translate.use(userLang);

        }
    }

    changeLanguage(language: LanguageModel) {
        this.defaultLanguage = language;
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