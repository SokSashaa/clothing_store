import React, {FC, useEffect, useState} from "react";
import * as Api from "../../../../api";
import {Input, Spin} from "antd";
import useDebounce from "../../../../hooks/useDebounce";
import {categoryDto} from "../../../../api/dto/category.dto";
import ItemEditCategory from "../ItemEditCategory/ItemEditCategory";
import css from './SearchCategory.module.scss'
const SearchCategory: FC = () => {
    const [loading, setLoading] = useState(false);
    const [valueInput, setValueInput] = useState('');
    const [categories, setCategories] = useState<categoryDto[]>([])
    const valueInputDebounce = useDebounce<string>(valueInput)
    useEffect(() => {
        if (valueInputDebounce !== '') Api.category.searchCategoryByPartName(valueInputDebounce)
            .then((value) => setCategories(value))
            .finally(() => setLoading(false));
        else {
            setCategories([]);
            setLoading(false);
        }
    }, [valueInputDebounce]);
    return (
        <div className={css.root}>
            <p>Введите название</p>
            <Input placeholder={'Введите название'} onChange={(e) => {
                setValueInput(e.target.value);
                setLoading(true);
            }}/>
            {loading ? <Spin size={'large'}/> : <div className={css.items}>
                {categories.map((item) => <ItemEditCategory category={item}/>)}
            </div>}
        </div>
    )
}
export default SearchCategory