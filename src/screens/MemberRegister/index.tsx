import React, { useRef } from "react";
import Colors from "../../constants/Colors";
import Input from "../../components/form/input";
import { Text, View, StyleSheet } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { Form } from "@unform/mobile";
import { FormHandles, SubmitHandler } from "@unform/core";
import { UserService } from "../../service/UserService";

const EmailMemberRegister: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const navigation = useNavigation();
    const userService = new UserService();

    const handleConfirm: SubmitHandler<any> = (data) => {
        userService.getByEmail(data.email).then(
            response => {
                if (!response.data) {
                    navigation.navigate("NameMemberRegister", { email: data.email });
                }
            },
            error => console.log("ERROR :", error)
        )
    };

    return (
        <View style={styles.container}>
            <Form ref={formRef} onSubmit={handleConfirm} style={{ width: "100%" }}>
                <Input name="email" placeholder="Email" autoCapitalize="none" />

                <RectButton
                    style={styles.button}
                    onPress={() => formRef.current?.submitForm()}
                >
                    <Text style={styles.buttonText}>Validar Email</Text>
                </RectButton>
            </Form>
        </View>
    );
};

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

export default EmailMemberRegister;
