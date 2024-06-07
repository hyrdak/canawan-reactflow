import { Link } from 'react-router-dom';
import { ROUTE_PATHS } from 'constants-es';
import databaseService from 'databaseService';

import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, message, Popconfirm, Popover } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { BsThreeDots } from 'react-icons/bs';

import { dataCommandModal } from 'components/common/react-flows/components/nodes/data';

import ExportData from './components/modal-preview-export-data';

interface GetTableColumnsConfigProps {
    isSmallScreen: boolean;
}

export const getTableColumnsConfig = ({ isSmallScreen }: GetTableColumnsConfigProps) => {
    const columnConfig: ColumnsType<any> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Nodes',
            dataIndex: ['script', 'nodes'],
            key: 'description',
            render: (nodes: any) => {
                return nodes?.length;
            }
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            width: 220,

            render: (_: any, record: any) => {
                async function handleDelete(id: any) {
                    if(await databaseService.deleteWorkflow(id)) {
                        message.success('Success!');
                        setTimeout(() => {window.location.href = '/work-flows';}, 1000)
                    }
                }

                return isSmallScreen ? (
                    <Popover
                        content={
                            <div className="flex gap-2">
                                <Link to={ROUTE_PATHS.WORK_FLOWS + '/' + record.id}>
                                    <Button icon={<EditOutlined />} type="primary"></Button>
                                </Link>
                                <ExportData currentData={record} />
                                <Popconfirm
                                    title="Are you sure to delete this type?"
                                    onConfirm={() => handleDelete(record.id)}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Button type="primary" danger icon={<DeleteOutlined />}></Button>
                                </Popconfirm>
                            </div>
                        }
                        placement="bottom"
                        trigger="click"
                    >
                        <Button
                            type="default"
                            icon={
                                <BsThreeDots
                                    style={{
                                        verticalAlign: 'middle'
                                    }}
                                />
                            }
                        ></Button>
                    </Popover>
                ) : (
                    <div className="flex gap-2">
                        <Link to={ROUTE_PATHS.WORK_FLOWS + '/' + record.id}>
                            <Button icon={<EditOutlined />} type="primary"></Button>
                        </Link>
                        <ExportData currentData={record} />
                        <Popconfirm
                            title="Are you sure to delete this type?"
                            onConfirm={() => handleDelete(record.id)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button type="primary" danger icon={<DeleteOutlined />}></Button>
                        </Popconfirm>
                    </div>
                );
            }
        }
    ];

    return columnConfig;
};
