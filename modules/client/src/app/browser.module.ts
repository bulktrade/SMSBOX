import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { CommonModule } from "@angular/common";
import { AppModule } from "./app.module";
import { BrowserModule } from "@angular/platform-browser";

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        AppModule
    ],
    bootstrap: [AppComponent]
})

export class MainModule {
}
