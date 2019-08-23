import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';

// custom
import { Address } from '@app/shared/models/address.model';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  readonly rootUrl = "https://localhost:44365/api/addresses";

  formData: Address;
  list: Address[];

  constructor(private http: HttpClient) { }

  getAddresses() {
    this.http.get(this.rootUrl)
      .toPromise()
      .then(a => this.list = a as Address[]);
  }

  postAddress() {
    return this.http.post(this.rootUrl, this.formData);
  }

  putAddress() {
    return this.http.put(this.rootUrl + '/' + this.formData.Id, this.formData);
  }

  deleteAddress(id) {
    return this.http.delete(this.rootUrl + '/' + id);
  }
}
