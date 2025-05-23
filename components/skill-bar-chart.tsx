'use client';

import { useState } from 'react';

interface SkillData {
  category: string;
  value: number;
  color: string;
}

interface SkillBarChartProps {
  data: SkillData[];
}

export function SkillBarChart({ data }: SkillBarChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {data.map((skill, index) => (
        <div
          key={skill.category}
          className="relative"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-[#d4d4d4]">
              {skill.category}
            </span>
            <span
              className="text-sm font-bold transition-all duration-300"
              style={{
                color: skill.color,
                transform: hoveredIndex === index ? 'scale(1.1)' : 'scale(1)'
              }}>
              {skill.value}%
            </span>
          </div>
          <div className="h-3 bg-[#2d2d2d] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-1000 ease-out"
              style={{
                width: `${skill.value}%`,
                backgroundColor: skill.color,
                transform: hoveredIndex === index ? 'scaleY(1.2)' : 'scaleY(1)',
                transformOrigin: 'bottom'
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
