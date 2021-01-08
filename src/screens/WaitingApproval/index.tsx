import React, { useState } from 'react';
import { RefreshControl, StyleSheet, Text, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
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

            <View>
                <Text style={styles.textDefault}>Aguardando Aprovação</Text>
                <TouchableOpacity onPress={() => signOut()}>
                    <Text style={styles.textDefault}>
                        Voltar para Login
                </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black'
    },

    textDefault: {
        color: "#FFF"
    },
})
export default WaitingApproval;