import React, {FC, memo, useEffect} from "react";
import {Button, Form, Input, Modal, notification, Upload, UploadFile} from "antd";
import {categoryDto} from "../../api/dto/category.dto";
import {PlusOutlined} from "@ant-design/icons";
import {getSrcOnImgCategory} from "../../api/category";
import axios from "../../utils/axios";
import * as Api from "../../api";

type ModalUpdateCategoryProps = {
    category: categoryDto,
    isOpenModal: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const ModalUpdateCategory: FC<ModalUpdateCategoryProps> = memo(({category, isOpenModal, setOpen}) => {
        // const [loading, setLoading] = useState(false);
        const [form] = Form.useForm();
        const [fileList, setFileList] = React.useState<UploadFile[]>([]);
        const handleUpdate = (values: any) => {
            const res = {...values,category_id:category.category_id}
            Api.category.updateCategory(res)
                .then(() => {
                    notification.success({
                        message: 'Успешно',
                        duration: 2
                    })
                    form.resetFields();
                    // setFileList([]);
                    setOpen(false);
                }).finally(() => {

            }).catch((error) => notification.error({
                message: error.response.data.message,
                duration: 2
            }))
        }
        return (
            <Modal
                open={isOpenModal}
                title="Обновление категории"
                onCancel={() => setOpen(false)}
                footer={[
                    <Button onClick={() => setOpen(false)}>
                        Отмена
                    </Button>,
                    <Button
                        type="primary"
                        htmlType={'submit'}
                        // loading={loading}
                        onClick={form.submit}
                    >
                        Обновить
                    </Button>,
                ]}
            >
                <Form
                    form={form}
                    initialValues={{
                        category_name:category.category_name
                    }}
                    onFinish={(values) => handleUpdate(values)}
                    layout={"vertical"}>
                    <Form.Item name={'category_name'} label={'Название'}>
                        <Input placeholder={'Название'}/>
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
                </Form>
            </Modal>
        )

    }
)
export default ModalUpdateCategory