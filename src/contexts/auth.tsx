import React, { createContext, useEffect, useState, useContext } from 'react';
import LoginInterface from '../interfaces/login.interface';
import AsyncStorage from '@react-native-community/async-storage';
import * as auth from "../service/auth";
import api from "../service/api";
import { UserService } from '../service/UserService';
import AlertSnackBar, { ConfigAlertSnackBar } from '../components/AlertSnackBar';

interface AuthContextData {
    signed: boolean;
    approved: boolean,
    acceptTerm: boolean,
    user: object | any;
    loading: boolean;
    signIn(login: LoginInterface): Promise<void>;
    signInAccessCode(accessCode: string): Promise<void>;
    signOut(): void;
    getUser(): void;
    showLoading(): void;
    hideLoading(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const userService = new UserService();
    const [alertSnackBarProp, setAlertSnackBarProp] = useState<ConfigAlertSnackBar>({} as ConfigAlertSnackBar);

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
        if (user && !user.active) getUser();
    },[user])

    function showLoading() {
        setLoading(true);
    }

    function hideLoading() {
        setLoading(false);
    }

    async function getUser() {
        const storagedUser: any = await AsyncStorage.getItem("@EMAuth:user");
        userService.getById(user.id).then(
            response => {
                const userResponse = response.data;
                if (storagedUser === JSON.stringify(userResponse)) {
                    return;
                }

                setUser(userResponse);
                AsyncStorage.setItem("@EMAuth:user", JSON.stringify(response.data));
            },
            error => {
                console.error("Erro ao buscar usuário");
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
                setAlertSnackBarProp({
                    message: "Email ou senha incorretos",
                    type: "error",
                });
            }
            
        );
    }

    async function signInAccessCode(accessCode: string) {
        auth.singInAccessCode(accessCode).then(
            async response => {
                const responseData = await response.data;
                setUser(responseData.user);
                AsyncStorage.setItem("@EMAuth:user", JSON.stringify(responseData.user));
                AsyncStorage.setItem("@EMAuth:token", responseData.token);
            },
            error => {
                setAlertSnackBarProp({
                    message: "Usuario não encontrado ou o código informado não existe",
                    type: "error",
                });
            }
        );
    }

    function signOut() {
        AsyncStorage.clear().then(() => {
            setUser(null);
        });
    }

    return (
        <AuthContext.Provider value={{ 
            signed: !!user, 
            approved: user?.active, 
            acceptTerm: user?.acceptTerm, 
            user, 
            signIn,
            signInAccessCode, 
            signOut, 
            getUser, 
            loading,
            showLoading,
            hideLoading 
            }}>
            {children}
            <AlertSnackBar config={alertSnackBarProp} />

        </AuthContext.Provider>
    );
}


export function useAuth() {
    const context = useContext(AuthContext);

    return context;
}