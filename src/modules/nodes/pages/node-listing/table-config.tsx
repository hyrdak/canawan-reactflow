import ReactJson from 'react-json-view';
import databaseService from 'databaseService';

import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, message, Popconfirm } from 'antd';
import cloneDeep from 'lodash/cloneDeep';

import ModalEditNode from './components/Edit-nodes-modal';

function handleEdit(record: any): void {
    console.log(record);
    
}

async function handleDelete(id: any) {
    if(await databaseService.deleteNodeByID(id)) {
        message.success('Success!');
        localStorage.setItem("flag_load", 'true');
        setTimeout(() => {window.location.href = '/nodes';}, 1000);
    }
}
export const getTableColumnsConfig = () => {
    const columnConfig: any[] = [
        {
            title: '#',
            key: 'id',
            dataIndex: 'id',
            width: 10,
            align: 'center',
            render: (_id: string, _record: any, index: number) => <span className="capitalize">{index + 1}</span>
        },
        {
            title: 'Name',
            key: 'name',
            dataIndex: 'name',
            width: 150
        },
        {
            title: 'Type',
            key: 'name_type',
            dataIndex: 'name_type',
            width: 100
        },
        {
            title: 'Kind',
            key: 'name_kind',
            dataIndex: 'name_kind',
            width: 100,
            render: (kind: string) => <span className="capitalize">{kind}</span>
        },
        {
            title: 'JSON Options',
            key: 'name_jsonoptions',
            dataIndex: 'name_jsonoptions',
            render: (name_jsonoptions: any) => {
                return (
                    <ReactJson
                        // theme={'paraiso'}
                        name={false}
                        src={name_jsonoptions}
                        displayDataTypes={false}
                        collapsed
                        style={{
                            maxHeight: '80vh',
                            overflow: 'auto'
                        }}
                    />
                );
            }
        },
        {
          title: 'Actions',
          key: 'actions',
          width: 180,
          render: (text: string, record: any) => (
            <span>
                {/* <Button type="primary" className='mr-1' icon={<EditOutlined />} onClick={() => {}}></Button> */}
              <ModalEditNode json={cloneDeep(record)} jsonLog={cloneDeep(record)} />
              <Popconfirm
                title="Are you sure to delete this type?"
                onConfirm={() => handleDelete(record.id)}
                okText="Yes"
                cancelText="No"
              >
                <Button type="primary" danger icon={<DeleteOutlined />}></Button>
              </Popconfirm>
            </span>
          ),
        },
    ];

    return columnConfig;
};