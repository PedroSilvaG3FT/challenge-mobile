import React, { useEffect, useRef, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { useAuth } from "../../contexts/auth";

import Colors from "../../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { Form } from "@unform/mobile";
import { FormHandles, SubmitHandler } from "@unform/core";
import Input from "../../components/form/input";
import AlertSnackBar, { ConfigAlertSnackBar } from "../../components/AlertSnackBar";
import Loading from "../../components/Loading";

const Login: React.FC = () => {
  const { signIn } = useAuth();
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();
  const [alertSnackBarProp, setAlertSnackBarProp] = useState<ConfigAlertSnackBar>({} as ConfigAlertSnackBar);

  const handleLogin: SubmitHandler<any> = (data) => {
    if(!data.email || !data.password) {
      setAlertSnackBarProp({
        message: "Preencha todos os campos",
        type: "warn",
      });
      
      return;
    }

    data.email = data.email.trim();

    signIn(data);
  };


  return (
    <>
      <View style={styles.container}>
        <Form ref={formRef} onSubmit={handleLogin} style={{ width: "100%" }}>
          <Input name="email" placeholder="Email" autoCapitalize="none" />
          <Input name="password" placeholder="Senha" secureTextEntry={true} autoCapitalize="none" />

          <RectButton
            style={styles.button}
            onPress={() => formRef.current?.submitForm()}
          >
            <Text style={styles.buttonText}>Entrar</Text>
          </RectButton>

          <Text
            style={styles.singUpText}
            onPress={() => navigation.navigate("EmailMemberRegister")}
          >
            Cadastre-se
        </Text>
        </Form>
      </View>

      <AlertSnackBar config={alertSnackBarProp} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
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

export default Login;
