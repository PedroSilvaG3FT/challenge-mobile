import React, { useEffect, useRef, useState } from 'react';
import { Text, View, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { FormHandles, SubmitHandler } from '@unform/core';
import { Form } from '@unform/mobile';
import { RectButton } from 'react-native-gesture-handler';
import Input from '../../components/form/input';
import Colors from '../../constants/Colors';

const NameMemberRegister: React.FC = (props: any) => {
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();
  const [email, setEmail] = useState("");

  useEffect(() => {
    const params = props.route.params;
    setEmail(params.email)
  },[])

  const handleConfirm: SubmitHandler<any> = (data) => {
    const newParams = {
      email,
      userName: data.userName,
      password: data.password,
    };

    navigation.navigate("DataMemberRegister", newParams);
  };
  
  return (
    <View style={styles.container}>
      <Form ref={formRef} onSubmit={handleConfirm} style={{ width: "100%" }}>
        <Input name="userName" placeholder="Nome de usuário" autoCapitalize="none" />
        <Input name="password" placeholder="Senha" secureTextEntry={true} autoCapitalize="none" />

        <RectButton
          style={styles.button}
          onPress={() => formRef.current?.submitForm()}
        >
          <Text style={styles.buttonText}>Avançar</Text>
        </RectButton>
      </Form>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "flex-end",
    paddingHorizontal: 24,
    paddingVertical: 48
  },

  button: {
    backgroundColor: Colors.colorPrimary,
    height: 60,
    flexDirection: "row",
    borderRadius: 10,
    overflow: "hidden",
    alignItems: "center",
    marginTop: 8,
  },

  buttonText: {
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
    color: "#FFF",
    fontSize: 20,
  },

  singUpText: {
    marginVertical: 16,
    color: Colors.colorPrimary,
    fontSize: 16,
    fontWeight: "bold",
    textDecorationLine: "underline",
    textAlign: 'center'
  },
});

export default NameMemberRegister