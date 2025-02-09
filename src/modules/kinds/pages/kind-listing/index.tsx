import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
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
    const [query, setQuery] = useState('');
    const [currentpage, setCurrentPage] = useState(1);

    const fetchData = async (searchParam = '', page = 1) => {
        try {
            let result;
            if (searchParam) {
                const url = `/kinds?search=${searchParam}&page=${page}`;
                const response = await axios.get(url);
                result = response.data;
            } else {
                result = await databaseService.getKind();
            }
            setData(result);
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };

    const refresh_kind = () => {
        try {
            localStorage.setItem("flag_load", 'true');
            fetchData();
        } catch (error) {
            console.error('Lỗi khi reset:', error);
        }
    }

    if(ModalCreateKind() || getTableColumnsConfig({})) {
        refresh_kind();
    }

    useEffect(() => {
        // Lấy từ khóa tìm kiếm và trang hiện tại từ URL khi component mount
        const urlParams = new URLSearchParams(window.location.search);
        const searchParam = urlParams.get('search');
        const pageParam = urlParams.get('page');
        const page = pageParam ? parseInt(pageParam) : 1;
        setCurrentPage(page);
        
        if (searchParam) {
            setSearch(searchParam);
            setQuery(searchParam);
            fetchData(searchParam, page);
        } else {
            fetchData('', page);
        }

        // Lắng nghe sự kiện popstate
        const handlePopState = () => {
            const urlParams = new URLSearchParams(window.location.search);
            const searchParam = urlParams.get('search');
            const pageParam = urlParams.get('page');
            const page = pageParam ? parseInt(pageParam) : 1;
            setCurrentPage(page);

            if (searchParam) {
                setSearch(searchParam);
                setQuery(searchParam);
                fetchData(searchParam, page);
            } else {
                setSearch('');
                setQuery('');
                fetchData('', page);
            }
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, []);

    const handleSearch = async () => {
        setQuery(search);
        setCurrentPage(1); // Trang hiện tại = 1 khi tìm kiếm
        const url = `/kinds?search=${search}&page=1`;
        console.log(`Sending request to: ${url}`);
        try {
            // Thay đổi URL trong trình duyệt mà không làm tải lại trang
            window.history.pushState({}, '', url);

            // Tiếp tục xử lý yêu cầu API như bình thường
            const response = await axios.get(url);
            setData(response.data);
        } catch (error) {
            console.error('Error searching:', error);
        }
    };

    const handleTableChange = (pagination: any) => {
        const newPage = pagination.current;
        setCurrentPage(newPage);
        const urlParams = new URLSearchParams(window.location.search);
        const searchParam = urlParams.get('search');
        const url = searchParam ? `/kinds?search=${searchParam}&page=${newPage}` : `/kinds?page=${newPage}`;
        window.history.pushState({}, '', url);
        fetchData(searchParam || '', newPage);
    };

    const filteredData = useMemo(() => {
        return data.filter(item =>
            item.name_kind.toLowerCase().includes(query.toLowerCase())
        );
    }, [query, data]);

    const columns = [
        {
            title: 'Id',
            dataIndex: 'stt',
            key: 'stt',
            width: 50,
            render: (text: string, record: any, index: number) => (currentpage - 1) * 10 + index + 1,
        },
        ...getTableColumnsConfig({ data })
    ];

    return (
        <div>
            <PageHeaderProvider extra={<ModalCreateKind />} />
            <div className='flex items-center'>
                <a className='text-black' onClick={() => window.location.href = '/nodes'}>
                    <ArrowLeftOutlined /> Nodes
                </a>
                {/* <FilterComponent /> */}
                <Form onFinish={handleSearch}>
                    <div className="flex justify-end gap-3" style={{ marginLeft: 625 }}>
                        <Form.Item className="w-[220px]">
                            <Input placeholder="Enter keyword" value={search} onChange={e => setSearch(e.target.value)}></Input>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" onClick={handleSearch} icon={<SearchOutlined />}>
                                Search
                            </Button>
                        </Form.Item>
                    </div>
                </Form>
            </div>
            <Table 
                dataSource={filteredData} 
                columns={columns} 
                bordered 
                pagination={{ pageSize: 10, current: currentpage }}
                onChange={handleTableChange}
                rowKey="id"
            />
        </div>
    );
};

export default KindListingRoot;
