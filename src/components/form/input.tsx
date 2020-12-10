import React, { useEffect, useRef } from "react";
import { useField } from "@unform/core";
import { TextInput } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";

interface InputProps {
  name: string;
  type?: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  style?: object;
  autoCapitalize?: "none" | "sentences" | "words" | "characters" | undefined;
}

const Input: React.FC<InputProps> = (props) => {
  const inputRef = useRef<HTMLInputElement| any>(null);
  const { fieldName, registerField, defaultValue, error } = useField(props.name);

  useEffect(() => {
    inputRef.current.value = defaultValue;
  }, [defaultValue]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value",
      setValue: (ref, value) => {
        ref.setNativeProps({ text: value });
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
    <TextInput
      ref={inputRef}
      style={[styles.input, props.style]}
      defaultValue={defaultValue}
      placeholder={props.placeholder}
      secureTextEntry={props.secureTextEntry}
      onChangeText={(value) => setValue(value)}
      autoCapitalize={props.autoCapitalize}
    />
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },
});
