import React, { FC, useEffect, useState } from "react";
import { Button, Form, Input, Row } from "antd";
import { companyDto } from "../../api/dto/company.dto";
import SelectUsers from "../../ui-kit/SelectUsers/SelectUsers";
import {
  getCompanyDADATA,
  initialStateCompanyDADATA,
} from "../../api/dadata/getCompanies";
import SelectCompany from "../../ui-kit/SelectCompany/SelectCompany";

const CreateCompanyForm: FC = () => {
  const [form] = Form.useForm();
  const [valueINN, setValueINN] = useState("123");
  const [valueUser, setValueUser] = useState("");
  const [dataCompany, setDataCompany] = useState<getCompanyDADATA>(
    initialStateCompanyDADATA,
  );

  console.log("modal inn", valueINN);
  console.log("modalstart company", dataCompany);
  useEffect(() => {
    form.resetFields();
    console.log("reset comp", dataCompany);
  }, [dataCompany, form]);

  const onSubmitForm = (data: companyDto) => {
    // Api.company.createCompany(data).then(() => {
    //     notification.success({
    //         message: 'Успешно',
    //         duration: 2
    //     })
    //     form.resetFields();
    // }).finally(() => {
    //     setOpen(false);
    // }).catch((error) => notification.error({
    //     message: error.response.data.message,
    //     duration: 2
    // }))
  };

  const onCancel = () => {
    setDataCompany(initialStateCompanyDADATA);
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
        <Form.Item name={"inn"} label={"ИНН"}>
          {/*<Input placeholder={'ИНН'}/>*/}
          <SelectCompany
            placeholder={"ИНН"}
            value={valueINN}
            onChange={setValueINN}
            onChangeCompanyState={setDataCompany}
          />
        </Form.Item>
        <Form.Item name={"name"} label={"Название"}>
          <Input placeholder={"Название"} />
        </Form.Item>
        <Form.Item name={"ogrn"} label={"ОГРН"}>
          <Input placeholder={"ОГРН "} />
        </Form.Item>
      </div>
      <div>
        <Form.Item name={"address"} label={"Адрес"}>
          <Input placeholder={"Адрес "} />
        </Form.Item>
        <Form.Item name={"user_id"} label={"Пользователь"}>
          <SelectUsers
            value={valueUser}
            onChange={setValueUser}
            placeholder={"Введите почту пользователя"}
          />
        </Form.Item>
      </div>
      <Row>
        <Button onClick={onCancel}>Отмена</Button>,
        <Button type="primary" htmlType={"submit"} onClick={form.submit}>
          Создать
        </Button>
        ,
      </Row>
    </Form>
  );
};
export default CreateCompanyForm;
