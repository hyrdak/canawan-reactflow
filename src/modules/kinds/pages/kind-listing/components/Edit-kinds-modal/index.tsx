import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import databaseService from 'databaseService';

import { EditOutlined } from '@ant-design/icons';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Button, Form, Input, message, Modal } from 'antd';


const supabaseUrl = 'https://ismbrwqkcootieaguzwa.supabase.co';
const supabaseAPIKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlzbWJyd3FrY29vdGllYWd1endhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI1NTQyNDcsImV4cCI6MjAyODEzMDI0N30.fEo-ddluC6l2HNPqIjcHBFHTYdIWoE8vjfjIX9KPbPI';
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAPIKey);

const ModalEditKind = ({ id, name_kind }: { id: string, name_kind: string }) => {
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const [kind, setKind] = useState<string>(name_kind);

    const handleSubmit = async () => {
        if (!id) {
            message.error('Không tìm thấy ID để cập nhật.');
            
return;
        }
        if(!kind)
            {
                message.error('Vui lòng nhập tên kind');
                
return;
            }
        try {
            await databaseService.updateKind(id, kind);
            message.success('Cập nhật thành công!');
            setKind(name_kind);
            setOpen(false);
        } catch (error) {
            message.error(`Cập nhật thất bại! Lỗi: ${error}`);
            console.error(error);
        }
    };
    const handleCancel = () => {
        setKind(name_kind);
        setOpen(false);
    };
    const handleChangeKind = (e:any) => {
        setKind(e.target.value);
    };
    
return (
        <>
            <Button
                type="primary"
                className='mr-1'
                icon={<EditOutlined />}
                onClick={() => setOpen(true)}
            >
            </Button>
            <Modal
                open={open}
                afterClose={() => form.resetFields()}
                title="Chỉnh sửa tên loại"
                destroyOnClose
                onCancel={handleCancel}
                onOk={handleSubmit}
                afterOpenChange={()=>form.resetFields()}
            >
                <Form
                    form={form}
                    layout="vertical"
                    initialValues={{  kind:name_kind }}
                    name="edit_kind_form"
                    style={{ maxWidth: 600 }}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Tên"
                        name="kind"
                        rules={[{ required: true, message: 'Vui lòng nhập tên kind!' }]}
                    >
                        <Input
                            onChange={handleChangeKind}
                            value={kind}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};


export default ModalEditKind;