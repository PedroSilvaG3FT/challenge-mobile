export default function singIn() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                token: 'kjdhfkjsfkjsdhfkshdfse9fi238runef',
                user: {
                    name: 'Pedro Silva',
                    email: 'pedro.silva@teste.com'
                }
            })
        }, 2000);
    })
}