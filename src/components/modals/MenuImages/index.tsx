import React from 'react';
import { StyleSheet } from 'react-native';
import { IHandles } from 'react-native-modalize/lib/options';
import { Text, View } from '../../Themed';

interface ModalImagesProps {
    modalRef?: React.RefObject<IHandles>,
    onCloseModal?: any,
    modalConfigOptions: any
};

const MenuImagesModal: React.FC<ModalImagesProps> = (props) => {
    const { modalConfigOptions } = props;

    function closeModal(result?: any) { 
        modalConfigOptions.onCloseModal(result);
        modalConfigOptions.modalizeRef?.current?.close();
    }

    return (
        <View style={styles.container}>
            <Text>Modal Images</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 40
    }
})

export default MenuImagesModal;