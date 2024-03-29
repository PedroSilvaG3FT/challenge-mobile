import api from "./api";
interface ResponseToken {
    data: {
        token: string;
        user: {
            acceptTerm: boolean,
            active: boolean,
            currentStep: any,
            dateCreation: Date | any,
            email: string,
            goalWeight: number,
            height: number,
            id: number,
            image: string,
            isAdm: boolean,
            name: string,
            password: string,
            payday: number,
            startingWeight: number,
        }
    }
}

export function singIn(userLogin: any): Promise<ResponseToken> {
    return api.post('autentication', userLogin);
}

export function singInAccessCode(accessCode: string): Promise<ResponseToken> {
    return api.post('autentication-accessCode', { accessCode });
}