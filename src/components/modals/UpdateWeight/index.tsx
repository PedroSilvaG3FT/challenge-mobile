import React, { useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import { IHandles } from 'react-native-modalize/lib/options';
import Colors from '../../../constants/Colors';
import { View } from '../../Themed';
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

                        <View style={{ alignItems: 'center', backgroundColor: 'transparent' }}>
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
})

export default ModalUpdateWeight;