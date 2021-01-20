import React from 'react';
import Colors from '../../constants/Colors';
import { ActivityIndicator } from 'react-native-paper';
import { Dimensions, Modal, StyleSheet, View, Text } from 'react-native';

const windowHeight = Dimensions.get("window").height;

const Loading: React.FC = () => {

    return (
        <Modal visible={true} style={styles.modalContainer}>
            <View style={styles.container}>
                <ActivityIndicator size="large" color={Colors.colorDanger} />
                <Text style={styles.labelLoading}> Carregando ...</Text>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({

    modalContainer: {
        flex: 1,
    },

    container: {
        height: windowHeight,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.bgDarkSecondary
    },

    labelLoading: {
        marginVertical: 8,
        color: Colors.textLight
    }
})

export default Loading;