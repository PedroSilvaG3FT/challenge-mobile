import api from "../api";

export class WeightUserService {

    create(data: object) {
        return api.post('userWeight', data);
    }

}