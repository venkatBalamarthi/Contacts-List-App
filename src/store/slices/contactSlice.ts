import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CONTACTS} from '../../constants';
import {IAppContact, IContactItemProps} from '../../types/contactslist';

interface IContactState {
    contactDetails: {[key: string]: string};
    loading: boolean;
    contacts: IContactItemProps[],
    error: string | null;
    remoteContacts: IAppContact | null;
}

const initialState: IContactState = {
    contactDetails: {},
    contacts: CONTACTS,
    loading: false,
    error: null,
    remoteContacts: null
};

const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        setError(state, action: PayloadAction<string | null>) {
            state.error = action.payload;
        },
        addContact(state, action: PayloadAction<typeof CONTACTS[0]>) {
            state.contacts.push({id: state.contacts?.length + 1, ...action.payload});
        },
        gettContacts(state, action: PayloadAction<typeof CONTACTS[0]>) {
            state.remoteContacts = action.payload;
        },
        addRemoteContact(state, action: PayloadAction<typeof CONTACTS[0]>) {
            state.remoteContacts?.push(action.payload);
        },
    },
});

export const {setError, addContact, gettContacts, addRemoteContact} = contactsSlice.actions;

export default contactsSlice.reducer;
