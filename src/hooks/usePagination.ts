import {useCallback, useMemo, useState} from 'react';
import {PaginationConfig} from 'antd/lib/pagination/Pagination';
import {TablePaginationConfig} from 'antd/lib/table/interface';

const defaultPagination: Pagination['pagination'] = {
	skip: 0,
	top: 10,
};

type Pagination = {
	pagination: {skip: number; top: number};
	tableProps: {
		pagination: TablePaginationConfig;
	};
};

export function usePagination(total: number, defaults = defaultPagination): Pagination {
	const [pagination, setPagination] = useState(defaults);
	const {skip, top} = pagination;
	const tablePagination = useMemo(() => {
		const current = Math.floor(skip / top) + 1;

		return {
			current,
			pageSize: top,
			total,
		};
	}, [skip, top, total]);

	const handleTablePaginationChange = useCallback((page: number, pageSize?: number) => {
		setPagination((pagination) => {
			const prevTop = pagination.top;
			const top = pageSize === undefined ? prevTop : pageSize;

			// go to first page when pageSize changed
			const skip = top !== prevTop ? 0 : Math.abs((page - 1) * top);

			return {
				top,
				skip,
			};
		});
	}, []);

	return useMemo(
		() => ({
			pagination,
			tableProps: {
				pagination: {...tablePagination, onChange: handleTablePaginationChange},
			},
		}),
		[tablePagination, pagination]
	);
}
