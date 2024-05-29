import * as numberFormat from 'number-format.js';

export const formatPrice = (price: number, exact?: boolean) => {
			return (exact ?
				numberFormat('# ##0,00', Number(price.toFixed(2))) :
				numberFormat('# ##0,', Number(price.toFixed()))) + '₽';
};