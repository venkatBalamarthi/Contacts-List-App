
import React, {Fragment, useCallback, useMemo, useState} from 'react'
import {View, Image, TouchableOpacity, TextInput, Text} from 'react-native'
import ScreenLayout from '../../components/layout';
import getStyles from './styles';
import {launchImageLibrary} from 'react-native-image-picker';
import {isValidEmail, mapContacts} from '../../utils/commonUtils';
import {BUTTON_LABLES, DETAILS_FILEDS, FIEDLS, SCREEN_TITLES} from '../../constants';
import debounce from 'lodash/debounce';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../store';
import {addContact, addRemoteContact} from '../../store/slices/contactSlice';
import {useNavigation} from '@react-navigation/native';
import Contacts from 'react-native-contacts';
import {IContact, IUpdateContactInput} from '../../types/contactslist';
import {setLoader} from '../../store/slices/commonSlice';
const NUMERIC = 'numeric';
const MOBILENO = 'mobileNo'


const originalContact: IContact = {
    givenName: '',
    familyName: '',
    phoneNumbers: [
        {number: '(555) 564-8583', label: 'mobile'},
        {number: '(415) 555-3695', label: 'main'},
    ],
    emailAddresses: [{email: '', label: 'work'}],
    postalAddresses: [
        {street: '51, Yamuluru', city: 'Bangalore', region: 'IN', postCode: '560037', country: 'India', label: 'work', state: 'KA'},
    ],
    company: 'Creative Consulting',
    jobTitle: 'Devloper',
    birthday: {year: 1998, month: 5, day: 25},
    hasThumbnail: false,
    thumbnailPath: '',
    imAddresses: [],
    urlAddresses: [{url: '', label: 'homepage'}],
};

interface IProfileData {
    [key: string]: string;
}

const DebouncedTextInput = React.memo(({field, value, onChange, error}: any) => {
    const styles = getStyles();
  return (
    <>
      <TextInput
        placeholder={DETAILS_FILEDS[field]}
        value={value}
        onChangeText={(text) => onChange(field, text)}
        style={error ? styles.textInputErrorStyle : styles.textInputStyle}
        keyboardType={field === MOBILENO ? NUMERIC : 'default'}
        maxLength={30}
      />
      {error && <Text style={styles.error}>{`${DETAILS_FILEDS[field]} is required`}</Text>}
    </>
  );
});


const AddContactScreen = () => {
    const [contactDetails, setContactDetails] = useState<IProfileData>({});
    const [localInput, setLocalInput] = useState<IProfileData>({});
    const [errors, setErrors] = useState<IProfileData>({})
    const dispatch = useDispatch<AppDispatch>();
    const navigation = useNavigation();
    const styles = getStyles();

    const updateContact = (contact: IContact, updates: IUpdateContactInput): IContact => {
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


    const pickImage = useCallback(() => {
        launchImageLibrary(
            {mediaType: 'photo', quality: 1},
            (response) => {
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.errorCode) {
                    console.log('ImagePicker Error: ', response.errorMessage);
                } else {
                    const uri = response?.assets[0].uri;
                    setContactDetails({
                        ...contactDetails,
                        imageUri: uri || '',
                    })
                   
                }
            }
        );
    }, [])

    const handleAddContact = useCallback(async () => {
        let tempErrors: IProfileData = {};
        FIEDLS.forEach(field => {
            if (!(contactDetails[field]?.trim()?.length)) {
                tempErrors[field] = `${DETAILS_FILEDS[field]} is required`;
            }
            if (field === 'email' && contactDetails.email && !isValidEmail(contactDetails.email)) {
                tempErrors[field] = `${DETAILS_FILEDS[field]} is required`;
            }
        });
        const errorsData = Object.values(tempErrors || {})?.length;
        if (errorsData) {
            setErrors(tempErrors);
        } else {
            const updatedContact = updateContact(originalContact, contactDetails);
            dispatch(setLoader(true))
            try {
                const addedContact = await Contacts.addContact(updatedContact);
                const mappedContact = mapContacts([addedContact])
                dispatch(addRemoteContact(mappedContact?.length ? mappedContact[0] : {}))
            } catch (err: any) {
            }
            dispatch(setLoader(false))
            dispatch(addContact(contactDetails))
            navigation.goBack();
        }

    }, [contactDetails])

    const debouncedUpdate = useMemo(
        () =>
            debounce((field: string, text: string) => {
                setContactDetails((prev) => ({...prev, [field]: text}));
                setErrors((prev) => {
                    if (prev[field]) return {...prev, [field]: ''};
                    return prev;
                });
            }, 400),
        []
    );


    const handleInputChange = useCallback((field: string, text: string) => {
        setLocalInput((prev) => ({...prev, [field]: text}));
        debouncedUpdate(field, text);
    }, []);

    return (
        <ScreenLayout
            isheaderShown={true}
            headerLabel={SCREEN_TITLES.ADD_CONTACT}
        >
            <View style={styles.main} >
                <View style={styles.topContainer}>
                    <TouchableOpacity onPress={pickImage}>
                        <Image
                            source={{uri: contactDetails?.imageUri || ''}}
                            style={styles.profileImg}
                        />
                    </TouchableOpacity>

                </View>
                <View style={styles.textFieldView}>
                    {FIEDLS?.map((field: string,) => {
                        return (
                            <Fragment key={`${field}`}>
                                <DebouncedTextInput
                                    key={field}
                                    field={field}
                                    value={localInput[field]}
                                    onChange={handleInputChange}
                                    error={!!errors[field]}
                                />
                            </Fragment>
                        )
                    })}
                </View>
                <TouchableOpacity
                    style={styles.addContact}
                    onPress={handleAddContact}
                >
                    <Text style={styles.addContactText}>{BUTTON_LABLES.ADD_CONTACT}</Text>
                </TouchableOpacity>
            </View>
        </ScreenLayout>
    )
}
export default AddContactScreen;
