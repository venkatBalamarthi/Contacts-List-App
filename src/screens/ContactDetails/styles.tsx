import {StyleSheet, Dimensions} from "react-native";
import {COLORS} from "../../config/colors";
const {width, height} = Dimensions.get('window')

const getStyles = () => {
    return StyleSheet.create({
        main: {
            width,
            height,
            backgroundColor: COLORS.SECONDARY_COLOR
        },
        topContainer: {
            alignItems: 'center'
        },
        profileImg: {
            width: 100,
            height: 100,
            borderRadius: 50,
            alignSelf: 'center',
            marginTop: 20,
            backgroundColor: COLORS.WHITE,
            borderWidth: 1,
            alignItems: 'center',
            justifyContent: 'center',
            borderColor: COLORS.PRIMARY_COLOR
        },
        profileContainerView: {
            alignItems: 'center',
            paddingBottom: 10
        },
        profileName: {
            paddingTop: 20,
            fontSize: 24,
            lineHeight: 32,
            fontWeight: '600'
        },
        mobileType: {
            fontSize: 24,
            lineHeight: 32,
        },
        mobileNumber: {
            fontSize: 24,
            lineHeight: 32,
        },
        servicesView: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            paddingHorizontal: 40,
            paddingBottom: 20
        },
        serviceItem: {
            borderWidth: 1,
            borderRadius: 4,
            paddingHorizontal: 50,
            paddingVertical: 8,
            backgroundColor: COLORS.WHITE,
            borderColor: COLORS.PRIMARY_COLOR,
        },
        profileDetails: {
            backgroundColor: COLORS.SECONDARY_COLOR,
            marginHorizontal: 40,
            marginTop: 20
        },
        profileDetailsItem: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 8,
            paddingVertical: 12,
            borderBottomWidth: 1,
            borderColor: COLORS.PRIMARY_COLOR,
            backgroundColor: COLORS.WHITE
        },
        profileText: {
            fontSize: 30,
            fontWeight: 'bold',
            color: COLORS.PRIMARY_COLOR,
        }
    })
}
export default getStyles;
