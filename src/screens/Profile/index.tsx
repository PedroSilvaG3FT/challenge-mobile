import React, { useEffect, useRef, useState } from 'react';
import { FormHandles, SubmitHandler } from '@unform/core';
import { RectButton, TouchableOpacity } from 'react-native-gesture-handler';
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
import { PaymentUserService } from '../../service/PaymentUserService';
import { useAuth } from '../../contexts/auth';
import { isFuture, isPast } from 'date-fns';
import AvatarSelection from '../../components/modals/AvatarSelection';

const modalHeight = 500;

const Profile: React.FC = () => {
    const { user } = useAuth();
    const formRef = useRef<FormHandles>(null);
    const modalizeRef = useRef<Modalize>(null);

    const userService = new UserService();
    const paymentUserService = new PaymentUserService();
    const windowHeight = Dimensions.get("window").height;

    const [alertSnackBarProp, setAlertSnackBarProp] = useState<ConfigAlertSnackBar>({} as ConfigAlertSnackBar);
    const [member, setMember] = useState<MemberInterface>({} as MemberInterface);
    const [labelPayment, setLabelPayment] = useState<any>({});
    const [showModalAvatar, setShowModalAvatar] = useState(false);

    const modalConfigOptions = {
        modalizeRef: modalizeRef,
        onCloseModal: getUserInfo,
        height: (windowHeight - 130),
        data: {}
    };

    const modalAvatarConfigOptions = {
        modalizeRef: modalizeRef,
        onCloseModal: getUserInfo,
        height: (windowHeight - 130),
        data: {}
    };

    useEffect(() => {
        getUserInfo();
    }, [])

    async function getUserInfo() {
        setLoading(true);
        userService.getById(Number(user.id)).then(
            response => {
                validatePayment();
                const userRes = response.data;
                setLoading(false);

                setMember(userRes);
                formRef.current?.setData(userRes);
            },
            error => {
                setLoading(false);
                console.error("Erro ao buscar usuário")
            }
        );
    }

    async function validatePayment() {
        const responseUserPayment = await paymentUserService.getAllByUserId(Number(user.id))
        const userPayment = responseUserPayment.data;

        const statusPayment = userPayment.map((item: any, index: number) => {
            let newDueDate = new Date(item.dueDate);

            if (!item.active) {
                item.status = 0; //PAGO
                return;
            };

            if (isFuture(newDueDate)) item.status = 1; //PENDENTE
            if (isPast(newDueDate) && item.active) item.status = 2; //ATRASADO

            return item.status
        });

        if (statusPayment.includes(2)) {
            setLabelPayment({
                status: 2,
                text: 'Pagamento em Atraso'
            })

            return;
        }

        setLabelPayment({
            status: 1,
            text: `Próximo Pagamento: Dia ${member?.payday}`
        })
    };

    const onOpen = (isModalAvatar?: boolean) => {
        if (isModalAvatar) setShowModalAvatar(true);
        modalizeRef.current?.open();
    };

    const handleSubmit: SubmitHandler<any> = (data) => {
        setLoading(true);

        data.id = member.id;

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
                        <TouchableOpacity onPress={() => onOpen(true)}>
                            <Image
                                style={styles.avatarImage}
                                source={member.image ? { uri: member.image } : require("../../../assets/icons/user.png")}
                            />
                        </TouchableOpacity>

                        <View>
                            <Text style={styles.defaltText}>
                                {member.name} {" "}
                                (Peso Inicial: {member.startingWeight}Kg)
                            </Text>
                            <Text style={styles.defaltText}>{member.cpf}</Text>
                            <Text style={styles.defaltText}>{member.email}</Text>
                            {member.payday ?
                                (
                                    <RectButton style={{ ...styles.buttonPayDay, backgroundColor: (labelPayment.status === 1) ? Colors.colorSuccess : Colors.colorDanger }}>
                                        <Text style={styles.buttonPayDayText} allowFontScaling={false}>
                                            {labelPayment.text}
                                        </Text>
                                    </RectButton>
                                ) :
                                (
                                    <RectButton style={{ ...styles.buttonPayDay, backgroundColor: Colors.colorDanger }}>
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
                                    {member.currentWeight || member.startingWeight}Kg
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
                modalHeight={!showModalAvatar ? modalHeight : windowHeight}
            >
                {showModalAvatar ?
                    <AvatarSelection modalConfigOptions={modalConfigOptions} />
                    :
                    <ModalUpdateWeight modalConfigOptions={modalConfigOptions} />
                }
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

        borderWidth: 2,
        borderColor: Colors.colorPrimary
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