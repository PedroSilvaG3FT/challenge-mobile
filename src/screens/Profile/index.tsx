import React, { useEffect, useRef, useState } from 'react';
import { FormHandles, SubmitHandler } from '@unform/core';
import { RectButton, TouchableOpacity } from 'react-native-gesture-handler';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import { Form } from '@unform/mobile';
import Input from '../../components/form/input';
import Colors from '../../constants/Colors';
import AsyncStorage from '@react-native-community/async-storage';
import MemberInterface from '../../interfaces/member.interface';
import { UserService } from '../../service/UserService';
import { Modalize } from 'react-native-modalize';
import { WeightUserService } from '../../service/WeightUserService';
import GradientButton from '../../components/GradientButton';
import AlertSnackBar, { ConfigAlertSnackBar } from '../../components/AlertSnackBar';

const modalHeight = 500;

const Profile: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const modalizeRef = useRef<Modalize>(null);

    const userService = new UserService();
    const weightUserService = new WeightUserService();

    const [alertSnackBarProp, setAlertSnackBarProp] = useState<ConfigAlertSnackBar>({} as ConfigAlertSnackBar);

    const [user, setUser] = useState<MemberInterface>({} as MemberInterface);

    useEffect(() => {
        getUserInfo();
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
        weightUserService.create({
            userId: user.id,
            weight: data.weight
        }).then(
            response => {
                setAlertSnackBarProp({
                    message: response.data.message,
                    type: "success",
                });

                getUserInfo();
                modalizeRef.current?.close();
            },
            error => {
                setAlertSnackBarProp({
                    message: error.error,
                    type: "success",
                });
                modalizeRef.current?.close();
            }
        )
    };

    return (
        <>
            <View style={styles.container}>
                <Form ref={formRef} onSubmit={handleSubmit} style={{ width: "100%" }}>
                    <View style={styles.boxUserInfo}>
                        <Image
                            style={styles.avatarImage}
                            source={{
                                uri: 'https://pickaface.net/gallery/avatar/unr_guihteste_180521_0137_2av4wpi.png',
                            }}
                        />

                        <View>
                            <Text style={styles.defaltText}>
                                {user.name} {" "}
                                (Peso Inicial: {user.startingWeight}Kg)
                            </Text>
                            <Text style={styles.defaltText}>{user.cpf}</Text>
                            <Text style={styles.defaltText}>{user.email}</Text>
                            <Text style={[styles.defaltText, { color: Colors.colorDangerLight }]}>
                                Dia para pagamento: {user.payday}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.separator}></View>

                    <View style={styles.inlineInput}>
                        <Input name="height" placeholder="Altura" keyboardType="decimal-pad" />
                        <Input name="phoneNumber" placeholder="Telefone" keyboardType="number-pad" />

                        <View style={styles.boxUpdateWeight}>
                            <Text style={styles.labelBoxUpdateWeight}>Atualizar Peso Atual</Text>

                            <RectButton style={styles.buttonUpdateWeight}>
                                <Text style={styles.buttonUpdateWeightText} onPress={() => onOpen()}>
                                    {user.currentWeight || user.startingWeight}Kg
                                </Text>
                            </RectButton>

                        </View>
                    </View>
                </Form>

                <GradientButton
                    height={60}
                    title="Salvar"
                    style={styles.button}
                    nameIcon="account-check-outline"
                    onPress={() => formRef.current?.submitForm()}
                />
            </View>

            <AlertSnackBar config={alertSnackBarProp} />

            <Modalize ref={modalizeRef}
                snapPoint={modalHeight}
                modalHeight={modalHeight}
            >
                <View style={styles.containerModal}>
                    <Form ref={formRef} onSubmit={handleSubmitNewWeight} style={{ width: "100%" }}>
                        <Input
                            name="weight"
                            placeholder="Novo Peso"
                            keyboardType="decimal-pad"
                        />

                        <GradientButton
                            height={60}
                            nameIcon="check"
                            style={styles.button}
                            title="Atualizar Peso atual"
                            onPress={() => formRef.current?.submitForm()}
                        />
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
        justifyContent: 'space-between',
    },

    containerModal: {
        padding: 24,
        height: modalHeight,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: Colors.bgDarkSecondary,
        justifyContent: 'space-between',
    },

    boxUserInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    defaltText: {
        color: '#FFF',
        marginVertical: 2
    },

    avatarImage: {
        width: 100,
        height: 100,
        marginRight: 24,
        borderRadius: 50,
    },

    separator: {
        borderBottomColor: Colors.bgDarkSecondary,
        borderWidth: 2,
        marginVertical: 24,
        marginHorizontal: 42
    },

    button: {
        height: 60,
    },

    boxUpdateWeight: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonUpdateWeight: {
        height: 34,
        width: 100,
        borderRadius: 25,
        backgroundColor: Colors.colorDanger,
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonUpdateWeightText: {
        color: "#FFF",
        fontSize: 25,
    },

    labelBoxUpdateWeight: {
        marginBottom: 14,
        color: "#FFF",
    },

    buttonText: {
        flex: 1,
        justifyContent: "center",
        textAlign: "center",
        color: "#FFF",
        fontSize: 20,
    },

    inlineInput: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-evenly'
    }
});

export default Profile;