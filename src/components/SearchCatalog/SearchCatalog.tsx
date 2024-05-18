import {FC, useState} from "react";
import icon_search from "../../images/icons_search.svg";
import './SearchCatalog.scss'

const SearchCatalog:FC = ()=>{
    const [valueInput,setValueInput] = useState<string>('');
    return (
        <div className={'wrapperInputInHeader'}>
            <input className={'inputInHeader'} type={'text'} placeholder={'Поиск по каталогу'}
                   onChange={(e)=>setValueInput(e.target.value)}/>
            <img className={'imgInInput'} src={icon_search} alt={'Поиск'}/>
        </div>
    )
}
export default SearchCatalog