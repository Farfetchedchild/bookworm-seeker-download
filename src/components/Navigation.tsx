import { useState } from "react";
import { 
  Home, 
  Search, 
  Library, 
  Download, 
  Settings, 
  BookOpen,
  TrendingUp,
  Clock,
  Star,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  downloadQueue: number;
}

const Navigation = ({ activeTab, onTabChange, downloadQueue }: NavigationProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "search", label: "Search", icon: Search },
    { id: "library", label: "My Library", icon: Library },
    { id: "downloads", label: "Downloads", icon: Download, badge: downloadQueue },
    { id: "trending", label: "Trending", icon: TrendingUp },
    { id: "recent", label: "Recent", icon: Clock },
    { id: "favorites", label: "Favorites", icon: Star },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-background border-b border-border/50">
        <div className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">LibraryEngine</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleMobileMenu}
          className="lg:hidden"
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
          <Card className="m-4 p-4 bg-background border-border/50">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-primary" />
                <span className="font-bold text-lg">LibraryEngine</span>
              </div>
              <Button variant="ghost" size="sm" onClick={toggleMobileMenu}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <nav className="space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={activeTab === item.id ? "default" : "ghost"}
                    className="w-full justify-start gap-3"
                    onClick={() => {
                      onTabChange(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <Icon className="h-5 w-5" />
                    {item.label}
                    {item.badge && item.badge > 0 && (
                      <Badge variant="secondary" className="ml-auto">
                        {item.badge}
                      </Badge>
                    )}
                  </Button>
                );
              })}
            </nav>
          </Card>
        </div>
      )}

      {/* Desktop Sidebar */}
      <Card className="hidden lg:flex flex-col w-64 h-screen bg-gradient-surface border-r border-border/50 sticky top-0">
        <div className="p-6 border-b border-border/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-primary rounded-lg">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-xl text-library-text-primary">LibraryEngine</h1>
              <p className="text-xs text-library-text-secondary">Book Search & Download</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"}
                className={`w-full justify-start gap-3 h-11 ${
                  activeTab === item.id 
                    ? "bg-gradient-primary text-white shadow-glow" 
                    : "hover:bg-library-surface-hover text-library-text-primary"
                }`}
                onClick={() => onTabChange(item.id)}
              >
                <Icon className="h-5 w-5" />
                {item.label}
                {item.badge && item.badge > 0 && (
                  <Badge 
                    variant={activeTab === item.id ? "secondary" : "default"} 
                    className="ml-auto"
                  >
                    {item.badge}
                  </Badge>
                )}
              </Button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border/50">
          <div className="text-xs text-library-text-secondary space-y-1">
            <p>Version 1.0.0</p>
            <p>© 2024 LibraryEngine</p>
          </div>
        </div>
      </Card>
    </>
  );
};

export default Navigation;