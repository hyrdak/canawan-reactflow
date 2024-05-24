import { ROUTE_PATHS, SidebarMenuItemType } from 'constants-es';

import { NodeExpandOutlined } from '@ant-design/icons';

import { SidebarMenuItem } from 'interfaces/sidebar-menu-item';

export const kindSidebarConfig: SidebarMenuItem[] = [
    {
        id: 'nodes',
        label: 'Types',
        path: ROUTE_PATHS.TYPES,
        // type: SidebarMenuItemType.Item,
        icon: <NodeExpandOutlined />,
        permissions: [],
        children: []
    }
];
