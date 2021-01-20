import React, { useEffect, useRef, useState } from 'react';
import { FormHandles, SubmitHandler } from '@unform/core';
import { RectButton } from 'react-native-gesture-handler';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { Form } from '@unform/mobile';
import Input from '../../components/form/input';
import Colors from '../../constants/Colors';
import GlobalStyle from '../../constants/GlobalStyle';
import AsyncStorage from '@react-native-community/async-storage';
import MemberInterface from '../../interfaces/member.interface';
import { UserService } from '../../service/UserService';
import { Modalize } from 'react-native-modalize';
import GradientButton from '../../components/GradientButton';
import AlertSnackBar, { ConfigAlertSnackBar } from '../../components/AlertSnackBar';
import ModalUpdateWeight from '../../components/modals/UpdateWeight';
import Loading from '../../components/Loading';

const modalHeight = 500;

const Profile: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const modalizeRef = useRef<Modalize>(null);
    
    const userService = new UserService();
    const windowHeight = Dimensions.get("window").height;

    const [alertSnackBarProp, setAlertSnackBarProp] = useState<ConfigAlertSnackBar>({} as ConfigAlertSnackBar);
    const [user, setUser] = useState<MemberInterface>({} as MemberInterface);

    const modalConfigOptions = {
        modalizeRef: modalizeRef,
        onCloseModal: getUserInfo,
        height: windowHeight - 130,
        data: {}
    };

    useEffect(() => {
        getUserInfo();
    }, [])

    async function getUserInfo() {
        setLoading(true);

        let userStorage = await AsyncStorage.getItem("@EMAuth:user") as string;
        const storagedUser: MemberInterface = JSON.parse(userStorage);

        userService.getById(storagedUser.id as number).then(
            response => {
                const userRes = response.data;
                setLoading(false);
                
                setUser(userRes);
                formRef.current?.setData(userRes);
            },
            error => {
                setLoading(false);
                console.error("Erro ao buscar usuário")
            }
        );
    }

    const onOpen = () => {
        modalizeRef.current?.open();
    };

    const handleSubmit: SubmitHandler<any> = (data) => {
        setLoading(true);

        data.id = user.id;

        userService.update(data).then(
            response => {
                setAlertSnackBarProp({
                    message: "Informações atualizadas com sucesso !",
                    type: "success",
                });

                setLoading(false);
            },
            error => {
                setAlertSnackBarProp({
                    message: "Erro ao atualizar informações",
                    type: "error",
                });

                setLoading(false);
            }
        )

    };

    const [loading, setLoading] = useState(false);
    if (loading) return <Loading />

    return (
        <>
            <View style={styles.container}>
                <Form ref={formRef} onSubmit={handleSubmit} style={{ width: "100%" }}>
                    <View style={styles.boxUserInfo}>
                        <Image
                            style={styles.avatarImage}
                            source={user.image ? { uri: user.image } : require("../../../assets/icons/user.png")}
                        />

                        <View>
                            <Text style={styles.defaltText}>
                                {user.name} {" "}
                                (Peso Inicial: {user.startingWeight}Kg)
                            </Text>
                            <Text style={styles.defaltText}>{user.cpf}</Text>
                            <Text style={styles.defaltText}>{user.email}</Text>
                            {user.payday ?
                                (
                                    <RectButton style={{...styles.buttonPayDay, backgroundColor: Colors.colorSuccess}}>
                                        <Text style={styles.buttonPayDayText} allowFontScaling={false}>
                                            Dia para pagamento: {user.payday}
                                        </Text>
                                    </RectButton>
                                ) :
                                (
                                    <RectButton style={{...styles.buttonPayDay, backgroundColor: Colors.colorDanger}}>
                                        <Text style={styles.buttonPayDayText} allowFontScaling={false} onPress={() => onOpen()}>
                                            Selecionar Forma de Pagamento
                                        </Text>
                                    </RectButton>
                                )}
                        </View>
                    </View>

                    <View style={styles.separator}></View>

                    <View>
                        <View style={GlobalStyle.formField}>
                            <Text style={GlobalStyle.label}>Telefone</Text>

                            <Input
                                name="phoneNumber"
                                mask="(99)99999-9999"
                                style={GlobalStyle.input}
                                keyboardType="phone-pad" />
                        </View>

                        <View style={GlobalStyle.formField}>
                            <Text style={GlobalStyle.label}>Altura</Text>
                            <Input name="height" style={GlobalStyle.input} keyboardType="decimal-pad" />
                        </View>

                        <View style={styles.boxUpdateWeight}>
                            <Text style={styles.labelBoxUpdateWeight}>Atualizar Peso</Text>

                            <RectButton style={styles.buttonUpdateWeight} onPress={() => onOpen()}>
                                <Text style={styles.buttonUpdateWeightText} allowFontScaling={false}>
                                    {user.currentWeight || user.startingWeight}Kg
                                </Text>
                            </RectButton>
                        </View>
                    </View>
                </Form>

                <GradientButton
                    height={60}
                    title="Salvar"
                    nameIcon="account-check-outline"
                    onPress={() => formRef.current?.submitForm()}
                />
            </View>

            <Modalize
                ref={modalizeRef}
                snapPoint={modalHeight}
                modalHeight={modalHeight}

            >
                <ModalUpdateWeight modalConfigOptions={modalConfigOptions} />
            </Modalize>

            <AlertSnackBar config={alertSnackBarProp} />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: 'space-between',
    },

    boxUserInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    buttonPayDay: {
        paddingVertical: 2,
        paddingHorizontal: 12,
        borderRadius: 25,
        marginVertical: 12,
        backgroundColor: Colors.colorDangerLight,
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonPayDayText: {
        color: '#FFF',
        fontSize: 12
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

    boxUpdateWeight: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 18
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
        fontSize: 22,
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
});

export default Profile;