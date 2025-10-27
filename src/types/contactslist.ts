export interface IContactItemProps {
    firstName: string;
    lastName: string;
    mobileNo: string;
    [key: string]: string | number | Date | boolean;
}
export interface IRawContact {
  recordID: string;
  givenName: string;
  familyName: string;
  phoneNumbers: { number: string; label: string }[];
  emailAddresses: { email: string; label: string }[];
  postalAddresses: { street: string; city: string; region: string; postCode: string; country: string; label: string; state?: string }[];
  [key: string]: any;
}

export interface IAppContact {
  id: string | number;
  firstName: string;
  lastName: string;
  mobileNo: string;
  email: string;
  address: string;
  notes?: string;
  imageUri?: string;
}
export interface IContact {
    recordID?: string;
    givenName: string;
    familyName: string;
    phoneNumbers: { number: string; label: string }[];
    emailAddresses: { email: string; label: string }[];
    postalAddresses: { street: string; city: string; region: string; postCode: string; country: string; label: string; state?: string }[];
    [key: string]: any; // for other fields
}

export interface IUpdateContactInput {
    firstName?: string;
    lastName?: string;
    mobileNo?: string;
    email?: string;
    address?: string;
}