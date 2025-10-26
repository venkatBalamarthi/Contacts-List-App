import {SCREEN_NAMES} from "../constants/screenNames";
import AddContactScreen from "../screens/AddContactScreen";
import ContactDetails from "../screens/ContactDetails";
import ContactsList from "../screens/ContactsList";
import EditContactScreen from "../screens/EditContactScreen";


const ROUTER_NAMES = [
    {
        key: 1,
        name: SCREEN_NAMES.ADD_CONTACT_SCREEN,
        component: AddContactScreen,
    },
    {
        key: 2,
        name: SCREEN_NAMES.CONTACTS_LIST,
        component: ContactsList,
    },
    {
        key: 3,
        name: SCREEN_NAMES.CONTACT_DETAILS,
        component: ContactDetails,
    },
    {
        key: 2,
        name: SCREEN_NAMES.EDIT_CONTACT_SCREEN,
        component: EditContactScreen,
    },
];
export default ROUTER_NAMES;