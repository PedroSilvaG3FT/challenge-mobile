import React, { createContext, useEffect, useState, useContext } from 'react';
import LoginInterface from '../interfaces/login.interface';
import AsyncStorage from '@react-native-community/async-storage';
import * as auth from "../service/auth";
import api from "../service/api";

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

            if (storagedUser && storagedToken) {
                api.defaults.headers["Authorization"] = `Bearer ${storagedToken}`;
                
                setUser(JSON.parse(storagedUser));
            }
            
            setLoading(false);
        }

        loadStorageData();
    }, []);

    async function signIn(data: LoginInterface) {

        auth.singIn(data).then(
            response => {
                const responseData = response.data;
                setUser(responseData.userBd);
                AsyncStorage.setItem("@EMAuth:user", JSON.stringify(responseData.userBd));
                AsyncStorage.setItem("@EMAuth:token", responseData.token);
            },
            error => {
                console.log("ERRO", error);
            }
            
        );
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


export function useAuth() {
    const context = useContext(AuthContext);

    return context;
}