import React, {FC, useState} from "react";
import {ProductWithCategoryDTO} from "../../api/dto/product.dto";
import {Button, Form, Input, InputNumber, Modal, notification} from "antd";
import css from './ModalUpdateProduct.module.scss'
import TextArea from "antd/es/input/TextArea";
import SelectCategory from "../../ui-kit/SelectCategory/SelectCategory";
import * as Api from '../../api'

type ModalUpdateProductProps = {
    product: ProductWithCategoryDTO,
    isOpenModal: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}
const ModalUpdateProduct: FC<ModalUpdateProductProps> = ({product, isOpenModal, setOpen}) => {
    const [form] = Form.useForm();
    const [valueCategory, setValueCategory] = useState("");

    const handleUpdate = (values: any) => {
        if (!Number.isInteger(values.category)) {
            const product_new = {...values, category_id: values.category.category_id, product_id: product.product_id, product_image:undefined}
            Api.products.updateProduct(product_new).then(() => {
                notification.success({
                    message: 'Успешно!',
                    duration: 2
                })
            }).finally(() => {
                setOpen(false);
            }).catch((error) => notification.error({
                message: error.response.data.message,
                duration: 2
            }));
        } else
        {
            const new_product = {...values,category_id:values.category,product_id: product.product_id,product_image:undefined}
            console.log(new_product)
            Api.products.updateProduct(new_product).then(() => {
                notification.success({
                    message: 'Успешно!',
                    duration: 2
                })
            }).finally(() => {
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
                  initialValues={{...product}}
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
                    <InputNumber min={0} max={1} placeholder={'Скидка'}/>
                </Form.Item>
                <Form.Item name={'category'} label={'Категория'}>
                    <SelectCategory placeholder={'Выберите категорию'} value={valueCategory}
                                    onChange={setValueCategory}/>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default ModalUpdateProduct