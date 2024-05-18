import React, {FC} from "react";
import {Button, Checkbox, DatePicker, Form, Input, notification, Select} from "antd";
import './RegisterForm.scss'
import {RegisterFormDTOInForm, Roles} from "../../api/dto/auth.dto";
import * as Api from '../../api/index'
import {Cookies} from "react-cookie";

const {Option} = Select;

const cookie = new Cookies();

const RegisterForm: FC = () => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const onSubmit = async (values: RegisterFormDTOInForm) => {
        try {
            const {pass, agreement, ...value} = {...values, date_reg: new Date(), role: Roles.default}
            const {token} = await Api.auth.register(value);

            notification.success({
                message: "Успешно!",
                duration: 2,
            });

            cookie.set('_token', token, {path: '/'})
            window.location.href = "/";


        } catch (err) {
            notification.error({
                message: "Ошибка!",
                description: "Ошибка при регистрации",
                duration: 2,
            });
        }
    };


    return (
        <>
            <div>
                <Form name="basic"
                      className={'wrapper_register_form'}
                      layout={'vertical'}
                      onFinish={(values: any) => onSubmit(values)}
                >
                    <Form.Item
                        label="Имя"
                        name="firstname"
                        rules={[
                            {
                                required: true,
                                message: "Укажите имя",
                                min: 2,
                            },
                            {
                                message: "Не более 15 символов",
                                max: 15
                            },
                        ]}

                    >
                        <Input placeholder={'Имя'}/>
                    </Form.Item>
                    <Form.Item
                        label="Фамилия"
                        name="lastname"
                        colon
                        rules={[
                            {
                                required: true,
                                message: "Укажите фамилию",
                                min: 2
                            },
                            {
                                message: "Не более 15 символов",
                                max: 15
                            },
                        ]}
                    >
                        <Input placeholder={'Фамилия'}/>
                    </Form.Item>
                    <Form.Item style={{textAlign: 'left'}}
                               name="date_birthday"
                               label="Дата рождения"
                               rules={[{type: 'object' as const, required: true, message: 'Please select time!'}]}>
                        <DatePicker/>
                    </Form.Item>
                    <Form.Item label="E-Mail"
                               name="email"
                               rules={[
                                   {
                                       required: true,
                                       message: "Укажите почту",
                                       type: "email"
                                   },
                               ]}>
                        <Input placeholder={'Email'}/>
                    </Form.Item>
                    <Form.Item
                        label="Пароль"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Укажите пароль",
                            },
                            {
                                min: 8,
                                validator: (_, value) => {
                                    return regex.test(value) ? Promise.resolve() : Promise.reject(new Error('Пароль не соответствует формату. Строчные и прописные буквы. Цифры. Символы'))
                                }
                            }

                        ]}

                    >
                        <Input.Password placeholder={'Пароль'}/>
                    </Form.Item>
                    <Form.Item
                        label="Подтвердите пароль"
                        name="pass"

                        dependencies={['password']}
                        rules={[
                            {
                                required: true,
                                message: "Подтвердите пароль",
                            },
                            ({getFieldValue}) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Пароли не совпадают'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password placeholder={'Пароль'}/>
                    </Form.Item>
                    <Form.Item
                        name="agreement"
                        valuePropName="checked"
                        rules={[
                            {required: true, message: 'Согласитесь с нашими правилами'}
                        ]}
                    >
                        <Checkbox>
                            Я согласен с правилами <a href="">agreement</a>
                        </Checkbox>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" danger htmlType="submit">
                            Регистрация
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    )
}

export default RegisterForm