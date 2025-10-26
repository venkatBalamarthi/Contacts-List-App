import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {Alert} from "react-native";
import Contacts from 'react-native-contacts';
import {AppDispatch} from "@store/index";
import {setLoader} from "@store/slices/commonSlice";
import {getContacts} from "@store/slices/contactSlice";
import {mapContacts} from "@utils/contactUtils";

const useContacts = () => {
    
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const permission = await Contacts.requestPermission();
                dispatch(setLoader(true))
                if (permission === 'authorized') {
                    const allContacts = await Contacts.getAll();
                    const result = mapContacts(allContacts as any);
                    dispatch(getContacts(result))

                } else {
                    Alert.alert('Permission Denied', 'Cannot access contacts without permission');
                }
            } catch (error) {
                console.log('Error fetching contacts:', error);
                Alert.alert('Error', 'Failed to load contacts');
            }
            finally {
                dispatch(setLoader(false))
            }
        };
        fetchContacts();
    }, [dispatch]);

}
export default useContacts;