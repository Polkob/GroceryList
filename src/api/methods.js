import axios from "axios";


const api = axios.create({
    baseURL:"http://api.grocery-list.maketfay.com/"
})


export const methods = {

    register(username,password) {
         return api.post("user/register", {
            Username: username,
            Password: password
         })
    },
   login(username,password) {
       return api.post("user/login",{
             Username: username,
             Password: password
       })
    },
}
