import { useEffect,useState } from 'react';

import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, message,Modal, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';

import databaseService from '../../../../../../databaseService';

export default function ModalCreateKind() {
    const [form] = useForm();
    const [open, setOpen] = useState(false);

    const [kind, setKind] = useState<any>();

    const handleChangeKind = (value: React.ChangeEvent<HTMLInputElement>) => {
        setKind(value.target.value);
    }

    
    const Add_Kind = async () => {
        if( kind !== '' ) {
            if(await databaseService.addKind(kind)) {
                localStorage.setItem("flag_load", 'true');
                message.success('Thêm thành công!');
                setOpen(false);
            }else {
                message.error('Thêm thất bại!');
            }
        }else {
            message.error('Vui lòng nhập tên kind!');
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
                title={'Create new kind instance'}
                destroyOnClose
                onCancel={() => setOpen(false)}
                onOk={() => Add_Kind()}
            >
                <Form form={form}
                    layout="vertical"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    name="dynamic_form_complex"
                    style={{ maxWidth: 600 }}
                    autoComplete="off"
                    initialValues={{ kind: [{}] }}
                >
                    <Form.List name="kind">
                        {(fields, { add, remove }) => (
                            <div style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}>
                                {fields.map((field) => (
                                    <Card
                                        size="small"
                                        key={field.key}
                                    >
                                        <Form.Item label="Kind">
                                            <Input 
                                                onChange={handleChangeKind}
                                                value={kind}
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