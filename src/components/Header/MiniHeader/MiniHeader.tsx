import {FC, useState} from "react";
import './MiniHeader.scss'
import {NavLink} from "react-router-dom";

type itemsHeader = {
    name: string,
    link: string
}

const itemsNameInHeader: itemsHeader[] = [
    {name: 'Главная', link: '/'},
    {name: 'Категории', link: '/categories'},
    {name: 'Новости', link: ''},
    {name: 'Акции', link: ''},
    {name: 'Где купить', link: ''},
    {name: 'Доставка и оплата', link: ''},
    {name: 'О нас', link: ''},
    {name: 'Партнёрам', link: ''}]

const MiniHeader: FC = () => {
    const [activeItemInHeader, setActiveItemInHeader] = useState<string>(itemsNameInHeader[0].name)
    return (
        <div className={'miniHeader'}>
            {
                itemsNameInHeader.map((item, index) => {
                    return (
                        <NavLink
                            key={index}
                            onClick={() => setActiveItemInHeader(itemsNameInHeader[index].name)}
                            to={item.link}>
                            {item.name}
                        </NavLink>
                    )
                })
            }
        </div>
    )
}
export default MiniHeader