import api from "../api";

export class UserService {

    getAll() { 
        return api.get<any>(`user`);
    }

    getById(id: number) {
        return api.get<any>(`user/${id}`);
    }

    getByEmail(email: string) {
        return api.get<any>(`user/email/${email}`);
    }

    create(data: object) {
        return api.post('user', data);
    }

    update(data: object) {
        return api.put('user', data);
    }

    updatePassword(data: { password: string, userId: number }) {
        return api.put('user/change-password', data)
    }

}