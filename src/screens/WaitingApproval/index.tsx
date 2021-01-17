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
            contentContainerStyle={styles.container}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>

            <View style={stylesMenuEmpty.container}>
                <View style={stylesMenuEmpty.boxImage}>
                    <Image
                        style={stylesMenuEmpty.iconImage}
                        source={require("../../../assets/icons/customer-support.png")}
                    />

                    <Text style={stylesMenuEmpty.boxImageLabel}>Aguardando Aprovação</Text>

                    <Text style={stylesMenuEmpty.boxImageText}>
                        Estamos avaliando o seu perfil para indicar o melhor caminho para o seu 
                        <Text style={{color: Colors.colorDangerLight, fontWeight: 'bold'}}> Desafio 90 dias </Text> 
                        ! :)
                    </Text>

                    <View style={stylesMenuEmpty.boxButton}>
                        <TouchableOpacity style={stylesMenuEmpty.buttonBack} onPress={() => signOut()}>
                            <Text style={styles.textDefault}> Voltar para Login </Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>

            {/* <View>
                <Text style={styles.textDefault}>Aguardando Aprovação</Text>
                <TouchableOpacity onPress={() => signOut()}>
                    <Text style={styles.textDefault}>
                        Voltar para Login
                </Text>
                </TouchableOpacity>
            </View> */}
        </ScrollView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.bgDarkPrimary
    },

    textDefault: {
        color: "#FFF"
    },
})

const stylesMenuEmpty = StyleSheet.create({
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