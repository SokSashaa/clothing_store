import {FC} from "react";
import {Navigate, Outlet} from "react-router-dom";
import {userDTO} from "../../api/dto/user.dto";

type ProtectedRouteProps = {
    isAllow: boolean,
    redirectPath?: string,
}
const ProtectedRoute: FC<ProtectedRouteProps> = ({isAllow, redirectPath='/'}) => {
    if (!isAllow) return <Navigate to={redirectPath}/>
    return <Outlet/>
}
export default ProtectedRoute