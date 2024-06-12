import React, {FC, useState} from "react";
import {Button, Col, Form, Input, InputNumber, notification, Row, Upload, UploadFile} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import * as Api from '../../api'
import TextArea from "antd/es/input/TextArea";
import SelectCategory from "../../ui-kit/SelectCategory/SelectCategory";
import {useAppSelector} from "../../hooks/redux";

type CreateCompanyFormProps = {
    closeModal: () => void;
};
const CreateProductForm: FC<CreateCompanyFormProps> = (props) => {
    const [form] = Form.useForm();
    const [fileList, setFileList] = React.useState<UploadFile[]>([]);
    const [valueCategory, setValueCategory] = useState("");

    const user = useAppSelector(state => state.user)

    const onSubmitForm = (data: any) => {
        if(user){
            Api.products.createProduct(data,user)
                .then(() => {
                    notification.success({
                        message: 'Успешно',
                        duration: 2
                    })
                    form.resetFields();
                    setFileList([]);
                    props.closeModal();
                }).finally(() => {
            }).catch((error) => notification.error({
                message: error.response.data.message,
                duration: 2
            }))
        }

    };

    const onCancel = () => {
        props.closeModal();
    };

    return (
        <Form
            form={form}
            preserve={false}
            onFinish={(values) => onSubmitForm(values)}
            layout={"vertical"}
        >
            <Form.Item name={"product_name"} label={"Название"} required>
                <Input placeholder={"Название"}/>
            </Form.Item>
            <Form.Item name={"article"} label={"Артикул"} required>
                <Input placeholder={"Артикул"}/>
            </Form.Item>
            <Form.Item name={"product_description"} label={"Описание"} required>
                <TextArea placeholder={"Описание"}/>
            </Form.Item>
            <Form.Item name={"product_price"} label={"Цена"} required>
                <InputNumber placeholder={'Цена'} min={0}/>
            </Form.Item>
            <Form.Item name={"product_discount"} label={"Скидка (0-1)"}>
                <InputNumber placeholder={'Скидка'} step={0.1} max={1} min={0} defaultValue={0}/>
            </Form.Item>
            <Form.Item name={"category_id"} label={"Категория"} required>
                <SelectCategory value={valueCategory} onChange={setValueCategory} placeholder={'Категория'}/>
            </Form.Item>
            <Form.Item name={'product_image'} label="Изображение">
                <Upload maxCount={5} action="/upload.do" listType="picture-card" fileList={fileList}
                        onChange={({fileList}) => setFileList(fileList)}>
                    <button style={{border: 0, background: 'none'}} type="button">
                        <PlusOutlined/>
                        <div style={{marginTop: 8}}>Upload</div>
                    </button>
                </Upload>
            </Form.Item>
            <Row gutter={10} justify={"end"}>
                <Col> <Button onClick={onCancel}>Отмена</Button></Col>
                <Col><Button type="primary" htmlType={"submit"}>
                    Создать
                </Button></Col>

            </Row>
        </Form>
    );
};
export default CreateProductForm;
