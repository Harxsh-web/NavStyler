import { useEffect, useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  Award, 
  Rocket, 
  Star, 
  Trophy, 
  Target,
  BookOpen,
  Zap,
  CreditCard 
} from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

// Icon mapping for milestone icons
const iconMap: Record<string, React.ReactNode> = {
  check: <CheckCircle2 className="w-5 h-5" />,
  circle: <Circle className="w-5 h-5" />,
  clock: <Clock className="w-5 h-5" />,
  award: <Award className="w-5 h-5" />,
  rocket: <Rocket className="w-5 h-5" />,
  star: <Star className="w-5 h-5" />,
  trophy: <Trophy className="w-5 h-5" />,
  target: <Target className="w-5 h-5" />,
  book: <BookOpen className="w-5 h-5" />,
  zap: <Zap className="w-5 h-5" />,
  card: <CreditCard className="w-5 h-5" />
};

interface Milestone {
  id: number;
  title: string;
  description?: string;
  dateReached?: string;
  targetDate?: string;
  iconName?: string;
  order: number;
  completed: boolean;
  progress: number;
  color: string;
  updatedAt: string;
}

interface MilestoneTrackerProps {
  className?: string;
}

export default function MilestoneTracker({ className }: MilestoneTrackerProps) {
  // Fetch milestones
  const { data: milestones, isLoading, error } = useQuery<Milestone[]>({
    queryKey: ["/api/content/milestones"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/content/milestones");
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch milestones");
      }
      return await response.json();
    }
  });

  const [animatedMilestones, setAnimatedMilestones] = useState<Milestone[]>([]);
  const { toast } = useToast();

  // Animate progress bars one by one with delay
  useEffect(() => {
    if (milestones && milestones.length > 0) {
      // Start with all milestones at 0 progress
      setAnimatedMilestones(milestones.map(m => ({ ...m, progress: 0 })));
      
      // Animate each milestone with a delay
      milestones.forEach((milestone, index) => {
        setTimeout(() => {
          setAnimatedMilestones(prev => 
            prev.map((m, i) => 
              i === index ? { ...m, progress: milestone.progress } : m
            )
          );
        }, 500 + (index * 300)); // 500ms initial delay, then 300ms per milestone
      });
    }
  }, [milestones]);

  // Show a placeholder skeleton while loading
  if (isLoading) {
    return (
      <Card className={className}>
        <CardHeader>
          <div className="h-6 w-1/3 bg-gray-200 animate-pulse rounded"></div>
          <div className="h-4 w-2/3 bg-gray-200 animate-pulse rounded"></div>
        </CardHeader>
        <CardContent className="space-y-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="space-y-2">
              <div className="flex justify-between">
                <div className="h-5 w-1/4 bg-gray-200 animate-pulse rounded"></div>
                <div className="h-5 w-1/6 bg-gray-200 animate-pulse rounded"></div>
              </div>
              <div className="h-2 w-full bg-gray-200 animate-pulse rounded"></div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  // Show an error message if loading failed
  if (error) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Milestones</CardTitle>
          <CardDescription>Error loading milestones</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-red-500">Failed to load milestones. Please try again later.</p>
        </CardContent>
      </Card>
    );
  }

  // If no milestones, show empty state
  if (!animatedMilestones || animatedMilestones.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Milestones</CardTitle>
          <CardDescription>Track our progress</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground py-8">No milestones yet</p>
        </CardContent>
      </Card>
    );
  }

  // Format date for display
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return format(new Date(dateString), 'MMM dd, yyyy');
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Our Milestones</CardTitle>
        <CardDescription>Track our journey and progress</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {animatedMilestones.map((milestone) => (
          <div key={milestone.id} className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div style={{ color: milestone.color }} className="transition-colors">
                  {milestone.iconName && iconMap[milestone.iconName] || <Target className="w-5 h-5" />}
                </div>
                <span className="font-medium">{milestone.title}</span>
              </div>
              <div className="flex items-center gap-2">
                {milestone.completed && (
                  <Badge variant="success" className="bg-green-100 text-green-800 hover:bg-green-200">
                    Completed
                  </Badge>
                )}
                {milestone.targetDate && !milestone.completed && (
                  <span className="text-xs text-muted-foreground">
                    {formatDate(milestone.targetDate)}
                  </span>
                )}
                {milestone.dateReached && (
                  <span className="text-xs text-muted-foreground">
                    {formatDate(milestone.dateReached)}
                  </span>
                )}
              </div>
            </div>
            <div className="relative">
              <Progress 
                value={milestone.progress} 
                className="h-2 transition-all duration-1000 ease-out"
                indicatorClassName="transition-all duration-1000 ease-out"
                style={{ "--progress-color": milestone.color } as React.CSSProperties}
              />
              {milestone.description && (
                <div className="text-xs text-muted-foreground mt-1">{milestone.description}</div>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}