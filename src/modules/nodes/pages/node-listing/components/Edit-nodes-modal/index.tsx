import React, { useEffect, useState } from 'react';

import { CloseOutlined, EditOutlined, MinusCircleOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import { AutoComplete, Button, Card, Checkbox, Form, Input, message, Modal, Select, Space, Typography } from 'antd';
import Paragraph from 'antd/es/skeleton/Paragraph';
import { FormInstance } from 'antd/lib/form';
import { cloneDeep } from 'lodash';

import databaseService from '../../../../../../databaseService';




export default function ModalEditNode(e: any) {
    
    
    const dataJSON = e.json;
    const dataJSON_Log = e.jsonLog;
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);

    const [dataType, setDataType] = useState<Array<any>>([]);
    const [dataKind, setDataKind] = useState<Array<any>>([]);
    const [data, setData] = useState<Array<any>>([]);
    const [textAreaValue, setTextAreaValue] = useState<any>();
    const [name, setName] = useState<any>();
    const [type, setType] = useState(0);
    const [kind, setKind] = useState(0);

    useEffect(() => {
        const fetchDataType = async () => {
            setDataType(await databaseService.getType());
        };
        const fetchDataKind = async () => {
            setDataKind(await databaseService.getKind());
        };
        fetchDataType();
        fetchDataKind();
    }, []);

    const handleChangeName = (value: React.ChangeEvent<HTMLInputElement>) => {
        setName(value.target.value);
    }
    const handleChangeType = (value: number) => {
        setType(value);
    }
    const handleChangeKind = (value: number) => {
        setKind(value);
    }
    const handleChangeOptions = (value: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTextAreaValue(value.target.value);
    }

    //check json
    function isJSONString(str:any) {
        try {
            JSON.parse(str);
            
return true;
        } catch (error) {
            return false;
        }
    }

    const Edit_Node = async () => {
        console.log('edit');
        console.log(e.jsonLog);
    };


    function fetchData() {
        
        dataJSON.name_jsonoptions.map((item: any) => {
            // if(item.props[0] !== undefined) {
            //     Object.keys(item.props[0]).map((key: string) => {
            //         if(key == 'propName' || key == 'propValue') {
            //             console.log(key);
            //         } else {
            //             item.props = Object.entries(item.props).map(([propName, propValue]) => ({
            //                 propName,
            //                 propValue: propValue
            //             }));
            //         }
            //     });
            // } else {
            //     item.props = Object.entries(item.props).map(([propName, propValue]) => ({
            //         propName,
            //         propValue: propValue
            //     }));
            // }
            if(item.props[0] === undefined) {
                item.props = Object.entries(item.props).map(([propName, propValue]) => ({
                    propName,
                    propValue: propValue
                }));
            }
        });
    }

    return (
        <>
            <Button type="primary" className='mr-1' icon={<EditOutlined />} onClick={() => { setOpen(true); fetchData() }}></Button>
            <Modal
                open={open}
                afterClose={() => form.resetFields()}
                title={'Edit node instance'}
                destroyOnClose
                onCancel={() => setOpen(false)}
                onOk={Edit_Node}
            >
                <Form form={form}
                    layout="vertical"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    name="dynamic_form_complex"
                    style={{ maxWidth: 1200 }}
                    autoComplete="off"
                    onFinish={Edit_Node}
                >
                    <Form.Item
                        label="Name"
                        name="name"

                    >
                        <Input
                            defaultValue={dataJSON.name}
                            onChange={handleChangeName}
                            value={name}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Type"
                        name="type"
                    >
                        <Select
                            onChange={handleChangeType}
                            defaultValue={dataJSON.name_type}
                        >
                            {dataType.map((item) => (
                                <Select.Option key={item.id} value={item.id}>{item.name_type}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Kind"
                        name="kind"
                    >
                        <Select
                            onChange={handleChangeKind}
                            defaultValue={dataJSON.name_kind}
                        >
                            {dataKind.map((item) => (
                                <Select.Option key={item.id} value={item.id}>{item.name_kind}</Select.Option>
                            ))}
                        </Select>
                        {/* <Checkbox></Checkbox> */}
                    </Form.Item>
                    <label>JSON Options:</label>
                    <Form.List name="op" initialValue={dataJSON.name_jsonoptions}>
                        {(fields, { add, remove }) => (
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                {fields.map((field) => (
                                    <Card
                                        size="small"
                                        key={field.key}
                                    >
                                        <Form.Item label="Name">
                                            <Input 
                                                onChange={handleChangeName}
                                                value={e.json.name}
                                            />
                                        </Form.Item>
                                        <Form.Item label="Type">
                                            <Select onChange={handleChangeType} defaultValue={e.json.name_type}>
                                                {
                                                    dataType.map((item) =>
                                                        <Select.Option key={item.id} value={item.id}>{item.name_type}</Select.Option>
                                                    )
                                                }
                                            </Select>
                                        </Form.Item>

                                        <Form.Item label="Kind">
                                            <Select onChange={handleChangeKind} defaultValue={e.json.name_kind}>
                                                {
                                                    dataKind.map((item) =>
                                                        <Select.Option key={item.id} value={item.id}>{item.name_kind}</Select.Option>
                                                    )
                                                }
                                            </Select>
                                        </Form.Item>
                                        <Form.Item
                                            label="JSON Options"
                                            name="TextArea"
                                        >
                                            <Input.TextArea
                                                onChange={handleChangeOptions}
                                                defaultValue={JSON.stringify(e.json.name_jsonoptions)}
                                                rows={12}
                                                value='113'
                                            />
                                            {/* <ReactJson
                                                src={data[0].name_jsonoptions}
                                                collapsed={true}
                                                name={false}
                                                displayDataTypes={false}
                                            /> */}
                                        </Form.Item>
                                    </Card>

                                ))}
                                <Typography>
                                    <pre>
                                        {
                                            JSON.stringify(dataJSON_Log, null, 2)
                                        }
                                    </pre>
                                </Typography>
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