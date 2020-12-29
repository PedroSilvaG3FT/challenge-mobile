import React, { createContext, useEffect, useState, useContext } from 'react';
import LoginInterface from '../interfaces/login.interface';
import AsyncStorage from '@react-native-community/async-storage';
import * as auth from "../service/auth";
import api from "../service/api";
import { UserService } from '../service/UserService';

interface AuthContextData {
    signed: boolean;
    approved: boolean,
    acceptTerm: boolean,
    user: object | null;
    loading: boolean;
    signIn(login: LoginInterface): Promise<void>;
    signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const userService = new UserService();

    useEffect(() => {
        async function loadStorageData() {
            const storagedUser: any = await AsyncStorage.getItem("@EMAuth:user");
            const storagedToken = await AsyncStorage.getItem("@EMAuth:token");

            if (storagedUser && storagedToken) {
                api.defaults.headers["Authorization"] = `Bearer ${storagedToken}`;
                setUser(JSON.parse(storagedUser));
            }
            
            setLoading(false);
        }

        loadStorageData();
    }, []);

    useEffect(() => {
        
        if (user && !user.active) {
            getUser();
        }
    },[user])


    async function getUser() {
        userService.getById(user.id).then(
            response => {
                console.log(response.data);
                setUser(response.data);
                AsyncStorage.setItem("@EMAuth:user", JSON.stringify(response.data));
            }
        )
    }

    async function signIn(data: LoginInterface) {

        auth.singIn(data).then(
            async response => {
                const responseData = await response.data;
                setUser(responseData.user);
                AsyncStorage.setItem("@EMAuth:user", JSON.stringify(responseData.user));
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
        <AuthContext.Provider value={{ signed: !!user, approved: user?.active, acceptTerm: user?.acceptTerm, user, signIn, signOut, loading }}>
            {children}
        </AuthContext.Provider>
    );
}


export function useAuth() {
    const context = useContext(AuthContext);

    return context;
}