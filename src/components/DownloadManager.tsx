import { useState } from "react";
import { Play, Pause, X, Download, RotateCcw, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface DownloadItem {
  id: string;
  title: string;
  author: string;
  status: "queued" | "downloading" | "paused" | "completed" | "error";
  progress: number;
  speed: string;
  eta: string;
  size: string;
  client: "qbittorrent" | "transmission" | "direct";
}

interface DownloadManagerProps {
  downloads: DownloadItem[];
  onPause: (id: string) => void;
  onResume: (id: string) => void;
  onCancel: (id: string) => void;
  onRetry: (id: string) => void;
}

const DownloadManager = ({ 
  downloads, 
  onPause, 
  onResume, 
  onCancel, 
  onRetry 
}: DownloadManagerProps) => {
  const { toast } = useToast();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "downloading":
        return <Download className="h-4 w-4 text-primary animate-pulse" />;
      case "completed":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "error":
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      case "paused":
        return <Pause className="h-4 w-4 text-yellow-500" />;
      default:
        return <Download className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "downloading":
        return "bg-primary/20 text-primary";
      case "completed":
        return "bg-green-500/20 text-green-500";
      case "error":
        return "bg-destructive/20 text-destructive";
      case "paused":
        return "bg-yellow-500/20 text-yellow-500";
      default:
        return "bg-muted/20 text-muted-foreground";
    }
  };

  const handleAction = (action: string, download: DownloadItem) => {
    switch (action) {
      case "pause":
        onPause(download.id);
        toast({
          title: "Download Paused",
          description: `"${download.title}" has been paused.`,
        });
        break;
      case "resume":
        onResume(download.id);
        toast({
          title: "Download Resumed",
          description: `"${download.title}" has been resumed.`,
        });
        break;
      case "cancel":
        onCancel(download.id);
        toast({
          title: "Download Cancelled",
          description: `"${download.title}" has been cancelled.`,
          variant: "destructive",
        });
        break;
      case "retry":
        onRetry(download.id);
        toast({
          title: "Download Retrying",
          description: `Retrying download for "${download.title}".`,
        });
        break;
    }
  };

  const activeDownloads = downloads.filter(d => d.status === "downloading").length;
  const completedDownloads = downloads.filter(d => d.status === "completed").length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-surface border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-library-text-secondary">Active Downloads</p>
                <p className="text-2xl font-bold text-primary">{activeDownloads}</p>
              </div>
              <Download className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-surface border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-library-text-secondary">Completed</p>
                <p className="text-2xl font-bold text-green-500">{completedDownloads}</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-surface border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-library-text-secondary">Total Queue</p>
                <p className="text-2xl font-bold text-library-text-primary">{downloads.length}</p>
              </div>
              <div className="p-2 bg-gradient-primary rounded-lg">
                <Download className="h-4 w-4 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-surface border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-library-text-primary">
            <Download className="h-5 w-5" />
            Download Queue
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {downloads.length === 0 ? (
            <div className="text-center py-12">
              <Download className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-library-text-secondary">No downloads in queue</p>
            </div>
          ) : (
            downloads.map((download) => (
              <Card key={download.id} className="bg-background/50 border-border/30">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        {getStatusIcon(download.status)}
                        <h3 className="font-medium text-library-text-primary truncate">
                          {download.title}
                        </h3>
                        <Badge className={getStatusColor(download.status)}>
                          {download.status}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {download.client}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-library-text-secondary mb-3">
                        by {download.author}
                      </p>

                      {download.status === "downloading" && (
                        <div className="space-y-2">
                          <Progress value={download.progress} className="h-2" />
                          <div className="flex justify-between text-xs text-library-text-secondary">
                            <span>{download.progress}% complete</span>
                            <span>{download.speed} • ETA: {download.eta}</span>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center gap-4 mt-3 text-xs text-library-text-secondary">
                        <span>Size: {download.size}</span>
                      </div>
                    </div>

                    <div className="flex gap-1">
                      {download.status === "downloading" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleAction("pause", download)}
                        >
                          <Pause className="h-4 w-4" />
                        </Button>
                      )}
                      
                      {download.status === "paused" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleAction("resume", download)}
                        >
                          <Play className="h-4 w-4" />
                        </Button>
                      )}

                      {download.status === "error" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleAction("retry", download)}
                        >
                          <RotateCcw className="h-4 w-4" />
                        </Button>
                      )}

                      {download.status !== "completed" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleAction("cancel", download)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DownloadManager;