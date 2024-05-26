import {FC, useEffect, useState} from "react";
import icon_search from "../../images/icons_search.svg";
import './SearchCatalog.scss'
import useDebounce from "../../hooks/useDebounce";
import * as Api from '../../api'
import {initialProductDTOArray, ProductDTO} from "../../api/dto/product.dto";
import ArrayFindItemsProducts from "../ArrayFindItemsProducts/ArrayFindItemsProducts";

const SearchCatalog:FC = ()=>{
    const [valueInput,setValueInput] = useState<string>('');
    const [arrayProducts,setArrayProducts] = useState<ProductDTO[]>(initialProductDTOArray)
    const valueInputDebounce = useDebounce<string>(valueInput)
    useEffect(() => {
        if(valueInputDebounce!=='') Api.products.findProductByPartName(valueInputDebounce).then(setArrayProducts)
        else setArrayProducts(initialProductDTOArray)
    }, [valueInputDebounce]);
    return (
        <div style={{display:'flex',flexDirection:'column'}}>
            <div className={'wrapperInputInHeader'}>
                <input className={'inputInHeader'} type={'text'} placeholder={'Поиск по каталогу'}
                       onChange={(e)=>setValueInput(e.target.value)}/>
                <img className={'imgInInput'} src={icon_search} alt={'Поиск'}/>
            </div>
            <ArrayFindItemsProducts arrayProducts={arrayProducts}/>
        </div>

    )
}
export default SearchCatalog