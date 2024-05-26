import React, {FC} from "react";
import {Button, Form, Input} from "antd";
import {useAppSelector} from "../../../hooks/redux";

const FormAccountInfo: FC = () => {
    const userRedux = useAppSelector(state => state.user)
    return (
        <Form
            name="accountSetting"
            className={'info_account'}
            layout={'vertical'}
            wrapperCol={{
                span: 30
            }}
            // onFinish={(values: any) => onSubmit(values)}
        >
            <Form.Item
                label={'E-mail'}
                name={'email'}
            >
                <Input placeholder={'E-mail'}/>
            </Form.Item>
            <Form.Item
                label={'Имя'}
                name={'firstname'}
            >
                <Input placeholder={'Имя'}/>
            </Form.Item>
            <Form.Item
                label={'Фамилия'}
                name={'lastname'}
            >
                <Input placeholder={'Фамилия'}/>
            </Form.Item>
            <Form.Item
                label={'Пароль'}
                name={'password'}
            >
                <Input.Password placeholder={'Пароль'}/>
            </Form.Item>
            <Form.Item
                label="Подтвердите пароль"
                name="pass"

                dependencies={['password']}
                // rules={[
                //     {
                //         required: true,
                //         message: "Подтвердите пароль",
                //     },
                //     ({getFieldValue}) => ({
                //         validator(_, value) {
                //             if (!value || getFieldValue('password') === value) {
                //                 return Promise.resolve();
                //             }
                //             return Promise.reject(new Error('Пароли не совпадают'));
                //         },
                //     }),
                // ]}
            >
                <Input.Password placeholder={'Пароль'}/>
            </Form.Item>
            <Form.Item>
                <Button danger htmlType="submit">Сохранить</Button>
            </Form.Item>
        </Form>
    )
}

export default FormAccountInfo