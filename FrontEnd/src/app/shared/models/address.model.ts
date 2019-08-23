import { PhoneTypeEnum } from '@app/shared/models/enums/phone-type-enum';
import { GroupEnum } from '@app/shared/models/enums/group-enum';

export class Address {
    Id: number;
    FirstName: string;
    LastName: string;
    PhoneNumber: string;
    PhoneType: PhoneTypeEnum;
    Group: GroupEnum;
}
