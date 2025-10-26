
import React, {memo} from "react";
import {COLORS} from "@config/colors";
import {KeyboardType, StyleSheet, Text, TextInput, ViewStyle} from "react-native";

interface ITextInputField {
    placeHolder: string;
    value: string;
    onChangeText: (text: string) => void;
    maxLength?: number;
    style?: ViewStyle | ViewStyle[];
    keyboardType?: KeyboardType;
    error?: string;
    multiline?: boolean;
}

const TextInputField = ({
    placeHolder = '',
    value = '',
    maxLength = 30,
    keyboardType = 'default',
    style = {},
    error = '',
    multiline = false,
    onChangeText,
}: ITextInputField) => {
    const currentStyles = error ? styles.textInputErrorStyle : styles.textInputStyle;
    return (
        <>
            <TextInput
                placeholder={placeHolder}
                value={value}
                onChangeText={onChangeText}
                style={[currentStyles, style]}
                keyboardType={keyboardType}
                maxLength={maxLength}
                multiline={multiline}
            />
            {(!!error?.length) && <Text style={styles.error}>{error || ''}</Text>}
        </>

    )
}
export default memo(TextInputField)

const styles = StyleSheet.create({
    textInputStyle: {
        height: 50,
        width: '90%',
        backgroundColor: COLORS.WHITE,
        borderRadius: 8,
        marginBottom: 12,
        paddingLeft: 10,
        borderWidth: 1,
        borderColor: COLORS.PRIMARY_COLOR,
        marginLeft: 20
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
        marginLeft: 20
    },
    error: {
        marginLeft: 20,
        paddingBottom: 8,
        color: COLORS.RED
    }
})
