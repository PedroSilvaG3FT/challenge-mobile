import React, { useEffect, useRef, useState } from 'react';
import { Text, View, StyleSheet, Image } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { FormHandles, SubmitHandler } from '@unform/core';
import { Form } from '@unform/mobile';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Input from '../../components/form/input';
import Colors from '../../constants/Colors';

const PasswordMemberRegister: React.FC = (props: any) => {
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();
  const [currentProps, setProps] = useState<object>({});

  useEffect(() => {
    const params = props.route.params;
    console.log(2, params);
    setProps(params)
  }, [])

  const handleConfirm: SubmitHandler<any> = (data) => {
    const password = data.password;
    const passwordConfirm = data.passwordConfirm;

    if (password != passwordConfirm) {
      console.log("As senhas não batem mano");
      return;
    }

    const newParams = { ...currentProps, password}
    navigation.navigate("NameMemberRegister", newParams);
  };

  return (
    <View style={styles.container}>
      <View style={styles.boxImage}>
        <Image
          style={styles.iconImage}
          source={require("../../../assets/icons/security.png")}
        />

        <Text style={styles.boxImageText}>Configure uma senha de acesso</Text>
      </View>

      <Form ref={formRef} onSubmit={handleConfirm} style={{ width: "100%" }}>
        <Input name="password" placeholder="Crie sua senha" secureTextEntry={true} autoCapitalize="none" />
        <Input name="passwordConfirm" placeholder="Confirme a senha" secureTextEntry={true} autoCapitalize="none" />

        <TouchableOpacity
          style={styles.button}
          onPress={() => formRef.current?.submitForm()}
        >
          <Text style={styles.buttonText}>Avançar</Text>
        </TouchableOpacity>
      </Form>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 48
  },

  boxImage: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24
  },

  iconImage: {
    width: 150,
    height: 150,
    marginBottom: 24
  },

  boxImageText: {
    color: "#FFF",
    fontSize: 16
  },

  button: {
    backgroundColor: Colors.colorPrimary,
    height: 50,
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
    fontSize: 16,
  },
});

export default PasswordMemberRegister