import { useEffect, useState } from 'react';
import databaseService from 'databaseService';

import { SwapLeftOutlined } from '@ant-design/icons';
import { Button, Table } from 'antd';

import ModalCreateNode from './components/Create-types-modal';
import FilterComponent from './components/filter-component';
import  {getTableColumnsConfig}  from './table-config';

const TypeListingRoot = () => {
    const [data, setData] = useState<any[]>([]);
    const [filteredData, setFilteredData] = useState<any[]>([]);
    const [searchError, setSearchError] = useState<boolean>(false);
    


   

    const fetchData = async () => {
        try {
            const fetchedData = await databaseService.getType();
            setData(fetchedData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    function refresh_type(){
        try {
            localStorage.setItem("flag_load", 'true');
            fetchData();
        
        } catch (error) {
            console.error('Lỗi khi reset:', error);
            
        }
    };
    if(ModalCreateNode() || getTableColumnsConfig({}))
        {
            refresh_type();
        }
    const handleSearch = (keyword: string) => {
        const filteredResults = data.filter(item =>
            item.name_type.toLowerCase().includes(keyword.toLowerCase())
        );
        setFilteredData(filteredResults);
        setSearchError(filteredResults.length === 0);
    };

    const columns = getTableColumnsConfig({ data });

    return (
        <div>
            <ModalCreateNode />
            <div className='mb-2'>
                <a className=' text-black' onClick={() => window.location.href = '/nodes'} >
                    <SwapLeftOutlined /> Nodes
                </a>
            </div>              
            <FilterComponent onSearch={handleSearch} />
            {searchError && <div>No matching data found</div>}
            <Table dataSource={filteredData.length > 0 ? filteredData : data} columns={columns} bordered />
           
        </div>
    );
    
};

export default TypeListingRoot;
