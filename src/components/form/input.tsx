import React, { useEffect, useRef, useState } from "react";
import { useField } from "@unform/core";
import { StyleSheet, View, Text } from "react-native";
import Colors from "../../constants/Colors";
import { TextInput } from 'react-native-paper';
import { TextInputMask } from "react-native-masked-text";
// import Animated from "react-native-reanimated";

interface InputProps {
  name: string;
  type?: string;
  lines?: number;
  placeholder?: string;
  secureTextEntry?: boolean;
  editable?: boolean;
  style?: object;
  mask?: string;
  keyboardType?: "number-pad" | "decimal-pad" | "numeric" | "email-address" | "phone-pad";
  autoCapitalize?: "none" | "sentences" | "words" | "characters" | undefined;
}

const Input: React.FC<InputProps> = (props) => {
  const inputRef = useRef<HTMLInputElement | any>(null);
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
      inputRef.current.value = value;
    }
  }

  return (
    <View>
      <TextInput
        ref={inputRef}
        style={[
          styles.input,
          props.style,
        ]}
        mode="flat"
        underlineColor="#FFF"
        selectionColor={Colors.colorPrimary}
        label={props.placeholder}
        defaultValue={defaultValue}
        editable={props.editable}
        secureTextEntry={props.secureTextEntry}
        onChangeText={(value) => setValue(value)}
        keyboardType={props.keyboardType}
        autoCapitalize={props.autoCapitalize}
        multiline={props.lines ? true : false}
        numberOfLines={props.lines}

        theme={{
          colors: {
            placeholder: '#FFF',
            text: '#FFF',
            primary: Colors.colorPrimary,
          },
        }}
      />
    </View>

  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    maxHeight: 60,
    backgroundColor: 'transparent',
    fontSize: 16,
  },
});
