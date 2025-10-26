import {Dimensions} from "react-native";
import {IAppContact, IRawContact} from "../types/contactslist";

const {width, height} = Dimensions.get('window')
// Define base dimensions (e.g., dimensions of a standard screen like iPhone 11)
const BASE_WIDTH = 375; // Base width for scaling
const BASE_HEIGHT = 812; // Base height for scaling

const normalizeSize = (size: number) => {
    const scale = Math.min(width / BASE_WIDTH, height / BASE_HEIGHT);
    return Math.round(size * scale);
}


export const isValidEmail = (email: string = '') => {
    if (!email?.length) {
        return false
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
export default normalizeSize

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