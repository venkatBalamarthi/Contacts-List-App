import React from 'react';
import {TextInput, StyleSheet, ViewStyle, Dimensions} from 'react-native';
import normalizeSize from '../../utils/commonUtils';
import TextInputField from './TextInputField';
import {COLORS} from '@config/colors';
const {width} = Dimensions.get('window')

interface SearchBarProps {
  value: string;
    onChangeText: (text: string) => void;
    containerStyle?: ViewStyle;
    
}

const SearchBar = ({ value = '', onChangeText, containerStyle = {} }: SearchBarProps) => (
  <TextInputField
    style={[styles.input, containerStyle]}
    placeHolder="Search contacts by name or number"
    value={value}
    onChangeText={onChangeText}
  />
);

const styles = StyleSheet.create({
    input: {
        width: width - normalizeSize(40),
        height: normalizeSize(40),
        margin: normalizeSize(10),
        borderWidth: 1,
        borderRadius: normalizeSize(12),
        borderColor: COLORS.PRIMARY_COLOR,
        backgroundColor: 'white',
        paddingLeft: normalizeSize(12),
    }
});

export default SearchBar;
