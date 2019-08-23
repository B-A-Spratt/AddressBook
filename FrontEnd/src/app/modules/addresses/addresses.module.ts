import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

// custom
import { AddressComponent } from '@app/modules/addresses/addresses/address/address.component';
import { AddressesComponent } from '@app/modules/addresses/addresses/addresses.component';
import { AddressListComponent } from '@app/modules/addresses/addresses//address-list/address-list.component';
import { AddressService } from '@app/shared/services/address.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AddressesComponent,
    AddressComponent,
    AddressListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [
    AddressesComponent
  ],
  providers: [
    AddressService
  ]
})
export class AddressesModule { }
