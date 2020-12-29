import api from "../api";

export class MenuUserService {
    getAll() {
        return api.get<any>(`user`);
    }

    getById(id: number) {
        return api.get<any>(`user/${id}`);
    }

    create(data: object) {
        return api.post('user', data);
    }

    update(data: object) {
        return api.put('user', data);
    }
}