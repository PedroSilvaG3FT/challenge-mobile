import { MealInterface } from "../../interfaces/memberMenu.interface";
import api from "../api";
import axios from 'axios';

export class MenuUserService {
    public pathController = "menuUser";

    getById(id: number) {
        return api.get<any>(`${this.pathController}/${id}`);
    }

    async update(file: File, id: number) {
        const formData: FormData = new FormData();
        const fileName = `${file.name}|${id}`;

        await formData.append('fileData', file, fileName);

        console.log(JSON.stringify(formData));

        return api.post(`${this.pathController}/menuItemImage`, formData, {
            headers: {
                Accept: 'application/json',
                ContentType: 'multipart/form-data',
            }
        });
    }
}