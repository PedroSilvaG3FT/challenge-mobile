import React from 'react';
import { Button, StatusBar, StyleSheet } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import GradientButton from '../../components/GradientButton';
import { Text, View } from '../../components/Themed';
import { useAuth } from '../../contexts/auth';

const Settings: React.FC = () => {
    const { signOut } = useAuth();

    function handleSignOut() {
        signOut();
    }

    return (
        <View style={styles.container}>
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