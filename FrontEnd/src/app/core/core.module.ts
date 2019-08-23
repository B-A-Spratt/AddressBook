import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// materials
import { MatToolbarModule } from '@angular/material/toolbar';

// custom
import { FooterComponent } from '@app/core/footer/footer.component';
import { HeaderComponent } from '@app/core/header/header.component';

const MaterialModules = [
  MatToolbarModule
];

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    MaterialModules
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ]
})
export class CoreModule { }
