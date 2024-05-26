import {FC, useEffect, useState} from "react";
import icon_search from "../../images/icons_search.svg";
import './SearchCatalog.scss'
import useDebounce from "../../hooks/useDebounce";
import * as Api from '../../api'
import ArrayFindItemsProducts from "../ArrayFindItemsProducts/ArrayFindItemsProducts";
import {ProductDTO} from "../../api/dto/product.dto";
import {useNavigate} from "react-router-dom";

const SearchCatalog: FC = () => {
    const [valueInput, setValueInput] = useState<string>('');
    const [arrayProducts, setArrayProducts] = useState<ProductDTO[]>([])
    const valueInputDebounce = useDebounce<string>(valueInput)

    const navigate = useNavigate()

    const onKeyDownInput = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') navigate(`/search/${valueInputDebounce}`)
    }

    useEffect(() => {
        if (valueInputDebounce !== '') Api.products.findTenProductByPartName(valueInputDebounce).then(setArrayProducts)
        else setArrayProducts([])
    }, [valueInputDebounce]);

    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <div className={'wrapperInputInHeader'}>
                <input id={'inputInHeader'} type={'text'} placeholder={'Поиск по каталогу'}
                       onChange={(e) => setValueInput(e.target.value)}
                       onKeyDown={event => onKeyDownInput(event)}/>
                <img id={'imgInInput'} src={icon_search} alt={'Поиск'} onClick={() => {
                    navigate(`/search/${valueInputDebounce}`)
                }}/>
            </div>
            <ArrayFindItemsProducts arrayProducts={arrayProducts}/>
        </div>

    )
}
export default SearchCatalog