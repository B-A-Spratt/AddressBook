import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

// custom
import { Address } from '@app/shared/models/address.model';
import { AddressService } from '@app/shared/services/address.service';
import { GroupEnum } from '@app/shared/models/enums/group-enum';
import { PhoneTypeEnum } from '@app/shared/models/enums/phone-type-enum';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.css']
})
export class AddressListComponent implements OnInit {

  phoneTypeEnum;
  groupEnum;

  headElements = ['Name', 'Phone Number', 'Type', 'Group']

  constructor(private addressService: AddressService,
    private toastrService: ToastrService) { }

  ngOnInit() {
    this.addressService.getAddresses();

    this.phoneTypeEnum = PhoneTypeEnum;
    this.groupEnum = GroupEnum;
  }

  populateForm(a: Address) {
    this.addressService.formData = Object.assign({}, a);
  }

  onDelete(Id, form: NgForm) {
    if (confirm('Are you sure you wish to delete this address?')) {
      this.addressService.deleteAddress(Id).subscribe(
        s => {
          this.addressService.getAddresses();
          this.toastrService.success('Deleted successfully.', 'Delete An Address');
        }, e => {
          this.toastrService.error('Something went wrong... Please try again later.', 'Delete An Address');
        }
      )
    }
  }
}
