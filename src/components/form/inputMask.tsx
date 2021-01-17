import React, { useEffect, useRef, useState } from "react";
import { useField } from "@unform/core";
import { StyleSheet, View, Text } from "react-native";
import Colors from "../../constants/Colors";
import { TextInput } from 'react-native-paper';
import { TextInputMask } from "react-native-masked-text";

interface InputProps {
    name: string;
    type?: string;
    mask?: string;
    style?: object;
    editable?: boolean;
    placeholder?: string;
    getRawValue?: boolean;
    autoCapitalize?: "none" | "sentences" | "words" | "characters" | undefined;
    keyboardType?: "number-pad" | "decimal-pad" | "numeric" | "email-address" | "phone-pad";
}

const InputMask: React.FC<InputProps> = (props) => {
    const inputMaskProps = props;
    const inputRef = useRef<HTMLInputElement | any>(null);
    const inputMaskRef = useRef<HTMLInputElement | any>(null);

    const { fieldName, registerField, defaultValue, error } = useField(props.name);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: "value",
            setValue: (ref, value) => {
                ref.setNativeProps({ text: String(value) });
                inputRef.current.value = value;
            },
        });
    }, [fieldName, registerField]);


    function setValue(value: any) {
        if (inputRef.current) {
            const unmask = value.replace(/[^\w\s]/gi, '');

            inputRef.current.value = props.getRawValue ? unmask : value || "";
        }
    }

    const renderMaskInput = (props: any) => {
        return (
            <TextInputMask
                {...props}
                type={"custom"}
                ref={inputMaskRef}
                options={{ 
                    mask: inputMaskProps.mask || '**************'
                }}
                
            />
        )
    }

    return (
        <View>
            <TextInput
                ref={inputRef}
                mode="flat"
                underlineColor="#FFF"
                editable={props.editable}
                label={props.placeholder}
                defaultValue={defaultValue}
                keyboardType={props.keyboardType}
                style={[styles.input, props.style]}
                selectionColor={Colors.colorPrimary}
                autoCapitalize={props.autoCapitalize}
                onChangeText={(value) => setValue(value)}

                theme={{
                    colors: {
                        placeholder: Colors.textLight,
                        text: Colors.textLight,
                        primary: Colors.colorPrimary,
                    },
                }}

                render={(props: any) => renderMaskInput(props)}
            />
        </View>

    );
};

export default InputMask;

const styles = StyleSheet.create({
    input: {
        fontSize: 16,
        maxHeight: 60,
        backgroundColor: 'transparent',
    },
});
