import React, { useEffect, useRef, useCallback, useMemo } from 'react';
import styled from 'styled-components';

const NetworkContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
  pointer-events: none;
`;

const Canvas = styled.canvas`
  display: block;
  width: 100%;
  height: 100%;
  opacity: 0.6;
`;

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  opacity: number;
  connections: number[];
  pulsePhase: number;
}

interface Connection {
  from: number;
  to: number;
  strength: number;
  opacity: number;
  animated: boolean;
  pulsePosition: number;
}

const HeroNeuralNetwork: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const nodesRef = useRef<Node[]>([]);
  const connectionsRef = useRef<Connection[]>([]);

  const colors = useMemo(() => [
    '#00d4ff', // Cyan
    '#00ff88', // Green
    '#8b45ff', // Purple
    '#00bcd4', // Teal
  ], []);

  const initializeNodes = useCallback((width: number, height: number) => {
    // Fewer nodes on mobile for better performance
    const isMobile = width < 768;
    const nodeCount = Math.min(isMobile ? 15 : 25, Math.floor((width * height) / 25000));
    const nodes: Node[] = [];
    
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        size: isMobile ? 1.0 : 1.2, // Smaller nodes on mobile
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.3 + 0.4,
        connections: [],
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }
    
    return nodes;
  }, [colors]);

  const createConnections = useCallback((nodes: Node[], maxDistance: number) => {
    const connections: Connection[] = [];
    
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < maxDistance && Math.random() < 0.3) {
          const strength = 1 - (distance / maxDistance);
          connections.push({
            from: i,
            to: j,
            strength,
            opacity: strength * 0.4,
            animated: Math.random() < 0.2,
            pulsePosition: Math.random(),
          });
          
          nodes[i].connections.push(connections.length - 1);
          nodes[j].connections.push(connections.length - 1);
        }
      }
    }
    
    return connections;
  }, []);

  const updateNodes = useCallback((nodes: Node[], width: number, height: number, deltaTime: number) => {
    nodes.forEach((node) => {
      if (!isFinite(deltaTime) || deltaTime <= 0) return;
      
      node.x += node.vx * deltaTime * 15;
      node.y += node.vy * deltaTime * 15;
      
      if (!isFinite(node.x)) node.x = Math.random() * width;
      if (!isFinite(node.y)) node.y = Math.random() * height;
      if (!isFinite(node.vx)) node.vx = (Math.random() - 0.5) * 0.2;
      if (!isFinite(node.vy)) node.vy = (Math.random() - 0.5) * 0.2;
      
      if (node.x < 20 || node.x > width - 20) node.vx *= -0.8;
      if (node.y < 20 || node.y > height - 20) node.vy *= -0.8;
      
      node.x = Math.max(20, Math.min(width - 20, node.x));
      node.y = Math.max(20, Math.min(height - 20, node.y));
      
      node.pulsePhase += deltaTime * 0.001;
      
      if (Math.random() < 0.0005) {
        node.vx += (Math.random() - 0.5) * 0.03;
        node.vy += (Math.random() - 0.5) * 0.03;
      }
      
      node.vx *= 0.999;
      node.vy *= 0.999;
      
      const maxVel = 0.8;
      const vel = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
      if (vel > maxVel && isFinite(vel) && vel > 0) {
        node.vx = (node.vx / vel) * maxVel;
        node.vy = (node.vy / vel) * maxVel;
      }
    });
  }, []);

  const updateConnections = useCallback((connections: Connection[], deltaTime: number) => {
    connections.forEach((connection) => {
      if (connection.animated) {
        connection.pulsePosition += deltaTime * 0.0015;
        if (connection.pulsePosition > 1) {
          connection.pulsePosition = 0;
        }
      }
    });
  }, []);

  const drawNode = useCallback((ctx: CanvasRenderingContext2D, node: Node, time: number) => {
    if (!isFinite(node.x) || !isFinite(node.y) || !isFinite(node.size)) {
      return;
    }
    
    const pulse = Math.sin(node.pulsePhase + time * 0.0008) * 0.15 + 0.85;
    
    ctx.fillStyle = `${node.color}${Math.floor((node.opacity * pulse) * 255).toString(16).padStart(2, '0')}`;
    ctx.beginPath();
    ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = `#ffffff${Math.floor((node.opacity * 0.2) * 255).toString(16).padStart(2, '0')}`;
    ctx.beginPath();
    ctx.arc(node.x, node.y, node.size * 0.3, 0, Math.PI * 2);
    ctx.fill();
  }, []);

  const drawConnection = useCallback((ctx: CanvasRenderingContext2D, connection: Connection, nodes: Node[], time: number) => {
    const fromNode = nodes[connection.from];
    const toNode = nodes[connection.to];
    
    if (!fromNode || !toNode) return;
    
    if (!isFinite(fromNode.x) || !isFinite(fromNode.y) || !isFinite(toNode.x) || !isFinite(toNode.y)) {
      return;
    }
    
    const dx = toNode.x - fromNode.x;
    const dy = toNode.y - fromNode.y;
    
    const gradient = ctx.createLinearGradient(fromNode.x, fromNode.y, toNode.x, toNode.y);
    gradient.addColorStop(0, `${fromNode.color}${Math.floor(connection.opacity * 60).toString(16).padStart(2, '0')}`);
    gradient.addColorStop(0.5, `#ffffff${Math.floor(connection.opacity * 30).toString(16).padStart(2, '0')}`);
    gradient.addColorStop(1, `${toNode.color}${Math.floor(connection.opacity * 60).toString(16).padStart(2, '0')}`);
    
    ctx.strokeStyle = gradient;
    ctx.lineWidth = connection.strength * 0.8;
    ctx.beginPath();
    ctx.moveTo(fromNode.x, fromNode.y);
    ctx.lineTo(toNode.x, toNode.y);
    ctx.stroke();
    
    if (connection.animated) {
      const pulseX = fromNode.x + dx * connection.pulsePosition;
      const pulseY = fromNode.y + dy * connection.pulsePosition;
      
      if (isFinite(pulseX) && isFinite(pulseY)) {
        const pulseGradient = ctx.createRadialGradient(
          pulseX, pulseY, 0,
          pulseX, pulseY, 2
        );
        pulseGradient.addColorStop(0, '#ffffff40');
        pulseGradient.addColorStop(0.5, `${fromNode.color}20`);
        pulseGradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = pulseGradient;
        ctx.beginPath();
        ctx.arc(pulseX, pulseY, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }, []);

  const animate = useCallback((currentTime: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const deltaTime = 16.67;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    updateNodes(nodesRef.current, canvas.width, canvas.height, deltaTime);
    updateConnections(connectionsRef.current, deltaTime);
    
    connectionsRef.current.forEach((connection) => {
      drawConnection(ctx, connection, nodesRef.current, currentTime);
    });
    
    nodesRef.current.forEach((node) => {
      drawNode(ctx, node, currentTime);
    });
    
    animationRef.current = requestAnimationFrame(animate);
  }, [updateNodes, updateConnections, drawConnection, drawNode]);

  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const container = canvas.parentElement;
    if (!container) return;
    
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    
    nodesRef.current = initializeNodes(canvas.width, canvas.height);
    connectionsRef.current = createConnections(nodesRef.current, 180);
  }, [initializeNodes, createConnections]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    handleResize();
    
    animationRef.current = requestAnimationFrame(animate);
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [animate, handleResize]);

  return (
    <NetworkContainer>
      <Canvas ref={canvasRef} />
    </NetworkContainer>
  );
};

export default HeroNeuralNetwork;
