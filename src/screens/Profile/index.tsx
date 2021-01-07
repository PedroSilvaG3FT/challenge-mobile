import React, { useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FormHandles, SubmitHandler } from '@unform/core';
import { RectButton } from 'react-native-gesture-handler';
import { View, Text, StyleSheet } from 'react-native';
import { Form } from '@unform/mobile';
import Input from '../../components/form/input';
import Colors from '../../constants/Colors';
import AsyncStorage from '@react-native-community/async-storage';
import MemberInterface from '../../interfaces/member.interface';
import { UserService } from '../../service/UserService';

const Profile: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const navigation = useNavigation();

    const userService = new UserService();
    const [user, setUser] = useState<MemberInterface>({} as MemberInterface);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        getUserInfo()
    }, [])

    async function getUserInfo() {
        let userStorage = await AsyncStorage.getItem("@EMAuth:user") as string;
        const storagedUser: MemberInterface = JSON.parse(userStorage);
        userService.getById(storagedUser.id as number).then(
            response => {
                const res = response.data;
                formRef.current?.setData(res);
                console.log(res);
                setUser(res);
            },
            error => console.log("ERROR :", error)
        );
    }

    const handleSubmit: SubmitHandler<any> = (data) => {
        console.log("DATA :", data);
    };

    return (
        <View style={styles.container}>
            <Form ref={formRef} onSubmit={handleSubmit} style={{ width: "100%" }}>
                <Input name="name" placeholder="Nome" editable={false} />
                <Input name="cpf" placeholder="CPF" editable={false} />
                <Input name="email" placeholder="Email" editable={false} />

                <View style={styles.inlineInput}>
                    <Input name="startingWeight" placeholder="Peso Inicial" editable={false}/>
                    <Input name="height" placeholder="Altura" keyboardType="decimal-pad"/>
                </View>

                <View style={styles.boxUpdateWeight}>
                    <RectButton
                        style={styles.buttonUpdateWeight}
                    >
                        <Text style={styles.buttonTextUpdateWeight}>
                            {user.currentWeight}Kg
                        </Text>
                    </RectButton>

                    <Text style={styles.labelBoxUpdateWeight}>Atualizar Peso Atual</Text>
                </View>
            </Form>

            <RectButton
                style={styles.button}
                onPress={() => formRef.current?.submitForm()}
            >
                <Text style={styles.buttonText}>Salvar</Text>
            </RectButton>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: 'space-between'
    },

    button: {
        backgroundColor: Colors.colorPrimary,
        height: 60,
        flexDirection: "row",
        borderRadius: 10,
        overflow: "hidden",
        alignItems: "center",
        marginTop: 8,
        alignSelf: 'center',
    },

    boxUpdateWeight: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 32
    },

    buttonUpdateWeight: {
        height: 100,
        width: 100,
        borderRadius: 50,
        backgroundColor: Colors.colorDangerLight,
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonTextUpdateWeight: { 
        color: "#FFF",
        fontSize: 30,
    },

    labelBoxUpdateWeight: {
        marginTop: 8,
        color: "#FFF",
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

    inlineInput: {
        flexDirection: 'row',
    }
});

export default Profile;