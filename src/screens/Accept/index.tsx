import React, { useEffect, useRef, useState } from "react";
import Colors from "../../constants/Colors";
import { Text, View, StyleSheet } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../contexts/auth";

const Accept: React.FC = (props: any) => {
    const [userLogin, setUserLogin] = useState<any>({});
    const { signIn } = useAuth();

    useEffect(() => {
        const params = props.route.params;
        setUserLogin(params)
    }, [])

    const handleConfirm = () => {
        signIn(userLogin)
    };

    return (
        <View style={styles.container}>
            <RectButton
                style={styles.button}
                onPress={() => handleConfirm()}
            >
                <Text style={styles.buttonText}>Aceitar Termos</Text>
            </RectButton>
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

export default Accept;
