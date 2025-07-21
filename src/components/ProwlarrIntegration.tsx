import { useState } from "react";
import { Server, Search, Shield, AlertTriangle, CheckCircle2, Settings, TestTube, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface Indexer {
  id: string;
  name: string;
  type: "public" | "private" | "semi-private";
  status: "active" | "inactive" | "error";
  categories: string[];
  lastTest: string;
  searchCount: number;
  grabCount: number;
  priority: number;
  apiKey?: string;
  url?: string;
  username?: string;
  enabled: boolean;
}

const ProwlarrIntegration = () => {
  const { toast } = useToast();
  
  const [prowlarrSettings, setProwlarrSettings] = useState({
    host: "localhost",
    port: "9696",
    apiKey: "",
    enabled: false
  });

  const [indexers, setIndexers] = useState<Indexer[]>([
    {
      id: "1",
      name: "LibGen",
      type: "public",
      status: "active",
      categories: ["Books", "Academic", "Fiction"],
      lastTest: "2024-01-15T10:30:00Z",
      searchCount: 1542,
      grabCount: 89,
      priority: 1,
      enabled: true
    },
    {
      id: "2", 
      name: "Z-Library",
      type: "public",
      status: "active",
      categories: ["Books", "Academic", "Textbooks"],
      lastTest: "2024-01-15T09:15:00Z",
      searchCount: 2103,
      grabCount: 156,
      priority: 2,
      enabled: true
    },
    {
      id: "3",
      name: "MAM",
      type: "private",
      status: "inactive",
      categories: ["Books", "Audiobooks", "Comics"],
      lastTest: "2024-01-14T16:45:00Z",
      searchCount: 834,
      grabCount: 67,
      priority: 3,
      enabled: false
    },
    {
      id: "4",
      name: "Bibliotik",
      type: "private", 
      status: "error",
      categories: ["Books", "Academic"],
      lastTest: "2024-01-13T14:20:00Z",
      searchCount: 456,
      grabCount: 23,
      priority: 4,
      enabled: true
    }
  ]);

  const [isAddIndexerOpen, setIsAddIndexerOpen] = useState(false);
  const [newIndexer, setNewIndexer] = useState<{
    name: string;
    type: "public" | "private" | "semi-private";
    url: string;
    apiKey: string;
    username: string;
    priority: number;
  }>({
    name: "",
    type: "public",
    url: "",
    apiKey: "",
    username: "",
    priority: 1
  });

  const handleSaveProwlarrSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Prowlarr connection settings have been updated.",
    });
  };

  const handleTestProwlarr = async () => {
    toast({
      title: "Testing Connection",
      description: "Testing connection to Prowlarr...",
    });

    // Simulate connection test
    setTimeout(() => {
      toast({
        title: "Connection Successful", 
        description: "Successfully connected to Prowlarr API!",
      });
    }, 2000);
  };

  const handleTestIndexer = async (indexerId: string) => {
    const indexer = indexers.find(i => i.id === indexerId);
    toast({
      title: "Testing Indexer",
      description: `Testing ${indexer?.name}...`,
    });

    setTimeout(() => {
      setIndexers(indexers.map(i => 
        i.id === indexerId 
          ? { ...i, status: "active", lastTest: new Date().toISOString() }
          : i
      ));
      
      toast({
        title: "Indexer Test Successful",
        description: `${indexer?.name} is working correctly!`,
      });
    }, 2000);
  };

  const handleToggleIndexer = (indexerId: string) => {
    setIndexers(indexers.map(i => 
      i.id === indexerId 
        ? { ...i, enabled: !i.enabled }
        : i
    ));

    const indexer = indexers.find(i => i.id === indexerId);
    toast({
      title: `Indexer ${indexer?.enabled ? "Disabled" : "Enabled"}`,
      description: `${indexer?.name} has been ${indexer?.enabled ? "disabled" : "enabled"}.`,
    });
  };

  const handleAddIndexer = () => {
    const indexer: Indexer = {
      id: Date.now().toString(),
      name: newIndexer.name,
      type: newIndexer.type,
      status: "inactive",
      categories: ["Books"],
      lastTest: new Date().toISOString(),
      searchCount: 0,
      grabCount: 0,
      priority: newIndexer.priority,
      url: newIndexer.url || undefined,
      apiKey: newIndexer.apiKey || undefined,
      username: newIndexer.username || undefined,
      enabled: true
    };

    setIndexers([...indexers, indexer]);
      setNewIndexer({
        name: "",
        type: "public",
        url: "",
        apiKey: "",
        username: "",
        priority: 1
      });
    setIsAddIndexerOpen(false);

    toast({
      title: "Indexer Added",
      description: `${indexer.name} has been added successfully.`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-500/20 text-green-500";
      case "inactive": return "bg-yellow-500/20 text-yellow-500";
      case "error": return "bg-red-500/20 text-red-500";
      default: return "bg-muted/20 text-muted-foreground";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "public": return "bg-blue-500/20 text-blue-500";
      case "private": return "bg-purple-500/20 text-purple-500";
      case "semi-private": return "bg-orange-500/20 text-orange-500";
      default: return "bg-muted/20 text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "inactive": return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case "error": return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default: return <AlertTriangle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const activeIndexers = indexers.filter(i => i.enabled && i.status === "active").length;
  const totalSearches = indexers.reduce((sum, i) => sum + i.searchCount, 0);
  const totalGrabs = indexers.reduce((sum, i) => sum + i.grabCount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-library-text-primary">Prowlarr Integration</h1>
          <p className="text-library-text-secondary">Manage search indexers and Prowlarr connection</p>
        </div>
        
        <Dialog open={isAddIndexerOpen} onOpenChange={setIsAddIndexerOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary hover:opacity-90 gap-2">
              <Plus className="h-4 w-4" />
              Add Indexer
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Indexer</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="indexer-name">Indexer Name *</Label>
                <Input
                  id="indexer-name"
                  value={newIndexer.name}
                  onChange={(e) => setNewIndexer({...newIndexer, name: e.target.value})}
                  placeholder="Enter indexer name"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="indexer-type">Type</Label>
                <Select 
                  value={newIndexer.type} 
                  onValueChange={(value: "public" | "private" | "semi-private") => setNewIndexer({...newIndexer, type: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                    <SelectItem value="semi-private">Semi-Private</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="indexer-url">URL</Label>
                <Input
                  id="indexer-url"
                  value={newIndexer.url}
                  onChange={(e) => setNewIndexer({...newIndexer, url: e.target.value})}
                  placeholder="https://example.com"
                />
              </div>

              {newIndexer.type === "private" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="indexer-username">Username</Label>
                    <Input
                      id="indexer-username"
                      value={newIndexer.username}
                      onChange={(e) => setNewIndexer({...newIndexer, username: e.target.value})}
                      placeholder="Username"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="indexer-apikey">API Key</Label>
                    <Input
                      id="indexer-apikey"
                      value={newIndexer.apiKey}
                      onChange={(e) => setNewIndexer({...newIndexer, apiKey: e.target.value})}
                      placeholder="API Key"
                    />
                  </div>
                </>
              )}

              <Button 
                onClick={handleAddIndexer}
                className="w-full bg-gradient-primary hover:opacity-90"
                disabled={!newIndexer.name}
              >
                Add Indexer
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Prowlarr Connection */}
      <Card className="bg-gradient-surface border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-library-text-primary">
            <Server className="h-5 w-5 text-primary" />
            Prowlarr Connection
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-library-text-primary">Enable Prowlarr Integration</Label>
            <Switch
              checked={prowlarrSettings.enabled}
              onCheckedChange={(checked) => 
                setProwlarrSettings({...prowlarrSettings, enabled: checked})
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="prowlarr-host" className="text-library-text-primary">Host</Label>
              <Input
                id="prowlarr-host"
                value={prowlarrSettings.host}
                onChange={(e) => setProwlarrSettings({...prowlarrSettings, host: e.target.value})}
                placeholder="localhost"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="prowlarr-port" className="text-library-text-primary">Port</Label>
              <Input
                id="prowlarr-port"
                value={prowlarrSettings.port}
                onChange={(e) => setProwlarrSettings({...prowlarrSettings, port: e.target.value})}
                placeholder="9696"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="prowlarr-apikey" className="text-library-text-primary">API Key</Label>
            <Input
              id="prowlarr-apikey"
              type="password"
              value={prowlarrSettings.apiKey}
              onChange={(e) => setProwlarrSettings({...prowlarrSettings, apiKey: e.target.value})}
              placeholder="Enter Prowlarr API key"
            />
          </div>

          <div className="flex gap-2">
            <Button 
              onClick={handleTestProwlarr}
              variant="outline"
              className="gap-2"
            >
              <TestTube className="h-4 w-4" />
              Test Connection
            </Button>
            <Button 
              onClick={handleSaveProwlarrSettings}
              className="bg-gradient-primary hover:opacity-90"
            >
              Save Settings
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-surface border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-library-text-secondary">Active Indexers</p>
                <p className="text-2xl font-bold text-green-500">{activeIndexers}</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-surface border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-library-text-secondary">Total Searches</p>
                <p className="text-2xl font-bold text-library-text-primary">{totalSearches.toLocaleString()}</p>
              </div>
              <Search className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-surface border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-library-text-secondary">Total Downloads</p>
                <p className="text-2xl font-bold text-library-text-primary">{totalGrabs.toLocaleString()}</p>
              </div>
              <Shield className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Indexers List */}
      <Card className="bg-gradient-surface border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-library-text-primary">
            <Search className="h-5 w-5" />
            Search Indexers
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {indexers.map((indexer) => (
            <Card key={indexer.id} className="bg-background/50 border-border/30">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(indexer.status)}
                      <div>
                        <h3 className="font-medium text-library-text-primary">{indexer.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={getTypeColor(indexer.type)}>
                            {indexer.type}
                          </Badge>
                          <Badge className={getStatusColor(indexer.status)}>
                            {indexer.status}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="hidden md:flex items-center gap-6 text-sm text-library-text-secondary">
                      <div>
                        <span className="text-xs">Searches</span>
                        <p className="font-medium text-library-text-primary">{indexer.searchCount}</p>
                      </div>
                      <div>
                        <span className="text-xs">Downloads</span>
                        <p className="font-medium text-library-text-primary">{indexer.grabCount}</p>
                      </div>
                      <div>
                        <span className="text-xs">Priority</span>
                        <p className="font-medium text-library-text-primary">{indexer.priority}</p>
                      </div>
                      <div>
                        <span className="text-xs">Last Test</span>
                        <p className="font-medium text-library-text-primary">
                          {new Date(indexer.lastTest).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleTestIndexer(indexer.id)}
                      className="gap-2"
                    >
                      <TestTube className="h-3 w-3" />
                      Test
                    </Button>
                    
                    <Button
                      size="sm"
                      variant="outline"
                    >
                      <Settings className="h-3 w-3" />
                    </Button>

                    <Switch
                      checked={indexer.enabled}
                      onCheckedChange={() => handleToggleIndexer(indexer.id)}
                    />
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-1">
                  {indexer.categories.map((category) => (
                    <Badge key={category} variant="secondary" className="text-xs">
                      {category}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProwlarrIntegration;