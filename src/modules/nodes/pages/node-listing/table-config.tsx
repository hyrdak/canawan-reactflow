import ReactJson from 'react-json-view';
import databaseService from 'databaseService';

import { Popover } from 'antd';

import ButtonDelete from './components/button-delete-node'
import ModalCreateNode from './components/Create-edit-nodes-modal';


interface GetTableColumnsConfigProps { }

export const getTableColumnsConfig = (props: GetTableColumnsConfigProps) => {
    const columnConfig: any[] = [
        {
            title: '#',
            key: 'id',
            dataIndex: 'id',
            width: 50,
            align: 'center',
            render: (_id: string, _record: any, index: number) => <span className="capitalize">{index + 1}</span>
        },
        {
            title: 'Name',
            key: 'name',
            dataIndex: 'name',
            width: 200
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
            width: 101,
            render: (text: string, record: any) => (
                <Popover
                    placement="bottom"
                    trigger="click"
                >
                    <div className="flex gap-2">
                        <ModalCreateNode record={record} />
                        <ButtonDelete data={record} />
                    </div>
                </Popover>
            ),
        },
    ];

    return columnConfig;
};