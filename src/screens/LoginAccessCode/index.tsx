import React, { useRef, useState } from "react";
import Colors from "../../constants/Colors";
import { Text, View, StyleSheet, Image } from "react-native";
import Input from "../../components/form/input";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Form } from "@unform/mobile";
import { FormHandles, SubmitHandler } from "@unform/core";
import AlertSnackBar, { ConfigAlertSnackBar } from "../../components/AlertSnackBar";
import { useAuth } from "../../contexts/auth";

const LoginAccessCode: React.FC = () => {
    const { signInAccessCode } = useAuth();

    const formRef = useRef<FormHandles>(null);
    const [alertSnackBarProp, setAlertSnackBarProp] = useState<ConfigAlertSnackBar>({} as ConfigAlertSnackBar);

    const handleConfirm: SubmitHandler<any> = (form) => {
        const code = form.code ? form.code : null;

        if (!code) {
            setAlertSnackBarProp({ message: "Código é obrigatorio", type: "warn" });
            return;
        }

        signInAccessCode(code)
    };

    return (
        <>
            <View style={styles.container}>
                <View style={styles.boxImage}>
                    <Image
                        style={styles.iconImage}
                        source={require("../../../assets/icons/security.png")}
                    />

                    <Text style={styles.boxImageText}>
                        Insira o seu código de acesso para continuar,
                    </Text>

                    <Text style={styles.boxImageText}>
                        caso não o tenha, solicite ao adiminstrador 
                    </Text>
                </View>

                <Form ref={formRef} onSubmit={handleConfirm} style={{ width: "100%" }}>
                    <Input 
                        name="code" 
                        autoCapitalize="none" 
                        placeholder="Código de Acesso" 
                    />

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => formRef.current?.submitForm()}
                    >
                        <Text style={styles.buttonText}>Validar código</Text>
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

export default LoginAccessCode;
