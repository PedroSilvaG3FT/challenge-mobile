import api from "../api";

export class PaymentUserService {
    create(data: any) {
        return api.post('userPayment', data);
    }

    getAllByUserId(userId: number) {
        return api.get(`userPayment/user/${userId}`)
    }
}