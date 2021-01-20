import api from "../api";

export class PaymentUserService {
    create(data: any) {
        return api.post('userPayment', data);
    }
}