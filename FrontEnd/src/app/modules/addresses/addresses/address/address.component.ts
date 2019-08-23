import { Component, OnInit } from '@angular/core';
import { GroupEnum } from '@app/shared/models/enums/group-enum';
import { PhoneTypeEnum } from '@app/shared/models/enums/phone-type-enum';
import { NgForm } from '@angular/forms';
import { AddressService } from '@app/shared/services/address.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  // enums
  phoneTypeEnum;
  groupEnum;

  // keys
  phoneTypeKeys;
  groupKeys;

  addressValidationMessages = {
    'firstName': [
      { type: 'required', message: 'First Name is required' },
      { type: 'minlength', message: 'First Name must be at least 5 characters long' }
    ],
    'lastName': [
      { type: 'minlength', message: 'Last Name must be at least 5 characters long' }
    ],
    'phoneNumber': [
      { type: 'required', message: 'Phone Number is required' },
      { type: 'pattern', message: 'Enter a valid phone number, format: (123) 456-7890' }
    ],
    'phoneType': [
      { type: 'required', message: 'Phone Type is required' }
    ]
  }

  phoneTypeIcon: Record<number, string> = {
    0: 'phone',
    1: 'smartphone',
    2: 'work',
    3: 'home'
  }

  groupIcon: Record<number, string> = {
    0: 'group',
    1: 'group',
    2: 'supervisor_account',
    3: 'mood',
    4: 'work'
  }

  constructor(private addressService: AddressService,
    private toastrService: ToastrService) { }

  ngOnInit() {
    // make sure the form is empty
    this.resetForm();

    this.phoneTypeEnum = PhoneTypeEnum;
    this.groupEnum = GroupEnum;

    // strip numbers from the enum
    this.phoneTypeKeys = Object.keys(this.phoneTypeEnum).slice(Object.keys(this.phoneTypeEnum).length / 2);
    this.groupKeys = Object.keys(this.groupEnum).slice(Object.keys(this.groupEnum).length / 2);
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.form.reset();
    }

    this.addressService.formData = {
      Id: 0,
      FirstName: '',
      LastName: '',
      PhoneNumber: '',
      PhoneType: 0,
      Group: 0
    }
  }

  onSubmit(form: NgForm) {
    if (this.addressService.formData.Group == 0) {
      this.addressService.formData.Group = 1;
    }
    if (this.addressService.formData.Id == 0) {
      this.postRecord(form);
    } else {
      this.putRecord(form);
    }
  }

  postRecord(form: NgForm) {
    this.addressService.postAddress().subscribe(
      s => {
        this.toastrService.success(`You have successfully added, ${this.addressService.formData.FirstName + ' ' + this.addressService.formData.LastName}'s 
        ${this.phoneTypeEnum[this.addressService.formData.PhoneType]} phone number, ${this.addressService.formData.PhoneNumber}, 
        into group: ${this.groupEnum[this.addressService.formData.Group]}.`, 'Add An Address');
        this.resetForm(form);
        this.addressService.getAddresses();
      }, e => {
        this.toastrService.error('Something went wrong... Please try again later.', 'Add An Address');
      }
    )
  }

  putRecord(form: NgForm) {
    this.addressService.putAddress().subscribe(
      s => {
        this.resetForm(form);
        this.addressService.getAddresses();
        this.toastrService.success('Updated successfully.', 'Update An Address');
      }, e => {
        this.toastrService.error('Something went wrong... Please try again later.', 'Update An Address');
      }
    )
  }
}
