import React, { useCallback, useEffect, useState } from 'react';

import { EditFilled } from '@ant-design/icons';
import { Button, Table } from 'antd';
import debounce from 'lodash/debounce';

import { useQueryGetNodes } from 'modules/nodes/data/use-query-node/index';
import { PageHeaderProvider } from 'components/core/page-header-provider';

import ModalCreateNode from './components/Create-edit-nodes-modal';
import FilterComponent from './components/filter-component';
import { getTableColumnsConfig } from './table-config';

const NodeListingRoot = () => {
    const { data, isFetching } = useQueryGetNodes();
    const [filteredData, setFilteredData] = useState(data);

    useEffect(() => {
        setFilteredData(data);
    }, [data]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleSearch = useCallback(
        debounce((keyword) => {
            if (!keyword) {
                setFilteredData(data);
            } else {
                const filtered = data.filter((item: any) =>
                    item.name.toLowerCase().includes(keyword.toLowerCase())
                );
                setFilteredData(filtered);
            }
        }, 300),
        [data]
    );


    const columns = getTableColumnsConfig({});

    return (
        <div>
            <PageHeaderProvider extra={<ModalCreateNode record={undefined} />} />
            <div>
                <FilterComponent onSearch={handleSearch} />
                <Button
                    type="primary"
                    icon={<EditFilled />}
                    onClick={() => window.location.href = '/types'}
                    className='ml-auto'
                >
                    Type
                </Button>
                <Button
                    type="primary"
                    icon={<EditFilled />}
                    onClick={() => window.location.href = '/kinds'}
                    className='ml-2 mb-2'
                >
                    Kind
                </Button>
            </div>
            <Table loading={isFetching} dataSource={filteredData} columns={columns} bordered />
        </div>
    );
};

export default NodeListingRoot;
