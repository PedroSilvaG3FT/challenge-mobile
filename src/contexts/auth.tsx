import React, { createContext, useState } from 'react';
import LoginInterface from '../interfaces/login.interface';
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
    
    async function signIn() {
        const response = await auth.singIn();

        const { user, token } = response;
        setUser(user);
    }

    function signOut() {}
    return (
        <AuthContext.Provider value={{ signed: !!user, user, signIn, signOut, loading}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;