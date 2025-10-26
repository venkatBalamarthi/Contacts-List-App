import React, {ReactNode} from 'react'
import Header from './Header';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Dimensions, ViewStyle} from 'react-native';
const {height} = Dimensions.get('window')

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
    isFooterShown = false,
    children = null,
    headerLabel = '',
    showBackButton = true
}: IScreenLayoutProps) => {
    return (
        <SafeAreaView style={{flex:1, backgroundColor:'#0D9488'}} >
            {isheaderShown &&
                <Header
                    label={headerLabel}
                    showBackButton={showBackButton}
                />}
            {children && children}
        </SafeAreaView>
    )
}
export default ScreenLayout;