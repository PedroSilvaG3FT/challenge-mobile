import React, { useEffect, useRef, useState } from "react";
import { Text, View, StyleSheet, StatusBar, Image } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { useAuth } from "../../contexts/auth";

import Colors from "../../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { Form } from "@unform/mobile";
import { FormHandles, SubmitHandler } from "@unform/core";
import Input from "../../components/form/input";
import AlertSnackBar, { ConfigAlertSnackBar } from "../../components/AlertSnackBar";
import Loading from "../../components/Loading";
import Terms from "../Terms";
import { LinearGradient } from "expo-linear-gradient";
import GradientButton from "../../components/GradientButton";

const Login: React.FC = () => {
  const { signIn } = useAuth();
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();
  const [alertSnackBarProp, setAlertSnackBarProp] = useState<ConfigAlertSnackBar>({} as ConfigAlertSnackBar);

  const handleLogin: SubmitHandler<any> = (data) => {
    if (!data.email || !data.password) {
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
      <LinearGradient
        style={styles.container}
        colors={[Colors.colorDanger, Colors.colorPrimary, Colors.colorDanger]}
        start={[2, 2]}
        end={[2, 0]}
      >

        <View style={styles.boxGradient}>
          <Image
            style={styles.iconImage}
            source={require("../../../assets/icons/running.png")}
          />
          <Text style={styles.labelImage}>Bem vindo!</Text>
          <Text style={styles.labelImage}>Insira seus dados para entrar</Text>
        </View>

        <View style={styles.contentLogin}>
          <Form ref={formRef} onSubmit={handleLogin} style={{ width: "100%" }}>
            <View style={{padding: 10}}>
              <Input name="email" placeholder="Email" autoCapitalize="none" />
              <Input name="password" placeholder="Senha" secureTextEntry={true} autoCapitalize="none" />
            </View>

            <GradientButton
              height={60}
              centerItem
              title="Entrar"
              onPress={() => formRef.current?.submitForm()}
            />

            <Text
              style={styles.singUpText}
              onPress={() => navigation.navigate("EmailMemberRegister")}
            >
              Cadastre-se
          </Text>
          </Form>
        </View>
      </LinearGradient>

      <AlertSnackBar config={alertSnackBarProp} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: Colors.bgDarkSecondary,
  },

  iconImage: {
    width:  125,
    height: 125,
    marginBottom: 8
  },

  labelImage: {
    color: Colors.textLight
  },

  boxGradient: {
    height: 248,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  contentLogin: {
    backgroundColor: Colors.bgDarkPrimary,
    height: '100%',
    borderRadius: 20,
    padding: 24
  },

  singUpText: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 16,
    textAlign: 'center',
    color: Colors.colorPrimary,
    textDecorationLine: "underline",
  },
});

export default Login;
