import React, { useContext } from 'react';

import AuthRoutes from './auth.routes'
import AppRoutes from './app.routes'
import AuthContext from '../../contexts/auth'
import { ActivityIndicator } from 'react-native';
import { View } from '../../components/Themed';

const Routes: React.FC = () => {
    const { signed, loading } = useContext(AuthContext);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#666" />
            </View>
        )
    }
    
    return signed ? <AppRoutes /> : <AuthRoutes />;
}

export default Routes;