import {StyleSheet} from "react-native"

const getStyles = () => {
    return StyleSheet.create({
        main: {
            flex: 1,
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
            backgroundColor: 'white',
            borderWidth: 1,
            alignItems: 'center',
            justifyContent: 'center',
            borderColor: '#B28155'
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
        }
    })
}
export default getStyles;
