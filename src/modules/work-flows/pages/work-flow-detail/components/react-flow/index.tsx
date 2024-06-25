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