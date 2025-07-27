import React, { useEffect, useRef, useCallback, useMemo } from 'react';
import styled from 'styled-components';

const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -1;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
`;

const Canvas = styled.canvas`
  display: block;
  width: 100%;
  height: 100%;
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
  energy: number;
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

const NeuralNetworkBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const nodesRef = useRef<Node[]>([]);
  const connectionsRef = useRef<Connection[]>([]);

  const colors = useMemo(() => [
    '#00d4ff', // Cyan
    '#00ff88', // Green
    '#8b45ff', // Purple
    '#ff7a00', // Orange
    '#e91e63', // Pink
    '#00bcd4', // Teal
  ], []);

  const initializeNodes = useCallback((width: number, height: number) => {
    // Adjust node count based on screen size for better performance on mobile
    const baseNodeCount = Math.floor((width * height) / 18000);
    const mobileThreshold = 768;
    const isMobile = width < mobileThreshold;
    const nodeCount = Math.min(isMobile ? 25 : 45, baseNodeCount);
    const nodes: Node[] = [];
    
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3, // Smooth movement
        vy: (Math.random() - 0.5) * 0.3, // Smooth movement
        size: isMobile ? 1.2 : 1.5, // Slightly smaller dots on mobile
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.3 + 0.7, // More consistent visibility
        connections: [],
        energy: Math.random(),
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }
    
    return nodes;
  }, [colors]);

  const createConnections = useCallback((nodes: Node[], maxDistance: number) => {
    const connections: Connection[] = [];
    // Reduce connections on mobile for better performance
    const isMobile = window.innerWidth < 768;
    const connectionProbabilityMultiplier = isMobile ? 0.7 : 1;
    
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Dynamic connection probability based on distance
        const baseProbability = distance < maxDistance * 0.6 ? 0.4 : 0.15;
        const connectionProbability = baseProbability * connectionProbabilityMultiplier;
        if (distance < maxDistance && Math.random() < connectionProbability) {
          const strength = 1 - (distance / maxDistance);
          connections.push({
            from: i,
            to: j,
            strength,
            opacity: strength * 0.7, // More visible connections
            animated: Math.random() < (isMobile ? 0.15 : 0.25), // Fewer animations on mobile
            pulsePosition: Math.random(), // Random starting positions
          });
          
          nodes[i].connections.push(connections.length - 1);
          nodes[j].connections.push(connections.length - 1);
        }
      }
    }
    
    return connections;
  }, []);

  const updateNodes = useCallback((nodes: Node[], width: number, height: number, deltaTime: number) => {
    nodes.forEach((node, index) => {
      // Ensure deltaTime is finite
      if (!isFinite(deltaTime) || deltaTime <= 0) return;
      
      // Update position with slower, smoother movement
      node.x += node.vx * deltaTime * 15; // Slower movement
      node.y += node.vy * deltaTime * 15; // Slower movement
      
      // Validate coordinates after update
      if (!isFinite(node.x)) node.x = Math.random() * width;
      if (!isFinite(node.y)) node.y = Math.random() * height;
      if (!isFinite(node.vx)) node.vx = (Math.random() - 0.5) * 0.3;
      if (!isFinite(node.vy)) node.vy = (Math.random() - 0.5) * 0.3;
      
      // Smooth edge bouncing
      if (node.x < 30 || node.x > width - 30) {
        node.vx *= -0.9; // Gentle bounce
      }
      if (node.y < 30 || node.y > height - 30) {
        node.vy *= -0.9; // Gentle bounce
      }
      
      // Keep within bounds with padding
      node.x = Math.max(30, Math.min(width - 30, node.x));
      node.y = Math.max(30, Math.min(height - 30, node.y));
      
      // Slower energy updates
      node.energy += deltaTime * 0.0005; // Slower energy changes
      node.pulsePhase += deltaTime * 0.001; // Slower pulse
      
      // Less frequent gentle direction changes
      if (Math.random() < 0.0005) {
        node.vx += (Math.random() - 0.5) * 0.03;
        node.vy += (Math.random() - 0.5) * 0.03;
      }
      
      // Apply very gentle friction for smooth movement
      node.vx *= 0.998;
      node.vy *= 0.998;
      
      // Limit velocity to keep movement smooth
      const maxVel = 0.8; // Slower max velocity
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
        connection.pulsePosition += deltaTime * 0.0005; // Much slower pulse animation
        if (connection.pulsePosition > 1) {
          connection.pulsePosition = 0;
        }
      }
    });
  }, []);

  const drawNode = useCallback((ctx: CanvasRenderingContext2D, node: Node, time: number) => {
    // Validate node coordinates
    if (!isFinite(node.x) || !isFinite(node.y) || !isFinite(node.size)) {
      return;
    }
    
    // Simple fixed-size dot with slower, gentler pulse
    const pulse = Math.sin(node.pulsePhase + time * 0.0005) * 0.08 + 0.92; // Slower pulse
    
    // Main node - simple dot
    ctx.fillStyle = `${node.color}${Math.floor((node.opacity * pulse) * 255).toString(16).padStart(2, '0')}`;
    ctx.beginPath();
    ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
    ctx.fill();
    
    // Simple inner highlight
    ctx.fillStyle = `#ffffff${Math.floor((node.opacity * 0.3) * 255).toString(16).padStart(2, '0')}`;
    ctx.beginPath();
    ctx.arc(node.x, node.y, node.size * 0.4, 0, Math.PI * 2);
    ctx.fill();
  }, []);

  const drawConnection = useCallback((ctx: CanvasRenderingContext2D, connection: Connection, nodes: Node[], time: number) => {
    const fromNode = nodes[connection.from];
    const toNode = nodes[connection.to];
    
    if (!fromNode || !toNode) return;
    
    // Validate node coordinates
    if (!isFinite(fromNode.x) || !isFinite(fromNode.y) || !isFinite(toNode.x) || !isFinite(toNode.y)) {
      return;
    }
    
    const dx = toNode.x - fromNode.x;
    const dy = toNode.y - fromNode.y;
    
    // Clean connection line
    const gradient = ctx.createLinearGradient(fromNode.x, fromNode.y, toNode.x, toNode.y);
    gradient.addColorStop(0, `${fromNode.color}${Math.floor(connection.opacity * 100).toString(16).padStart(2, '0')}`);
    gradient.addColorStop(0.5, `#ffffff${Math.floor(connection.opacity * 60).toString(16).padStart(2, '0')}`);
    gradient.addColorStop(1, `${toNode.color}${Math.floor(connection.opacity * 100).toString(16).padStart(2, '0')}`);
    
    ctx.strokeStyle = gradient;
    ctx.lineWidth = connection.strength * 1.2;
    ctx.beginPath();
    ctx.moveTo(fromNode.x, fromNode.y);
    ctx.lineTo(toNode.x, toNode.y);
    ctx.stroke();
    
    // Simple animated pulse
    if (connection.animated) {
      const pulseX = fromNode.x + dx * connection.pulsePosition;
      const pulseY = fromNode.y + dy * connection.pulsePosition;
      
      // Validate pulse coordinates
      if (isFinite(pulseX) && isFinite(pulseY)) {
        const pulseGradient = ctx.createRadialGradient(
          pulseX, pulseY, 0,
          pulseX, pulseY, 3
        );
        pulseGradient.addColorStop(0, '#ffffff');
        pulseGradient.addColorStop(0.5, `${fromNode.color}80`);
        pulseGradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = pulseGradient;
        ctx.beginPath();
        ctx.arc(pulseX, pulseY, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }, []);

  const animate = useCallback((currentTime: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const deltaTime = 16.67; // Assume 60fps
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update physics
    updateNodes(nodesRef.current, canvas.width, canvas.height, deltaTime);
    updateConnections(connectionsRef.current, deltaTime);
    
    // Draw connections first (behind nodes)
    connectionsRef.current.forEach((connection) => {
      drawConnection(ctx, connection, nodesRef.current, currentTime);
    });
    
    // Draw nodes
    nodesRef.current.forEach((node) => {
      drawNode(ctx, node, currentTime);
    });
    
    animationRef.current = requestAnimationFrame(animate);
  }, [updateNodes, updateConnections, drawConnection, drawNode]);

  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Reinitialize with new dimensions
    nodesRef.current = initializeNodes(canvas.width, canvas.height);
    connectionsRef.current = createConnections(nodesRef.current, 220); // Good connection distance for smooth network
  }, [initializeNodes, createConnections]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Initial setup
    handleResize();
    
    // Start animation
    animationRef.current = requestAnimationFrame(animate);
    
    // Event listeners
    window.addEventListener('resize', handleResize);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [animate, handleResize]);

  return (
    <BackgroundContainer>
      <Canvas ref={canvasRef} />
    </BackgroundContainer>
  );
};

export default NeuralNetworkBackground;
