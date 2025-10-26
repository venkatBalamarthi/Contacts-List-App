import React, {ReactNode} from 'react'
import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet, ViewStyle, View} from 'react-native';
import Header from './Header';
import {COLORS} from '../../config/colors';


interface IScreenLayoutProps {
    isheaderShown?: boolean;
    isFooterShown?: boolean;
    children: ReactNode;
    headerContainerStyle?: ViewStyle;
    footerContainerStyle?: ViewStyle;
    headerLabel: string;
    showBackButton?: boolean;
}

const ScreenLayout = ({
    isheaderShown = true,
    children = null,
    headerLabel = '',
    showBackButton = true
}: IScreenLayoutProps) => {
    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.topSafeArea} edges={['top']}>
                {isheaderShown &&
                    <Header
                        label={headerLabel}
                        showBackButton={showBackButton}
                    />}
            </SafeAreaView>
            <View style={styles.content}>
                {children && children}
            </View>
            <SafeAreaView edges={['bottom']} />
        </View>
    )
}
export default ScreenLayout;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.SECONDARY_COLOR,
    },
    topSafeArea: {
        backgroundColor: COLORS.SAFE_AREA_COLOR,
    },
    content: {
        flex: 1,
    },
})
