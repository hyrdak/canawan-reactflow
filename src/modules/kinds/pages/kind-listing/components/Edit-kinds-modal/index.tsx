import { useEffect, useState } from 'react';
import ReactJson from 'react-json-view';

import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, message, Modal, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';

import databaseService from '../../../../../../databaseService';




export default function ModalEditKind(e: any) {
    const [form] = useForm();
    const [open, setOpen] = useState(false);

    const [kind, setKind] = useState<any>();

    const handleChangeKind = (value: React.ChangeEvent<HTMLInputElement>) => {
        setKind(value.target.value);
    }

    const EditKind = async () => {
        if (kind !== '') {
            if (true) {
                message.success('Sửa thành công!');
                window.location.href = '/kinds';
            } else {
                message.error('Sửa thất bại!');
            }
        } else {
            message.error('Vui lòng nhập tên Kind!');
        }
    }

    const fetchData = async () => {
        console.log(e.val);
    }

    return (
        <>
            <Button type="primary" className='mr-1' icon={<EditOutlined />} onClick={() => { setOpen(true); fetchData() }}></Button>
            <Modal
                open={open}
                afterClose={() => form.resetFields()}
                title={'Edit name kind instance'}
                destroyOnClose
                onCancel={() => setOpen(false)}
                onOk={() => EditKind()}

            >
                <Form form={form}
                    layout="vertical"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    name="dynamic_form_complex"
                    style={{ maxWidth: 1200 }}
                    autoComplete="off"
                    initialValues={{ node: [{}] }}
                >
                    <Form.List name="node">
                        {(fields, { add, remove }) => (
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                {fields.map((field) => (
                                    <Card
                                        size="small"
                                        key={field.key}
                                    >
                                        <Form.Item label="Name">
                                            <Input
                                                onChange={handleChangeKind}
                                                value={e.name_kind}
                                            />
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
};