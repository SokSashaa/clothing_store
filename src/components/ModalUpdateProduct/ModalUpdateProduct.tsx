import React, {FC, useState} from "react";
import {ProductWithCategoryDTO} from "../../api/dto/product.dto";
import {Button, Form, Input, InputNumber, Modal, notification, Upload, UploadFile} from "antd";
import css from './ModalUpdateProduct.module.scss'
import TextArea from "antd/es/input/TextArea";
import SelectCategory from "../../ui-kit/SelectCategory/SelectCategory";
import * as Api from '../../api'
import {PlusOutlined} from "@ant-design/icons";

type ModalUpdateProductProps = {
    product: ProductWithCategoryDTO,
    isOpenModal: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

// type formUpdate = {
//     article:string,
//     category:{
//         category_id:string
//     },
//     product_discount:number,
//     product_price:number,
//     product_name:string,
//     product_description:string,
//
// }
const ModalUpdateProduct: FC<ModalUpdateProductProps> = ({product, isOpenModal, setOpen}) => {
    const [form] = Form.useForm();
    const [valueCategory, setValueCategory] = useState("");
    const [fileList, setFileList] = React.useState<UploadFile[]>([]);

    const handleUpdate = (values: any) => {
        if (!Number.isInteger(values.category)) {
            const product_new = {
                product_description:values.product_description,
                product_discount:values.product_discount,
                product_name:values.product_name,
                product_price:values.product_price,
                product_image: values.product_image,
                article:values.article,
                category_id: values.category.category_id,
                product_id: product.product_id,
            }
            console.log('int',product_new)
            Api.products.updateProductWithImages(product_new).then(() => {
                notification.success({
                    message: 'Успешно!',
                    duration: 2
                })
                setOpen(false);
            }).catch((error) => notification.error({
                message: error.response.data.message,
                duration: 2
            }));

        } else {
            const product_new = {
                product_description:values.product_description,
                product_discount:values.product_discount,
                product_name:values.product_name,
                product_price:values.product_price,
                product_image: values.product_image,
                article:values.article,
                category_id: values.category,
                product_id: product.product_id,
            }
            console.log(product_new)
            Api.products.updateProductWithImages(product_new).then(() => {
                notification.success({
                    message: 'Успешно!',
                    duration: 2
                })
                setOpen(false);
            }).catch((error) => notification.error({
                message: error.response.data.message,
                duration: 2
            }));
        }
    }

    return (
        <Modal
            open={isOpenModal}
            title="Обновление продукта"
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
            <Form className={css.root}
                  form={form}
                  initialValues={{...product,product_image:undefined}}
                  onFinish={(values) => handleUpdate(values)}
                  layout={"vertical"}>
                <Form.Item name={'article'} label={'Артикул'}>
                    <Input placeholder={'Артикул'}/>
                </Form.Item>
                <Form.Item name={'product_name'} label={'Название'}>
                    <Input placeholder={'Название'}/>
                </Form.Item>
                <Form.Item name={'product_description'} label={'Описание'}>
                    <TextArea placeholder={'Описание'}/>
                </Form.Item>
                <Form.Item name={'product_price'} label={'Цена'}>
                    <InputNumber placeholder={'Цена'}/>
                </Form.Item>
                <Form.Item name={'product_discount'} label={'Скидка (0-1)'}>
                    <InputNumber min={0} max={1} step={0.1} placeholder={'Скидка'}/>
                </Form.Item>
                <Form.Item name={'category'} label={'Категория'}>
                    <SelectCategory placeholder={'Выберите категорию'} value={valueCategory}
                                    onChange={setValueCategory}/>
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
            </Form>
        </Modal>
    )
}

export default ModalUpdateProduct