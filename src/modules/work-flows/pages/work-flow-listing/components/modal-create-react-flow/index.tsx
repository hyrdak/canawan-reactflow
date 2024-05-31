import { useState } from 'react';
import { QUERY_KEYS } from 'constants-es';
import { useAppSelector } from 'libs/redux';

import { PlusOutlined } from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import { Button, Form, Input, message, Modal } from 'antd';
import { useForm } from 'antd/es/form/Form';

import { useMutationCreateWorkflow } from 'modules/work-flows/data/queries';
import { initialNodes } from 'components/common/react-flows/constants';

import databaseService from '../../../../../../databaseService';

export const ModalCreateReactFlow = () => {
    const [form] = useForm();
    const [open, setOpen] = useState(false);
    // const { user } = useAppSelector((state) => state.auth);
    const queryClient = useQueryClient();

    const mutationCreateWorkflow = useMutationCreateWorkflow();
    const loading = mutationCreateWorkflow.isPending;

    const handleSubmit = async (values: any) => {
        const date = new Date();
        const inputDateString = date.toISOString();
        const offsetHours = 7;
        const inputDate = new Date(inputDateString);
        inputDate.setHours(inputDate.getHours() + offsetHours);
        const outputDateString = inputDate.toISOString().replace('Z', '+00:00');
        const user = '052af095-729f-442c-b3d7-df4814a6ffef';
        const script = {
            edges: [],
            nodes: initialNodes
        }
        const flag = await databaseService.createWorkflow(values.name,outputDateString,user,script)
        if(flag) {
            message.success('Create new react flow instance successfully');
            setOpen(false);
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.WORKFLOWS]
            });
        } else {
            message.error("Error");
            setOpen(false);
        }
        
        
        
        


        // const dataCreated = {
        //     name: values.name,
            
        //     userId: user?.id
        // };
        // mutationCreateWorkflow.mutate(dataCreated, {
        //     onSuccess: (response: any) => {
        //         if (response.success) {
                    
                    
        //         } else {
                    
        //         }
        //     }
        // });

    };

    return (
        <>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => setOpen(true)}>
                Create
            </Button>
            <Modal
                open={open}
                confirmLoading={loading}
                afterClose={() => form.resetFields()}
                title={'Create new react flow instance'}
                destroyOnClose
                onCancel={() => setOpen(false)}
                onOk={() => form.submit()}
            >
                <Form form={form} onFinish={handleSubmit} layout="vertical">
                    <Form.Item
                        name={'name'}
                        rules={[
                            {
                                required: true,
                                whitespace: true,
                                message: 'Please input name workflows!'
                            }
                        ]}
                    >
                        <Input placeholder="Name" />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};
