import { MilestoneDemo } from '@/components/MilestoneDemo';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

export default function MilestonesPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto pt-8 pb-16">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Achievement Celebrations</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Interactive celebrations for various milestones and achievements that can be integrated throughout the application.
          </p>
          
          <div className="mt-6">
            <Link href="/">
              <Button variant="outline" className="mr-4">
                Back to Home
              </Button>
            </Link>
            
            <Link href="/admin">
              <Button>
                Admin Dashboard
              </Button>
            </Link>
          </div>
        </div>
        
        <MilestoneDemo />
      </div>
    </div>
  );
}