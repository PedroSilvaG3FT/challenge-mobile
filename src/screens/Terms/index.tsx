import React, { useEffect, useState } from "react";
import Colors from "../../constants/Colors";
import { Text, StyleSheet, Modal, View, TouchableOpacity } from "react-native";
import { UserService } from "../../service/UserService";
import { useAuth } from "../../contexts/auth";

const Terms: React.FC = () => {
    const [visible, setVisible] = useState(true);
    const { user, getUser } = useAuth();
    const userService = new UserService();

    useEffect(() => {
        setVisible(true);
    }, [])

    function handleConfirm() {
        const updateTermDTO = {
            id: user.id,
            acceptTerm: true,
        };

        userService.update(updateTermDTO).then(
            response => {
                setVisible(false);
                getUser();
            },
            error => {
                console.log("ERROR :", error);
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
                        <Text style={styles.textTerm}>
                            O <Text style={{color: Colors.colorPrimary}}> izacdesafio90dias </Text>, é um aplicativo que te dá um resultado satisfatório em curto prazo.
                            Seguindo todas as recomendações sem desviar em alimentos que não esteja no cardápio você pode perder de um kg à 30 kg ao longo dos 90 dias.
                            Toda semana você receberá seu cardápio de acordo com o peso que é preciso perder e receberá orientações de exercícios que não necessita de um órgão acadêmico para se executar.
                            Tendo a conclusão que o izacdesafio90dias é muito rigoroso e restrito é necessário entender que terá alguns efeitos colaterais no início até o corpo se adaptar.
                            Esse desafio não é recomendado para pessoas com diabetes, Hipertireoidismo, pressão alta ou possui alguma doença crônica.
                        </Text>
                    </View>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => handleConfirm()}
                    >
                        <Text style={styles.buttonText}>Aceitar Termos</Text>
                    </TouchableOpacity>
                </View>

            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-end",
        paddingHorizontal: 24,
        paddingVertical: 48,
        backgroundColor: Colors.bgDarkPrimary
    },

    content: {
        marginBottom: 24
    },

    textTerm: {
        color: "#FFF",
        textAlign: 'center',
        fontSize: 16,
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

export default Terms;
