import React, {ReactNode} from 'react'
import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet, View, ViewStyle} from 'react-native';
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
        <SafeAreaView style={styles.main} >
        <>
            {isheaderShown &&
                <Header
                    label={headerLabel}
                    showBackButton={showBackButton}
                />}
            {children && children}
            </>
        </SafeAreaView>
    )
}
export default ScreenLayout;

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: COLORS.SAFE_AREA_COLOR,
    },
})