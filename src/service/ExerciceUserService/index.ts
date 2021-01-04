import api from "../api";

export class ExerciceUserService {
    
    getById(id: number) {
        return api.get<any>(`exerciceUser/${id}`);
    }
}