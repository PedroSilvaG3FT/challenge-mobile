import React from 'react';

import AuthRoutes from './auth.routes'
import AppRoutes from './app.routes'
import { useAuth } from '../../contexts/auth'
import { ActivityIndicator } from 'react-native';
import { View } from '../../components/Themed';
import WaitingApproval from '../../screens/WaitingApproval';

const Routes: React.FC = () => {
    const { signed, approved, loading } = useAuth();

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#666" />
            </View>
        )
    }
    
    if(signed && !approved) {
        return (
            <WaitingApproval />
        )
    }

    return signed ? <AppRoutes /> : <AuthRoutes />;
}

export default Routes;