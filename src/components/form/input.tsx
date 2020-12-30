import React, { useEffect, useRef, useState } from "react";
import { useField } from "@unform/core";
import { TextInput } from "react-native-gesture-handler";
import { StyleSheet, View, Text } from "react-native";
import Colors from "../../constants/Colors";
// import Animated from "react-native-reanimated";

interface InputProps {
  name: string;
  type?: string;
  lines?: number;
  placeholder?: string;
  secureTextEntry?: boolean;
  style?: object;
  keyboardType?: "number-pad" | "decimal-pad" | "numeric" | "email-address" | "phone-pad";
  autoCapitalize?: "none" | "sentences" | "words" | "characters" | undefined;
}

const Input: React.FC<InputProps> = (props) => {
  const [isFocus, setFocus] = useState(false);
  const inputRef = useRef<HTMLInputElement | any>(null);
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

  function handleFocus(){
    setFocus(true);
  }

  function handleBlur() {
    setFocus(false);
  }

  return (
    <View>
      {isFocus ? 
        <Text style={[styles.textLabel, isFocus ? {color: Colors.colorPrimary} : {}]}>{props.placeholder}</Text> : 
        null
      }
      <TextInput
        ref={inputRef}
        style={[styles.input, props.style, isFocus ? styles.inputFocus : {} ]}
        defaultValue={defaultValue}
        placeholder={props.placeholder}
        onFocus={handleFocus}
        onBlur={() => handleBlur()}
        secureTextEntry={props.secureTextEntry}
        onChangeText={(value) => setValue(value)}
        keyboardType={props.keyboardType}
        autoCapitalize={props.autoCapitalize}
        multiline={props.lines ? true : false}
        numberOfLines={props.lines}
        placeholderTextColor={ isFocus ? "transparent" : "#FFF"} 
      />
    </View>

  );
};

export default Input;

const styles = StyleSheet.create({
  textLabel: {
    marginLeft: 12,
    fontSize: 12,
    color: '#FFF'
  },

  input: {
    width: "100%",
    height: 60,
    borderRadius: 10,
    borderBottomWidth: 1,
    color: "#FFF",
    borderBottomColor: "#FFF",
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  inputFocus: {
    borderBottomColor: Colors.colorPrimary,
  }
});
