import React, { useEffect, useRef, useState } from 'react';
import { FormHandles, SubmitHandler } from '@unform/core';
import { RectButton } from 'react-native-gesture-handler';
import { View, Text, StyleSheet } from 'react-native';
import { Form } from '@unform/mobile';
import Input from '../../components/form/input';
import Colors from '../../constants/Colors';
import AsyncStorage from '@react-native-community/async-storage';
import MemberInterface from '../../interfaces/member.interface';
import { UserService } from '../../service/UserService';
import { Modalize } from 'react-native-modalize';
import { WeightUserService } from '../../service/WeightUserService';

const Profile: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const modalizeRef = useRef<Modalize>(null);

    const userService = new UserService();
    const weightUserService = new WeightUserService();

    const [user, setUser] = useState<MemberInterface>({} as MemberInterface);

    useEffect(() => {
        getUserInfo()
    }, [])

    async function getUserInfo() {
        let userStorage = await AsyncStorage.getItem("@EMAuth:user") as string;
        const storagedUser: MemberInterface = JSON.parse(userStorage);

        userService.getById(storagedUser.id as number).then(
            response => {
                const userRes = response.data;
                formRef.current?.setData(userRes);
                setUser(userRes);
            },
            error => console.log("ERROR :", error)
        );
    }


    const onOpen = () => {
        modalizeRef.current?.open();
    };

    const handleSubmit: SubmitHandler<any> = (data) => {
        console.log("DATA :", data);
    };

    const handleSubmitNewWeight: SubmitHandler<any> = (data) => {
        console.log("DATA :", data);
        weightUserService.create({
            userId: user.id,
            weight: data.weight
        }).then(
            response => {                
                console.log("ERRO :", response.data.message);
                getUserInfo();
                modalizeRef.current?.close();
            },
            error => {
                console.log("ERRO :", error.error);
                modalizeRef.current?.close();
            }
        )
    };

    return (
        <>
            <View style={styles.container}>
                <Form ref={formRef} onSubmit={handleSubmit} style={{ width: "100%" }}>
                    <Input name="name" placeholder="Nome" editable={false} />
                    <Input name="cpf" placeholder="CPF" editable={false} />
                    <Input name="email" placeholder="Email" editable={false} />

                    <View style={styles.inlineInput}>
                        <Input name="startingWeight" placeholder="Peso Inicial" editable={false} />
                        <Input name="height" placeholder="Altura" keyboardType="decimal-pad" />
                    </View>

                    <View style={styles.boxUpdateWeight}>
                        <RectButton
                            style={styles.buttonUpdateWeight}
                        >
                            <Text style={styles.buttonTextUpdateWeight} onPress={() => onOpen()}>
                                {user.currentWeight || user.startingWeight}Kg
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

            <Modalize ref={modalizeRef}
                snapPoint={600}
                modalHeight={600}
            >
                <View style={styles.container}>
                    <Form ref={formRef} onSubmit={handleSubmitNewWeight} style={{ width: "100%" }}>
                        <Input
                            name="weight"
                            placeholder="Novo Peso"
                            lightMode={true}
                            keyboardType="decimal-pad"
                        />

                        <RectButton
                            style={styles.button}
                            onPress={() => formRef.current?.submitForm()}
                        >
                            <Text style={styles.buttonText}>Atualizar Peso atual</Text>
                        </RectButton>
                    </Form>
                </View>

            </Modalize>
        </>
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