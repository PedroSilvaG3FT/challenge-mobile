import { Form } from '@unform/mobile';
import Colors from '../../constants/Colors';
import Input from '../../components/form/input';
import React, { useRef, useState } from 'react';
import { FormHandles, SubmitHandler } from '@unform/core';
import { Text, View, StyleSheet, Image } from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';
import AlertSnackBar, { ConfigAlertSnackBar } from '../../components/AlertSnackBar';
import { UserService } from '../../service/UserService';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/core';

const ChangePassword: React.FC = () => {
  const navigation = useNavigation();
  const userService = new UserService();
  const formRef = useRef<FormHandles>(null);
  const [alertSnackBarProp, setAlertSnackBarProp] = useState<ConfigAlertSnackBar>({} as ConfigAlertSnackBar);

  const handleConfirm: SubmitHandler<any> = async (data) => {
    const password = data.password.trim();
    const passwordConfirm = data.passwordConfirm.trim();

    if (password != passwordConfirm) {
      setAlertSnackBarProp({
        message: "As senhas não coincidem!",
        type: "error",
      });
      return;
    }
    
    try {
        let userStorage = await AsyncStorage.getItem("@EMAuth:user") as string;
        const storagedUser = JSON.parse(userStorage);
    
        const { data } = await userService.updatePassword({ password, userId: storagedUser.id})
        setAlertSnackBarProp({ message: data.message, type: "success" });
        setTimeout(() => navigation.navigate("TabSettingsScreen"), 3000)
        
    } catch (error) {
        setAlertSnackBarProp({ message: "Erro ao atualizar senha", type: "success" });
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.boxImage}>
          <Image
            style={styles.iconImage}
            source={require("../../../assets/icons/security.png")}
          />
        </View>

        <Form ref={formRef} onSubmit={handleConfirm} style={{ width: "100%" }}>
          <Input name="password" placeholder="Insira sua nova senha" secureTextEntry={true} autoCapitalize="none" />
          <Input name="passwordConfirm" placeholder="Confirme a senha" secureTextEntry={true} autoCapitalize="none" />

          <TouchableOpacity
            style={styles.button}
            onPress={() => formRef.current?.submitForm()}
          >
            <Text style={styles.buttonText}>Salvar</Text>
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

export default ChangePassword