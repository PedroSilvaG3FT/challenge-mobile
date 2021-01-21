import api from "../api";

export class AvatarService {

    getAll() {
        return api.get<any>("avatar");
    }
}