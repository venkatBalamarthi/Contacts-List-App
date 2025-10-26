import React from 'react'
import {StyleSheet, View, Dimensions, Text, TouchableOpacity, Image} from 'react-native'
const {width} = Dimensions.get('window')

interface IContactItemProps {
    id: string;
    firstName: string;
    lastName: string;
    mobileNo: string;
    [key: string]: string | number | Date | boolean;
}
interface IRenderItem {
    item: IContactItemProps,
    index: number;
    onPress: (params: IContactItemProps) => void;
    isLastItem?: boolean;
}

const ContactItem = ({item, onPress = () => {}, index = 0, isLastItem = false}: IRenderItem) => {
    const onPressClick = () => onPress(item)
    return (
        <TouchableOpacity
            style={[styles.mainItem, {borderBottomWidth: isLastItem ? 0 : 1}]}
            activeOpacity={1}
            onPress={onPressClick}
        >
            {!(item?.imageUri) ? <View style={styles.profilePlaceHolder}>
                <Text style={styles.imagePlaceHolder}>{item?.firstName[0]?.toUpperCase()}</Text>
            </View> : <Image
                source={{uri: item?.imageUri || ''}}
                style={styles.profileImge}
            />
            }
            <View style={styles.contactDeatils}>
                <Text style={styles.labelStyle}>{item?.firstName}</Text>
                <Text style={styles.labelStyle}>{item?.mobileNo}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default ContactItem;

const styles = StyleSheet.create({
    mainItem: {
        width: width - 40,
        padding: 8,
        borderColor: '#B28155',
        flexDirection: 'row',
    },
    profileImge: {
        width: 30,
        height: 30,
    },
    profilePlaceHolder: {
        borderRadius: 20,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: 30,
        height: 30,
        borderColor: '#D29965',
        backgroundColor: '#F6ECE2'
    },
    contactDeatils: {
        paddingLeft: 10
    },
    labelStyle: {
        fontSize: 16,
        lineHeight: 20,
    },
    imagePlaceHolder: {
        fontSize: 16,
        lineHeight: 20,
    }
})