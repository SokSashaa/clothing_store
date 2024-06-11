import React, {FC, useState} from "react";
import {Select, SelectProps} from "antd";
import * as Api from "../../api";

let timeout: ReturnType<typeof setTimeout> | null;

type SelectUsersProps = {
    placeholder: string,
    style?: React.CSSProperties,
    value: string,
    onChange: React.Dispatch<React.SetStateAction<string>>
}

const SelectUsers: FC<SelectUsersProps> = ({placeholder, value, onChange}) => {
    const [dataUser, setDataUser] = useState<SelectProps['options']>([]);


    const onSearchUser = (newValue: string) => {
        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
        }
        if (newValue) {
            timeout = setTimeout(() => {
                Api.userApi.findUserByEmail(newValue).then((value) => {
                    const data = value.map(item => ({
                        value: item.id,
                        text: item.email
                    }))
                    setDataUser(data)
                })
            }, 1000);

        } else {
            setDataUser([]);
            onChange('')
        }
    }

    const onChangeUser = (value: string) => {
        onChange(value)
    }

    return (
        <Select showSearch
                placeholder={placeholder}
                value={value}
                filterOption={false}
                defaultActiveFirstOption={false}
                suffixIcon={null}
                onChange={(v) => onChangeUser(v)}
                onSearch={(v) => onSearchUser(v)}
                options={(dataUser || []).map((d) => ({
                    value: d.value,
                    label: d.text,
                }))}
        />
    )
}

export default SelectUsers