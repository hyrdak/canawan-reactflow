import React, { useEffect, useState } from 'react';

import { CloseOutlined, MinusCircleOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import { AutoComplete, Button, Card, Checkbox, Form, Input, message, Modal, Select, Space, Typography } from 'antd';
import Paragraph from 'antd/es/skeleton/Paragraph';
import { FormInstance } from 'antd/lib/form';

import databaseService from '../../../../../../databaseService';

interface DataType {
    id: number;
    name_type: string;
}

interface DataKind {
    id: number;
    name_kind: string;
}

interface DataElementType {
    id: number;
    props: any;
    name_elementType: string;
}

interface DataProps {
    value: string;
}
interface Props {
    propName: string;
    propValue: string;
}

interface Field {
    name: string;
    label: string;
    elementType: string;
    props: Props[];
}

const ModalCreateNode: React.FC = () => {
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const [dataType, setDataType] = useState<DataType[]>([]);
    const [dataKind, setDataKind] = useState<DataKind[]>([]);
    const [dataElementType, setDataElementType] = useState<DataElementType[]>([]);
    const [name, setName] = useState<string>("");
    const [type, setType] = useState<number>(0);
    const [kind, setKind] = useState<number>(0);
    const [textAreaValue, setTextAreaValue] = useState<string>("");
    const [options, setOptions] = useState<DataProps[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            setDataType(await databaseService.getType());
            setDataKind(await databaseService.getKind());
            setDataElementType(await databaseService.getElementType());
        };
        fetchData();
    }, []);
    console.log("hello world!");
    console.log("hee");


    const handleChangeEType = (value: string) => {
        dataElementType.map((item) => {
            if (value === item.name_elementType) {
                setOptions([]);
                item.props.map((itemprops: any) => {
                    setOptions(prevOptions => [...prevOptions, { value: itemprops.name }]);
                })
            }
        });
    };

    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleChangeType = (value: number) => {
        setType(value);
    };

    const handleChangeKind = (value: number) => {
        setKind(value);
    };

    const isJSONString = (str: string) => {
        try {
            JSON.parse(str);

            return true;
        } catch (error) {
            return false;
        }
    };



    const Add_Node = async () => {
        const fieldsValue = form.getFieldsValue()
        if (name && fieldsValue.op && type && kind) {
            if (fieldsValue.op && Array.isArray(fieldsValue.op)) {
                const updatedJson = fieldsValue.op.map((field: Field) => {
                    const newProps: { [key: string]: string } = {};
                    field.props.forEach((prop: Props) => {
                        newProps[prop.propName] = prop.propValue;
                    });

                    return {
                        ...field,
                        props: newProps
                    };;
                })
                if (updatedJson) {

                    console.log("Updated JSON:", updatedJson);
                    if (await databaseService.addNode(name, kind, type, updatedJson)) {
                        localStorage.setItem("flag_load", 'true');
                        message.success('Thêm thành công!');
                        window.location.href = '/nodes';
                    }
                } else {
                    message.error('Vui lòng nhập đúng định dạng json!');
                }
            }
            else {
                message.error('Thêm thất bại!');
            }
        } else {
            message.error('Vui lòng nhập đầy đủ thông tin!');
        }
    };

    return (
        <>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => setOpen(true)}>
                Create
            </Button>
            <Modal
                open={open}
                afterClose={() => form.resetFields()}
                title={'Create new node instance'}
                destroyOnClose
                onCancel={() => setOpen(false)}
                onOk={Add_Node}
            >
                <Form
                    form={form}
                    name="dynamic_form_complex"
                    style={{ maxWidth: 600 }}
                    autoComplete="off"
                    onFinish={Add_Node}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                    >
                        <Input onChange={handleChangeName} value={name} />
                    </Form.Item>
                    <Form.Item
                        label="Type"
                        name="type"
                    >
                        <Select onChange={handleChangeType}>
                            {dataType.map((item) => (
                                <Select.Option key={item.id} value={item.id}>{item.name_type}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Kind"
                        name="kind"
                    >
                        <Select onChange={handleChangeKind}>
                            {dataKind.map((item) => (
                                <Select.Option key={item.id} value={item.id}>{item.name_kind}</Select.Option>
                            ))}
                        </Select>
                        {/* <Checkbox></Checkbox> */}
                    </Form.Item>
                    <label>JSON Options:</label>
                    <Form.List name="op">
                        {(fields, { add, remove }) => (
                            <div style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}>
                                {fields.map((field) => (
                                    <Card
                                        size="small"
                                        title={`Option ${field.name + 1}`}
                                        key={field.key}
                                        extra={
                                            <CloseOutlined onClick={() => remove(field.name)} />
                                        }
                                    >
                                        <Form.Item
                                            {...field}
                                            name={[field.name, 'name']}
                                            label="Name"
                                        >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            {...field}
                                            name={[field.name, 'label']}
                                            label="Label"
                                            rules={[{ required: true, message: 'Please input the label!' }]}
                                        >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            {...field}
                                            name={[field.name, 'elementType']}
                                            label="Element Type"
                                            rules={[{ required: true, message: 'Please select the element type!' }]}
                                        >
                                            <Select onChange={handleChangeEType}>
                                                {dataElementType.map((item) => (
                                                    <Select.Option key={item.id} value={item.name_elementType}>{item.name_elementType}</Select.Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                        <label>Props:</label>
                                        <Form.List name={[field.name, 'props']}>
                                            {(nestedFields, { add: addNested, remove: removeNested }) => (
                                                <>
                                                    {nestedFields.map((nestedField) => (
                                                        <Space key={nestedField.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                                            <Form.Item
                                                                {...nestedField}
                                                                name={[nestedField.name, 'propName']}
                                                                fieldKey={[nestedField.key, 'propName']}
                                                                rules={[{ required: true, message: 'Please input the prop name!' }]}
                                                            >
                                                                <AutoComplete
                                                                    style={{ width: 200 }}
                                                                    options={options}
                                                                    placeholder="Prop Name"
                                                                    filterOption={(inputValue, option) =>
                                                                        option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                                                    }
                                                                />
                                                            </Form.Item>
                                                            <Form.Item
                                                                noStyle
                                                                shouldUpdate={(prevValues, currentValues) => {
                                                                    const prevItems = prevValues.items || [];
                                                                    const currentItems = currentValues.items || [];
                                                                    const prevPropName = prevItems[field.name]?.props?.[nestedField.name]?.propName;
                                                                    const currentPropName = currentItems[field.name]?.props?.[nestedField.name]?.propName;
                                                                    console.log(prevPropName);
                                                                    console.log(currentPropName);


                                                                    return prevPropName !== currentPropName;
                                                                }}
                                                            >
                                                                {({ getFieldValue }) => {
                                                                    const propName = getFieldValue(['items', field.name, 'props', nestedField.name, 'propName']);

                                                                    return propName === 'options' || propName === 'Options' ? (
                                                                        <Form.List name={[nestedField.name, 'nestedProps']}>
                                                                            {(deepNestedFields, { add: addDeepNested, remove: removeDeepNested }) => (
                                                                                <>
                                                                                    {deepNestedFields.map((deepNestedField) => (
                                                                                        <Space key={deepNestedField.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                                                                            <Form.Item
                                                                                                {...deepNestedField}
                                                                                                name={[deepNestedField.name, 'label']}
                                                                                                fieldKey={[deepNestedField.key, 'label']}
                                                                                                rules={[{ required: true, message: 'Please input the nested prop name!' }]}
                                                                                            >
                                                                                                <Input placeholder="Label" />
                                                                                            </Form.Item>
                                                                                            <Form.Item
                                                                                                {...deepNestedField}
                                                                                                name={[deepNestedField.name, 'value']}
                                                                                                fieldKey={[deepNestedField.key, 'value']}
                                                                                                rules={[{ required: true, message: 'Please input the nested prop value!' }]}
                                                                                            >
                                                                                                <Input placeholder="Value" />
                                                                                            </Form.Item>
                                                                                            <MinusCircleOutlined onClick={() => removeDeepNested(deepNestedField.name)} />
                                                                                        </Space>
                                                                                    ))}
                                                                                    <Form.Item>
                                                                                        <Button type="dashed" onClick={() => addDeepNested()} block icon={<PlusOutlined />}>
                                                                                            Add Options
                                                                                        </Button>
                                                                                    </Form.Item>
                                                                                </>
                                                                            )}
                                                                        </Form.List>
                                                                    ) : (
                                                                        <Form.Item
                                                                            {...nestedField}
                                                                            name={[nestedField.name, 'propValue']}
                                                                            fieldKey={[nestedField.key, 'propValue']}
                                                                            rules={[{ required: true, message: 'Please input the prop value!' }]}
                                                                        >
                                                                            <Input placeholder="Prop Value" />
                                                                        </Form.Item>
                                                                    );
                                                                }}
                                                            </Form.Item>
                                                            <CloseOutlined onClick={() => removeNested(nestedField.name)} />
                                                        </Space>
                                                    ))}
                                                    <Form.Item>
                                                        <Button type="dashed" onClick={() => addNested()} block icon={<PlusOutlined />}>
                                                            Add Prop
                                                        </Button>
                                                    </Form.Item>
                                                    <Form.Item noStyle shouldUpdate>
                                                        {() => (
                                                            <Typography>
                                                                <pre>
                                                                    {
                                                                        JSON.stringify(form.getFieldsValue(), null, 2)


                                                                    }
                                                                </pre>
                                                            </Typography>
                                                        )}
                                                    </Form.Item>
                                                </>
                                            )}
                                        </Form.List>
                                    </Card>
                                ))}
                                <Button type="dashed" onClick={() => add()} block>
                                    + Add Option
                                </Button>

                            </div>
                        )}
                    </Form.List>
                </Form>
            </Modal>
        </>
    );
};

export default ModalCreateNode;
