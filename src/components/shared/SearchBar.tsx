import React from 'react';
import {TextInput, StyleSheet, ViewStyle, Dimensions} from 'react-native';
import normalizeSize from '../../utils/commonUtils';
const {width} = Dimensions.get('window')

interface SearchBarProps {
  value: string;
    onChangeText: (text: string) => void;
    containerStyle?: ViewStyle;
    
}

const SearchBar = ({ value = '', onChangeText, containerStyle = {} }: SearchBarProps) => (
  <TextInput
    style={[styles.input, containerStyle]}
    placeholder="Search contacts by name or number"
    value={value}
    onChangeText={onChangeText}
  />
);

const styles = StyleSheet.create({
    input: {
        width: width - normalizeSize(40),
        height: normalizeSize(50),
        margin: normalizeSize(10),
        borderWidth: 1,
        borderRadius: normalizeSize(12),
        borderColor: '#B28155',
        backgroundColor: 'white',
        paddingLeft: normalizeSize(12),
    }
});

export default SearchBar;
