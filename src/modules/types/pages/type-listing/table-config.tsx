import ReactJson from 'react-json-view';
import databaseService from 'databaseService';

import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, message,Popconfirm } from 'antd';

import ModalEditType from './components/Edit-types-modal';


interface GetTableColumnsConfigProps {}

async function handleDelete(id: any) {
    console.log(id);
    if(await databaseService.deleteType(id)) {
        message.success('Xóa thành công!');
        localStorage.setItem("flag_load", 'true');
    }else {
        message.error('Xóa thất bại!');
    }
}
export const getTableColumnsConfig = (props: GetTableColumnsConfigProps) => {
    const columnConfig: any[] = [
        {
            title: 'Id',
            key: 'id',
            dataIndex: 'id',
            width: 50,
            align: 'center',
            render: (_id: any, _record: any, index: number) => <span className="capitalize">{index+1}</span>
        },
        {
            title: 'Type',
            key: 'name_type',
            dataIndex: 'name_type',
            width: 500,
            render: (type: string) => <span className="capitalize">{type}</span>
        },
        {
          title: 'Actions',
          key: 'actions',
          width: 101,
          render: (text: string, record: any) => (
            <span>
              <ModalEditType id={record.id} nameType={record.name_type} />
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
