import ReactJson from 'react-json-view';
import databaseService from 'databaseService';

import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, message,Pagination,Popconfirm } from 'antd';

import ModalEditKind from './components/Edit-kinds-modal';


interface GetTableColumnsConfigProps {}

async function handleDelete(id: any) {
    console.log(id);
    if(await databaseService.deleteKind(id)) {
        message.success('Xóa thành công!');
        localStorage.setItem("flag_load", 'true');
        // window.location.href = '/kinds';
    }else {
        message.error('Xóa thất bại!');
    }
}
export const getTableColumnsConfig = (props: GetTableColumnsConfigProps) => {
    const columnConfig: any[] = [
        {
            title: 'Kind',
            key: 'name_kind',
            dataIndex: 'name_kind',
            width: 500,
            render: (kind: string) => <span className="capitalize">{kind}</span>
        },
        {
          title: 'Actions',
          key: 'actions',
          width: 101,
          render: (text: string, record: any) => (
            <span>
              <ModalEditKind id={record.id} name_kind={record.name_kind} />
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