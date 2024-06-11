import React, {FC, memo, useEffect, useState} from "react";
import {Select, SelectProps} from "antd";
import {getCompaniesDADATA, getCompanyDADATA, initialStateCompanyDADATA} from "../../api/dadata/getCompanies";


let timeout: ReturnType<typeof setTimeout> | null;

type SelectCompanyProps = {
    placeholder: string,
    style?: React.CSSProperties,
    value: string,
    onChange: React.Dispatch<React.SetStateAction<string>>,
    onChangeCompanyState: React.Dispatch<React.SetStateAction<getCompanyDADATA>>,
}

const SelectCompany: FC<SelectCompanyProps> = memo(({placeholder, value, onChange, onChangeCompanyState}) => {
    const [dataCompany, setDataCompany] = useState<SelectProps['options']>([]);
    const [arrayCompanies, setArrayCompanies] = useState<getCompanyDADATA[]>([])

    console.log('select inn', value)

    const searchItemCompany = (inn: string): getCompanyDADATA => {
        const result = arrayCompanies.find(item => item.inn === inn)
        if (result) return result
        else return initialStateCompanyDADATA
    }

    const onSearchCompany = (newValue: string) => {
        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
        }
        if (newValue) {
            timeout = setTimeout(async () => {
                getCompaniesDADATA(newValue)
                    .then(value => {
                        setArrayCompanies(value)
                        const data = value.map(item => ({
                            value: item.inn,
                            text: item.name
                        }))
                        setDataCompany(data)
                    })
                // Api.userApi.findUserByEmail(newValue).then((value) => {
                //     const data = value.map(item => ({
                //         value: item.id,
                //         text: item.email
                //     }))
                //     setDataCompany(data)
                // })
            }, 1000);

        } else {
            setDataCompany([]);
            onChange('')
        }
    }

    const onChangeCompany = (value: string) => {
        onChange(value)
        onChangeCompanyState(searchItemCompany(value))
    }

    return (
        <Select showSearch
                placeholder={placeholder}
                value={value}
                filterOption={false}
                defaultActiveFirstOption={false}
                suffixIcon={null}
                onChange={(v) => onChangeCompany(v)}
                onSearch={(v) => onSearchCompany(v)}
                options={(dataCompany || []).map((d) => ({
                    value: d.value,
                    label: (<p>{d.text + ' ' + d.value}</p>),
                }))}
        />
    )
})
export default SelectCompany