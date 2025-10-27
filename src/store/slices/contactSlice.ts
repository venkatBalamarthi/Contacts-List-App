import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CONTACTS} from '../../constants';
import {IAppContact, IContactItemProps} from '../../types/contactslist';

interface IContactState {
    contactDetails: {[key: string]: string};
    loading: boolean;
    contacts: IContactItemProps[];
    error: string | null;
    remoteContacts: IAppContact[];
}

const initialState: IContactState = {
    contactDetails: {},
    contacts: CONTACTS,
    loading: false,
    error: null,
    remoteContacts: [],
};

const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        setError(state, action: PayloadAction<string | null>) {
            state.error = action.payload;
        },
        addContact(state, action: PayloadAction<IContactItemProps>) {
            const contactId = state.contacts?.length ? state.contacts?.length + 1 : 1;
            const contactItem = {id: `${contactId}`, ...action.payload};
            state.contacts.push(contactItem);
        },
        getContacts(state, action: PayloadAction<IAppContact[]>) {
            state.remoteContacts = action.payload;
        },
        addRemoteContact(state, action: PayloadAction<IAppContact>) {
            state.remoteContacts.push(action.payload);
        },
    },
});

export const {setError, addContact, getContacts, addRemoteContact} = contactsSlice.actions;

export default contactsSlice.reducer;
