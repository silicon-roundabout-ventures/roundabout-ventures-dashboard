
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface ChartData {
  name: string;
  value: number;
}

interface ChartComponentProps {
  title: string;
  data: ChartData[];
  colors?: string[];
}

const ChartComponent: React.FC<ChartComponentProps> = ({ 
  title, 
  data, 
  colors = ['#00A0A0', '#0F4C81', '#19598E', '#367BA3', '#5A9EB8', '#7EC1CD'] 
}) => {
  return (
    <div className="dashboard-card bg-gradient-to-br from-srv-dark to-srv-blue/90 rounded-lg shadow p-6 h-full">
      <h3 className="text-white font-semibold mb-4">{title}</h3>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#0B1930', 
                borderColor: '#0F4C81',
                borderRadius: '0.375rem',
                color: 'white'
              }}
              formatter={(value: number) => [`${value}%`, '']}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center">
            <div 
              className="w-3 h-3 rounded-full mr-2" 
              style={{ backgroundColor: colors[index % colors.length] }}
            />
            <span className="text-white/80 text-xs">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChartComponent;
