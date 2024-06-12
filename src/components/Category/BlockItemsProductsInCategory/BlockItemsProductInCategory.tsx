import React, {FC, useCallback, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import * as Api from '../../../api';
import ItemProductInPageCategory from '../ItemProductInPageCategory/ItemProductInPageCategory';
import {ProductDTO} from '../../../api/dto/product.dto';
import {AppraiseFilters} from './AppraiseFilters/AppraiseFilters';
import css from './BlockItemsProductsInCategory.module.scss';
import {PageTitle} from '../../../ui-kit/PageTitle/PageTitle';
import {SidebarLayout} from './SidebarLayout/SidebarLayout';
import {calculatePriceAfterDiscount} from '../../../utils/formatPrice';

const BlockItemsProductInCategory: FC = () => {
	const [initialProducts, setInitialProducts] = useState<ProductDTO[]>([]);
	const {id, name} = useParams();
	const [products, setProducts] = useState(initialProducts);

	useEffect(() => {
		if (id)
			Api.products.getAllProductsByIDCategory(id).then((value) => {
				setProducts(value);
				setInitialProducts(value);
			});
		if (name) Api.products.findAllProductByPartName(name).then(setProducts);
	}, [id, name]);

	const handleApplyFilter = useCallback(
		(fromTo: [number, number]) => {
			setProducts(
				initialProducts.filter((item) => {
					return (
						calculatePriceAfterDiscount(item.product_price, item.product_discount) >=
							Math.min(fromTo[0], fromTo[1]) &&
						calculatePriceAfterDiscount(item.product_price, item.product_discount) <=
							Math.max(fromTo[0], fromTo[1])
					);
				})
			);
		},
		[initialProducts, products]
	);
	return (
		<div className={css.wrapper}>
			{initialProducts.length > 0 ? (
				<SidebarLayout
					afterMenuSlot={<AppraiseFilters products={initialProducts} handleApplyFilter={handleApplyFilter} />}
					offsetTop={100}
				>
					{products.length > 0 ? (
						<div className={css.allItems}>
							<PageTitle className={css.title}>
								<span className={css.titleBrand}>
									Результаты поиска по {name ? 'запросу' : id ? 'категории' : ''}{' '}
									<span className={css.titleArticle}>{name || id}</span>
								</span>
							</PageTitle>
							<div className={css.block_items_products_in_category}>
								{products.map((item) => (
									<ItemProductInPageCategory key={item.product_id} itemProduct={item} />
								))}
							</div>
						</div>
					) : (
						<div className={css.allItems}>
							<PageTitle className={css.title}>
								<span className={css.titleBrand}>По заданным параметрам ничего не найдено</span>
							</PageTitle>
						</div>
					)}
				</SidebarLayout>
			) : (
				<div className={css.allItems}>
					<PageTitle className={css.title}>
						<span className={css.titleBrand}>По заданным параметрам ничего не найдено</span>
					</PageTitle>
				</div>
			)}
		</div>
	);
};
export default BlockItemsProductInCategory;
