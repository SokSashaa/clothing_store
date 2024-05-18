import React, {FC} from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

type propsWrapper = {
    children: React.ReactNode,
}
const Wrapper: FC<propsWrapper> = ({children}) => {
    return (
        <>
            <Header/>
            {children}
            <Footer/>
        </>
    )
}
export default Wrapper