import React, {FC, useEffect, useState} from "react";
import useDebounce from "../../hooks/useDebounce";
import {companyDto} from "../../api/dto/company.dto";
import * as Api from "../../api";
import {Spin} from "antd";
import ItemCompany from "../ItemCompany/ItemCompany";
import css from './SearchCompany.module.scss'

const SearchCompany: FC = () => {
    const [loading, setLoading] = useState(false);
    const [valueInput, setValueInput] = useState('');
    const [companies, setCompanies] = useState<companyDto[]>([])
    const valueInputDebounce = useDebounce<string>(valueInput)
    useEffect(() => {
        if (valueInputDebounce !== '') Api.company.findCompanyByINN(valueInputDebounce)
            .then((value) => setCompanies(value))
            .finally(() => setLoading(false));
        else {
            setCompanies([]);
            setLoading(false);
        }
    }, [valueInputDebounce]);
    return (
        <div className={css.root}>
            <p>Введите ИНН</p>
            <input placeholder={'Введите ИНН'} onChange={(e) => {
                setValueInput(e.target.value);
                setLoading(true);
            }}/>
            {loading ? <Spin size={'large'}/> : <div className={css.arrayItems}>
                {companies.map((item) => <ItemCompany company={item}/>)}
            </div>}
        </div>
    )
}
export default SearchCompany