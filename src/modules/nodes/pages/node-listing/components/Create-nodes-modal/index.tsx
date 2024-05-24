import React, { useEffect, useState } from 'react';

import { CloseOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { AutoComplete, Button, Card, Form, Input, message, Modal, Select, Space, Typography } from 'antd';

import databaseService from '../../../../../../databaseService';

interface DataType {
    id: number;
    name_type: string;
}
interface po { }
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
    propsCheck: object;
}

const ModalCreateNode: React.FC = () => {
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const [dataType, setDataType] = useState<DataType[]>([]);
    const [dataKind, setDataKind] = useState<DataKind[]>([]);
    const [dataElementType, setDataElementType] = useState<DataElementType[]>([]);
    const [options, setOptions] = useState<DataProps[]>([]);
    const [checkedProps, setCheckedProps] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            setDataType(await databaseService.getType());
            setDataKind(await databaseService.getKind());
            setDataElementType(await databaseService.getElementType());
        };
        fetchData();
    }, []);

    const handleChangeEType = (value: string) => {
        dataElementType.map((item) => {
            if (value === item.name_elementType) {
                setOptions([]);
                item.props.map((itemprops: any) => {
                    setOptions(prevOptions => [...prevOptions, { value: itemprops.name }]);
                })
                setCheckedProps(item.props);
            }
        });
    };

    const Add_Node = async (value: any) => {
        if (value.name && value.jsons && value.type && value.kind) {
            if (value.jsons && Array.isArray(value.jsons)) {
                const updatedJson = value.jsons.map((field: Field) => {
                    const newProps: { [key: string]: string } = {};
                    field.props.forEach((prop: Props) => {
                        newProps[prop.propName] = prop.propValue;
                    });
                    const combinedProps = { ...field.propsCheck, ...newProps }
                    const { propsCheck, ...restOfField } = field;

                    return {
                        ...restOfField,
                        props: combinedProps
                    };
                })
                if (updatedJson) {
                    console.log("Updated JSON:", updatedJson);
                    if (await databaseService.addNode(value.name, value.kind, value.type, updatedJson)) {
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
                onOk={() => form.submit()}
                style={{ minWidth: '80%', maxWidth: '90%' }}
            >
                <Form
                    form={form}
                    name="dynamic_form_complex"
                    style={{ maxWidth: 800, display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' }}
                    autoComplete="off"
                    onFinish={Add_Node}
                    initialValues={{ remember: true }}
                    layout='vertical'
                >
                    <div>
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter a name"
                                },
                                {
                                    whitespace: true,
                                    min: 4
                                }
                            ]}
                            hasFeedback
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Type"
                            name="type"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter a Type"
                                }
                            ]}
                            hasFeedback
                        >
                            <Select >
                                {dataType.map((item) => (
                                    <Select.Option key={item.id} value={item.id}>{item.name_type}</Select.Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Kind"
                            name="kind"
                        >
                            <Select>
                                {dataKind.map((item) => (
                                    <Select.Option key={item.id} value={item.id}>{item.name_kind}</Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </div>
                    <div>

                        <Form.Item
                            label="JSON Options"
                            style={{ maxHeight: '350px', overflowY: 'auto' }}
                        >
                            <Form.List name="jsons">
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
                                                {checkedProps &&
                                                    checkedProps.map((prop: any, i: number) => {
                                                        if (prop.checked === 'true') {
                                                            return (
                                                                <Form.Item key={i} label={prop.name} name={[field.name, 'propsCheck', `${prop.name}`]}>
                                                                    <Input />
                                                                </Form.Item>

                                                            );
                                                        }
                                                    })}
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
                        </Form.Item>
                    </div>
                </Form>
            </Modal>
        </>
    );
};

export default ModalCreateNode;
