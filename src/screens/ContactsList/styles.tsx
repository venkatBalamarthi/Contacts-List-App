import {StyleSheet, Dimensions} from 'react-native';
import normalizeSize from '../../utils/commonUtils';
const {width} = Dimensions.get('window');

const getStyles = () => {
    return StyleSheet.create({
        main: {
            width: width,
            alignItems: 'center',
            alignSelf: 'center',
            backgroundColor: '#F6ECE2',
            paddingVertical: normalizeSize(20),
            marginHorizontal: normalizeSize(20)
        },
        contactItem: {
            width: width - normalizeSize(40),
            borderRadius: normalizeSize(12),
            backgroundColor: 'white',
            borderColor: '#B28155',
            borderWidth: 1,
            padding: normalizeSize(8)

        },
        itemSeparator: {
            height: normalizeSize(12),
        },
        addIcon: {
            width: 50,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            borderRadius: 50,
            shadowColor: 'black',
            shadowOffset: {
                width: 0,
                height: 0
            },
            shadowOpacity: 0.2,
            position: 'absolute',
            bottom: 40,
            right: 20,
            borderColor: '#B28155',
            borderWidth: 1
        },
        addIconText: {
            fontSize: normalizeSize(20),
            fontWeight: '600',
            color: '#B28155'
        }
    });
}
export default getStyles
