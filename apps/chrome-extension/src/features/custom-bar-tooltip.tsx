import React from 'react';
import { 
  Clock, 
  DollarSign, 
  Star, 
  BarChart2,
  BarChart,
  type LucideIcon
} from 'lucide-react';

interface PayloadItem {
  name: string;
  color: string;
  value: number | string;
  dataKey: string;
  payload: Record<string, any>;
}

interface CustomBarTooltipProps {
  active?: boolean;
  payload?: PayloadItem[];
  label?: string;
}

const CustomBarTooltip: React.FC<CustomBarTooltipProps> = ({ 
  active, 
  payload, 
  label 
}) => {
  if (!active || !payload || !payload.length) {
    return null;
  }

  const getIcon = (dataKey: string): LucideIcon => {
    switch (dataKey) {
      case 'price':
        return DollarSign;
      case 'review_count':
        return Star;
      default:
        return BarChart2;
    }
  };

  const formatValue = (entry: PayloadItem): string => {
    return entry.dataKey === 'price' 
      ? `R${Number(entry.value)?.toFixed(2) || 'N/A'}` 
      : String(entry.value);
  };

  return (
    <div style={{ 
      backgroundColor: 'white', 
      padding: '16px', 
      border: '2px solid #E5E7EB', // Tailwind's gray-200
      borderRadius: '8px', 
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
      maxWidth: '300px', 
      overflow: 'hidden' 
    }}>
      {/* Header with label */}
      {label && (
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          borderBottom: '1px solid #E5E7EB', 
          paddingBottom: '8px', 
          marginBottom: '8px' 
        }}>
          <BarChart style={{ marginRight: '8px' }} className="text-gray-500" size={16} />
          <span style={{ fontWeight: '600' }}>{label}</span>
        </div>
      )}

      {/* Payload Information */}
      <div style={{ marginTop: '8px' }}>
        {payload.map((entry) => {
          const Icon = getIcon(entry.dataKey);
          return (
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }} key={entry.dataKey}>
              <Icon className="text-gray-500" size={16} />
              <div style={{ flex: 1, marginLeft: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span className="text-gray-700 font-medium">{entry.name}: </span>
                  <span style={{ color: entry.color, fontWeight: 'semibold' }}>
                    {formatValue(entry)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CustomBarTooltip; 