import React from 'react';
import { 
  BarChart,
  Star 
} from 'lucide-react';

interface PayloadItem {
  name: string;
  color: string;
  value: number;
  payload: {
    rating: number;
    fill: string;
  };
}

interface CustomPieTooltipProps {
  active?: boolean;
  payload?: PayloadItem[];
}

const CustomPieTooltip: React.FC<CustomPieTooltipProps> = ({ active, payload }) => {
  if (!active || !payload || !payload.length) {
    return null;
  }

  const data = payload[0].payload;

  return (
    <div style={{ 
    }}>
      {/* Header with name */}
      {payload[0].name && (
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          borderBottom: '1px solid #E5E7EB', 
          paddingBottom: '8px', 
          marginBottom: '8px' 
        }}>
          <BarChart style={{ marginRight: '8px', color: '#6B7280' }} size={16} />
          <span style={{ fontWeight: '600', color: payload[0].payload.fill }}>
            {payload[0].name}
          </span>
        </div>
      )}

      {/* Payload Information */}
      <div style={{ marginTop: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
          <BarChart style={{ color: '#6B7280' }} size={16}/>
          <div style={{ flex: 1, marginLeft: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#374151', fontWeight: '500' }}>Count: </span>
              <span style={{ fontWeight: '600', color: payload[0].color }}>
                {payload[0].value}
              </span>
            </div>
          </div>
        </div>

        {/* Rating Information */}
        {data.rating !== undefined && (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Star style={{ color: '#6B7280' }} size={16} />
            <div style={{ flex: 1, marginLeft: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#374151', fontWeight: '500' }}>Rating: </span>
                <span style={{ fontWeight: '600', color: '#6B7280' }}>
                  {data.rating.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomPieTooltip; 