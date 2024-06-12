import React, {FC, useState} from "react";
import {Select, SelectProps} from "antd";
import * as Api from "../../api";
import {categoryDto} from "../../api/dto/category.dto";

let timeout: ReturnType<typeof setTimeout> | null;

type SelectCategoryProps = {
    placeholder: string,
    style?: React.CSSProperties,
    value: string,
    onChange: React.Dispatch<React.SetStateAction<string>>,
}

const SelectCategory: FC<SelectCategoryProps> = ({placeholder, value, onChange}) => {
    const [dataCategory, setDataCategory] = useState<SelectProps['options']>([]);

    const onChangeCategory = (value: string) => {
        onChange(value)
    }

    const onSearchCategory = (newValue: string) => {
        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
        }
        if (newValue) {
            timeout = setTimeout(() => {
                Api.category.searchCategoryByPartName(newValue).then((value) => {
                    const data = value.map(item => ({
                        value: item.category_id,
                        text: item.category_name
                    }))
                    setDataCategory(data)
                })
            }, 1000);

        } else {
            setDataCategory([]);
            onChange('')
        }
    }

    return <Select showSearch
                   placeholder={placeholder}
                   value={value}
                   filterOption={false}
                   defaultActiveFirstOption={false}
                   suffixIcon={null}
                   onChange={(v) => onChangeCategory(v)}
                   onSearch={(v) => onSearchCategory(v)}
                   options={(dataCategory || []).map((d) => ({
                       value: d.value,
                       label: d.text,
                   }))}
    />
}
export default SelectCategory
