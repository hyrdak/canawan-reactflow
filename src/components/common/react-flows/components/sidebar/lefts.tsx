import { useEffect, useMemo, useState } from 'react';
import databaseService from 'databaseService';
import { matchSorter } from 'match-sorter';

import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Button, Collapse, Divider, Flex, Tooltip, Typography } from 'antd';
import Search from 'antd/es/input/Search';
import { BsPin, BsPinAngle, BsPinAngleFill, BsPinFill } from 'react-icons/bs';
import { LuPin } from 'react-icons/lu';
import clsx from 'clsx';

import { getListCommandNode } from '../../constants';
import { COMMAND_NODE_ICONS, COMMAND_NODE_LABELS, CommandNode, KindNode } from '../../constants/enum';
import { IconsBase } from '../../constants/icons';

type DataMenu = {
    key: string;
    label: string;
    listCommandNode: CommandNode[];
    children: (props: ContentProps) => JSX.Element;
};
type ContentProps = {
    onDragStart: any;
    listCommandNode: CommandNode[];
    isCollapse: boolean;

};
interface DataNode {
    name: string
}


export const LeftSidebar = ({ nodes, edges }: any) => {
    const [searchValue, setSearchValue] = useState('');
    const [collapse, setCollapse] = useState(false);
    const [dataNode, setDataNode] = useState<DataNode[]>([]);
    const onDragStart = (event: any, data: CommandNode) => {
        event.dataTransfer.setData('application/reactflow', data);
        event.dataTransfer.effectAllowed = 'move';
    };
    const handleChangeSearch = (e: any) => {
        setSearchValue(e.target.value);
    };
    useEffect(() => {
        const fetchData = async () => {
            setDataNode(await databaseService.getDataNodeList())
        };
        fetchData();
    }, []);

    return (
        <aside className="relative rounded-s left-sidebar">

            <div className={
                clsx(
                    "md:w-auto  h-full overflow-y-auto transition-all ease-in-out bg-white border w-[160px] mask-image-scroll",
                    {
                        ['!w-[80px]']: collapse
                    }
                )
            }>
                {/* <Divider className="!my-0 border-[#f1f1f1]  -top-[16px]" orientation="right"> */}
                <span
                    onClick={() => setCollapse(!collapse)}
                    className={
                        clsx(" hover:cursor-pointer top-[1px] right-[18px] hover:rounded-full absolute z-[11]", {
                            ['-translate-x-1/4 !right-1/2 !top-2']: collapse

                        })
                    }
                >
                    {collapse ? <BsPinAngle /> : <BsPinAngleFill />}
                </span>
                {/* </Divider> */}
                <div className="sticky top-0 px-2 py-4 bg-white z-[1] shadow-sm">
                    {
                        !collapse &&
                        <Search onChange={handleChangeSearch} placeholder="Search keyword" />
                    }
                </div>
                <Collapse
                    style={{
                        padding: '0',
                        background: '#fff'
                    }}
                    expandIconPosition='end'

                    size="small"
                    bordered={false}

                >
                    <Flex vertical gap="small" style={{ width: '100%' }}>
                        {dataNode.map((item) => (

                            <Button block>{item.name}</Button>

                        ))}
                    </Flex>
                </Collapse>
            </div>
        </aside>
    );
};
