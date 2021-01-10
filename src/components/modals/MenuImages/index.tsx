import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { IHandles } from 'react-native-modalize/lib/options';
import Colors from '../../../constants/Colors';
import CameraComponent from '../../Camera';
import { Text, View } from '../../Themed';

interface ModalImagesProps {
    modalRef?: React.RefObject<IHandles>,
    onCloseModal?: any,
    modalConfigOptions: any,
    height?: number
};

const MenuImagesModal: React.FC<ModalImagesProps> = (props) => {
    const { modalConfigOptions } = props;
    const [showCamera, setShowCamera] = useState(false);

    function closeModal(result?: any) {
        modalConfigOptions.onCloseModal(result);
        modalConfigOptions.modalizeRef?.current?.close();
    }

    const onCloseCamera = (result: any) => {
        setShowCamera(false)
    };

    return (
        <>
            <View style={{ ...styles.container, height: modalConfigOptions.height || "auto"}}>
                <TouchableOpacity onPress={() => setShowCamera(true)}>
                    <Text>Modal Images</Text>
                </TouchableOpacity>
            </View>

            <CameraComponent
                visible={showCamera}
                onClose={onCloseCamera}
            />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 40,
        backgroundColor: Colors.bgDarkSecondary
    }
})

export default MenuImagesModal;