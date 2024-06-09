import React, {FC, memo, useState} from "react";
import {userDTO} from "../../api/dto/user.dto";
import {Button, DatePicker, Form, Input, Modal, notification, Select} from "antd";
import css from './ModalUpdateUser.module.scss'
import {Roles} from "../../api/dto/auth.dto";
import dayjs from "dayjs";
import * as Api from '../../api'

type ModalUpdateUserProps = {
    user: userDTO,
    isOpenModal: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const ModalUpdateUser: FC<ModalUpdateUserProps> = memo(({user, isOpenModal, setOpen}) => {
        const [loading, setLoading] = useState(false);
        const [form] = Form.useForm();

        const handleUpdate = (values: any) => {
            setLoading(true)
            const user_new = {...values, id: user.id, date_reg: user.date_reg}
            Api.userApi.updateUser(user_new).then(() => {
                notification.success({
                    message: 'Успешно!',
                    duration: 2
                })
            }).finally(() => {
                setLoading(false);
                setOpen(false);
            }).catch((error) => notification.error({
                message: error.response.data.message,
                duration: 2
            }));
        }
        return (
            <Modal
                open={isOpenModal}
                title="Обновление пользователя"
                onCancel={() => setOpen(false)}
                footer={[
                    <Button onClick={() => setOpen(false)}>
                        Отмена
                    </Button>,
                    <Button
                        type="primary"
                        htmlType={'submit'}
                        loading={loading}
                        onClick={form.submit}
                    >
                        Обновить
                    </Button>,
                ]}
            >
                <Form className={css.root}
                      form={form}
                      initialValues={{
                          email: user.email,
                          firstname: user.firstname,
                          lastname: user.lastname,
                          role: user.role,
                          date_birthday: dayjs(user.date_birthday)
                      }}
                      onFinish={(values) => handleUpdate(values)}
                      layout={"vertical"}>
                    <div className={css.itemForm}>
                        <Form.Item name={'email'} label={'Email'}>
                            <Input placeholder={'Email'}/>
                        </Form.Item>
                        <Form.Item name={'lastname'} label={'Фамилия'}>
                            <Input placeholder={'Фамилия'}/>
                        </Form.Item>
                        <Form.Item name={'firstname'} label={'Имя'}>
                            <Input placeholder={'Имя '}/>
                        </Form.Item>
                    </div>
                    <div className={css.itemForm}>
                        <Form.Item name={'date_birthday'} label={'Дата регистрации'}>
                            <DatePicker format={'DD-MM-YYYY'}/>
                        </Form.Item>

                        <Form.Item name={'role'} label={'Роль'}>
                            <Select>
                                <Select.Option value={Roles.default}>Пользователь</Select.Option>
                                <Select.Option value={Roles.producer}>Продавец</Select.Option>
                                <Select.Option value={Roles.admin}>Администратор</Select.Option>
                            </Select>
                        </Form.Item>
                    </div>
                </Form>
            </Modal>
        )

    }
)
export default ModalUpdateUser