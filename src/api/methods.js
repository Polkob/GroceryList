import axios from "axios";


const api = axios.create({
    baseURL:"http://api.grocery-list.maketfay.com/"
})


export const methods = {

    register(Username, Password) {
        return api.post(`user/register?Username=${Username}&Password=${Password}`);
    },
    login(Username, Password) {
        return api.post(`user/login?Username=${Username}&Password=${Password}`);
    },
}
