import {ObjectValues, StringList} from "@types/common"
import {IContactItemProps} from "@types/contactslist"

export const CONTACTS: IContactItemProps[] = [
    {
        "id": "1",
        "firstName": 'Venkatesh',
        "lastName": 'Balamarthi',
        "mobileNo": '8812345675',
        "email": 'EMAIL',
        "address": "address",
        "notes": "notes",
        "imageUri" : '',
    },
    {
        "id": "2",
        "firstName": 'Venkat',
        "lastName": 'B',
        "mobileNo": '8812345671',
         "email": 'EMAIL',
        "address": "address",
        "notes": "notes",
        "imageUri" : '',
    },
    {
        "id": "3",
        "firstName": 'Rao',
        "lastName": 'B',
        "mobileNo": '8812345673',
        "email": 'EMAIL',
        "address": "address",
        "notes": "notes",
        "imageUri" : '',
    },
    {
        "id": "4",
        "firstName": 'Balamarthi',
        "lastName": 'Venky',
        "mobileNo": '8812345633',
        "email": 'EMAIL',
        "address": "address",
        "notes": "notes",
        "imageUri" : '',
    },
    {
        "id": "5",
        "firstName": 'Venkatesh',
        "lastName": 'Balamarthi',
        "mobileNo": '8812345675',
        "email": 'EMAIL',
        "address": "address",
        "notes": "notes",
        "imageUri" : '',
    },
    {
        "id": "6",
        "firstName": 'Vankat',
        "lastName": 'B',
        "mobileNo": '8812345671',
        "email": 'EMAIL',
        "address": "address",
        "notes": "notes",
        "imageUri" : '',
    },
    {
        "id": "7",
        "firstName": 'Venkat Rao',
        "lastName": 'B',
        "mobileNo": '8812345688',
        "email": 'EMAIL',
        "address": "address",
        "notes": "notes",
        "imageUri" : '',
    },
    {
        "id": "8",
        "firstName": 'B',
        "lastName": 'Venky',
        "mobileNo": '8812345666',
        "email": 'EMAIL',
        "address": "address",
        "notes": "notes",
        "imageUri" : '',
    },
    {
        "id": "9",
        "firstName": 'Rao',
        "lastName": 'B',
        "mobileNo": '8812345673',
        "email": 'EMAIL',
        "address": "address",
        "notes": "notes",
        "imageUri" : '',
    },
    {
        "id": "10",
        "firstName": 'Balamarthi',
        "lastName": 'Venky',
        "mobileNo": '8812345633',
        "email": 'EMAIL',
        "address": "address",
        "notes": "notes",
        "imageUri" : '',
    },
    {
        "id": "11",
        "firstName": 'Venkatesh',
        "lastName": 'Balamarthi',
        "mobileNo": '8812345675',
        "email": 'EMAIL',
        "address": "address",
        "notes": "notes",
        "imageUri" : '',
    },
    {
        "id": "12",
        "firstName": 'BalamarthiN',
        "lastName": 'Venky',
        "mobileNo": '8812345633',
        "email": 'EMAIL',
        "address": "address",
        "notes": "notes",
        "imageUri" : '',
    },
]
export const FIEDLS: StringList = [
    "firstName",
    'lastName',
    "mobileNo",
    "email",
    "address",
    "notes",
]
export const DETAILS_FILEDS: ObjectValues = {
    "email": 'Email',
    "address": "Address",
    "notes": "Notes",
    "firstName": "First Name",
    "lastName": 'Last Name',
    "mobileNo" : 'Mobile Number',
}
export const SCREEN_NAMES = {
    ADD_CONTACT_SCREEN: 'Add Contact Screen',
    CONTACT_DETAILS: 'Contact Details Screen',
    CONTACTS_LIST: 'Contacts List Screen',
    EDIT_CONTACT_SCREEN: 'Edit Contact Screen',
} as const

export const SCREEN_TITLES = {
    CONTACTS: 'Contacts',
    ADD_CONTACT : 'Add Contact',
    CONTACT_DETAILS:'Contact Details'
} as const

export const SCREEN_LABELS: ObjectValues = {
    EMPTY: 'Empty',
    NO_CONTACTS_FOUND: 'No contacts found',
    CALL: 'Call',
    MESSAGE: 'Message',
    MOBILE: 'mobile',
    SOMETHING_UNEXPECTED: "SOMETHING_UNEXPECTED",
    TRY_AGAIN: ' Try Again'
} as const

export const BUTTON_LABLES: ObjectValues = {
    ADD_CONTACT: 'Add Contact'
} as const

export const EXCLUDED_FILEDS: ObjectValues = {
    'id': 'id',
    'firstName': 'firstName',
    'lastName': 'lastName',
    'mobileNo': 'mobileNo',
    'imageUri': 'imageUri'
}
