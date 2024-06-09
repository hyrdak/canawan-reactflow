import React, { useState } from 'react';

import { AppstoreOutlined, MailOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
/* eslint-disable no-duplicate-imports */
import { Button, Input, Menu } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

const SidebarDetail: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleMenuToggle = () => {
    setCollapsed(!collapsed);
    // Thay đổi các selected keys khi toggle menu
    setSelectedKeys(collapsed ? ['2'] : []);
  };
  const emmtyFC=()=>{}
  const [selectedKeys, setSelectedKeys] = useState<string[]>(['2']); // Ban đầu là ['1']

  const items: MenuItem[] = [
    {
      key: '',
      icon: collapsed ?'':<Input placeholder="Search keyword" style={{ width: 140, textAlign: 'left' }}/>,
      label: collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined style={{fontSize:20,marginTop:12,marginRight:20}} onClick={handleMenuToggle}/>,
      onClick: collapsed ?handleMenuToggle:emmtyFC,
    },
    {
      key: '1',
      label: 'Navigation',
      icon: collapsed ?'':<AppstoreOutlined />,
      children: [
        { key: '9', label: <Button>Navigation</Button> },
        { key: '10', label: 'Option 10' },
      ],
    },
  ];

  return (
    <div style={{ width: collapsed ? 80 : 220 }}>
      <Menu
        className="border-b border-l rounded"
        defaultOpenKeys={['1', '2', '3', '4', '5', '6', '7', '8']}
        mode="inline"
        inlineCollapsed={collapsed}
        items={items}
        selectedKeys={selectedKeys} // Sử dụng selectedKeys từ state
      />
    </div>
  );
};

export default SidebarDetail;