'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { skillData } from '@/lib/data';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart';

const chartConfig = {
    score: {
      label: "Score",
      color: "hsl(var(--accent))",
    },
  } satisfies ChartConfig

export default function SkillBreakdown() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={skillData} layout="vertical" margin={{ left: 10 }}>
                <XAxis type="number" dataKey="score" hide />
                <YAxis
                    type="category"
                    dataKey="skill"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    width={100}
                    tickLine={false}
                    axisLine={false}
                />
                 <Tooltip
                    cursor={{fill: 'hsl(var(--muted))'}}
                    content={<ChartTooltipContent indicator="dot" />}
                />
                <Bar dataKey="score" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
            </BarChart>
        </ResponsiveContainer>
    </ChartContainer>
  );
}
