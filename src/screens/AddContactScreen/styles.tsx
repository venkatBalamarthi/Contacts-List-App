import {Dimensions, StyleSheet} from "react-native"
import normalizeSize from "../../utils/commonUtils";
const {width, height} = Dimensions.get('window')

const getStyles = () => {
    return StyleSheet.create({
        main: {
            height,
            backgroundColor: '#F6ECE2',
        },
        topContainer: {
            backgroundColor: '#F6ECE2',
            alignItems: 'center'
        },
        profileImg: {
            width: 100,
            height: 100,
            borderRadius: 50,
            alignSelf: 'center',
            marginTop: 20,
            borderWidth: 1,
            borderColor: '#D29965',
            backgroundColor: 'white'
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
            borderColor: '#D29965',
        },
        profileDetails: {
            backgroundColor: '#F6ECE2',
            marginHorizontal: 40,
            marginTop: 20
        },
        profileDetailsItem: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 8,
            paddingVertical: 12,
            borderBottomWidth: 1,
            borderColor: '#D29965',
            backgroundColor: 'white'
        },
        input: {
            width: width - normalizeSize(40),
            height: normalizeSize(50),
            margin: normalizeSize(10),
            borderWidth: 1,
            borderRadius: normalizeSize(12),
            borderColor: '#B28155',
            backgroundColor: 'white',
            paddingLeft: normalizeSize(12),
        },
        textInputStyle: {
            height: 50,
            width: '90%',
            backgroundColor: 'white',
            borderRadius: 8,
            marginBottom: 12,
            paddingLeft: 10,
            borderWidth: 1,
            borderColor: '#D29965',
            marginLeft:20
        },
         textInputErrorStyle: {
            height: 50,
            width: '90%',
            backgroundColor: 'white',
            borderRadius: 8,
            marginBottom: 8,
            paddingLeft: 10,
            borderWidth: 1,
             borderColor: 'red',
            marginLeft:20
        },
        addContact: {
            alignSelf: 'center',
            borderWidth: 1,
            borderRadius: 8,
            backgroundColor: 'black'
        },
        addContactText: {
            paddingHorizontal: 20,
            paddingVertical: 8,
            color: 'white',
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
            color: 'red'
        }
    })
}
export default getStyles;
