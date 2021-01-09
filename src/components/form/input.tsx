import React, { useEffect, useRef, useState } from "react";
import { useField } from "@unform/core";
import { StyleSheet, View, Text } from "react-native";
import Colors from "../../constants/Colors";
import { TextInput } from 'react-native-paper';
// import Animated from "react-native-reanimated";

interface InputProps {
  name: string;
  type?: string;
  lines?: number;
  placeholder?: string;
  secureTextEntry?: boolean;
  editable?: boolean;
  style?: object;
  lightMode?: boolean;
  keyboardType?: "number-pad" | "decimal-pad" | "numeric" | "email-address" | "phone-pad";
  autoCapitalize?: "none" | "sentences" | "words" | "characters" | undefined;
}

const Input: React.FC<InputProps> = (props) => {
  const [isFocus, setFocus] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const inputRef = useRef<HTMLInputElement | any>(null);
  const { fieldName, registerField, defaultValue, error } = useField(props.name);

  useEffect(() => {
    if (inputRef?.current?.value) {
      setHasValue(true);
    } else {
      // setHasValue(false);
    }

  }, [inputRef?.current?.value]);

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

  function handleFocus(){
    setFocus(true);
  }

  function handleBlur() {
    setFocus(false);
  }

  return (
    <View>
      {/* {(hasValue || isFocus) ? 
        <Text style={[styles.textLabel, isFocus ? {color: Colors.colorPrimary} : {}]}>{props.placeholder}</Text> : 
        null
      } */}
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
        onFocus={handleFocus}
        editable={props.editable}
        onBlur={() => handleBlur()}
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
  textLabel: {
    marginLeft: 12,
    fontSize: 12,
    color: '#FFF'
  },

  input: {
    height: 70,
    marginBottom: 8,
    backgroundColor: 'transparent',
    fontSize: 16,
    // flex: 1,
    justifyContent: 'flex-end'
  },

  lightModeInput: {
    borderBottomColor: Colors.bgDarkSecondary,
    color: Colors.bgDarkSecondary,
  },

  inputFocus: {
    // borderBottomColor: Colors.colorPrimary,
  }
});
