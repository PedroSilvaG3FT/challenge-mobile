import api from "../api";
export class MenuUserService {
    getById(id: number) {
        return api.get<any>(`menuUser/${id}`);
    }

    update(data: object) {
        return api.put('menuUser', data);
    }
}