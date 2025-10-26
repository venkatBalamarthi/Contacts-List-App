import React from 'react'
import {StyleSheet, View, Dimensions, Text, TouchableOpacity, Image} from 'react-native';
import {COLORS} from '@config/colors';
import {IContactItemProps} from '@types/contactslist';
const {width} = Dimensions.get('window')


interface IRenderItem {
    item: IContactItemProps,
    index: number;
    onPress: (params: IContactItemProps) => void;
    isLastItem?: boolean;
}

const ContactItem = ({item, onPress = () => {}, index = 0, isLastItem = false}: IRenderItem) => {
    const onPressClick = () => onPress(item);
    const name = item?.firstName[0]?.toUpperCase() + item?.lastName[0]?.toUpperCase();
    const customStyle = customStyles(index, isLastItem);
    return (
        <TouchableOpacity
            style={[styles.mainItem, customStyle.mainContainer]}
            activeOpacity={1}
            onPress={onPressClick}
        >
            {!(item?.imageUri) ? <View style={styles.profilePlaceHolder}>
                <Text style={styles.imagePlaceHolder}>{name}</Text>
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
        borderColor: COLORS.PRIMARY_COLOR,
        flexDirection: 'row',
        backgroundColor: COLORS.WHITE
    },
    profileImge: {
        width: 30,
        height: 30,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: COLORS.PRIMARY_COLOR,
    },
    profilePlaceHolder: {
        borderRadius: 20,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: 30,
        height: 30,
        borderColor: COLORS.PRIMARY_COLOR,
        backgroundColor: COLORS.SECONDARY_COLOR
    },
    contactDeatils: {
        paddingLeft: 10
    },
    labelStyle: {
        fontSize: 16,
        lineHeight: 20,
    },
    imagePlaceHolder: {
        fontSize: 12,
        lineHeight: 18,
    }
})

const customStyles = (index: number = 0, isLastItem: boolean = false) => {
    return StyleSheet.create({
        mainContainer: {
            borderBottomWidth: 1,
            borderTopRightRadius: !index ? 12 : 0,
            borderTopLeftRadius: !index ? 12 : 0,
            borderBottomLeftRadius: isLastItem ? 12 : 0,
            borderBottomRightRadius: isLastItem ? 12 : 0,
            borderLeftWidth: 1,
            borderRightWidth: 1,
            borderTopWidth: index ? 0 : 1

        }
    })
}