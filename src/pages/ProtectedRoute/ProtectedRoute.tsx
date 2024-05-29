import React from "react";
import {FC} from "react";
import {Navigate, Outlet} from "react-router-dom";
import {useAppSelector} from "../../hooks/redux";
import {Roles} from "../../api/dto/auth.dto";

type ProtectedRouteProps = {
    rule: string,
    redirectPath?: string,
}
const ProtectedRoute: FC<ProtectedRouteProps> = ({rule, redirectPath = '/'}) => {
    const user = useAppSelector(state => state.user)
    if (user === undefined) {
        return null;
    }
    const returnIsAllow = (rule:string)=>{
        switch (rule){
            case 'user': return !!user.email
            case 'role': return user.role === Roles.admin
            default: return false
        }
    }
    if (!returnIsAllow(rule)) return <Navigate to={redirectPath}/>
    return <Outlet/>
}
export default ProtectedRoute