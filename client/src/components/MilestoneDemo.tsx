import { useState } from 'react';
import { Celebration, useCelebration } from '@/components/ui/Celebration';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PartyPopper, Sparkles, Rocket, Trophy } from 'lucide-react';

export function MilestoneDemo() {
  const [smallTrigger, setSmallTrigger] = useState(false);
  const [mediumTrigger, setMediumTrigger] = useState(false);
  const [largeTrigger, setLargeTrigger] = useState(false);
  
  // Using the hook version for direct celebration
  const celebrate = useCelebration();

  // Reset functions after celebration
  const triggerSmall = () => {
    setSmallTrigger(true);
    setTimeout(() => setSmallTrigger(false), 2000);
  };

  const triggerMedium = () => {
    setMediumTrigger(true);
    setTimeout(() => setMediumTrigger(false), 2000);
  };

  const triggerLarge = () => {
    setLargeTrigger(true);
    setTimeout(() => setLargeTrigger(false), 3000);
  };

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Milestone Celebrations
      </h2>
      
      <p className="text-center text-gray-600 mb-8">
        Interactive demos of different celebration effects for milestones and achievements
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Small Celebration Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PartyPopper className="h-5 w-5 text-yellow-500" />
              Small Achievement
            </CardTitle>
            <CardDescription>
              A subtle celebration for completing minor tasks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={triggerSmall} 
              className="w-full"
              variant="outline"
            >
              Complete Task
            </Button>
            
            <Celebration 
              trigger={smallTrigger} 
              type="small" 
              message={smallTrigger ? "Nice work! Keep it up!" : ""}
            />
          </CardContent>
        </Card>
        
        {/* Medium Celebration Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-blue-500" />
              Medium Achievement
            </CardTitle>
            <CardDescription>
              A more noticeable celebration for significant milestones
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={triggerMedium} 
              className="w-full"
              variant="default"
            >
              Reach Milestone
            </Button>
            
            <Celebration 
              trigger={mediumTrigger} 
              type="medium" 
              message={mediumTrigger ? "Great achievement! You're making progress!" : ""}
            />
          </CardContent>
        </Card>
        
        {/* Large Celebration Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-green-500" />
              Major Achievement
            </CardTitle>
            <CardDescription>
              An impressive fireworks display for major achievements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={triggerLarge}
              className="w-full"
              variant="destructive"
            >
              Win Trophy
            </Button>
            
            <Celebration 
              trigger={largeTrigger} 
              type="large" 
              message={largeTrigger ? "Outstanding! You've reached a major milestone!" : ""}
            />
          </CardContent>
        </Card>
      </div>
      
      {/* Direct Celebration Demo */}
      <Card className="mt-10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Rocket className="h-5 w-5 text-purple-500" />
            Create Your Own Celebration
          </CardTitle>
          <CardDescription>
            Trigger celebrations directly with a custom message
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 flex-wrap">
            <Button 
              onClick={() => celebrate('small')}
              variant="outline"
            >
              Small Celebration
            </Button>
            
            <Button 
              onClick={() => celebrate('medium')}
              variant="default"
            >
              Medium Celebration
            </Button>
            
            <Button 
              onClick={() => celebrate('large')}
              variant="destructive"
            >
              Large Celebration
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}