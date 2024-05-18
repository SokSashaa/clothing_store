import {FC} from "react";
import './Footer.scss'

const Footer: FC = () => {
    return (
        <footer className={'wrapper_footer'}>
            <div className={'columnInFooter'}>
                <h3>Компания</h3>
                <a>О нас</a>
                <a>Вакансии</a>
                <a>Новости</a>
                <a>Каталог товаров</a>
                <a>Отзывы</a>
            </div>
            <div className={'columnInFooter'}>
                <h3>Клиенту</h3>
                <a>Доставка</a>
                <a>Оплата заказа</a>
                <a>Система скидок</a>
                <a>Возврат и обмен</a>
            </div>
            <div className={'columnInFooter'}>
                <h3>Контакты</h3>
                <p><span>8(800)123-45-67</span> оптовые продажи</p>
                <p><span>8(800)123-45-68</span> розничные продажи</p>
                <p><span>mail@mail.ru</span></p>
            </div>
        </footer>
    )
}
export default Footer