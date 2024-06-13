import {FC} from 'react';
import './MiniHeader.scss';
import {NavLink} from 'react-router-dom';
import {routesMap} from '../../../utils/routesMap';
import React from 'react';

type itemsHeader = {
	name: string;
	link: string;
};

const itemsNameInHeader: itemsHeader[] = [
	{name: 'Главная', link: '/'},
	{name: 'Категории', link: '/categories'},
];

const MiniHeader: FC = () => {
	return (
		<div className={'miniHeader'}>
			<div className="innerLinks">
				{itemsNameInHeader.map((item, index) => {
					return (
						<NavLink key={index} to={item.link}>
							{item.name}
						</NavLink>
					);
				})}
			</div>
		</div>
	);
};
export default MiniHeader;
