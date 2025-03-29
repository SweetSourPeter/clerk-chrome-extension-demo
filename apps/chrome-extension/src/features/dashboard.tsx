import React, { useState, useEffect } from 'react';
import { useAuth } from "@clerk/chrome-extension"
import PieChartComponent from './pie-chart';
import BarChartComponent from './bar-chart';

// Define interfaces for the data structure
interface ChartData {
  pie_chart_data: any; // Replace with specific type if known
  bar_chart_data: any; // Replace with specific type if known
}

interface ApiResponse {
  data: ChartData;
  gpt_summary: string;
}

// At the top of your file, add this constant
const API_URL = process.env.PLASMO_PUBLIC_FLASK_API_URL || "http://13.212.118.249:5000";

const Dashboard: React.FC = () => {
  const { getToken, orgId } = useAuth();
  const [data, setData] = useState<ApiResponse | null>(null);
  const [statusMessage, setStatusMessage] = useState<React.ReactNode>('');

  const fetchData = async (url: string): Promise<void> => {
    try {
      const token = await getToken();
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 429) {
          setStatusMessage(
            <div>
              <p className="text-red-600">{errorData.error}</p>
              <p className="text-sm text-gray-600 mt-2">
                To upgrade your plan, visit <a href={`${process.env.REVENUEALOT_URL}/pricing`} className="text-blue-600 underline">this page</a>.
              </p>
            </div>
          );
          return;
        } else {
          setStatusMessage(errorData.error || "An error occurred.");
          throw new Error(errorData.error);
        }
      }

      const result = await response.json();
      
      if (result === null) {
        return;
      }
      if (typeof result === 'object' && result !== null && 'message' in result) {
        setData(null);
        setStatusMessage(result.message);
      } else {
        setData(result);
        setStatusMessage('');
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setStatusMessage('Failed to fetch data');
    }
  };

  useEffect(() => {
    const getCurrentTabUrl = async () => {
      try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        const url = tab?.url ? tab.url : "";
        if (!url) {
          return;
        }

        const regex = /^https:\/\/www\.takealot\.com\/[\w-]+\/PLID\d+.*$/;
        if (regex.test(url)) {
          const encodedUrl = encodeURIComponent(url);
          await fetchData(`${API_URL}/api/data?url=${encodedUrl}&org_id=${orgId}`);
        } else {
          setStatusMessage('Please navigate to a valid Takealot product page');
        }
      } catch (error) {
        console.error("Error getting tab URL:", error);
        setStatusMessage('Failed to get current tab URL');
      }
    };

    getCurrentTabUrl();
  }, [orgId]);  // Keep orgId in dependency array

  if (!data) {
    if (statusMessage) {
      return <div>{statusMessage}</div>;
    } else {
      return <div>Loading...</div>;
    }
  }

  const { pie_chart_data, bar_chart_data } = data.data;
  const { gpt_summary } = data;
  

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
        <div style={{ flex: 1.5 }}>
          <strong style={{ color: 'black', fontSize: '1rem' }}>SKU Distribution:</strong>
          <div style={{ marginRight: '30px' }}>
            <PieChartComponent data={pie_chart_data} />
          </div>
        </div>
        <div style={{ flex: 1, marginLeft: '20px' }}>
          <strong style={{ color: 'black', fontSize: '1rem' }}>Reviews Summary:</strong>
          <p style={{ marginTop: '10px', marginBottom: '20px', color: 'black', fontSize: '0.875rem' }}>
            {gpt_summary}
          </p>
        </div>
      </div>
      <strong style={{ color: 'black', fontSize: '1rem' }}>Sales & Price History:</strong>
      <div style={{ marginTop: '20px' }}>
        <BarChartComponent data={bar_chart_data} />
      </div>
    </div>
  );
};

export default Dashboard; 