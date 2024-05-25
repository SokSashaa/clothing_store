import {FC} from "react";
import {Navigate, Outlet} from "react-router-dom";

type ProtectedRouteProps = {
    isAllow: boolean,
    redirectPath?: string,
    // children: React.ReactNode
}
const ProtectedRoute: FC<ProtectedRouteProps> = ({isAllow, redirectPath = '/'}) => {
    if (!isAllow) <Navigate to={redirectPath}/>
    return <Outlet/>
}
export default ProtectedRoute