import {FC} from "react";
import './Footer.scss'
import {routesMap} from '../../utils/routesMap';
import {NavLink} from 'react-router-dom';

type itemsFooter = {
    name: React.ReactNode,
    link: string,
    block: FooterBlocks,
}

enum FooterBlocks {
    Company,
    ToClient,
    Contacts
}

const itemsNameInFooter: itemsFooter[] = [
    {block: FooterBlocks.Company, name: 'О нас', link: routesMap.aboutPage},
    {block: FooterBlocks.Company, name: 'Вакансии', link: routesMap.vacancies},
    {block: FooterBlocks.Company, name: 'Новости', link: routesMap.news},
    {block: FooterBlocks.Company, name: 'Категории', link: routesMap.categories},
    {block: FooterBlocks.Company, name: 'Отзывы', link: routesMap.reviews},
    
    {block: FooterBlocks.ToClient, name: 'Акции', link: routesMap.discounts},
    {block: FooterBlocks.ToClient, name: 'Доставка и оплата', link: routesMap.paymentAndDelivery},
    {block: FooterBlocks.ToClient, name: 'Возвраты', link: routesMap.returns},
    
    {
        block: FooterBlocks.Contacts,
        name: <p><span>8(800)123-45-67</span> оптовые продажи</p>,
        link: 'tel:8-800-123-45-67'
    },
    {
        block: FooterBlocks.Contacts,
        name: <p><span>8(800)123-45-68</span> розничные продажи</p>,
        link: 'tel:8-800-123-45-68'
    },
    {
        block: FooterBlocks.Contacts,
        name: <p><span>mail@mail.ru</span></p>,
        link: 'mailto:mail@mail.ru'
    }
]


const Footer: FC = () => {
    return (
        <footer className={'wrapper_footer'}>
            <div className={'columnInFooter'}>
                <h3>Компания</h3>
                {
                    itemsNameInFooter.map((item, index) => (
                            item.block === FooterBlocks.Company && (
                                <NavLink
                                    key={index}
                                    to={item.link}
                                >
                                    {item.name}
                                </NavLink>
                            )
                        )
                    )
                }
            </div>
            <div className={'columnInFooter'}>
                <h3>Клиенту</h3>
                {
                    itemsNameInFooter.map((item, index) => (
                            item.block === FooterBlocks.ToClient && (
                                <NavLink
                                    key={index}
                                    to={item.link}
                                >
                                    {item.name}
                                </NavLink>
                            )
                        )
                    )
                }
            </div>
            <div className={'columnInFooter'}>
                <h3>Контакты</h3>
                {itemsNameInFooter.map((item, index) => item.block === FooterBlocks.Contacts && <a href={item.link} key={index}>{item.name}</a>)}
            </div>
        </footer>
    )
}
export default Footer