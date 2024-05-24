import { useEffect, useMemo, useState } from 'react';
import databaseService from 'databaseService';

import { ArrowLeftOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Form, Input, Table } from 'antd';

import { PageHeaderProvider } from 'components/core/page-header-provider';

import ModalCreateKind from './components/Create-kinds-modal';
// import FilterComponent from './components/filter-component';
import { getTableColumnsConfig } from './table-config';

const KindListingRoot = () => {
    const [data, setData] = useState<Array<any>>([]);
    const [search, setSearch] = useState('');
    const handleGetData = async () => {
        try {
            const result = await databaseService.getKind();
            setData(result);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        handleGetData();
    }, []);
    const filteredData = useMemo(() => {
        return data.filter(item =>
            item.name_kind.toLowerCase().includes(search.toLowerCase())
        );
    }, [search, data]);
    function refresh_kind(){
        try {
            localStorage.setItem("flag_load", 'true');
            handleGetData();
        
        } catch (error) {
            console.error('Lỗi khi reset:', error);
            
        }
    };
    if(ModalCreateKind() || getTableColumnsConfig({}))
        {
            refresh_kind();
        }
   
    const columns = getTableColumnsConfig({});
    
return (
        <div>
            <PageHeaderProvider extra={<ModalCreateKind />} />
            <div className='flex items-center'>
                <a className=' text-black' onClick={() => window.location.href = '/nodes'} >
                    <ArrowLeftOutlined /> Nodes
                </a>
                {/* <FilterComponent /> */}
                <div className="flex justify-end gap-3" style={{ marginLeft: 625 }}>
                    <Form.Item className="w-[220px]">
                        <Input placeholder="Enter keyword" value={search} onChange={e => setSearch(e.target.value)}></Input>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
                            Search
                        </Button>
                    </Form.Item>
                </div>
       
            </div>
            <Table dataSource={filteredData} columns={columns} bordered />
        </div> 
    );
};

export default KindListingRoot;
