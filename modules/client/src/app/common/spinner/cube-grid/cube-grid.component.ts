import { Component, Input, NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'sk-cube-grid',
    template: require('./cube-grid.component.html'),
    styles: [
        require('./cube-grid.component.scss')
    ]
})

export class CubeGridComponent {
    @Input()
    public delay: number = 0;

    @Input()
    public backgroundColor: string = '#009688';

    @Input()
    public isRunning: boolean = true;

}

@NgModule({
    imports: [CommonModule],
    exports: [CubeGridComponent],
    declarations: [CubeGridComponent],
})
export class CubeGridModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CubeGridModule,
            providers: []
        };
    }
}
