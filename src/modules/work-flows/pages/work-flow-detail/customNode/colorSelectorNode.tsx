import React, { memo } from 'react';
import { Handle, Node, NodeProps, Position } from 'reactflow';

interface CustomNodeProps extends NodeProps {
    data: {
        color: string;
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    };
    isConnectable: boolean;
}

// Component được chuyển đổi sang TypeScript
const CustomColorPickerNode: React.FC<CustomNodeProps> = ({ data, isConnectable }) => {
    return (
        <>
            <Handle
                type="target"
                position={Position.Left}
                style={{ background: '#555' }}
                onConnect={(params) => console.log('handle onConnect', params)}
                isConnectable={isConnectable}
            />
            <Handle
                type="source"
                position={Position.Right}
                id="a"
                style={{ top: 10, background: '#555' }}
                isConnectable={isConnectable}
            />
            <Handle
                type="source"
                position={Position.Right}
                id="b"
                style={{ bottom: 10, top: 'auto', background: '#555' }}
                isConnectable={isConnectable}
            />
        </>
    );
};

// Sử dụng memo để tối ưu hóa hiệu năng
export default memo(CustomColorPickerNode);
