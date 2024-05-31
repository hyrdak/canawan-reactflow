import { useEffect, useMemo, useState } from 'react';
import databaseService from 'databaseService';

import { EditFilled, ReloadOutlined } from '@ant-design/icons';
import { Button, Table } from 'antd';

import { PageHeaderProvider } from 'components/core/page-header-provider';

import ModalCreateNode from './components/Create-nodes-modal';
import getTableColumnsConfig from './table-config';

const NodeListingRoot = () => {
    const [data, setData] = useState<Array<any>>();

    const getListNodes = async () => {
        const nodes = await databaseService.getDataNodeList();
        setData(nodes);
    }

    useEffect(() => {
        getListNodes();
    }, []);

    const columns = getTableColumnsConfig();
    
    return (
        <div style={{}}>
            {/* <PageHeaderProvider extra={<ModalCreateReactFlow listDnd={listDnd} onCreated={handleCreated} />} /> */}
            <PageHeaderProvider extra={<ModalCreateNode />} />
            <Button
                type="primary"
                icon={<EditFilled />}
                onClick={() => window.location.href = '/types'}
                className='ml-auto'
                >Type
            </Button>
            <Button
                type="primary"
                icon={<EditFilled />}
                onClick={() => window.location.href = '/kinds'}
                className='ml-2 mb-2'
                >Kind
            </Button>
            {
                data? (
                    <Table dataSource={data} columns={columns} bordered />
                ):''
            }
        </div>
    );
};

export default NodeListingRoot;