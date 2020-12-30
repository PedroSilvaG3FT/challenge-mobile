import React, { useEffect, useRef, useState } from 'react';
import { Text, View, Image, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { FormHandles, SubmitHandler } from '@unform/core';
import { Form } from '@unform/mobile';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Input from '../../components/form/input';
import Colors from '../../constants/Colors';

const NameMemberRegister: React.FC = (props: any) => {
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();
  const [currentProps, setProps] = useState<object>({});

  useEffect(() => {
    const params = props.route.params;
    console.log(3, params);
    setProps(params)
  },[])

  const handleConfirm: SubmitHandler<any> = (data) => {

    const newParams = {
      ...currentProps,
      name: data.name.trim(),
      cpf: data.cpf.trim(),
      age: data.age,
      phoneNumber: data.phoneNumber
    };

    navigation.navigate("DataMemberRegister", newParams);
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.boxImage}>
        <Image
          style={styles.iconImage}
          source={require("../../../assets/icons/blog.png")}
        />

        <Text style={styles.boxImageText}>Insira os seus dados pessoais</Text>
      </View>

      <Form ref={formRef} onSubmit={handleConfirm} style={{ width: "100%" }}>
        <Input name="name" placeholder="Nome" autoCapitalize="none" />
        <Input name="cpf" placeholder="CPF" keyboardType="number-pad"/>
        <Input name="age" placeholder="Idade" keyboardType="numeric" />
        <Input name="phoneNumber" placeholder="Telefone" keyboardType="phone-pad" autoCapitalize="none" />

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

export default NameMemberRegister