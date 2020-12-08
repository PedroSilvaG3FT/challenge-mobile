interface ResponseToken {
    token: string;
    user: {
        id: number,
        role: string;
        username: string;
        password: string;
    };
}


export function singIn(): Promise<ResponseToken> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                token: 'kjdhfkjsfkjsdhfkshdfse9fi238runef',
                user: {
                    id: 1,
                    role: '',
                    username: 'Pedro Silva',
                    password: '12345'
                }
            })
        }, 1000);
    })
}