import {Dimensions, StyleSheet} from "react-native";
const {width, height} = Dimensions.get('window');

const getStyles = () => {
    return StyleSheet.create({
        headerMainStyle: {
            width,
            height: height * 0.08,
            borderBottomWidth: 0,
            shadowOpacity: 0.02,
            backgroundColor: '#0D9488',
            alignItems: 'center',
            flexDirection: 'row',
        },
        backbuttonText: {
            fontSize: 16,
            lineHeight: 26,
            color: 'white',
            left: 20
        },
        headerLabel: {
            fontSize: 20,
            lineHeight: 26,
            fontWeight: '600',
            color: 'white',
        },
    })
}
export default getStyles;




