import {FC} from "react";
import './MiniHeader.scss'
import {NavLink} from "react-router-dom";
import {routesMap} from '../../../utils/routesMap';

type itemsHeader = {
	name: string,
	link: string
}

const itemsNameInHeader: itemsHeader[] = [
	{name: 'Главная', link: '/'},
	{name: 'Категории', link: '/categories'},
	{name: 'Новости', link: routesMap.news},
	{name: 'Акции', link: routesMap.discounts},
	{name: 'Где купить', link: '/where-to-buy'},
	{name: 'Доставка и оплата', link: routesMap.paymentAndDelivery},
	{name: 'О нас', link: routesMap.aboutPage},
	{name: 'Партнёрам', link: '/partners'}]

const MiniHeader: FC = () => {
	return (
		<div className={'miniHeader'}>
			<div className="innerLinks">
				{
					itemsNameInHeader.map((item, index) => {
						return (
								<NavLink
									key={index}
									to={item.link}>
									{item.name}
								</NavLink>
						)
					})
				}
			</div>
		</div>
	)
}
export default MiniHeader