import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import MilestoneTracker from "@/components/MilestoneTracker";
import { Milestone } from "@/types/milestones";
import { Helmet } from "react-helmet";
import { Container } from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

export default function MilestonesPage() {
  const { data: milestones, isLoading } = useQuery<Milestone[]>({ 
    queryKey: ["/api/content/milestones"],
  });

  const completedCount = milestones?.filter(m => m.completed).length || 0;
  const totalCount = milestones?.length || 0;
  const completionPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <>
      <Helmet>
        <title>Our Journey - Milestones | Luke Mikic</title>
        <meta name="description" content="Track our journey and progress as we reach key milestones." />
      </Helmet>

      <Container className="py-16 px-4">
        <h1 className="text-4xl font-bold mb-2 text-center">Our Journey</h1>
        <p className="text-lg text-gray-600 mb-8 text-center max-w-2xl mx-auto">
          Follow along as we track our progress and celebrate key milestones along the way.
        </p>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
          </div>
        ) : milestones && milestones.length > 0 ? (
          <>
            <div className="mb-8 flex flex-col items-center">
              <div className="flex items-center justify-center mb-2 gap-3">
                <Badge variant="outline" className="text-base px-3 py-1">
                  {completedCount} of {totalCount} completed
                </Badge>
                <Badge variant="success" className="text-base px-3 py-1">
                  {completionPercentage}% complete
                </Badge>
              </div>
              <Button 
                variant="ghost" 
                className="text-sm text-gray-500 hover:text-gray-700"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                Scroll to see all milestones
              </Button>
            </div>

            <div className="max-w-4xl mx-auto">
              <MilestoneTracker milestones={milestones} />
            </div>
          </>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <p>No milestones are available yet. Check back soon!</p>
          </div>
        )}
      </Container>
    </>
  );
}