import React from 'react';

import { SearchOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useForm } from 'antd/es/form/Form';

interface Props {
    onSearch: (keyword: string) => void;
}

const FilterComponent = ({ onSearch }: Props) => {
    const [form] = useForm();

    const handleFinish = (values: any) => {
        onSearch(values.keyword);
    };

    return (
        <div>
            <Form form={form} onFinish={handleFinish}>
                <div className="flex justify-end gap-3">
                    <Form.Item name="keyword" className="w-[220px]">
                        <Input
                            placeholder="Nhập từ khóa"
                            onChange={(e) => onSearch(e.target.value)}
                        />
                    </Form.Item>
                </div>
            </Form>
        </div>
    );
};

export default FilterComponent;
