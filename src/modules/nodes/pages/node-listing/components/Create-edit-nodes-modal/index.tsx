import React, { useEffect, useState } from 'react';
import { QUERY_KEYS } from 'constants-es';

import { CloseOutlined, EditOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import { AutoComplete, Button, Card, Form, Input, message, Modal, Select, Space } from 'antd';

import { useMutationCreateNode } from 'modules/nodes/data/use-mutation-create-node';

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
    propsCheck: object;
}
interface ModalEditNodeProps {
    record: any;
}

const ModalCreateNode: React.FC<ModalEditNodeProps> = ({ record }) => {
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const [dataType, setDataType] = useState<DataType[]>([]);
    const [dataKind, setDataKind] = useState<DataKind[]>([]);
    const [dataElementType, setDataElementType] = useState<DataElementType[]>([]);
    const [options, setOptions] = useState<DataProps[]>([]);
    const [checkedProps, setCheckedProps] = useState<any[]>([]);
    const [propsCache, setPropsCache] = useState<{ [key: string]: Props[] }>({});

    const queryClient = useQueryClient();
    const mutationCreateNode = useMutationCreateNode();
    const loading = mutationCreateNode.isPending;

    useEffect(() => {
        const fetchData = async () => {
            setDataType(await databaseService.getType());
            setDataKind(await databaseService.getKind());
            setDataElementType(await databaseService.getElementType());
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (record) {
            form.setFieldsValue({
                name: record.name,
                type: record.name_type,
                kind: record.name_kind,
                jsons: record.name_jsonoptions.map((item: any, index: number) => {
                    if (item.props[0] === undefined) {
                        item.props = Object.entries(item.props).map(([propName, propValue]) => ({
                            propName,
                            propValue: propValue
                        }));
                    }
                    // Lưu trữ props hiện tại vào cache
                    setPropsCache(prevCache => ({
                        ...prevCache,
                        [`${item.name}-${index}`]: item.props
                    }));
                    return item;
                })
            });
        }
    }, [open, record, form]);

    const afterClose = () => {
        if (!record) {
            form.resetFields();
        } else {
            form.setFieldsValue({
                name: record.name,
                type: record.name_type,
                kind: record.name_kind,
                jsons: record.name_jsonoptions,
            });
        }
    };

    const handleChangeEType = (value: string, fieldIndex: number) => {
        const elementType = dataElementType.find(item => item.name_elementType === value);
        if (elementType) {
            const newOptions = elementType.props.map((itemprops: any) => ({ value: itemprops.name }));
            setOptions(newOptions);
            setCheckedProps(elementType.props);

            const fieldsValue = form.getFieldsValue();
            const cacheKey = `${value}-${fieldIndex}`;
            const currentProps = propsCache[cacheKey] || [];

            const updatedProps = elementType.props.map((prop: any) => {
                const existingProp = currentProps.find((p: Props) => p.propName === prop.name);
                return {
                    propName: prop.name,
                    propValue: existingProp ? existingProp.propValue : ''
                };
            });

            fieldsValue.jsons[fieldIndex].props = updatedProps;
            form.setFieldsValue(fieldsValue);

            setPropsCache(prevCache => ({
                ...prevCache,
                [cacheKey]: updatedProps
            }));
        }
    };

    const handleEditCreateNodes = async (value: any) => {
        if (record) {
            if (record.name_type === value.type) {
                const selectedType = dataType.find((type) => type.name_type === value.type);
                if (!selectedType) {
                    message.error('Invalid type!');
                    return;
                }
                value.type = selectedType.id;
            }
            if (record.name_kind === value.kind) {
                const selectedKind = dataKind.find((kind) => kind.name_kind === value.kind);
                if (!selectedKind) {
                    message.error('Invalid kind!');
                    return;
                }
                value.kind = selectedKind.id;
            }
        }

        let updatedJson: any[] = []
        if (value.jsons !== undefined) {
            const updatedJsons = value.jsons.map((field: Field) => {
                const newProps: { [key: string]: string } = {};
                if (Array.isArray(field.props)) {
                    field.props.forEach((prop: Props) => {
                        newProps[prop.propName] = prop.propValue;
                    });
                }
                const propsCheck = field.propsCheck || {};
                const combinedProps = { ...propsCheck, ...newProps };
                const { propsCheck: ignored, ...restOfField } = field;
                return {
                    ...restOfField,
                    props: combinedProps,
                };
            });
            updatedJson = updatedJsons;
        } else {
            updatedJson = [];
        }

        if (record) {
            const success = await databaseService.updateNode(record.id, value.name, value.kind, value.type, updatedJson);
            if (success) {
                message.success('Updated Node Success!');
                setOpen(false);
                queryClient.invalidateQueries({
                    queryKey: [QUERY_KEYS.NODES]
                });
            } else {
                message.error('Updated Node Failed!');
            }
        } else {
            const success = await databaseService.addNode(value.name, value.kind, value.type, updatedJson);
            if (success) {
                message.success('Create Node Success!');
                setOpen(false);
                queryClient.invalidateQueries({
                    queryKey: [QUERY_KEYS.NODES]
                });
            } else {
                message.error('Create Node Failed!');
            }
        }
    };

    return (
        <>
            <Button type="primary" icon={record ? <EditOutlined /> : <PlusOutlined />} onClick={() => setOpen(true)}>
                {record ? '' : 'Create'}
            </Button>
            <Modal
                open={open}
                title={record ? 'Edit node instance' : 'Create new node instance'}
                confirmLoading={loading}
                onCancel={() => setOpen(false)}
                onOk={() => form.submit()}
                style={{ minWidth: '80%', maxWidth: '90%' }}
                afterClose={afterClose}
                destroyOnClose
            >
                <Form
                    form={form}
                    name="dynamic_form_complex"
                    style={{ maxWidth: 800, display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '20px' }}
                    autoComplete="off"
                    onFinish={handleEditCreateNodes}
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
                                    min: 2
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
                        >
                            <Select>
                                {dataType.map((item) => (
                                    <Select.Option key={item.id} value={item.id}>{item.name_type}</Select.Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Kind"
                            name="kind"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter a kind"
                                }
                            ]}
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
                                    <div>
                                        {fields.map((field, index) => (
                                            <Card key={field.key} type='inner' title={`Option ${field.key + 1}`} extra={<CloseOutlined onClick={() => remove(field.name)} />}>
                                                <Form.Item
                                                    {...field}
                                                    name={[field.name, 'name']}
                                                    label="Name"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: "Please enter a name"
                                                        }
                                                    ]}
                                                >
                                                    <Input placeholder="Name" />
                                                </Form.Item>
                                                <Form.Item
                                                    {...field}
                                                    name={[field.name, 'label']}
                                                    label="Label"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: "Please enter a Label"
                                                        }
                                                    ]}
                                                >
                                                    <Input placeholder="Label" />
                                                </Form.Item>
                                                <Form.Item
                                                    {...field}
                                                    name={[field.name, 'elementType']}
                                                    label="Element Type"
                                                    rules={[{ required: true, message: 'Please select the element type!' }]}
                                                >
                                                    <Select onChange={(value) => handleChangeEType(value, field.name)}>
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
