'use client';

import { useEffect, useRef } from 'react';

export function HeatmapChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 400;
    canvas.height = 300;

    // Generate heatmap data
    const gridSize = 20;
    const cols = Math.floor(canvas.width / gridSize);
    const rows = Math.floor(canvas.height / gridSize);

    // Create intensity map
    const intensityMap = [];
    for (let i = 0; i < rows; i++) {
      intensityMap[i] = [];
      for (let j = 0; j < cols; j++) {
        // Simulate higher demand near entrance (top-left) and popular aisles
        const distanceFromEntrance = Math.sqrt(i * i + j * j);
        const aisleBonus = j % 4 === 0 ? 0.3 : 0;
        const intensity = Math.max(0, (1 - distanceFromEntrance / 20) + aisleBonus + Math.random() * 0.3);
        intensityMap[i][j] = intensity;
      }
    }

    // Draw heatmap
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const intensity = intensityMap[i][j];
        const alpha = intensity;
        
        // Color gradient from blue to yellow to red
        let r, g, b;
        if (intensity < 0.5) {
          r = Math.floor(255 * (intensity * 2));
          g = Math.floor(255 * (intensity * 2));
          b = 255;
        } else {
          r = 255;
          g = Math.floor(255 * (2 - intensity * 2));
          b = 0;
        }

        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.fillRect(j * gridSize, i * gridSize, gridSize, gridSize);
      }
    }

    // Add grid lines
    ctx.strokeStyle = 'rgba(0,0,0,0.1)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= rows; i++) {
      ctx.beginPath();
      ctx.moveTo(0, i * gridSize);
      ctx.lineTo(canvas.width, i * gridSize);
      ctx.stroke();
    }
    for (let j = 0; j <= cols; j++) {
      ctx.beginPath();
      ctx.moveTo(j * gridSize, 0);
      ctx.lineTo(j * gridSize, canvas.height);
      ctx.stroke();
    }
  }, []);

  return (
    <div className="flex items-center justify-center">
      <canvas 
        ref={canvasRef}
        className="border rounded-lg max-w-full h-auto"
      />
    </div>
  );
}