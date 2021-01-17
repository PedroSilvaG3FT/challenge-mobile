import React, { useEffect, useRef, useState } from 'react';
import { Image, ScrollView, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { IHandles } from 'react-native-modalize/lib/options';
import Colors from '../../../constants/Colors';
import { DayMenuInterface } from '../../../interfaces/memberMenu.interface';
import { MenuUserService } from '../../../service/MenuUserService';
import CameraComponent from '../../Camera';
import { Text, View } from '../../Themed';
import { Feather as Icon } from '@expo/vector-icons';
import { useAuth } from '../../../contexts/auth';
import { Form } from '@unform/mobile';
import Input from '../../form/input';
import GradientButton from '../../GradientButton';
import { FormHandles, SubmitHandler } from '@unform/core';
import { WeightUserService } from '../../../service/WeightUserService';
import AlertSnackBar, { ConfigAlertSnackBar } from '../../AlertSnackBar';

interface ModalUpdateWeightProps {
    modalRef?: React.RefObject<IHandles>,
    onCloseModal?: any,
    modalConfigOptions: any,
    height?: number,
};

const ModalUpdateWeight: React.FC<ModalUpdateWeightProps> = (props) => {
    const { user } = useAuth();
    const { modalConfigOptions } = props;
    const formRef = useRef<FormHandles>(null);

    const weightUserService = new WeightUserService();
    const [alertSnackBarProp, setAlertSnackBarProp] = useState<ConfigAlertSnackBar>({} as ConfigAlertSnackBar);

    function closeModal(result?: any) {
        modalConfigOptions.onCloseModal(result);
        modalConfigOptions.modalizeRef?.current?.close();
    }

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

                closeModal();
            },
            error => {
                setAlertSnackBarProp({
                    message: error.error,
                    type: "error",
                });

                closeModal();
            }
        )
    };

    return (
        <>
            <View style={{ ...styles.container, height: modalConfigOptions.height || "auto" }}>
                <View style={styles.containerModal}>
                    <Form ref={formRef} onSubmit={handleSubmitNewWeight} style={{ width: "100%" }}>
                        <Input
                            name="weight"
                            placeholder="Digite seu novo peso..."
                            keyboardType="decimal-pad"
                        />

                        <View style={{ alignItems: 'center', backgroundColor: 'transparent'}}>
                            <GradientButton
                                height={60}
                                width={'100%'}
                                nameIcon="check"
                                title="Atualizar Peso"
                                onPress={() => formRef.current?.submitForm()}
                            />
                        </View>
                    </Form>
                </View>
            </View>

            <AlertSnackBar config={alertSnackBarProp} />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.bgDarkSecondary
    },

    containerModal: {
        padding: 24,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: Colors.bgDarkSecondary,
        justifyContent: 'space-between',
    },

    title: {
        fontSize: 26,
        marginBottom: 12
    },

    mealBox: {
        marginBottom: 16,
        backgroundColor: Colors.bgDarkSecondary,
        marginVertical: 4,
        padding: 16,
        borderRadius: 8,
    },

    labelImage: {
        marginVertical: 12,
        textAlign: 'center'
    },

    imageBox: {
        maxHeight: 300,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.colorDanger
    },

    image: {
        width: "100%",
        height: "100%",
        resizeMode: "contain",
    },

    boxAddImage: {
        alignItems: 'center',
        paddingVertical: 12,
        backgroundColor: 'transparent',
    }

})

export default ModalUpdateWeight;