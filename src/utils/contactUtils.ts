import {IAppContact, IContact, IRawContact, IUpdateContactInput} from "@types/contactslist";

export const mapContacts = (rawContacts: IRawContact[]): IAppContact[] => {
    return rawContacts.map((contact,) => ({
        id: contact?.recordID,
        firstName: contact.givenName || '',
        lastName: contact.familyName || '',
        mobileNo: contact.phoneNumbers?.[0]?.number || '',
        email: contact.emailAddresses?.[0]?.email || '',
        address: contact.postalAddresses?.[0]?.street || '',
        notes: contact.note || '',
        imageUri: contact.thumbnailPath || '',
    }));
};
 export const updateContact = (contact: IContact, updates: IUpdateContactInput): IContact => {
        return {
            ...contact,
            givenName: updates.firstName || contact.givenName,
            familyName: updates.lastName || contact.familyName,
            phoneNumbers: updates.mobileNo
                ? [{number: updates.mobileNo, label: 'mobile'}]
                : contact.phoneNumbers,
            emailAddresses: updates.email
                ? [{email: updates.email, label: 'work'}]
                : contact.emailAddresses,
            postalAddresses: updates.address
                ? [{...contact.postalAddresses[0], street: updates.address}]
                : contact.postalAddresses,
        };
    };