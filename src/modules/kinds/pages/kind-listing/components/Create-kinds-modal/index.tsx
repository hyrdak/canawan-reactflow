import React, { useState } from 'react';

import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, message, Modal } from 'antd';

import databaseService from '../../../../../../databaseService';

export default function ModalCreateKind() {
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const [kind, setKind] = useState('');

    const handleChangeKind = (e:any) => {
        setKind(e.target.value);
    };

    const Add_Kind = async () => {
        try {
            await form.validateFields();
            if (await databaseService.addKind(kind)) {
                localStorage.setItem('flag_load', 'true');
                message.success('Thêm thành công!');
                setKind('');
                setOpen(false);
            } else {
                message.error('Thêm thất bại!');
            }
        } catch (error) {
            
        }
    };

    const handleCancel = () => {
        setKind('');
        setOpen(false);
    };

    return (
        <>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => setOpen(true)}>
                Create
            </Button>
            <Modal
                open={open}
                title="Create new kind instance"
                afterClose={form.resetFields}
                destroyOnClose
                onCancel={handleCancel}
                onOk={Add_Kind}
            >
                <Form
                    form={form}
                    layout="vertical"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    name="dynamic_form_complex"
                    style={{ maxWidth: 600 }}
                    autoComplete="off"
                    initialValues={{ kind: [{}] }}
                    
                >
                    <Form.List name="kind">
                        {(fields) => (
                            <div style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}>
                                {fields.map((field) => (
                                    <Card size="small" key={field.key}>
                                        <Form.Item 
                                            label="Kind"
                                            name="kind"
                                            rules={[{ required: true, message: 'Vui lòng nhập tên kind!' }]}
                                        >
                                            <Input onChange={handleChangeKind} value={kind} />
                                        </Form.Item>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </Form.List>
                </Form>
            </Modal>
        </>
    );
}
