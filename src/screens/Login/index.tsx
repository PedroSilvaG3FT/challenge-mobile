import React, { useContext } from 'react';
import { Text, View } from '../../components/Themed';
import { StyleSheet } from 'react-native'
import { RectButton } from 'react-native-gesture-handler';
import Colors from '../../constants/Colors';

import AuthContext from '../../contexts/auth';

const Login: React.FC = () => {
  const { signed, signIn } = useContext(AuthContext);
  
  console.log("LOGADO ? ", signed);
  
  function handleSingin() {
    signIn({ username: '', password: '' });
  }

  return (
    <View style={styles.container}>
      <RectButton style={styles.button} onPress={handleSingin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </RectButton>

      <Text style={styles.singUpText}>
        Cadastre-se
        </Text>
    </View>
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