import {StyleSheet, Dimensions} from 'react-native';
import normalizeSize from '../../utils/commonUtils';
import {COLORS} from '../../config/colors';
const {width} = Dimensions.get('window');

const getStyles = () => {
    return StyleSheet.create({
        main: {
            width: width,
            flex:1,
            alignItems: 'center',
            backgroundColor: COLORS.SECONDARY_COLOR,
            paddingBottom: normalizeSize(10),
        },
        contactItem: {
            width: width - normalizeSize(40),
            borderRadius: normalizeSize(12),
            backgroundColor: COLORS.WHITE,
            borderColor: COLORS.PRIMARY_COLOR,
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
            backgroundColor: COLORS.PRIMARY_COLOR,
            borderRadius: 50,
            shadowColor: COLORS.BLACCK,
            shadowOffset: {
                width: 0,
                height: 0
            },
            shadowOpacity: 0.2,
            position: 'absolute',
            bottom: 30,
            right: 20,
            borderColor: COLORS.PRIMARY_COLOR,
            borderWidth: 1,
            zIndex:1
        },
        addIconText: {
            fontSize: normalizeSize(24),
            fontWeight: '600',
            color: COLORS.WHITE,
        },
        sectionEmptyComponentView: {
            flex: 1
        },
        sectionHeader: {
            fontSize: 20,
            lineHeight: 28,
            color: COLORS.PRIMARY_COLOR,
            fontWeight: '800',
            paddingVertical: 4
        },
        sectionsListContainer: {
            backgroundColor: COLORS.WHITE,
            borderRadius: 8,
            borderWidth: 1,
            borderColor:COLORS.PRIMARY_COLOR,
        }
    });
}
export default getStyles
