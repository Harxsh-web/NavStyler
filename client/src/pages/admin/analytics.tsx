import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ComposedChart,
  Scatter
} from 'recharts';

// This would normally come from your analytics API
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

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('7days');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<AnalyticsData | null>(null);

  // Fetch analytics data when the time range changes
  useEffect(() => {
    setLoading(true);
    
    // Mock fetching data - in production, this would be an API call
    const fetchAnalyticsData = async () => {
      try {
        // Simulate API request
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Generate dynamic data based on time range
        const daysToGenerate = timeRange === '7days' ? 7 : timeRange === '30days' ? 30 : 90;
        const generateData = generateTimeSeriesData(daysToGenerate);
        
        setData({
          pageViews: generateData(100, 500),
          sales: generateData(5, 50),
          visitors: generateData(50, 300),
          contentEngagement: generateData(10, 100),
          bookSales: [
            { name: 'Physical', value: Math.floor(Math.random() * 100) + 100 },
            { name: 'eBook', value: Math.floor(Math.random() * 200) + 200 },
            { name: 'Audiobook', value: Math.floor(Math.random() * 150) + 50 },
          ]
        });
      } catch (error) {
        console.error('Error fetching analytics data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyticsData();
  }, [timeRange]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-border" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">Last 7 days</SelectItem>
            <SelectItem value="30days">Last 30 days</SelectItem>
            <SelectItem value="90days">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {data && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Page Views"
            value={sumValues(data.pageViews)}
            description={`${timeRangeLabel(timeRange)} page views`}
            trend={calculateTrend(data.pageViews)}
          />
          <StatCard
            title="Book Sales"
            value={sumValues(data.sales)}
            description={`${timeRangeLabel(timeRange)} sales`}
            trend={calculateTrend(data.sales)}
            isCurrency
          />
          <StatCard
            title="Unique Visitors"
            value={sumValues(data.visitors)}
            description={`${timeRangeLabel(timeRange)} unique visitors`}
            trend={calculateTrend(data.visitors)}
          />
          <StatCard
            title="Content Engagement"
            value={averageValues(data.contentEngagement)}
            description="Avg. engagement score"
            trend={calculateTrend(data.contentEngagement)}
          />
        </div>
      )}

      <Tabs defaultValue="pageViews" className="space-y-6">
        <TabsList>
          <TabsTrigger value="pageViews">Page Views</TabsTrigger>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="visitors">Visitors</TabsTrigger>
          <TabsTrigger value="distribution">Sales Distribution</TabsTrigger>
          <TabsTrigger value="comparison">Metrics Comparison</TabsTrigger>
          <TabsTrigger value="cumulative">Cumulative Trends</TabsTrigger>
        </TabsList>

        {data && (
          <>
            <TabsContent value="pageViews" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Page Views Over Time</CardTitle>
                  <CardDescription>Track page views over the selected time period</CardDescription>
                </CardHeader>
                <CardContent className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={data.pageViews}
                      margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Area 
                        type="monotone" 
                        dataKey="value" 
                        name="Page Views"
                        stroke="#8884d8" 
                        fill="#8884d8" 
                        activeDot={{ r: 8 }} 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="sales" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Sales Performance</CardTitle>
                  <CardDescription>Track book sales over the selected time period</CardDescription>
                </CardHeader>
                <CardContent className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={data.sales}
                      margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                      <Legend />
                      <Bar 
                        dataKey="value" 
                        name="Sales" 
                        fill="#82ca9d" 
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="visitors" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Visitor Trends</CardTitle>
                  <CardDescription>Track unique visitors over the selected time period</CardDescription>
                </CardHeader>
                <CardContent className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={data.visitors}
                      margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        name="Visitors"
                        stroke="#ff7300" 
                        activeDot={{ r: 8 }} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="distribution" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Book Sales Distribution</CardTitle>
                  <CardDescription>Distribution of book sales by format</CardDescription>
                </CardHeader>
                <CardContent className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={data.bookSales}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={150}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {data.bookSales.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [value, 'Sales']} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="comparison" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Metrics Comparison</CardTitle>
                  <CardDescription>Radar chart comparing key performance metrics</CardDescription>
                </CardHeader>
                <CardContent className="h-[500px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={generateRadarData(data)}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="metric" />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} />
                      <Radar
                        name="Current Period"
                        dataKey="value"
                        stroke="#8884d8"
                        fill="#8884d8"
                        fillOpacity={0.6}
                      />
                      <Radar
                        name="Previous Period"
                        dataKey="prevValue"
                        stroke="#82ca9d"
                        fill="#82ca9d"
                        fillOpacity={0.6}
                      />
                      <Legend />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="cumulative" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Cumulative Trends</CardTitle>
                  <CardDescription>Stacked area chart showing cumulative growth over time</CardDescription>
                </CardHeader>
                <CardContent className="h-[500px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart
                      data={generateCumulativeData(data)}
                      margin={{
                        top: 20,
                        right: 20,
                        bottom: 20,
                        left: 20,
                      }}
                    >
                      <CartesianGrid stroke="#f5f5f5" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="pageViews"
                        stackId="1"
                        stroke="#8884d8"
                        fill="#8884d8"
                      />
                      <Area
                        type="monotone"
                        dataKey="visitors"
                        stackId="1"
                        stroke="#82ca9d"
                        fill="#82ca9d"
                      />
                      <Area
                        type="monotone"
                        dataKey="engagement"
                        stackId="1"
                        stroke="#ffc658"
                        fill="#ffc658"
                      />
                      <Line
                        type="monotone"
                        dataKey="sales"
                        stroke="#ff7300"
                        activeDot={{ r: 8 }}
                      />
                      <Scatter dataKey="sales" fill="red" />
                    </ComposedChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
          </>
        )}
      </Tabs>
    </div>
  );
}

// Helper components and functions

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

interface StatCardProps {
  title: string;
  value: number;
  description: string;
  trend: number;
  isCurrency?: boolean;
}

function StatCard({ title, value, description, trend, isCurrency = false }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {isCurrency ? `$${value.toLocaleString()}` : value.toLocaleString()}
        </div>
        <p className="text-xs text-muted-foreground">{description}</p>
        <div className={`flex items-center text-xs mt-1 ${trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}% from previous period
        </div>
      </CardContent>
    </Card>
  );
}

// Custom label for pie chart
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

// Helper functions for data manipulation

function sumValues(data: DataPoint[]): number {
  return data.reduce((sum, item) => sum + item.value, 0);
}

function averageValues(data: DataPoint[]): number {
  if (data.length === 0) return 0;
  return Math.round(sumValues(data) / data.length);
}

function calculateTrend(data: DataPoint[]): number {
  if (data.length < 2) return 0;
  
  const half = Math.floor(data.length / 2);
  const firstHalf = data.slice(0, half);
  const secondHalf = data.slice(half);
  
  const firstHalfSum = sumValues(firstHalf);
  const secondHalfSum = sumValues(secondHalf);
  
  if (firstHalfSum === 0) return 0;
  
  const percentChange = ((secondHalfSum - firstHalfSum) / firstHalfSum) * 100;
  return Math.round(percentChange);
}

function timeRangeLabel(range: string): string {
  switch (range) {
    case '7days': return 'Last 7 days';
    case '30days': return 'Last 30 days';
    case '90days': return 'Last 90 days';
    default: return '';
  }
}

// Function to generate time series data
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