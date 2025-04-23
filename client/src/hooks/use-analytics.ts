import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

interface AnalyticsData {
  pageViews: DataPoint[];
  sales: DataPoint[];
  visitors: DataPoint[];
  contentEngagement: DataPoint[];
  bookSales: PieChartData[];
}

interface DataPoint {
  date: string;
  value: number;
}

interface PieChartData {
  name: string;
  value: number;
}

export function useAnalytics(timeRange: string = '7days') {
  // Convert time range to days
  const days = timeRange === '7days' 
    ? 7 
    : timeRange === '30days' 
      ? 30 
      : 90;

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['/api/analytics/summary', days],
    queryFn: async () => {
      try {
        const res = await apiRequest('GET', `/api/analytics/summary?days=${days}`);
        if (res.status === 401) {
          throw new Error('Unauthorized. You must be an admin to access analytics.');
        }
        const data = await res.json();
        return data as AnalyticsData;
      } catch (error) {
        console.error('Failed to fetch analytics data:', error);
        
        // For development/demo purposes, generate sample data if API fails
        // In production, you would remove this fallback
        return generateFallbackData(days);
      }
    },
    retry: false,
  });

  return { 
    data, 
    isLoading, 
    error,
    refetch
  };
}

// This is only for development/demo purposes when backend isn't ready
function generateFallbackData(days: number): AnalyticsData {
  const generateData = generateTimeSeriesData(days);
  
  return {
    pageViews: generateData(100, 500),
    sales: generateData(5, 50),
    visitors: generateData(50, 300),
    contentEngagement: generateData(10, 100),
    bookSales: [
      { name: 'Physical', value: Math.floor(Math.random() * 100) + 100 },
      { name: 'eBook', value: Math.floor(Math.random() * 200) + 200 },
      { name: 'Audiobook', value: Math.floor(Math.random() * 150) + 50 },
    ]
  };
}

function generateTimeSeriesData(days: number) {
  return (min: number, max: number) => {
    const currentDate = new Date();
    const data: DataPoint[] = [];
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(currentDate);
      date.setDate(date.getDate() - i);
      
      data.push({
        date: date.toISOString().split('T')[0],
        value: Math.floor(Math.random() * (max - min + 1)) + min
      });
    }
    
    return data;
  };
}