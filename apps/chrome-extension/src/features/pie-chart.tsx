import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import CustomPieTooltip from './custom-pie-tooltip';

const COLORS = [
  '#0088FE', '#00C49F', '#FFBB28',
  '#FF8042', '#8884D8', '#FF6384'
];

interface ChartItem {
  [key: string]: {
    count: number;
    average_rating: number;
  };
}

interface TransformedDataItem {
  name: string;
  value: number;
  rating: number;
}

interface PieChartData {
  [category: string]: ChartItem[];
}

interface PieChartComponentProps {
  data: PieChartData;
}

const PieChartComponent: React.FC<PieChartComponentProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<string>(Object.keys(data)[0]);

  const renderPieChart = (chartData: ChartItem[]) => {
    // Transform data to the required format for recharts
    const transformedData: TransformedDataItem[] = chartData.map(item => {
      const key = Object.keys(item)[0];
      const itemData = item[key];
      return {
        name: key,
        value: itemData.count,
        rating: itemData.average_rating
      };
    });

    if (!Array.isArray(transformedData) || transformedData.length === 0) {
      return (
        <div className="plasmo-flex plasmo-justify-center plasmo-items-center h-full text-gray-500">
          No data available
        </div>
      );
    }

    return (
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={transformedData}
            cx="35%"
            cy="50%"
            labelLine={false}
            outerRadius={90}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
          >
            {transformedData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[index % COLORS.length]} 
              />
            ))}
          </Pie>
          <Tooltip 
            content={<CustomPieTooltip />} 
            wrapperStyle={{ 
              backgroundColor: 'white', 
              border: '1px solid #ccc', 
              borderRadius: '4px', 
              padding: '5px' 
            }} 
          />
          <Legend 
            layout="vertical" 
            verticalAlign="middle"
            wrapperStyle={{
              right: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              maxHeight: '200px',
              overflowY: 'auto',
              whiteSpace: 'normal',
              wordWrap: 'break-word',
              maxWidth: '150px',
            }}          
          />
        </PieChart>
      </ResponsiveContainer>
    );
  };

  const tabs = Object.keys(data);

  console.log('Tabs:', tabs);
  console.log('Active Tab:', activeTab);

  return (
    <div style={{ marginTop: '10px', backgroundColor: 'white', paddingTop: 0, paddingBottom: 0 }} >
      {tabs.length > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.5rem' }}>
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`plasmo-px-4 plasmo-py-2 plasmo-rounded-md plasmo-text-sm plasmo-font-medium plasmo-transition-all plasmo-duration-300 plasmo-ease-in-out ${
                activeTab === tab ? 'plasmo-bg-blue-500 plasmo-text-white' : 'plasmo-bg-gray-200 plasmo-text-gray-600'
              }`}
              style={{ margin: '0 5px' }}
            >
              {tab}
            </button>
          ))}
        </div>
      )}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {renderPieChart(data[activeTab])}
      </div>
    </div>
  );
};

export default PieChartComponent; 