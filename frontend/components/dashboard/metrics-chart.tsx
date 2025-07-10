'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Pick Time', before: 3.8, after: 2.3 },
  { name: 'Orders/Hour', before: 650, after: 847 },
  { name: 'Walking Distance', before: 2.8, after: 1.9 },
  { name: 'Efficiency %', before: 78, after: 94 },
  { name: 'Delays', before: 22, after: 12 }
];

export function MetricsChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="before" fill="#94a3b8" name="Before" />
        <Bar dataKey="after" fill="#0071CE" name="After" />
      </BarChart>
    </ResponsiveContainer>
  );
}