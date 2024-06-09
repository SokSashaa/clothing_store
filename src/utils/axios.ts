import axios from "axios";
import {Cookies} from "react-cookie";
const cookies = new Cookies()

axios.defaults.baseURL = 'http://localhost:3001'
axios.interceptors.request.use((config:any) => {
    if (typeof window !== "undefined") {
        const _token =  cookies.get('_token')

        if(_token) config.headers.Authorization = "Bearer " + _token;
    }

    return config;
});

export default axios