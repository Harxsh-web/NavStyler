import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Loader2, RefreshCw } from "lucide-react";

// Custom tooltip for charts
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 shadow-sm rounded-md">
        <p className="font-medium">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }}>
            {entry.name}: {entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Colors for the pie chart
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export function AnalyticsPanel() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [refreshing, setRefreshing] = useState(false);
  const [timeRange, setTimeRange] = useState("30");
  const [formattedPageViews, setFormattedPageViews] = useState<any[]>([]);
  const [formattedVisitors, setFormattedVisitors] = useState<any[]>([]);
  const [groupedByPath, setGroupedByPath] = useState<any[]>([]);
  const [groupedBySource, setGroupedBySource] = useState<any[]>([]);

  // Define the summary type
  type AnalyticsSummary = {
    pageViews: number;
    visitors: number;
    topPaths: Array<{path: string; total: number}>;
    topSources: Array<{source: string; total: number}>;
  };

  // Fetch analytics summary
  const { data: summary, isLoading: summaryLoading } = useQuery<AnalyticsSummary>({
    queryKey: ["/api/analytics/summary"],
    enabled: true,
  });

  // Define page view and visitor types
  type PageView = {
    id: number;
    date: string;
    path: string;
    count: number;
  };

  type Visitor = {
    id: number;
    date: string;
    source: string;
    count: number;
  };

  // Fetch page views
  const { data: pageViews, isLoading: pageViewsLoading } = useQuery<PageView[]>({
    queryKey: ["/api/analytics/page-views", { days: timeRange }],
    enabled: true,
  });

  // Fetch visitors
  const { data: visitors, isLoading: visitorsLoading } = useQuery<Visitor[]>({
    queryKey: ["/api/analytics/visitors", { days: timeRange }],
    enabled: true,
  });

  // Process data when it's loaded
  useEffect(() => {
    if (pageViews && Array.isArray(pageViews)) {
      // Group by date and sum counts for each day
      const groupedData = pageViews.reduce((acc: Record<string, any>, item: any) => {
        const date = item.date.split('T')[0];
        if (!acc[date]) {
          acc[date] = { date, count: 0 };
        }
        acc[date].count += Number(item.count);
        return acc;
      }, {});

      // Convert to array and sort by date
      const formattedData = Object.values(groupedData)
        .sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());
      
      setFormattedPageViews(formattedData);

      // Group by path
      const pathGroups = pageViews.reduce((acc: Record<string, any>, item: any) => {
        if (!acc[item.path]) {
          acc[item.path] = { path: item.path, count: 0 };
        }
        acc[item.path].count += Number(item.count);
        return acc;
      }, {});

      // Convert to array, sort by count (descending)
      const pathData = Object.values(pathGroups)
        .sort((a: any, b: any) => b.count - a.count);
      
      setGroupedByPath(pathData);
    }
  }, [pageViews]);

  // Process visitor data
  useEffect(() => {
    if (visitors && Array.isArray(visitors)) {
      // Group by date and sum counts for each day
      const groupedData = visitors.reduce((acc: Record<string, any>, item: any) => {
        const date = item.date.split('T')[0];
        if (!acc[date]) {
          acc[date] = { date, count: 0 };
        }
        acc[date].count += Number(item.count);
        return acc;
      }, {});

      // Convert to array and sort by date
      const formattedData = Object.values(groupedData)
        .sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());
      
      setFormattedVisitors(formattedData);

      // Group by source
      const sourceGroups = visitors.reduce((acc: Record<string, any>, item: any) => {
        if (!acc[item.source]) {
          acc[item.source] = { source: item.source, count: 0 };
        }
        acc[item.source].count += Number(item.count);
        return acc;
      }, {});

      // Convert to array, sort by count (descending)
      const sourceData = Object.values(sourceGroups)
        .sort((a: any, b: any) => b.count - a.count);
      
      setGroupedBySource(sourceData);
    }
  }, [visitors]);

  // Loading state
  if (summaryLoading || pageViewsLoading || visitorsLoading) {
    return (
      <div className="flex justify-center items-center p-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const handleRefresh = async () => {
    if (refreshing) return;
    
    setRefreshing(true);
    
    try {
      // Create a local reference to the things we need
      const qc = queryClient;
      
      // Use Promise.all to refresh all queries simultaneously
      await Promise.all([
        qc.invalidateQueries({ queryKey: ["/api/analytics/summary"] }),
        qc.invalidateQueries({ queryKey: ["/api/analytics/page-views", { days: timeRange }] }),
        qc.invalidateQueries({ queryKey: ["/api/analytics/visitors", { days: timeRange }] })
      ]);
      
      toast({
        title: "Analytics refreshed",
        description: "Data has been updated with the latest information",
        className: "bg-green-50 border-green-200",
      });
    } catch (error) {
      toast({
        title: "Refresh failed",
        description: "There was an error refreshing the analytics data",
        variant: "destructive",
      });
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Page Views Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(summary && typeof summary.pageViews === 'number' ? summary.pageViews.toLocaleString() : '0')}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Total views across all pages
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Unique Visitors Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(summary && typeof summary.visitors === 'number' ? summary.visitors.toLocaleString() : '0')}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Across all traffic sources
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Top Page</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold truncate">
              {(summary && Array.isArray(summary.topPaths) && summary.topPaths.length > 0 
                ? summary.topPaths[0].path || 'Home' : 'Home')}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {(summary && Array.isArray(summary.topPaths) && summary.topPaths.length > 0 && summary.topPaths[0].total
                ? Number(summary.topPaths[0].total).toLocaleString() : '0')} views
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Top Source</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize">
              {(summary && Array.isArray(summary.topSources) && summary.topSources.length > 0
                ? summary.topSources[0].source || 'Direct' : 'Direct')}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {(summary && Array.isArray(summary.topSources) && summary.topSources.length > 0 && summary.topSources[0].total
                ? Number(summary.topSources[0].total).toLocaleString() : '0')} visitors
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Time Range Selector and Refresh Button */}
      <div className="flex justify-between items-center">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleRefresh}
          className="text-xs flex items-center gap-1"
          disabled={refreshing}
        >
          {refreshing ? (
            <>
              <Loader2 className="h-3 w-3 animate-spin mr-1" />
              Refreshing...
            </>
          ) : (
            <>
              <RefreshCw className="h-3 w-3 mr-1" />
              Refresh Data
            </>
          )}
        </Button>
        
        <div className="flex items-center space-x-3 bg-gray-100 p-0.5 rounded-md">
          <Button
            variant={timeRange === "7" ? "default" : "ghost"}
            size="sm"
            onClick={() => setTimeRange("7")}
            className="text-xs"
          >
            7 days
          </Button>
          <Button
            variant={timeRange === "14" ? "default" : "ghost"}
            size="sm"
            onClick={() => setTimeRange("14")}
            className="text-xs"
          >
            14 days
          </Button>
          <Button
            variant={timeRange === "30" ? "default" : "ghost"}
            size="sm"
            onClick={() => setTimeRange("30")}
            className="text-xs"
          >
            30 days
          </Button>
        </div>
      </div>

      {/* Charts */}
      <Tabs defaultValue="pageviews" className="w-full">
        <TabsList className="mb-4 space-x-3">
          <TabsTrigger value="pageviews">Page Views</TabsTrigger>
          <TabsTrigger value="visitors">Visitors</TabsTrigger>
          <TabsTrigger value="distribution">Traffic Distribution</TabsTrigger>
        </TabsList>

        {/* Page Views Tab */}
        <TabsContent value="pageviews">
          <Card>
            <CardHeader>
              <CardTitle>Page Views Trend</CardTitle>
              <CardDescription>
                Daily page views for the last {timeRange} days
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-0">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={formattedPageViews}
                    margin={{ top: 5, right: 30, left: 20, bottom: 35 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="date"
                      tick={{ fontSize: 12 }}
                      tickFormatter={(date) => {
                        const d = new Date(date);
                        return `${d.getMonth() + 1}/${d.getDate()}`;
                      }}
                      angle={-45}
                      textAnchor="end"
                    />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="count"
                      name="Page Views"
                      stroke="#0ea5e9"
                      activeDot={{ r: 8 }}
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Visitors Tab */}
        <TabsContent value="visitors">
          <Card>
            <CardHeader>
              <CardTitle>Visitor Trend</CardTitle>
              <CardDescription>
                Daily unique visitors for the last {timeRange} days
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-0">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={formattedVisitors}
                    margin={{ top: 5, right: 30, left: 20, bottom: 35 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="date"
                      tick={{ fontSize: 12 }}
                      tickFormatter={(date) => {
                        const d = new Date(date);
                        return `${d.getMonth() + 1}/${d.getDate()}`;
                      }}
                      angle={-45}
                      textAnchor="end"
                    />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="count"
                      name="Visitors"
                      stroke="#10b981"
                      activeDot={{ r: 8 }}
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Distribution Tab */}
        <TabsContent value="distribution">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pages Pie Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Page Distribution</CardTitle>
                <CardDescription>
                  Traffic distribution across pages
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={groupedByPath}
                        dataKey="count"
                        nameKey="path"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label={(entry) => entry.path}
                      >
                        {groupedByPath.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Sources Bar Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Traffic Sources</CardTitle>
                <CardDescription>
                  Visitor distribution by source
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={groupedBySource}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 60, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis 
                        dataKey="source" 
                        type="category" 
                        tick={{ fontSize: 12 }}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar 
                        dataKey="count" 
                        fill="#8884d8" 
                        name="Visitors"
                      >
                        {groupedBySource.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}