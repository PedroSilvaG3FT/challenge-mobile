import React, { useRef } from "react";
import Colors from "../../constants/Colors";
import { Text, View, StyleSheet, Image } from "react-native";
import Input from "../../components/form/input";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { Form } from "@unform/mobile";
import { FormHandles, SubmitHandler } from "@unform/core";
import { UserService } from "../../service/UserService";

const EmailMemberRegister: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const navigation = useNavigation();
    const userService = new UserService();

    const handleConfirm: SubmitHandler<any> = (form) => {
        const email = form.email ? form.email?.trim() : null;
        console.log(email)

        if (!email) {
            console.log("EMAIL OBRIGATORIO");
            return;
        }
        
        userService.getByEmail(form.email).then(
            response => {
                if (!response.data) {
                    navigation.navigate("PasswordMemberRegister", { email });
                } else {
                    console.log("USUARIO EXISTENTE")
                }
            },
            error => console.log("ERROR :", error)
        )
    };

    return (
        <View style={styles.container}>
            <View style={styles.boxImage}>
                <Image
                    style={styles.iconImage}
                    source={require("../../../assets/icons/email.png")}
                />

                <Text style={styles.boxImageText}>Vamos lá!</Text>
                <Text style={styles.boxImageText}>Insira seu email para começar</Text>
            </View>

            <Form ref={formRef} onSubmit={handleConfirm} style={{ width: "100%" }}>
                <Input name="email" placeholder="Email" keyboardType="email-address" autoCapitalize="none" />

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => formRef.current?.submitForm()}
                >
                    <Text style={styles.buttonText}>Validar Email</Text>
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

export default EmailMemberRegister;
