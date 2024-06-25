import React, { useEffect, useState } from 'react';
import { JSX } from 'react/jsx-runtime';
import databaseService from 'databaseService';

import { AppstoreOutlined, LinkOutlined, MailOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
/* eslint-disable no-duplicate-imports */
import { Button, Input, Menu } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

const arrayKey: string[] = [];

const SidebarDetail: React.FC = () => {
  const handleMenuToggle = () => {
    setCollapsed(!collapsed);
  };
  const [collapsed, setCollapsed] = useState(false);
  const [data, setData] = useState<Array<any>>();
  const [dataItem, setDataItem] = useState<Array<any>>([]);
<<<<<<< HEAD
  console.log(data);

=======
  
>>>>>>> 4bb149ec59587c4ebcf3b30276805579b62c7b6a
  const getListNodes = async () => {
    const nodes = await databaseService.getDataNodeList();
    setData(nodes);
  }
<<<<<<< HEAD

  const onDragStart = (event: any, data: any) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify(data));
    event.dataTransfer.effectAllowed = 'move';
  };

  useEffect(() => {
    getListNodes();
  }, []);
  
  useEffect(() => {
    if (data) {
      fetchSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, collapsed]);

=======
  
  useEffect(() => {
    getListNodes();
  }, []);
  useEffect(() => {
    if(data){fetchSidebar();}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data,collapsed]);
  
>>>>>>> 4bb149ec59587c4ebcf3b30276805579b62c7b6a
  const fetchSidebar = () => {
    setDataItem([]);
    // Tạo mảng mới từ nodes để thêm vào sidebar
    const groupedData = data?.reduce((acc, item) => {
      const kind = item.name_kind;
      const name = item.name;
      if (!acc[kind]) {
        acc[kind] = [];
      }
      acc[kind].push(name);

      return acc;
    }, {});
<<<<<<< HEAD

=======
>>>>>>> 4bb149ec59587c4ebcf3b30276805579b62c7b6a
    const newArray: MenuItem[] = [
      {
        key: '',
        icon: collapsed ? <MenuUnfoldOutlined /> : <Input placeholder="Search keyword" style={{ width: 150, textAlign: 'left' }} />,
        label: collapsed ? '' : <MenuFoldOutlined style={{ fontSize: 20, marginTop: 12, marginRight: 20 }} onClick={handleMenuToggle} />,
<<<<<<< HEAD
        onClick: collapsed ? handleMenuToggle : () => { },
      }
    ];
    let count = 1;
    Object.keys(groupedData).map((kind, i) => {
      if (groupedData[kind].length === 1) {
        arrayKey.push(count + "");
=======
        onClick: collapsed ? handleMenuToggle : ()=>{},
      }
    ];
    let count = 1;
    Object.keys(groupedData).map((kind,i) => {
      if(groupedData[kind].length === 1) {
        arrayKey.push(count+"");
>>>>>>> 4bb149ec59587c4ebcf3b30276805579b62c7b6a
        newArray.push({
          key: count++,
          label: collapsed ? kind[0] : <div style={{ fontSize: 16 }}>{kind}</div>,
          icon: collapsed ? '' : <AppstoreOutlined />,
          children: [
<<<<<<< HEAD
            {
              key: count++,
              label: collapsed ? (
                <Button
                  block
                  size="large"
                  draggable
                  className="w-full"
                  onDragStart={(event) => onDragStart(event, groupedData[kind][0])}
                >
                  {groupedData[kind][0]}
                </Button>
              ) : (
                <Button
                  block
                  size="large"
                  draggable
                  className="w-full"
                  onDragStart={(event) => onDragStart(event, groupedData[kind][0])}
                >
                  {groupedData[kind][0]}
                </Button>
              )
            }
          ],
        });
      } else {
        arrayKey.push(count + "");
        const child = () => {
          const a: { key: number; label: JSX.Element; }[] = [];
          groupedData[kind].map((item: any, index: any) => {
            a.push({
              key: count++,
              label: collapsed ? (
                <Button
                  type="dashed"
                  block
                  size="large"
                  draggable
                  className="w-full"
                  onDragStart={(event) => onDragStart(event, item)}
                >
                  {item}
                </Button>
              ) : (
                <Button
                  block
                  size="large"
                  draggable
                  className="w-full"
                  onDragStart={(event) => onDragStart(event, item)}
                >
                  {item}
                </Button>
              )
            });
=======
            { key: count++, label: collapsed ? <Button type="dashed" style={{ fontSize: 15, padding:19 }} ><LinkOutlined /><div>{groupedData[kind][0]}</div></Button> : <Button type="dashed" style={{ fontSize: 15, marginTop: 2, width: 156, padding:19 }} ><LinkOutlined /><div>{groupedData[kind][0]}</div></Button> }
          ],
        });
      } else {
        arrayKey.push(count+"");
        const child=()=>{
          const a: { key: number; label: JSX.Element; }[]=[];
          groupedData[kind].map((item:any,index:any) => {
            a.push({ key: count++, label: collapsed ? <Button type="dashed" style={{ fontSize: 15, padding:19 }} ><LinkOutlined /><div>{item}</div></Button> : <Button type="dashed" style={{ fontSize: 15, marginTop: 3, width: 156, padding:19 }} ><LinkOutlined /><div>{item}</div></Button> });
>>>>>>> 4bb149ec59587c4ebcf3b30276805579b62c7b6a
          });
          
          return a;
        }
        newArray.push({
          key: count++,
          label: collapsed ? kind[0] : <div style={{ fontSize: 16 }}>{kind}</div>,
          icon: collapsed ? '' : <AppstoreOutlined />,
          children: child()
        });
      }
<<<<<<< HEAD
    });
    setDataItem(newArray);
  }

  return (
    <div style={{width: collapsed ? 90 : 240, height: '85vh', overflowY: 'auto' }}>
=======
    })
    setDataItem(newArray);
  }
  
  return (
    <div style={{ width: collapsed ? 80 : 230 }}>
>>>>>>> 4bb149ec59587c4ebcf3b30276805579b62c7b6a
      <Menu
        className="border-b border-l rounded"
        defaultOpenKeys={arrayKey}
        mode="inline"
        inlineCollapsed={collapsed}
        items={dataItem}
<<<<<<< HEAD
      />
=======
        />
>>>>>>> 4bb149ec59587c4ebcf3b30276805579b62c7b6a
    </div>
  );
};

<<<<<<< HEAD
export default SidebarDetail;
=======
export default SidebarDetail;
>>>>>>> 4bb149ec59587c4ebcf3b30276805579b62c7b6a
