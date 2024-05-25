import {FC} from "react";
import './MiniHeader.scss'
import {NavLink} from "react-router-dom";

type itemsHeader = {
	name: string,
	link: string
}

const itemsNameInHeader: itemsHeader[] = [
	{name: 'Главная', link: '/'},
	{name: 'Категории', link: '/categories'},
	{name: 'Новости', link: '/news'},
	{name: 'Акции', link: '/discounts'},
	{name: 'Где купить', link: '/where-to-buy'},
	{name: 'Доставка и оплата', link: '/payment-and-delivery'},
	{name: 'О нас', link: '/about'},
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