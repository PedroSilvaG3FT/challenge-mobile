import React, { useEffect, useRef, useState } from 'react';
import Colors from '../../constants/Colors';
import Input from '../../components/form/input';
import { Form } from '@unform/mobile';
import { Text, View, StyleSheet } from "react-native";
import { RectButton } from 'react-native-gesture-handler';
import { FormHandles, SubmitHandler } from '@unform/core';
import { UserService } from '../../service/UserService';
import { useAuth } from '../../contexts/auth';
import { useNavigation } from '@react-navigation/native';


const DataMemberRegister: React.FC = (props: any) => {
    const { signIn } = useAuth();
    const formRef = useRef<FormHandles>(null);
    const userService = new UserService();
    const navigation = useNavigation();
    const [userRegister, setUserRegister] = useState<any>(null);


    useEffect(() => {
        const params = props.route.params;
        setUserRegister(params)
    }, [])

    const handleConfirm: SubmitHandler<any> = async (data) => {
        const userDTO = {
            name: userRegister.userName,
            email: userRegister.email,
            password: userRegister.password,
            startingWeight: data.startingWeight,
            height: data.height,
            payday: data.payday,
        };

        const response = await userService.create(userDTO);
        
        signIn({
            email: userDTO.email,
            password: userDTO.password
        });
    };

    return (
        <View style={styles.container}>
            <Form ref={formRef} onSubmit={handleConfirm} style={{ width: "100%" }}>
                <Input name="startingWeight" keyboardType="decimal-pad" placeholder="Peso" autoCapitalize="none" />
                <Input name="height" keyboardType="decimal-pad" placeholder="Altura" />
                <Input name="payday" keyboardType="decimal-pad" placeholder="Melhor dia para pagamento" />

                <RectButton
                    style={styles.button}
                    onPress={() => formRef.current?.submitForm()}
                >
                    <Text style={styles.buttonText}>Finalizar</Text>
                </RectButton>
            </Form>
        </View>
    );
}


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

export default DataMemberRegister