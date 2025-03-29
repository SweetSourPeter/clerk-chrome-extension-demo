import React, { useState, useMemo } from 'react';
import { 
  ComposedChart, 
  Bar, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import CustomBarTooltip from './custom-bar-tooltip';

const COLORS = [
  '#0088FE', '#00C49F', '#FFBB28',
  '#FF8042', '#8884D8', '#FF6384'
];

interface DataPoint {
  month: string;
  price: number;
  review_count: number;
}

interface BarChartProps {
  data: DataPoint[];
}

type TimeFilter = 'all' | '1year' | '3month';

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('all');

  const filteredData = useMemo(() => {
    const now = new Date();
    return data.filter(item => {
      if (timeFilter === 'all') return true;
      
      const itemDate = new Date(item.month);
      const monthsDiff = (now.getFullYear() - itemDate.getFullYear()) * 12 + 
                         (now.getMonth() - itemDate.getMonth());
      
      return timeFilter === '1year' 
        ? monthsDiff <= 12 
        : monthsDiff <= 3;
    });
  }, [data, timeFilter]);

  return (
    <div className="plasmo-bg-white">
      <div className="plasmo-flex plasmo-justify-center plasmo-space-x-2 plasmo-mb-4">
        <button 
          onClick={() => setTimeFilter('all')}
          className={`plasmo-px-4 plasmo-py-2 plasmo-rounded-md plasmo-text-sm plasmo-font-medium plasmo-transition-all plasmo-duration-300 plasmo-ease-in-out ${
            timeFilter === 'all' ? 'plasmo-bg-blue-500 plasmo-text-white' : 'plasmo-bg-gray-200 plasmo-text-gray-600'
          }`}
        >
          All Time
        </button>
        <button 
          onClick={() => setTimeFilter('1year')}
          className={`plasmo-px-4 plasmo-py-2 plasmo-rounded-md plasmo-text-sm plasmo-font-medium plasmo-transition-all plasmo-duration-300 plasmo-ease-in-out ${
            timeFilter === '1year' ? 'plasmo-bg-blue-500 plasmo-text-white' : 'plasmo-bg-gray-200 plasmo-text-gray-600'
          }`}
        >
          1 Year
        </button>
        <button 
          onClick={() => setTimeFilter('3month')}
          className={`plasmo-px-4 plasmo-py-2 plasmo-rounded-md plasmo-text-sm plasmo-font-medium plasmo-transition-all plasmo-duration-300 plasmo-ease-in-out ${
            timeFilter === '3month' ? 'plasmo-bg-blue-500 plasmo-text-white' : 'plasmo-bg-gray-200 plasmo-text-gray-600'
          }`}
        >
          3 Months
        </button>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <ComposedChart data={filteredData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis 
            yAxisId="left" 
            label={{ value: 'Review Count', angle: -90, position: 'insideLeft' }}
          />
          <YAxis 
            yAxisId="right" 
            orientation="right" 
            label={{ value: 'Price (Rand)', angle: 90, position: 'insideRight' }}
          />
          <Tooltip content={<CustomBarTooltip />} />
          <Legend />
          
          <Bar 
            yAxisId="left"
            dataKey="review_count" 
            fill={COLORS[0]} 
            name="Review Count"
            animationBegin={0} 
            animationDuration={888} 
            animationEasing="ease-out" 
          />
          
          <Line 
            yAxisId="right"
            dataKey="price" 
            stroke={COLORS[1]} 
            name="Price"
            dot={true}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChart; 