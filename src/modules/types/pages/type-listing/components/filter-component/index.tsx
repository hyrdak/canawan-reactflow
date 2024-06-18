import React, { useEffect } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';

import { SearchOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useForm } from 'antd/es/form/Form';

interface Props {
    onSearch: (keyword: string) => void;
}

const FilterComponent: React.FC<Props> = ({ onSearch }) => {
    const [form] = useForm();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Parse the keyword from the URL and set it to the form field
        const params = new URLSearchParams(location.search);
        const keywordParam = params.get('keyword') || '';
        form.setFieldsValue({ keyword: keywordParam });
    }, [location.search, form]);

    const handleFinish = (values: { keyword: string }) => {
        // Trigger search when form is submitted
        onSearch(values.keyword);
        // Update URL with the search keyword
        navigate(`?keyword=${values.keyword}`);
    };

    return (
        <div>
            <Form form={form} onFinish={handleFinish}>
                <div className="flex justify-end gap-3">
                    <Form.Item name="keyword" className="w-[220px]">
                        <Input placeholder="Enter name to search" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
                            Search
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </div>
    );
};

export default FilterComponent;
