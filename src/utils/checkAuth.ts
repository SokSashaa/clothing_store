import {Cookies} from "react-cookie";

const cookies = new Cookies()
export const checkAuth = () => {
     if (!cookies.get('_token')) window.location.href = '/'
}