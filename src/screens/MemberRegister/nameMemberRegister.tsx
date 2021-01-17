import React, { useEffect, useRef, useState } from 'react';
import { Text, View, Image, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { FormHandles, SubmitHandler } from '@unform/core';
import { Form } from '@unform/mobile';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Input from '../../components/form/input';
import Colors from '../../constants/Colors';
import AlertSnackBar, { ConfigAlertSnackBar } from '../../components/AlertSnackBar';
import InputMask from '../../components/form/inputMask';

const NameMemberRegister: React.FC = (props: any) => {
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();
  const [currentProps, setProps] = useState<object>({});
  const [alertSnackBarProp, setAlertSnackBarProp] = useState<ConfigAlertSnackBar>({} as ConfigAlertSnackBar);

  useEffect(() => {
    const params = props.route.params;
    setProps(params)
  }, [])

  const handleConfirm: SubmitHandler<any> = (data) => {
    if (!data.name || !data.cpf || !data.age || !data.phoneNumber) {
      setAlertSnackBarProp({
        message: "Todos os campos são obrigaorios!",
        type: "warn",
      });
      return
    }

    const newParams = {
      ...currentProps,
      name: data.name.trim(),
      cpf: data.cpf.trim(),
      age: data.age,
      phoneNumber: data.phoneNumber.trim()
    };

    navigation.navigate("DataMemberRegister", newParams);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.boxImage}>
          <Image
            style={styles.iconImage}
            source={require("../../../assets/icons/blog.png")}
          />

          <Text style={styles.boxImageText}>Insira os seus dados pessoais</Text>
        </View>

        <Form ref={formRef} onSubmit={handleConfirm} style={{ width: "100%" }}>
          <Input name="name" placeholder="Nome e Sobrenome" autoCapitalize="words" />

          <InputMask name="cpf" placeholder="CPF" mask="999.999.999-99" keyboardType="number-pad" />
          <Input name="age" placeholder="Idade" keyboardType="numeric" />
          <InputMask name="phoneNumber" placeholder="Telefone" mask="(99)99999-9999" getRawValue keyboardType="phone-pad" />

          <TouchableOpacity
            style={styles.button}
            onPress={() => formRef.current?.submitForm()}
          >
            <Text style={styles.buttonText}>Avançar</Text>
          </TouchableOpacity>
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

export default NameMemberRegister