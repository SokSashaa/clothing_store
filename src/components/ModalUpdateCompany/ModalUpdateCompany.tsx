import React, {FC} from "react";
import {Button, Form, Input, Modal, notification} from "antd";
import {companyDto, companyUpdateDTO} from "../../api/dto/company.dto";
import * as Api from "../../api";

type ModalUpdateCompanyProps = {
    company: companyDto,
    isOpenModal: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

type formUpdateCompany = {
    name: string,
    email: string,
    inn: string,
    ogrn: string,
    address: string
}

const ModalUpdateCompany: FC<ModalUpdateCompanyProps> = ({company, isOpenModal, setOpen}) => {
    const [form] = Form.useForm();

    const handleUpdate = async (values: formUpdateCompany) => {

        const {id} = (await Api.userApi.findUserByEmail(values.email))[0]
        if (id) {
            const company_new: companyUpdateDTO = {
                user_id: id,
                name: values.name,
                inn: values.inn,
                ogrn: values.ogrn,
                address: values.address,
                id: company.id
            }
            Api.company.updateCompany(company_new).then(() => {
                notification.success({
                    message: 'Успешно!',
                    duration: 2
                })
            }).finally(() => {
                setOpen(false)
            }).catch((error) => notification.error({
                message: error.response.data.message,
                duration: 2
            }));
        }

    }
    return (
        <Modal
            open={isOpenModal}
            title="Обновление компании"
            onCancel={() => setOpen(false)}
            footer={[
                <Button onClick={() => setOpen(false)}>
                    Отмена
                </Button>,
                <Button
                    type="primary"
                    htmlType={'submit'}
                    onClick={form.submit}
                >
                    Обновить
                </Button>,
            ]}
        >
            <Form
                form={form}
                initialValues={{
                    ...company, email: company.user_id.email
                }}
                layout={'vertical'}
                onFinish={(values) => handleUpdate(values)}>
                <Form.Item name={'name'} label={'Название'}>
                    <Input placeholder={'Название'}/>
                </Form.Item>
                <Form.Item name={'inn'} label={'ИНН'}>
                    <Input placeholder={'ИНН'}/>
                </Form.Item>
                <Form.Item name={'ogrn'} label={'ОГРН'}>
                    <Input placeholder={'ОГРН '}/>
                </Form.Item>
                <Form.Item name={'address'} label={'Адрес'}>
                    <Input placeholder={'Адрес'}/>
                </Form.Item>
                <Form.Item name={'email'} label={'Почта пользователя'}>
                    <Input placeholder={'Почта пользователя'}/>
                </Form.Item>
            </Form>
        </Modal>
    )
}
export default ModalUpdateCompany