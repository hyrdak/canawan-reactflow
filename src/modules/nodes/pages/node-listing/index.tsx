
import { EditFilled } from '@ant-design/icons';
import { Button, Table } from 'antd';

import { useQueryGetNodes } from 'modules/nodes/data/use-query-node/index'
import { PageHeaderProvider } from 'components/core/page-header-provider';

import ModalCreateNode from './components/Create-edit-nodes-modal';
import { getTableColumnsConfig } from './table-config';

const NodeListingRoot = () => {
    const { data, isFetching } = useQueryGetNodes();

    const columns = getTableColumnsConfig({});

    return (
        <div style={{}}>
            <PageHeaderProvider extra={<ModalCreateNode record={undefined} />} />
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
            <Table loading={isFetching} dataSource={data} columns={columns} bordered />
        </div>
    );
};

export default NodeListingRoot;