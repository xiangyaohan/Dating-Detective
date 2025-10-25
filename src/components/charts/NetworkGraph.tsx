import React, { useEffect, useRef } from 'react';
import { User, Users, Building, Heart, MessageCircle } from 'lucide-react';

interface NetworkNode {
  id: string;
  name: string;
  type: 'target' | 'family' | 'friend' | 'colleague' | 'romantic';
  x?: number;
  y?: number;
  connections?: string[];
}

interface NetworkConnection {
  from: string;
  to: string;
  type: 'family' | 'friend' | 'colleague' | 'romantic' | 'social';
  strength: number; // 1-5
}

interface NetworkGraphProps {
  nodes: NetworkNode[];
  connections: NetworkConnection[];
  title?: string;
  className?: string;
}

const NetworkGraph: React.FC<NetworkGraphProps> = ({ 
  nodes, 
  connections, 
  title, 
  className = '' 
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const getNodeColor = (type: string) => {
    switch (type) {
      case 'target': return '#EF4444'; // red
      case 'family': return '#F59E0B'; // amber
      case 'friend': return '#10B981'; // emerald
      case 'colleague': return '#3B82F6'; // blue
      case 'romantic': return '#EC4899'; // pink
      default: return '#6B7280'; // gray
    }
  };

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'target': return User;
      case 'family': return Users;
      case 'friend': return MessageCircle;
      case 'colleague': return Building;
      case 'romantic': return Heart;
      default: return User;
    }
  };

  const getConnectionColor = (type: string, strength: number) => {
    const opacity = 0.3 + (strength * 0.14); // 0.3 to 1.0
    switch (type) {
      case 'family': return `rgba(245, 158, 11, ${opacity})`;
      case 'friend': return `rgba(16, 185, 129, ${opacity})`;
      case 'colleague': return `rgba(59, 130, 246, ${opacity})`;
      case 'romantic': return `rgba(236, 72, 153, ${opacity})`;
      case 'social': return `rgba(107, 114, 128, ${opacity})`;
      default: return `rgba(107, 114, 128, ${opacity})`;
    }
  };

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const svg = svgRef.current;
    const rect = container.getBoundingClientRect();
    const width = rect.width - 32; // padding
    const height = 400;

    // 简单的力导向布局算法
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.3;

    // 为节点分配位置
    const positionedNodes = nodes.map((node, index) => {
      if (node.type === 'target') {
        return { ...node, x: centerX, y: centerY };
      }
      
      const angle = (index / (nodes.length - 1)) * 2 * Math.PI;
      const nodeRadius = radius + Math.random() * 50 - 25; // 添加一些随机性
      return {
        ...node,
        x: centerX + Math.cos(angle) * nodeRadius,
        y: centerY + Math.sin(angle) * nodeRadius
      };
    });

    // 清空SVG
    svg.innerHTML = '';
    svg.setAttribute('width', width.toString());
    svg.setAttribute('height', height.toString());

    // 绘制连接线
    connections.forEach(connection => {
      const fromNode = positionedNodes.find(n => n.id === connection.from);
      const toNode = positionedNodes.find(n => n.id === connection.to);
      
      if (fromNode && toNode && fromNode.x && fromNode.y && toNode.x && toNode.y) {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', fromNode.x.toString());
        line.setAttribute('y1', fromNode.y.toString());
        line.setAttribute('x2', toNode.x.toString());
        line.setAttribute('y2', toNode.y.toString());
        line.setAttribute('stroke', getConnectionColor(connection.type, connection.strength));
        line.setAttribute('stroke-width', (connection.strength * 2).toString());
        line.setAttribute('opacity', '0.7');
        svg.appendChild(line);
      }
    });

    // 绘制节点
    positionedNodes.forEach(node => {
      if (!node.x || !node.y) return;

      // 节点圆圈
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', node.x.toString());
      circle.setAttribute('cy', node.y.toString());
      circle.setAttribute('r', node.type === 'target' ? '20' : '15');
      circle.setAttribute('fill', getNodeColor(node.type));
      circle.setAttribute('stroke', 'white');
      circle.setAttribute('stroke-width', '2');
      circle.setAttribute('opacity', '0.9');
      svg.appendChild(circle);

      // 节点标签
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', node.x.toString());
      text.setAttribute('y', (node.y + (node.type === 'target' ? 35 : 30)).toString());
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('font-size', '12');
      text.setAttribute('font-weight', node.type === 'target' ? 'bold' : 'normal');
      text.setAttribute('fill', '#374151');
      text.textContent = node.name;
      svg.appendChild(text);
    });

  }, [nodes, connections]);

  const nodeTypes = [
    { type: 'target', label: '调查对象', color: '#EF4444' },
    { type: 'family', label: '家庭成员', color: '#F59E0B' },
    { type: 'friend', label: '朋友', color: '#10B981' },
    { type: 'colleague', label: '同事', color: '#3B82F6' },
    { type: 'romantic', label: '恋爱关系', color: '#EC4899' }
  ];

  const connectionTypes = [
    { type: 'family', label: '家庭关系' },
    { type: 'friend', label: '朋友关系' },
    { type: 'colleague', label: '同事关系' },
    { type: 'romantic', label: '恋爱关系' },
    { type: 'social', label: '社交关系' }
  ];

  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-6 ${className}`}>
      {title && (
        <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">{title}</h3>
      )}
      
      <div ref={containerRef} className="relative">
        <svg ref={svgRef} className="w-full border border-gray-100 rounded-lg bg-gray-50"></svg>
      </div>
      
      {/* 图例 */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 节点类型图例 */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">节点类型</h4>
          <div className="space-y-2">
            {nodeTypes.map(type => (
              <div key={type.type} className="flex items-center text-sm">
                <div 
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: type.color }}
                ></div>
                <span className="text-gray-600">{type.label}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* 连接类型图例 */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">关系类型</h4>
          <div className="space-y-2">
            {connectionTypes.map(type => (
              <div key={type.type} className="flex items-center text-sm">
                <div className="w-4 h-0.5 mr-2" style={{ 
                  backgroundColor: getConnectionColor(type.type, 3).replace(/rgba?\(([^)]+)\)/, 'rgb($1)').replace(/,\s*[\d.]+\)/, ')')
                }}></div>
                <span className="text-gray-600">{type.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* 统计信息 */}
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div className="text-center p-2 bg-gray-50 rounded">
          <div className="font-medium text-gray-900">{nodes.length}</div>
          <div className="text-gray-600 text-xs">总节点</div>
        </div>
        <div className="text-center p-2 bg-gray-50 rounded">
          <div className="font-medium text-gray-900">{connections.length}</div>
          <div className="text-gray-600 text-xs">总连接</div>
        </div>
        <div className="text-center p-2 bg-gray-50 rounded">
          <div className="font-medium text-gray-900">
            {connections.filter(c => c.strength >= 4).length}
          </div>
          <div className="text-gray-600 text-xs">强关系</div>
        </div>
        <div className="text-center p-2 bg-gray-50 rounded">
          <div className="font-medium text-gray-900">
            {new Set([...connections.map(c => c.type)]).size}
          </div>
          <div className="text-gray-600 text-xs">关系类型</div>
        </div>
      </div>
    </div>
  );
};

export default NetworkGraph;