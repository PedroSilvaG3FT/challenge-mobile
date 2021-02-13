import api from "../api";

export class MenuUserService {
    public pathController = "menuUser";

    getById(id: number) {
        return api.get<any>(`${this.pathController}/${id}`);
    }

    updateImage(userImage: any) {
        return api.post(`${this.pathController}/menuItemImage`, userImage);
    }
}