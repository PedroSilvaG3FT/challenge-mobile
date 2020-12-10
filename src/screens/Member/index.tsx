import React from 'react';
import { Image, StatusBar, StyleSheet } from 'react-native';
import { Text, View } from '../../components/Themed';
import Colors from '../../constants/Colors';
import GradientButton from '../../components/GradientButton';

const Member: React.FC = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.centerAlignItems}>
                    <Text style={styles.goalText}>Meta</Text>
                    <Text>(Semana)</Text>
                    <Text style={styles.goalWeight}> 75kg </Text>
                </View>

                <View style={styles.centerAlignItems}>
                    <Image
                        style={styles.avatarImage}
                        source={{
                            uri: 'https://pickaface.net/gallery/avatar/unr_guihteste_180521_0137_2av4wpi.png',
                        }}
                    />

                    <Text>Olá Pedro, o seu peso atual é:</Text>
                    <Text style={styles.currentWeightText}>76kg</Text>
                </View>

                <View style={styles.centerAlignItems}>
                    <Text style={[styles.goalText, { color: Colors.colorDanger }]}>Meta</Text>
                    <Text>(Final)</Text>
                    <Text style={styles.goalWeight}> 75kg </Text>
                </View>
            </View>

            <GradientButton
                title="Cardapio"
                nameIcon="food-fork-drink"
                width={"auto"}
                height={60}
            />

            <GradientButton
                title="Exercicios"
                nameIcon="run-fast"
                width={"auto"}
                height={60}
            />

            <GradientButton
                title="Meu Historico"
                nameIcon="history"
                width={"auto"}
                height={60}
            />

            <GradientButton
                title="Meu Perfil"
                nameIcon="account-details"
                width={"auto"}
                height={60}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingVertical: Number(StatusBar.currentHeight) + 32
    },

    header: {
        marginBottom: 24,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },

    centerAlignItems: {
        alignItems: 'center',
    },

    avatarImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 8
    },

    currentWeightText: {
        color: Colors.colorPrimary,
        fontSize: 28
    },

    goalText: {
        fontSize: 20,
        fontWeight: "bold",
        color: Colors.colorDangerLight
    },

    goalWeight: {
        fontSize: 24,
    }
})

export default Member;