import {useRoute} from '@react-navigation/native'
import React, {useCallback, useMemo} from 'react'
import {View, Image, Text, TouchableOpacity, Alert, Linking} from 'react-native'
import ScreenLayout from '@components/layout/index';
import getStyles from '@screens/ContactDetails/styles';
import {DETAILS_FILEDS, EXCLUDED_FILEDS, SCREEN_LABELS, SCREEN_TITLES} from '@constants/index';
import {NavigationRouteProp} from '@navigation/types';


const ContactDetails = () => {
    const route = useRoute<NavigationRouteProp>();
    const {params = {}} = route as any;
    const {firstName = '', mobileNo = '', imageUri = '', lastName = ''} = params as any;
    const styles = getStyles();

    const filteredEntries = useMemo(() => Object.entries(params).filter(
        ([key]) => !EXCLUDED_FILEDS[key]
    ), [params]);

    const fullName: string = (firstName || '') + ' ' + (lastName || '');

    const makePhoneCall = useCallback(() => {
        if (!mobileNo) {
            Alert.alert('Error', 'Phone number is missing');
            return;
        }
        const phoneUrl = `tel:${mobileNo.replace(/\D/g, '')}`;
        Linking.canOpenURL(phoneUrl)
            .then((supported) => {
                if (!supported) {
                    Alert.alert('Error', 'Your device does not support phone calls');
                } else {
                    Linking.openURL(phoneUrl);
                }
            })
            .catch((err) => console.error('Error while opening dialer', err));
    }, [mobileNo])

    return (
        <ScreenLayout
            isheaderShown={true}
            headerLabel={SCREEN_TITLES.CONTACT_DETAILS}
        >
            <View style={styles.main} >
                <View style={styles.topContainer}>
                    {imageUri ? <Image
                        source={{uri: imageUri}}
                        style={styles.profileImg}
                    /> :
                        <View style={styles.profileImg}>
                            <Text style={styles.profileText}>{firstName[0]?.toUpperCase() + lastName[0]?.toUpperCase()}</Text>

                        </View>}
                    <View style={styles.profileContainerView}>
                        <Text style={styles.profileName}>{fullName}</Text>
                        <Text style={styles.mobileType}>{SCREEN_LABELS.MOBILE}</Text>
                        <Text style={styles.mobileNumber}>{mobileNo}</Text>
                    </View>
                    <View style={styles.servicesView}>
                        <TouchableOpacity style={styles.serviceItem} onPress={makePhoneCall}>
                            <Text>{SCREEN_LABELS.CALL}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.serviceItem}>
                            <Text>{SCREEN_LABELS.MESSAGE}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.profileDetails} >
                    {filteredEntries?.map((filterItem, filterindex) => {
                        const filedVlaue: string = filterItem?.length > 1 ? filterItem[1] : '';
                        const fieldKey: string = filterItem?.length > 1 ? filterItem[0] : '';
                        return (
                            <View style={styles.profileDetailsItem}
                                key={`${filterItem}_${filterindex}`}
                            >
                                <Text>{DETAILS_FILEDS[fieldKey]}</Text>
                                <Text>{filedVlaue}</Text>
                            </View>
                        )
                    })}
                </View>
            </View>
        </ScreenLayout>
    )
}
export default ContactDetails;
