import React, { useEffect, useState } from "react";
import { Text, StyleSheet, Modal, View, TouchableOpacity } from "react-native";
import Colors from "../../../constants/Colors";
import { useAuth } from "../../../contexts/auth";
import { UserService } from "../../../service/UserService";
import { RadioButton } from 'react-native-paper';
import { PaymentService } from "../../../service/PaymentService";
import { PaymentInterface } from "../../../interfaces/payment.interface";
import { PaymentUserService } from "../../../service/PaymentUserService";

interface PropsModalPaymentInterface {
    isUpdate?: boolean,
    visible?: boolean,
    onClose?: any;
}

const ModalPayment: React.FC<PropsModalPaymentInterface> = (props) => {
    const { user, getUser } = useAuth();
    const [visible, setVisible] = useState(true);
    const [checked, setChecked] = useState("1");
    const [paymentList, setPaymentList] = useState<PaymentInterface[]>([])

    const paymentDayList = [5, 10, 15, 20];
    const [day, setDay] = useState(String(paymentDayList[1]));

    const userService = new UserService();
    const paymentService = new PaymentService();
    const paymentUserService = new PaymentUserService();

    useEffect(() => {
        setVisible(true);

        getAllPayment();
    }, [])

    function getAllPayment() {
        paymentService.getAll().then(
            response => {
                setPaymentList(response.data);
            },
            error => {
                console.error("Erro ao buscar pagamentos")
            }
        )
    }

    function handleConfirm() {
        const updatePaymentDTO = {
            id: user.id,
            payday: Number(day),
            paymentId: Number(checked)
        };

        userService.update(updatePaymentDTO).then(
            response => {
                setVisible(false);

                const newPaymentUser = {
                    userId: updatePaymentDTO.id,
                    payday: updatePaymentDTO.payday,
                    paymentId: updatePaymentDTO.paymentId
                }
                
                paymentUserService.create(newPaymentUser).then(
                    () => getUser(),
                    error => console.error('Erro ao criar pagamentos')
                )
            },
            error => {
                console.error("Erro ao atualizar usuario");
            }
        )
    };

    return (
        <>
            <Modal
                animationType="slide"
                visible={visible}
            >
                <View style={styles.container}>
                    <View style={styles.content}>

                        <Text style={styles.titleText}>Selecione a forma de pagamento</Text>

                        <RadioButton.Group onValueChange={value => setChecked(value)} value={String(checked)}>
                            {paymentList.map((payment, index) => (
                                <View key={String(index)}>
                                    <RadioButton.Item
                                        label={payment.name}
                                        value={String(payment.id)}
                                        style={styles.paymentItem}
                                        color={Colors.colorSuccess}
                                        theme={{
                                            colors: { text: Colors.textLight }
                                        }}
                                    />
                                </View>
                            ))}
                        </RadioButton.Group>

                        <Text style={styles.titleText}>Selecione o melhor dia</Text>

                        <RadioButton.Group onValueChange={value => setDay(value)} value={String(day)}>
                            <View style={styles.boxDay}>

                                {paymentDayList.map((day, index) => (
                                    <View key={String(index)}>
                                        <RadioButton.Item
                                            label={String(day)}
                                            value={String(day)}
                                            style={styles.paymentDayItem}
                                            color={Colors.colorSuccess}
                                            theme={{
                                                colors: { text: Colors.textLight }
                                            }}
                                        />
                                    </View>
                                ))}
                            </View>

                        </RadioButton.Group>
                    </View>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => handleConfirm()}
                    >
                        <Text style={styles.buttonText}>Salvar</Text>
                    </TouchableOpacity>
                </View>

            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
        paddingHorizontal: 24,
        paddingVertical: 48,
        backgroundColor: Colors.bgDarkPrimary
    },

    content: {
        marginBottom: 24,
    },

    titleText: {
        color: Colors.colorSuccess,
        fontSize: 18,
        marginVertical: 12
    },

    paymentItem: {
        backgroundColor: Colors.bgDarkSecondary,
        marginVertical: 4,
        borderRadius: 8
    },

    boxDay: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },

    paymentDayItem: {
        backgroundColor: Colors.bgDarkSecondary,
        marginVertical: 4,
        borderRadius: 8
    },

    button: {
        backgroundColor: Colors.colorSuccess,
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

export default ModalPayment;
