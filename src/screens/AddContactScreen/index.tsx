
import React, {Fragment, useCallback, useMemo, useState} from 'react'
import {View, Image, TouchableOpacity, TextInput, Text} from 'react-native'
import {useNavigation} from '@react-navigation/native';
import Contacts from 'react-native-contacts';
import {useDispatch} from 'react-redux';
import ScreenLayout from '@components/layout/index';
import getStyles from '@screens/AddContactScreen/styles';
import {launchImageLibrary} from 'react-native-image-picker';
import {isValidEmail, isValidMobileNumber} from '@utils/commonUtils';
import {BUTTON_LABLES, DETAILS_FILEDS, FIEDLS, SCREEN_TITLES} from '@constants/index';
import debounce from 'lodash/debounce';
import {AppDispatch} from '@store/index';
import {addContact, addRemoteContact} from '@store/slices/contactSlice';
import {IContact, IUpdateContactInput} from '@/types/contactslist';
import {setLoader} from '@store/slices/commonSlice';
import TextInputField from '@components/shared/TextInputField';
import {mapContacts, updateContact} from '@utils/contactUtils';
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
    const isMobileNumber = field === 'mobileNo';
  return (
    <>
      <TextInput
        placeholder={DETAILS_FILEDS[field]}
        value={value}
        onChangeText={(text) => onChange(field, text)}
        style={error ? styles.textInputErrorStyle : styles.textInputStyle}
        keyboardType={field === MOBILENO ? NUMERIC : 'default'}
        maxLength={isMobileNumber ? 10 : 30}
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
            if (field === 'mobileNo' && contactDetails.mobileNo && !isValidMobileNumber(contactDetails.mobileNo)) {
                tempErrors[field] = `Enter a valid ${DETAILS_FILEDS[field]}`;
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
            debounce((field: string = '', text: string = '') => {
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
    }, [debouncedUpdate]);

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
                        const keyboardType = field === MOBILENO ? NUMERIC : 'default';
                        const isMobileNumber = field === 'mobileNo';
                        const hanldeOnChangeText = (text: string = '') => handleInputChange(field,text);
                        return (
                            <Fragment key={`${field}`}>
                                <TextInputField
                                    key={field}
                                    value={localInput[field]}
                                    onChangeText={hanldeOnChangeText}
                                    error={errors[field]}
                                    placeHolder={DETAILS_FILEDS[field]}
                                    keyboardType={keyboardType}
                                    maxLength={isMobileNumber ? 10 : 30}
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
