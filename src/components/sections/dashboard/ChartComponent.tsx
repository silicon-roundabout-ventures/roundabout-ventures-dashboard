
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
    <div className="border-2 border-white/20 rounded-lg p-6 bg-black/30 backdrop-blur-sm transition-all duration-200 hover:border-white/30 hover:shadow-md h-full">
      <h3 className="text-white font-medium mb-4 flex items-center">
        {title.includes('Industry') && '🏭 '}
        {title.includes('Stage') && '📈 '}
        {title.includes('Location') && '📍 '}
        {title.includes('Sector') && '💻 '}
        {title.includes('Founder') && '👤 '}
        {title.includes('Investment') && '💰 '}
        {!title.includes('Industry') && !title.includes('Stage') && !title.includes('Location') && !title.includes('Sector') && !title.includes('Founder') && !title.includes('Investment') && '📏 '}
        {title}
      </h3>
      
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
                backgroundColor: 'rgba(255, 255, 255, 0.85)', 
                borderColor: 'rgba(0, 160, 160, 0.3)',
                borderRadius: '0.5rem',
                color: '#222',
                padding: '8px 12px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                backdropFilter: 'blur(8px)',
                fontWeight: '500'
              }}
              formatter={(value: number) => [`${value}%`, '']}
              labelStyle={{ color: '#333', fontSize: '12px', fontWeight: '600' }}
              itemStyle={{ color: '#555' }}
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
            <span className="text-white/90 text-xs font-medium truncate" title={item.name}>{item.name.length > 15 ? `${item.name.substring(0, 15)}...` : item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChartComponent;
