import { useEffect, useState } from 'react';

import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, message, Modal } from 'antd';
import { useForm } from 'antd/es/form/Form';

import databaseService from '../../../../../../databaseService';

export default function ModalCreateNode() {
    const [form] = useForm();
    const [open, setOpen] = useState(false);
    const [type, setType] = useState<string>('');

    const handleChangeKind = (e: React.ChangeEvent<HTMLInputElement>) => {
        setType(e.target.value);
    }

    const Add_Type = async () => {
        try {
            await form.validateFields(); // Validate form fields
            if (await databaseService.addType(type)) {
                localStorage.setItem("flag_load", 'true');
                message.success('Thêm thành công!');
                setOpen(false);
            } else {
                message.error('Thêm thất bại!');
            }
        } catch (error) {
            // message.error('Vui lòng nhập tên type!');
        }
    }

    return (
        <>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => setOpen(true)}>
                Create
            </Button>
            <Modal
                open={open}
                afterClose={() => form.resetFields()}
                title={'Create new type instance'}
                destroyOnClose
                onCancel={() => setOpen(false)}
                onOk={Add_Type}
            >
                <Form form={form}
                    layout="vertical"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    name="dynamic_form_complex"
                    style={{ maxWidth: 600 }}
                    autoComplete="off"
                    initialValues={{ type: '' }}
                >
                    <Form.Item
                        label="Type"
                        name="type"
                        rules={[{ required: true, message: 'Vui lòng nhập tên type!' }]}
                    >
                        <Input 
                            onChange={handleChangeKind}
                            value={type}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};
