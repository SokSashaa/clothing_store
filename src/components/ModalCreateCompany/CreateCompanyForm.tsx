import React, {FC, useEffect, useState} from "react";
import {Button, Col, Form, Input, notification, Row} from "antd";
import {companyDto} from "../../api/dto/company.dto";
import SelectUsers from "../../ui-kit/SelectUsers/SelectUsers";
import {getCompanyDADATA, initialStateCompanyDADATA,} from "../../api/dadata/getCompanies";
import SelectCompany from "../../ui-kit/SelectCompany/SelectCompany";
import * as Api from '../../api'

type CreateCompanyFormProps = {
    closeModal: () => void;
};
const CreateCompanyForm: FC<CreateCompanyFormProps> = (props) => {
    const [form] = Form.useForm();
    const [valueINN, setValueINN] = useState("123");
    const [valueUser, setValueUser] = useState("");
    const [dataCompany, setDataCompany] = useState<getCompanyDADATA>(
        initialStateCompanyDADATA,
    );

    useEffect(() => {
        form.resetFields();
    }, [dataCompany, form]);

    const onSubmitForm = (data: companyDto) => {
        Api.company.createCompany(data).then(() => {
            notification.success({
                message: 'Успешно',
                duration: 2
            })
            form.resetFields();
        }).finally(() => {
            props.closeModal()
        }).catch((error) => notification.error({
            message: error.response.data.message,
            duration: 2
        }))
    };

    const onCancel = () => {
        setDataCompany(initialStateCompanyDADATA);
        props.closeModal();
    };

    return (
        <Form
            form={form}
            preserve={false}
            initialValues={dataCompany}
            onFinish={(values) => onSubmitForm(values)}
            layout={"vertical"}
        >
            <div>
                <Form.Item name={"inn"} label={"ИНН (мин.5 символов)"}>
                    {/*<Input placeholder={'ИНН'}/>*/}
                    <SelectCompany
                        placeholder={"ИНН"}
                        value={valueINN}
                        onChange={setValueINN}
                        onChangeCompanyState={setDataCompany}
                    />
                </Form.Item>
                <Form.Item name={"name"} label={"Название"}>
                    <Input placeholder={"Название"}/>
                </Form.Item>
                <Form.Item name={"ogrn"} label={"ОГРН"}>
                    <Input placeholder={"ОГРН "}/>
                </Form.Item>
            </div>
            <div>
                <Form.Item name={"address"} label={"Адрес"}>
                    <Input placeholder={"Адрес "}/>
                </Form.Item>
                <Form.Item name={"user_id"} label={"Пользователь"}>
                    <SelectUsers
                        value={valueUser}
                        onChange={setValueUser}
                        placeholder={"Введите почту пользователя"}
                    />
                </Form.Item>
            </div>
            <Row gutter={10} justify={"end"}>
                <Col> <Button onClick={onCancel}>Отмена</Button></Col>
                <Col><Button type="primary" htmlType={"submit"}>
                    Создать
                </Button></Col>

            </Row>
        </Form>
    );
};
export default CreateCompanyForm;
