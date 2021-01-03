import React from 'react';

import AuthRoutes from './auth.routes'
import AppRoutes from './app.routes'
import { useAuth } from '../../contexts/auth'
import { ActivityIndicator } from 'react-native';
import { Text, View } from '../../components/Themed';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Routes: React.FC = () => {
    const { signed, approved, acceptTerm , loading, signOut } = useAuth();

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#666" />
            </View>
        )
    }
    
    if(signed && !approved) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Aguardando Aprovação</Text>
                <TouchableOpacity onPress={() => signOut()}>
                    <Text>Voltar para Login</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return signed ? <AppRoutes /> : <AuthRoutes />;
}

export default Routes;