import { useState, useEffect, useRef } from "react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  CalendarDays, 
  Check, 
  Clock,
  Target,
  Star,
  Award,
  Gift,
  Users,
  BookOpen,
  Video,
  Heart,
  Music,
  Lightbulb,
  Zap,
  Rocket
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { Milestone } from "@/types/milestones";

interface MilestoneTrackerProps {
  milestones: Milestone[];
}

// Map of icon names to Lucide React components
const iconMap: Record<string, React.ReactNode> = {
  star: <Star className="h-5 w-5" />,
  award: <Award className="h-5 w-5" />,
  gift: <Gift className="h-5 w-5" />,
  users: <Users className="h-5 w-5" />,
  book: <BookOpen className="h-5 w-5" />,
  video: <Video className="h-5 w-5" />,
  heart: <Heart className="h-5 w-5" />,
  music: <Music className="h-5 w-5" />,
  idea: <Lightbulb className="h-5 w-5" />,
  zap: <Zap className="h-5 w-5" />,
  rocket: <Rocket className="h-5 w-5" />,
  check: <Check className="h-5 w-5" />,
  target: <Target className="h-5 w-5" />,
  calendar: <CalendarDays className="h-5 w-5" />,
};

export default function MilestoneTracker({ milestones }: MilestoneTrackerProps) {
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null);
  const [sortedMilestones, setSortedMilestones] = useState<Milestone[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sort milestones by order when they change
  useEffect(() => {
    if (milestones) {
      const sorted = [...milestones].sort((a, b) => a.order - b.order);
      setSortedMilestones(sorted);
      
      // Select the most recently updated milestone by default
      if (sorted.length > 0 && !selectedMilestone) {
        const mostRecent = [...sorted].sort((a, b) => 
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        )[0];
        setSelectedMilestone(mostRecent);
      }
    }
  }, [milestones]);

  // Animate to selected milestone
  useEffect(() => {
    if (selectedMilestone && containerRef.current) {
      const index = sortedMilestones.findIndex(m => m.id === selectedMilestone.id);
      const itemHeight = 80; // Approximate height of each milestone item
      const scrollPosition = Math.max(0, index * itemHeight - 100); // Center the selected item
      
      containerRef.current.scrollTo({
        top: scrollPosition,
        behavior: 'smooth'
      });
    }
  }, [selectedMilestone]);
  
  // Format date helper
  const formatDate = (dateString?: string) => {
    if (!dateString) return "TBD";
    
    try {
      return format(new Date(dateString), "MMMM d, yyyy");
    } catch (e) {
      return "Invalid date";
    }
  };
  
  // Get icon component from icon name
  const getIcon = (iconName?: string) => {
    if (!iconName || !iconMap[iconName]) {
      return <Target className="h-5 w-5" />;
    }
    return iconMap[iconName];
  };

  // Calculate overall progress
  const calculateOverallProgress = () => {
    if (!sortedMilestones.length) return 0;
    
    const completedMilestones = sortedMilestones.filter(m => m.completed).length;
    const inProgressValue = sortedMilestones
      .filter(m => !m.completed)
      .reduce((acc, m) => acc + m.progress, 0) / 100;
    
    return Math.min(
      100,
      Math.round(
        ((completedMilestones + inProgressValue) / sortedMilestones.length) * 100
      )
    );
  };

  return (
    <div className="space-y-8">
      {/* Overall progress bar */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-medium text-gray-500">Overall Progress</h3>
          <span className="text-sm font-medium">{calculateOverallProgress()}%</span>
        </div>
        <Progress value={calculateOverallProgress()} className="h-2" />
      </div>
      
      {/* Main milestone tracking section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Timeline */}
        <div 
          ref={containerRef}
          className="order-2 md:order-1 border rounded-lg p-4 max-h-[500px] overflow-y-auto space-y-4"
        >
          {sortedMilestones.map((milestone, index) => (
            <div 
              key={milestone.id}
              className={`relative cursor-pointer transition-all duration-200 ${
                selectedMilestone?.id === milestone.id 
                  ? 'scale-105 shadow-md' 
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => setSelectedMilestone(milestone)}
            >
              {/* Connecting line */}
              {index < sortedMilestones.length - 1 && (
                <div 
                  className="absolute left-3.5 top-10 w-1 bg-gray-200 h-full"
                  style={{
                    background: milestone.completed 
                      ? `linear-gradient(to bottom, ${milestone.color || '#10b981'}, #d1d5db)` 
                      : '#d1d5db'
                  }}
                />
              )}
              
              {/* Milestone item */}
              <div className="flex gap-4 items-start p-2 rounded-lg">
                {/* Icon/status marker */}
                <div 
                  className={`relative z-10 rounded-full p-2 ${
                    milestone.completed 
                      ? milestone.color ? `bg-${milestone.color}` : 'bg-green-500' 
                      : 'bg-gray-200'
                  } text-white`}
                  style={
                    milestone.color && milestone.completed 
                      ? { backgroundColor: milestone.color } 
                      : undefined
                  }
                >
                  {milestone.completed 
                    ? <Check className="h-4 w-4" /> 
                    : getIcon(milestone.iconName)}
                </div>
                
                {/* Content */}
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-gray-900">{milestone.title}</h4>
                    <Badge 
                      variant={milestone.completed ? 'success' : 'outline'} 
                      className="ml-2 text-xs"
                    >
                      {milestone.completed ? 'Completed' : `${milestone.progress}%`}
                    </Badge>
                  </div>
                  
                  {/* Date information */}
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    {milestone.completed ? (
                      <>
                        <CalendarDays className="h-3 w-3 mr-1" />
                        <span>Reached on {formatDate(milestone.dateReached)}</span>
                      </>
                    ) : milestone.targetDate ? (
                      <>
                        <Clock className="h-3 w-3 mr-1" />
                        <span>Target: {formatDate(milestone.targetDate)}</span>
                      </>
                    ) : (
                      <>
                        <Clock className="h-3 w-3 mr-1" />
                        <span>In progress</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Selected milestone details */}
        <AnimatePresence mode="wait">
          {selectedMilestone && (
            <motion.div 
              key={selectedMilestone.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="col-span-1 md:col-span-2 order-1 md:order-2"
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2 mb-4">
                      <div 
                        className={`rounded-full p-2 ${
                          selectedMilestone.completed 
                            ? 'bg-green-500' 
                            : 'bg-gray-200'
                        } text-white`}
                        style={
                          selectedMilestone.color && selectedMilestone.completed 
                            ? { backgroundColor: selectedMilestone.color } 
                            : undefined
                        }
                      >
                        {selectedMilestone.completed 
                          ? <Check className="h-5 w-5" /> 
                          : getIcon(selectedMilestone.iconName)}
                      </div>
                      <h3 className="text-xl font-bold">{selectedMilestone.title}</h3>
                    </div>
                    
                    <Badge 
                      variant={selectedMilestone.completed ? 'success' : 'outline'}
                      className="text-sm"
                    >
                      {selectedMilestone.completed ? 'Completed' : `${selectedMilestone.progress}%`}
                    </Badge>
                  </div>
                  
                  {/* Description */}
                  <p className="text-gray-600 mb-6">{selectedMilestone.description || 'No description available.'}</p>
                  
                  {/* Progress indicator for in-progress milestones */}
                  {!selectedMilestone.completed && (
                    <div className="mb-6 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Progress</span>
                        <span className="text-sm font-medium">{selectedMilestone.progress}%</span>
                      </div>
                      <Progress 
                        value={selectedMilestone.progress} 
                        className="h-2" 
                        indicatorClassName={selectedMilestone.color ? `bg-[${selectedMilestone.color}]` : undefined}
                        style={
                          selectedMilestone.color 
                            ? { '--progress-color': selectedMilestone.color } as React.CSSProperties
                            : undefined
                        }
                      />
                    </div>
                  )}
                  
                  {/* Date information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedMilestone.dateReached && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <CalendarDays className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="font-medium">Date Reached</p>
                          <p>{formatDate(selectedMilestone.dateReached)}</p>
                        </div>
                      </div>
                    )}
                    
                    {selectedMilestone.targetDate && !selectedMilestone.completed && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Target className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="font-medium">Target Date</p>
                          <p>{formatDate(selectedMilestone.targetDate)}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}