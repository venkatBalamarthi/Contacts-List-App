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
        addContact(state, action: PayloadAction<Omit<IContactItemProps, 'id'>>) {
            const newId = Math.max(...state.contacts.map(c => parseInt(c.id.toString())), 0) + 1;
            state.contacts.push({id: newId.toString(), ...action.payload});
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
