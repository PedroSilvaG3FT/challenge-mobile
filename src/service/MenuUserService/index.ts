import api from "../api";

export class MenuUserService {
    public pathController = "menuUser";

    getById(id: number) {
        return api.get<any>(`${this.pathController}/${id}`);
    }

    async update(userImage: any) {
        return api.put(`${this.pathController}/menuItemImage`, userImage);
    }
}