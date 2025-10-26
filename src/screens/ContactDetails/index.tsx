import {useRoute} from '@react-navigation/native'
import React, {useMemo} from 'react'
import {View, Image, Text, TouchableOpacity} from 'react-native'
import ScreenLayout from '../../components/layout';
import getStyles from './styles';
import {DETAILS_FILEDS, SCREEN_LABELS, SCREEN_TITLES} from '../../constants';

const ContactDetails = () => {
    const route = useRoute();
    const {params = {}} = route;
    const {firstName = '', mobileNo = '', imageUri = ''} = params;
    const styles = getStyles();

    const filteredEntries = useMemo(() => Object.entries(params).filter(
        ([key]) => !['id', 'firstName', 'lastName', 'mobileNo'].includes(key)
    ), [params]);

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
                            <Text style={styles.profileText}>{firstName[0]?.toUpperCase()}</Text>

                        </View>}
                    <View style={styles.profileContainerView}>
                        <Text style={styles.profileName}>{firstName}</Text>
                        <Text style={styles.mobileType}>{SCREEN_LABELS.MOBILE}</Text>
                        <Text style={styles.mobileNumber}>{mobileNo}</Text>
                    </View>
                    <View style={styles.servicesView}>
                        <TouchableOpacity style={styles.serviceItem}>
                            <Text>{SCREEN_LABELS.CALL}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.serviceItem}>
                            <Text>{SCREEN_LABELS.MESSAGE}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.profileDetails} >
                    {filteredEntries?.map((filterItem, filterindex) => {
                        return (
                            <View style={styles.profileDetailsItem}
                                key={`${filterItem}_${filterindex}`}
                            >
                                <Text>{DETAILS_FILEDS[filterItem[0]]}</Text>
                                <Text>{filterItem[1]}</Text>
                            </View>
                        )
                    })}
                </View>
            </View>
        </ScreenLayout>
    )
}
export default ContactDetails;
