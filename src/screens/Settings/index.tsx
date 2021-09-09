import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import GradientButton from '../../components/GradientButton';
import { View } from '../../components/Themed';
import { useAuth } from '../../contexts/auth';

const Settings: React.FC = () => {
    const navigation = useNavigation();
    const { signOut } = useAuth();

    function handleSignOut() {
        signOut();
    }

    return (
        <View style={styles.container}>
            <GradientButton 
                height={60}
                width={"100%"}
                title="Alterar Senha"
                nameIcon="lock-outline"
                onPress={() => navigation.navigate('ChangePasswordScreen')}
            />

            <GradientButton 
                title="Sair"
                height={60}
                width={"100%"}
                nameIcon="exit-to-app"
                onPress={() => handleSignOut()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-end",
        paddingHorizontal: 24,
        paddingVertical: StatusBar.currentHeight
    },
})

export default Settings;