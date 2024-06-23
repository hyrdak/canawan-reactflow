import React, { useCallback, useRef } from 'react';
import ReactFlow, {
    addEdge,
    Background,
    BackgroundVariant,
    Controls,
    MiniMap,
    Position,
    ReactFlowProvider,
    useEdgesState,
    useNodesState,
    useReactFlow,
} from 'reactflow';
import databaseService from 'databaseService';

// import { EdgeTypes, NodeTypes } from 'components/common/react-flows/constants/custom-nodes';
import ColorSelectorNode from '../../customNode/colorSelectorNode'

import 'reactflow/dist/style.css';

const initialNodes = [
    {
        id: '1',
        type: 'input',
        data: { label: 'Start' },
        position: { x: 250, y: 5 },
    },
];

type Props = {
    data: {
        name: string;
        script: {
            edges: [];
            nodes: [];
        };
    };
    onChange: (Node: any) => void;
};
const nodeTypes = {
    selectorNode: ColorSelectorNode,
};
let id = 0;
const getId = () => `${id++}`;

const DnDFlow = ({ data, onChange }: Props) => {
    const reactFlowWrapper = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState(data?.script?.nodes || []);
    const [edges, setEdges, onEdgesChange] = useEdgesState(data?.script?.edges || []);
    const { screenToFlowPosition } = useReactFlow();

    const onConnect = useCallback(
        (params: any) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );

    const onDragOver = useCallback((event: any) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event: any) => {
            event.preventDefault();

            const type = event.dataTransfer.getData('application/reactflow');

            // check if the dropped element is valid
            if (typeof type === 'undefined' || !type) {
                return;
            }

            // project was renamed to screenToFlowPosition
            // and you don't need to subtract the reactFlowBounds.left/top anymore
            // details: https://reactflow.dev/whats-new/2023-11-10
            const position = screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });
            const newNode = {
                id: getId(),
                type,
                position,
                data: { label: type },
                sourcePosition: Position.Right,
                targetPosition: Position.Left,
            };

            setNodes((nds) => nds.concat(newNode));
        },
        [screenToFlowPosition, setNodes],
    );

    return (
        <div className="dndflow">
            <div className="reactflow-wrapper" ref={reactFlowWrapper}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    // edgeTypes={EdgeTypes}
                    nodeTypes={nodeTypes}
                    fitView
                >
                    <Background variant={BackgroundVariant.Dots} />
                    <Controls />
                    <MiniMap />
                </ReactFlow>
            </div>

        </div>
    );
};

export default DnDFlow
