import { useEffect, useMemo, useState } from 'react';
import databaseService from 'databaseService';

import { EditFilled, ReloadOutlined } from '@ant-design/icons';
import { Button, Table } from 'antd';
import { flatten } from 'lodash';

import { dataCommandModal } from 'components/common/react-flows/components/nodes/data';
import { getListCommandNode } from 'components/common/react-flows/constants';
import { COMMAND_NODE_LABELS, CommandNode, KindNode } from 'components/common/react-flows/constants/enum';
import { PageHeaderProvider } from 'components/core/page-header-provider';

import ModalCreateNode from './components/Create-nodes-modal';
import { getTableColumnsConfig } from './table-config';

const NodeListingRoot = () => {
    const [listDnd, setListDnd] = useState<any>([]);
    const [data, setData] = useState<Array<any>>();

    const getListNodes = async () => {
        const nodes = await databaseService.getDataNodeList();
        setData(nodes);
    }

    const refresh_nodes = async () => {
        localStorage.setItem("flag_load", 'true');
        getListNodes();
    }

    const handleCreated = (data: any) => {
        const newListDnd = [...listDnd, data];
        setListDnd(newListDnd);
        localStorage.setItem('listReactFlowInstance', JSON.stringify(newListDnd));
    };

    useEffect(() => {
        getListNodes();
    }, []);

    const handleRemove = (item: any) => {
        const newListDnd = listDnd.filter((i: any) => i.id !== item.id);
        setListDnd(newListDnd);
        localStorage.setItem('listReactFlowInstance', JSON.stringify(newListDnd));
    };

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
                data !== null? (
                    <Table dataSource={data} columns={columns} bordered />
                ):''
            }
            <center>
                <Button
                    icon={<ReloadOutlined />}
                    onClick={() => refresh_nodes()}
                    className='text-center mb-5'
                    >Refresh
                </Button>
            </center>
        </div>
    );
};

export default NodeListingRoot;