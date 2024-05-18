import {FC} from "react";
import Wrapper from "../../components/Wrapper/Wrapper";
import {Cookies} from "react-cookie";
import AccountInfo from "../../components/AccountInfo/AccountInfo";

const cookies = new Cookies()
const AccountPage: FC = () => {
    // if(!cookies.get('_token')) window.location.href ='/'
    // else {
    return (
        <Wrapper>
            <AccountInfo/>
            {/*<p>Дата рождения - {userRedux.date_birthday}</p>*/}
        </Wrapper>
    )
    // }
    // return (<></>)

}
export default AccountPage