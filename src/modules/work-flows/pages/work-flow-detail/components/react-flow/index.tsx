<<<<<<< HEAD
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

            if (typeof type === 'undefined' || !type) {
                return;
            }

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
=======
import { useCallback } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  Connection,
  Controls,
  Edge,
  MiniMap,
  Node,
  NodeResizer,
  NodeToolbar,
  useEdgesState,
  useNodesState,
} from 'reactflow';

import SidebarDetail from '../sidebar';

import 'reactflow/dist/style.css';

const initNodes: Node[] = [
  {
    id: '1a',
    type: 'input',
    data: { label: 'Node 1' },
    position: { x: 250, y: 5 },
  },
  {
    id: '2a',
    data: { label: 'Node 2' },
    position: { x: 100, y: 120 },
  },
  {
    id: '3a',
    data: { label: 'Node 3' },
    position: { x: 400, y: 120 },
  },
];

const initEdges: Edge[] = [
  { id: 'e1-2', source: '1a', target: '2a' },
  { id: 'e1-3', source: '1a', target: '3a' },
];

const fitViewOptions = { padding: 0.5 };

function Flow() {
  const [nodes, , onNodesChange] = useNodesState(initNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initEdges);

  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
      fitViewOptions={fitViewOptions}
    >
      <Background />
      <MiniMap />
      <Controls position="top-right" />
      <div className="border-t rounded" style={{ 
        position: 'absolute', 
        top: 0, 
        zIndex: 10,
        overflowY: 'auto',
        height: '100%',
        WebkitOverflowScrolling: 'touch',
        scrollbarWidth: 'thin',
        scrollbarColor: '#888 #f1f1f1',
      }}>
        <SidebarDetail />
      </div>
    </ReactFlow>
  );
}

export default Flow;
>>>>>>> 4bb149ec59587c4ebcf3b30276805579b62c7b6a
