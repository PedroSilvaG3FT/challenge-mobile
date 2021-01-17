import React, { useState } from 'react';
import { Image, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../../constants/Colors';
import { useAuth } from '../../contexts/auth';

const wait = (timeout: number) => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

const WaitingApproval: React.FC = () => {
    const { signOut, getUser } = useAuth();
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getUser()
        wait(2000).then(() => setRefreshing(false));
    }, []);

    return (
        <ScrollView
            contentContainerStyle={styles.containerFull}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>

            <View style={styles.container}>
                <View style={styles.boxImage}>
                    <Image
                        style={styles.iconImage}
                        source={require("../../../assets/icons/customer-support.png")}
                    />

                    <Text style={styles.boxImageLabel}>Aguardando Aprovação</Text>

                    <Text style={styles.boxImageText}>
                        Estamos avaliando o seu perfil para indicar o melhor caminho para o seu 
                        <Text style={{color: Colors.colorDangerLight, fontWeight: 'bold'}}> Desafio 90 dias </Text> 
                        ! :)
                    </Text>

                    <View style={styles.boxButton}>
                        <TouchableOpacity style={styles.buttonBack} onPress={() => signOut()}>
                            <Text style={styles.textDefault}> Voltar para Login </Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </ScrollView>

    );
}

const styles = StyleSheet.create({
    containerFull: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.bgDarkPrimary
    },

    textDefault: {
        color: "#FFF"
    },

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    boxImage: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24
    },

    iconImage: {
        width: 150,
        height: 150,
        marginBottom: 24
    },

    boxImageLabel: {
        color: Colors.colorSuccess,
        fontSize: 24
    },

    boxImageText: {
        color: "#FFF",
        fontSize: 16,
        paddingHorizontal: 42,
        textAlign: 'center'
    },

    boxButton: {
        marginVertical: 12
    },

    buttonBack: {
        backgroundColor: Colors.colorDangerLight,
        padding: 12,
        borderRadius: 8
    }
});

export default WaitingApproval;