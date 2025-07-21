import { useState } from "react";
import { Settings as SettingsIcon, Download, Server, Folder, Key, TestTube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const SettingsPage = () => {
  const { toast } = useToast();
  
  const [qbittorrentSettings, setQbittorrentSettings] = useState({
    host: "localhost",
    port: "8080",
    username: "admin",
    password: "",
    enabled: true
  });

  const [transmissionSettings, setTransmissionSettings] = useState({
    host: "localhost", 
    port: "9091",
    username: "",
    password: "",
    enabled: false
  });

  const [generalSettings, setGeneralSettings] = useState({
    downloadPath: "/downloads/books",
    autoDownload: true,
    defaultClient: "qbittorrent",
    maxConcurrentDownloads: 3,
    deleteOnComplete: false
  });

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your download client settings have been updated successfully.",
    });
  };

  const handleTestConnection = async (client: string) => {
    toast({
      title: "Testing Connection",
      description: `Testing connection to ${client}...`,
    });

    // Simulate connection test
    setTimeout(() => {
      toast({
        title: "Connection Successful",
        description: `Successfully connected to ${client}!`,
      });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Settings Header */}
      <div className="flex items-center gap-2 mb-6">
        <SettingsIcon className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold text-library-text-primary">Settings</h1>
      </div>

      <Tabs defaultValue="download-clients" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="download-clients">Download Clients</TabsTrigger>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="indexers">Search Indexers</TabsTrigger>
        </TabsList>

        <TabsContent value="download-clients" className="space-y-6">
          {/* qBittorrent Settings */}
          <Card className="bg-gradient-surface border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-library-text-primary">
                <Download className="h-5 w-5 text-primary" />
                qBittorrent Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-library-text-primary">Enable qBittorrent</Label>
                <Switch
                  checked={qbittorrentSettings.enabled}
                  onCheckedChange={(checked) => 
                    setQbittorrentSettings({...qbittorrentSettings, enabled: checked})
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="qb-host" className="text-library-text-primary">Host</Label>
                  <Input
                    id="qb-host"
                    value={qbittorrentSettings.host}
                    onChange={(e) => setQbittorrentSettings({...qbittorrentSettings, host: e.target.value})}
                    placeholder="localhost"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="qb-port" className="text-library-text-primary">Port</Label>
                  <Input
                    id="qb-port"
                    value={qbittorrentSettings.port}
                    onChange={(e) => setQbittorrentSettings({...qbittorrentSettings, port: e.target.value})}
                    placeholder="8080"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="qb-username" className="text-library-text-primary">Username</Label>
                  <Input
                    id="qb-username"
                    value={qbittorrentSettings.username}
                    onChange={(e) => setQbittorrentSettings({...qbittorrentSettings, username: e.target.value})}
                    placeholder="admin"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="qb-password" className="text-library-text-primary">Password</Label>
                  <Input
                    id="qb-password"
                    type="password"
                    value={qbittorrentSettings.password}
                    onChange={(e) => setQbittorrentSettings({...qbittorrentSettings, password: e.target.value})}
                    placeholder="Enter password"
                  />
                </div>
              </div>

              <Button 
                onClick={() => handleTestConnection("qBittorrent")}
                variant="outline"
                className="gap-2"
              >
                <TestTube className="h-4 w-4" />
                Test Connection
              </Button>
            </CardContent>
          </Card>

          {/* Transmission Settings */}
          <Card className="bg-gradient-surface border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-library-text-primary">
                <Server className="h-5 w-5 text-primary" />
                Transmission Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-library-text-primary">Enable Transmission</Label>
                <Switch
                  checked={transmissionSettings.enabled}
                  onCheckedChange={(checked) => 
                    setTransmissionSettings({...transmissionSettings, enabled: checked})
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tr-host" className="text-library-text-primary">Host</Label>
                  <Input
                    id="tr-host"
                    value={transmissionSettings.host}
                    onChange={(e) => setTransmissionSettings({...transmissionSettings, host: e.target.value})}
                    placeholder="localhost"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tr-port" className="text-library-text-primary">Port</Label>
                  <Input
                    id="tr-port"
                    value={transmissionSettings.port}
                    onChange={(e) => setTransmissionSettings({...transmissionSettings, port: e.target.value})}
                    placeholder="9091"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tr-username" className="text-library-text-primary">Username</Label>
                  <Input
                    id="tr-username"
                    value={transmissionSettings.username}
                    onChange={(e) => setTransmissionSettings({...transmissionSettings, username: e.target.value})}
                    placeholder="Optional"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tr-password" className="text-library-text-primary">Password</Label>
                  <Input
                    id="tr-password"
                    type="password"
                    value={transmissionSettings.password}
                    onChange={(e) => setTransmissionSettings({...transmissionSettings, password: e.target.value})}
                    placeholder="Optional"
                  />
                </div>
              </div>

              <Button 
                onClick={() => handleTestConnection("Transmission")}
                variant="outline"
                className="gap-2"
              >
                <TestTube className="h-4 w-4" />
                Test Connection
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="general" className="space-y-6">
          <Card className="bg-gradient-surface border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-library-text-primary">
                <Folder className="h-5 w-5 text-primary" />
                Download Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="download-path" className="text-library-text-primary">Download Path</Label>
                <Input
                  id="download-path"
                  value={generalSettings.downloadPath}
                  onChange={(e) => setGeneralSettings({...generalSettings, downloadPath: e.target.value})}
                  placeholder="/downloads/books"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="default-client" className="text-library-text-primary">Default Download Client</Label>
                <Select
                  value={generalSettings.defaultClient}
                  onValueChange={(value) => setGeneralSettings({...generalSettings, defaultClient: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="qbittorrent">qBittorrent</SelectItem>
                    <SelectItem value="transmission">Transmission</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="max-downloads" className="text-library-text-primary">Max Concurrent Downloads</Label>
                <Input
                  id="max-downloads"
                  type="number"
                  value={generalSettings.maxConcurrentDownloads}
                  onChange={(e) => setGeneralSettings({...generalSettings, maxConcurrentDownloads: parseInt(e.target.value)})}
                  min="1"
                  max="10"
                />
              </div>

              <div className="flex items-center justify-between">
                <Label className="text-library-text-primary">Auto-download when book is added</Label>
                <Switch
                  checked={generalSettings.autoDownload}
                  onCheckedChange={(checked) => 
                    setGeneralSettings({...generalSettings, autoDownload: checked})
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label className="text-library-text-primary">Delete torrents when complete</Label>
                <Switch
                  checked={generalSettings.deleteOnComplete}
                  onCheckedChange={(checked) => 
                    setGeneralSettings({...generalSettings, deleteOnComplete: checked})
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="indexers" className="space-y-6">
          <Card className="bg-gradient-surface border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-library-text-primary">
                <Key className="h-5 w-5 text-primary" />
                Search Indexers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Key className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-library-text-secondary mb-4">
                  Configure search indexers to find books from various sources
                </p>
                <Button variant="outline">
                  Add Indexer
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSaveSettings} className="bg-gradient-primary hover:opacity-90">
          Save Settings
        </Button>
      </div>
    </div>
  );
};

export default SettingsPage;