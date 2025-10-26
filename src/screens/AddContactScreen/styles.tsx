import {Dimensions, StyleSheet} from "react-native"
import normalizeSize from "../../utils/commonUtils";
import {COLORS} from "../../config/colors";
const {width, height} = Dimensions.get('window')

const getStyles = () => {
    return StyleSheet.create({
        main: {
            height,
            backgroundColor: COLORS.SECONDARY_COLOR,
        },
        topContainer: {
            backgroundColor: COLORS.SECONDARY_COLOR,
            alignItems: 'center'
        },
        profileImg: {
            width: 100,
            height: 100,
            borderRadius: 50,
            alignSelf: 'center',
            marginTop: 20,
            borderWidth: 1,
            borderColor: COLORS.PRIMARY_COLOR,
            backgroundColor: COLORS.WHITE,
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
            backgroundColor: 'white',
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
        input: {
            width: width - normalizeSize(40),
            height: normalizeSize(50),
            margin: normalizeSize(10),
            borderWidth: 1,
            borderRadius: normalizeSize(12),
            borderColor: COLORS.PRIMARY_COLOR,
            backgroundColor: COLORS.WHITE,
            paddingLeft: normalizeSize(12),
        },
        textInputStyle: {
            height: 50,
            width: '90%',
            backgroundColor: COLORS.WHITE,
            borderRadius: 8,
            marginBottom: 12,
            paddingLeft: 10,
            borderWidth: 1,
            borderColor: COLORS.PRIMARY_COLOR,
            marginLeft:20
        },
         textInputErrorStyle: {
            height: 50,
            width: '90%',
            backgroundColor: COLORS.WHITE,
            borderRadius: 8,
            marginBottom: 8,
            paddingLeft: 10,
            borderWidth: 1,
            borderColor: COLORS.RED,
            marginLeft:20
        },
        addContact: {
            alignSelf: 'center',
            borderWidth: 1,
            borderRadius: 8,
            backgroundColor: COLORS.BLACCK
        },
        addContactText: {
            paddingHorizontal: 20,
            paddingVertical: 8,
            color: COLORS.WHITE,
            fontSize: 16,
            lineHeight: 22,
            fontWeight: '800'
        },
        textFieldView: {
            paddingTop: 20,
            width: width,
        },
        error: {
            marginLeft: 20,
            paddingBottom: 8,
            color: COLORS.RED
        }
    })
}
export default getStyles;
