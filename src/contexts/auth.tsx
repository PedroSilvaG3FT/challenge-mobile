import React, { createContext, useEffect, useState } from 'react';
import LoginInterface from '../interfaces/login.interface';
import AsyncStorage from '@react-native-community/async-storage';
import * as auth from "../service/auth";

interface AuthContextData {
    signed: boolean;
    user: object | null;
    loading: boolean;
    signIn(login: LoginInterface): Promise<void>;
    signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<object | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadStorageData() {
            const storagedUser = await AsyncStorage.getItem("@EMAuth:user");
            const storagedToken = await AsyncStorage.getItem("@EMAuth:token");

            await new Promise((resolve) => setTimeout(resolve, 2000));

            if (storagedUser && storagedToken) {
                setUser(JSON.parse(storagedUser));
                setLoading(false);
            }
        }

        loadStorageData();
    }, []);

    async function signIn() {
        const response = await auth.singIn();

        setUser(response.user);
        AsyncStorage.setItem("@EMAuth:user", JSON.stringify(response.user));
        AsyncStorage.setItem("@EMAuth:token", response.token);
    }

    function signOut() {
        AsyncStorage.clear().then(() => {
            setUser(null);
        });
    }

    return (
        <AuthContext.Provider value={{ signed: !!user, user, signIn, signOut, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;