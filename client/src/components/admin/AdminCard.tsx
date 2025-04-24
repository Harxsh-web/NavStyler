import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { RefreshCw, ExternalLink } from "lucide-react";
import { useRefreshAdminContent } from "@/hooks/use-content";

interface AdminCardProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export function AdminCard({ title, description, children }: AdminCardProps) {
  // Get refresh mutation
  const refreshContentMutation = useRefreshAdminContent();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription className="mt-1">{description}</CardDescription>}
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="default" 
            size="sm" 
            className="gap-1 bg-blue-600 text-white hover:bg-blue-700"
            onClick={() => refreshContentMutation.mutate()}
            disabled={refreshContentMutation.isPending}
          >
            <RefreshCw className={`h-4 w-4 ${refreshContentMutation.isPending ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button 
            variant="default" 
            size="sm" 
            className="gap-1 bg-blue-600 text-white hover:bg-blue-700"
            onClick={() => window.open('/', '_blank')}
          >
            <ExternalLink className="h-4 w-4" />
            View Site
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
}