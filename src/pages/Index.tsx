import { useState } from "react";
import Navigation from "@/components/Navigation";
import HomePage from "@/components/HomePage";
import SearchPage from "@/components/SearchPage";
import DownloadManager from "@/components/DownloadManager";
import SettingsPage from "@/components/SettingsPage";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");
  const { toast } = useToast();

  const [downloads] = useState([
    {
      id: "1",
      title: "Clean Code",
      author: "Robert C. Martin",
      status: "downloading" as const,
      progress: 67,
      speed: "2.4 MB/s",
      eta: "5m 23s",
      size: "12.8 MB",
      client: "qbittorrent" as const
    },
    {
      id: "2", 
      title: "The Pragmatic Programmer",
      author: "David Thomas",
      status: "queued" as const,
      progress: 0,
      speed: "",
      eta: "",
      size: "15.2 MB",
      client: "transmission" as const
    },
    {
      id: "3",
      title: "Design Patterns",
      author: "Gang of Four", 
      status: "completed" as const,
      progress: 100,
      speed: "",
      eta: "",
      size: "18.5 MB",
      client: "qbittorrent" as const
    }
  ]);

  const handleDownload = (bookId: string) => {
    console.log("Starting download for book:", bookId);
    toast({
      title: "Download Started",
      description: "Book has been added to your download queue.",
    });
  };

  const handleDownloadAction = (action: string) => (id: string) => {
    console.log(`${action} download:`, id);
    toast({
      title: `Download ${action}`,
      description: `Download has been ${action}d.`,
    });
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case "home":
        return <HomePage onTabChange={setActiveTab} />;
      case "search":
        return <SearchPage onDownload={handleDownload} />;
      case "downloads":
        return (
          <DownloadManager
            downloads={downloads}
            onPause={handleDownloadAction("pause")}
            onResume={handleDownloadAction("resume")}
            onCancel={handleDownloadAction("cancel")}
            onRetry={handleDownloadAction("retry")}
          />
        );
      case "settings":
        return <SettingsPage />;
      case "library":
      case "trending":
      case "recent":
      case "favorites":
        return (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-library-text-primary mb-2">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
              </h2>
              <p className="text-library-text-secondary">
                This section is coming soon!
              </p>
            </div>
          </div>
        );
      default:
        return <HomePage onTabChange={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Navigation 
          activeTab={activeTab} 
          onTabChange={setActiveTab}
          downloadQueue={downloads.filter(d => d.status !== "completed").length}
        />
        
        <main className="flex-1 lg:ml-0">
          <div className="p-4 lg:p-8 max-w-7xl mx-auto">
            {renderActiveTab()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
