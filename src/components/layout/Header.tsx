import React from 'react'
import {View, Text, ViewStyle, TextStyle, TouchableOpacity} from 'react-native'
import getStyles from './styles';
import {useNavigation} from '@react-navigation/native';


interface IHeaderProps {
    containerStyle?: ViewStyle;
    label?: string;
    labelStyle?: TextStyle;
    onBackPress?: () => void;
    showBackButton: boolean;

}

const Header = ({
    containerStyle = {},
    label = '',
    labelStyle = {},
    onBackPress,
    showBackButton = false
}: IHeaderProps) => {
    const navigation = useNavigation();
    const handleBackPress = () => {
        if (onBackPress) {
            onBackPress();
        } else {
            navigation.goBack();
        }
    }
    const styles = getStyles();
    return (
        <View style={[styles.headerMainStyle, containerStyle]}>
            {showBackButton &&
                <TouchableOpacity onPress={handleBackPress}>
                    <Text style={styles.backbuttonText}>{'close'}</Text>
                </TouchableOpacity>
            }
            <View style={styles.lavelView}>
                <Text style={[styles.headerLabel, labelStyle]}>
                    {label || ''}
                </Text>
            </View>
        </View>

    )
}
export default Header