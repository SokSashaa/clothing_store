import React, {FC} from "react";
import {Button, Col, Form, Input, notification, Row, Upload, UploadFile} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import * as Api from '../../api'

type CreateCompanyFormProps = {
    closeModal: () => void;
};
const CreateCategoryForm: FC<CreateCompanyFormProps> = (props) => {
    const [form] = Form.useForm();
    const [fileList, setFileList] = React.useState<UploadFile[]>([]);


    const onSubmitForm = (data: any) => {
        Api.category.createCategory(data)
            .then(() => {
                notification.success({
                    message: 'Успешно',
                    duration: 2
                })
                form.resetFields();
                // setFileList([]);
                props.closeModal();
            }).finally(() => {

        }).catch((error) => notification.error({
            message: error.response.data.message,
            duration: 2
        }))
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
            <Form.Item name={"category_name"} label={"Название"}>
                <Input placeholder={"Название"}/>
            </Form.Item>

            <Form.Item name={'category_img_name'} label="Изображение">
                <Upload action="/upload.do" listType="picture-card" fileList={fileList}
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
export default CreateCategoryForm;
