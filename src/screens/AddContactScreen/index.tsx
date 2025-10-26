
import React, {Fragment, useCallback, useEffect, useState} from 'react'
import {View, Image, TouchableOpacity, TextInput, Text, KeyboardAvoidingView, Keyboard} from 'react-native'
import ScreenLayout from '../../appconfig/ScreenLayout';
import getStyles from './styles';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {isValidEmail} from '../../utils/commonUtils';

interface IProfileData {
    [key: string]: string;
}

const FIEDLS = [
    "firstName",
    'lastName',
    "mobileNo",
    "email",
    "address",
    "notes",
]
const DETAILS_FILEDS = {
    "email": 'Email',
    "address": "Address",
    "notes": "Notes",
    "firstName": "First Name",
    "lastName": 'Last Name',
    "mobileNo" : 'Mobile Number',
}


const AddContactScreen = () => {
    const [imageUri, setImageUri] = useState('');
    const [contactDetails, setContactDetails] = useState<IProfileData>({});
    const [errors, setErrors] = useState<IProfileData>({})
    const styles = getStyles();


    // Pick from gallery
    const pickImage = () => {
        launchImageLibrary(
            {mediaType: 'photo', quality: 1},
            (response) => {
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.errorCode) {
                    console.log('ImagePicker Error: ', response.errorMessage);
                } else {
                    const uri = response?.assets[0].uri;
                    setImageUri(uri || '');
                }
            }
        );
    };

    const takePhoto = () => {
        launchCamera(
            {mediaType: 'photo', quality: 1},
            (response) => {
                if (response.didCancel) {
                    console.log('User cancelled camera');
                } else if (response.errorCode) {
                    console.log('Camera Error: ', response.errorMessage);
                } else {
                    const uri = response.assets[0].uri;
                    setImageUri(uri);
                }
            }
        );
    };

    const handleAddContact = useCallback(() => {
         let tempErrors: IProfileData = {};
        FIEDLS.forEach(field => {
            if (!contactDetails[field]?.trim()?.length) {
                 tempErrors[field] = `${DETAILS_FILEDS[field]} is required`;
            }
            const email = contactDetails.email;
            if (email && !isValidEmail(email)) {
                 tempErrors[field] = `${DETAILS_FILEDS[field]} is required`;
            }
        });
         setErrors(tempErrors);

    }, [contactDetails])
    console.log('ERRRORRR*****',errors)

    return (
        <ScreenLayout
            isheaderShown={true}
            headerLabel={'Add Contact'}
        >
            <View style={styles.main} >
                <View style={styles.topContainer}>
                    <TouchableOpacity onPress={pickImage}>
                        <Image
                            source={{uri: imageUri || ''}}
                            style={styles.profileImg}
                        />
                    </TouchableOpacity>

                </View>
                <View style={styles.textFieldView}>
                    {FIEDLS?.map((field, index) => {
                        const isError = !!errors[field]?.length;
                        return (
                            <Fragment key={`${field}`}>
                                <TextInput
                                    placeholder={DETAILS_FILEDS[field]}
                                    value={contactDetails[field]}
                                    onChangeText={(text) => {
                                        setContactDetails({
                                            ...contactDetails,
                                            [field]: text
                                        })
                                    }}
                                    placeholderTextColor={'#D29965'}
                                    style={isError ? styles.textInputErrorStyle : styles.textInputStyle}
                                    keyboardType={field === 'mobileNo' ? 'numeric' : 'default'}
                                    key={`${field}`}
                                    maxLength={30}
                                />
                                {isError &&
                                    <Text style={styles.error}>{`${DETAILS_FILEDS[field]} is required`}
                                    </Text>}
                            </Fragment>
                        )
                    })}
                </View>
                <TouchableOpacity
                    style={styles.addContact}
                    onPress={handleAddContact}
                    disabled={!!Object.values(errors)?.length}
                >
                    <Text style={styles.addContactText}>{'ADD CONTACT'}</Text>
                </TouchableOpacity>
            </View>
        </ScreenLayout>
    )
}
export default AddContactScreen;
