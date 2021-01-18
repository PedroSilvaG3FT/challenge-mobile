import api from "../api";

export class PaymentService {
    getAll() {
        return api.get('payment');
    }
}