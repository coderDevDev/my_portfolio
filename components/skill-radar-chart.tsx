'use client';

import { useEffect, useRef } from 'react';

interface SkillData {
  category: string;
  value: number;
  color: string;
}

interface SkillRadarChartProps {
  data: SkillData[];
}

export function SkillRadarChart({ data }: SkillRadarChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const radius = Math.min(centerX, centerY) - 60;

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height);

    // Draw background grid
    const levels = 5;
    for (let i = 1; i <= levels; i++) {
      const levelRadius = (radius * i) / levels;
      ctx.beginPath();
      ctx.arc(centerX, centerY, levelRadius, 0, 2 * Math.PI);
      ctx.strokeStyle = '#3e3e3e';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Draw axes
    const angleStep = (2 * Math.PI) / data.length;
    data.forEach((_, index) => {
      const angle = index * angleStep - Math.PI / 2;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
      ctx.strokeStyle = '#3e3e3e';
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    // Draw data polygon
    ctx.beginPath();
    data.forEach((item, index) => {
      const angle = index * angleStep - Math.PI / 2;
      const distance = (radius * item.value) / 100;
      const x = centerX + distance * Math.cos(angle);
      const y = centerY + distance * Math.sin(angle);

      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.closePath();
    ctx.fillStyle = 'rgba(86, 156, 214, 0.2)';
    ctx.fill();
    ctx.strokeStyle = '#569cd6';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw data points
    data.forEach((item, index) => {
      const angle = index * angleStep - Math.PI / 2;
      const distance = (radius * item.value) / 100;
      const x = centerX + distance * Math.cos(angle);
      const y = centerY + distance * Math.sin(angle);

      ctx.beginPath();
      ctx.arc(x, y, 4, 0, 2 * Math.PI);
      ctx.fillStyle = item.color;
      ctx.fill();
      ctx.strokeStyle = '#1e1e1e';
      ctx.lineWidth = 2;
      ctx.stroke();
    });

    // Draw labels
    ctx.font = '12px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    data.forEach((item, index) => {
      const angle = index * angleStep - Math.PI / 2;
      const labelDistance = radius + 30;
      const x = centerX + labelDistance * Math.cos(angle);
      const y = centerY + labelDistance * Math.sin(angle);

      ctx.fillStyle = '#d4d4d4';
      ctx.fillText(item.category, x, y);
    });

    // Draw percentage labels on grid
    ctx.font = '10px monospace';
    ctx.fillStyle = '#888';
    for (let i = 1; i <= levels; i++) {
      const percentage = (i * 100) / levels;
      ctx.fillText(
        `${percentage}%`,
        centerX + 5,
        centerY - (radius * i) / levels
      );
    }
  }, [data]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ width: '100%', height: '100%' }}
    />
  );
}
