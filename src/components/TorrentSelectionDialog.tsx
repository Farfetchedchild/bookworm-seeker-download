import { useState, useEffect } from "react";
import { Download, Search, Loader2, HardDrive, Users, Clock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

interface TorrentResult {
  id: string;
  title: string;
  size: string;
  seeders: number;
  leechers: number;
  downloadUrl: string;
  magnetUrl: string;
  indexer: string;
  category: string;
  publishDate: string;
  quality: "Low" | "Medium" | "High" | "Premium";
}

interface TorrentSelectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  book: {
    id: string;
    title: string;
    author: string;
  } | null;
  onDownloadSelected: (torrent: TorrentResult, bookId: string) => void;
}

const TorrentSelectionDialog = ({ 
  open, 
  onOpenChange, 
  book,
  onDownloadSelected 
}: TorrentSelectionDialogProps) => {
  const [isSearching, setIsSearching] = useState(false);
  const [torrents, setTorrents] = useState<TorrentResult[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (open && book) {
      searchTorrents();
    }
  }, [open, book]);

  const searchTorrents = async () => {
    if (!book) return;
    
    setIsSearching(true);
    
    // Simulate API call to Prowlarr/indexers
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock torrent results
    const mockTorrents: TorrentResult[] = [
      {
        id: "1",
        title: `${book.title} by ${book.author} [PDF] [Premium Quality]`,
        size: "25.4 MB",
        seeders: 47,
        leechers: 3,
        downloadUrl: "https://example.com/download1",
        magnetUrl: "magnet:?xt=urn:btih:1234567890",
        indexer: "LibGen",
        category: "Books/Technical",
        publishDate: "2024-01-15",
        quality: "Premium"
      },
      {
        id: "2", 
        title: `${book.title} - ${book.author} (PDF + EPUB Pack)`,
        size: "32.1 MB",
        seeders: 23,
        leechers: 8,
        downloadUrl: "https://example.com/download2",
        magnetUrl: "magnet:?xt=urn:btih:0987654321",
        indexer: "Z-Library",
        category: "Books/Programming",
        publishDate: "2024-01-10",
        quality: "High"
      },
      {
        id: "3",
        title: `${book.title} ${book.author} PDF`,
        size: "18.7 MB",
        seeders: 89,
        leechers: 12,
        downloadUrl: "https://example.com/download3",
        magnetUrl: "magnet:?xt=urn:btih:1122334455",
        indexer: "MAM",
        category: "Books",
        publishDate: "2024-01-08",
        quality: "Medium"
      },
      {
        id: "4",
        title: `[AUDIOBOOK] ${book.title} - ${book.author} MP3`,
        size: "156.3 MB",
        seeders: 15,
        leechers: 2,
        downloadUrl: "https://example.com/download4",
        magnetUrl: "magnet:?xt=urn:btih:5544332211",
        indexer: "Bibliotik",
        category: "Books/Audiobooks",
        publishDate: "2024-01-05",
        quality: "High"
      }
    ];
    
    setTorrents(mockTorrents);
    setIsSearching(false);
  };

  const handleDownload = (torrent: TorrentResult) => {
    if (!book) return;
    
    onDownloadSelected(torrent, book.id);
    onOpenChange(false);
    
    toast({
      title: "Download Started",
      description: `"${torrent.title}" has been added to your download queue.`,
    });
  };

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case "Premium": return "bg-purple-500/20 text-purple-500";
      case "High": return "bg-green-500/20 text-green-500";
      case "Medium": return "bg-yellow-500/20 text-yellow-500";
      case "Low": return "bg-red-500/20 text-red-500";
      default: return "bg-muted/20 text-muted-foreground";
    }
  };

  const getSeedersColor = (seeders: number) => {
    if (seeders >= 50) return "text-green-500";
    if (seeders >= 20) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Select Torrent to Download
          </DialogTitle>
          <DialogDescription>
            {book && `Search results for "${book.title}" by ${book.author}`}
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto">
          {isSearching ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
              <p className="text-library-text-secondary">Searching indexers...</p>
              <Progress value={33} className="w-64 mt-4" />
            </div>
          ) : (
            <div className="space-y-4">
              {torrents.length === 0 ? (
                <div className="text-center py-12">
                  <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-library-text-secondary">No torrents found</p>
                </div>
              ) : (
                torrents.map((torrent) => (
                  <Card key={torrent.id} className="bg-gradient-surface border-border/50 hover:border-primary/30 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 space-y-3">
                          <div>
                            <h3 className="font-medium text-library-text-primary line-clamp-2">
                              {torrent.title}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                {torrent.indexer}
                              </Badge>
                              <Badge className={getQualityColor(torrent.quality)}>
                                {torrent.quality}
                              </Badge>
                              <Badge variant="secondary" className="text-xs">
                                {torrent.category}
                              </Badge>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <HardDrive className="h-4 w-4 text-muted-foreground" />
                              <span className="text-library-text-secondary">Size:</span>
                              <span className="font-medium">{torrent.size}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              <span className="text-library-text-secondary">S/L:</span>
                              <span className={`font-medium ${getSeedersColor(torrent.seeders)}`}>
                                {torrent.seeders}
                              </span>
                              <span className="text-muted-foreground">/</span>
                              <span className="font-medium text-library-text-primary">
                                {torrent.leechers}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span className="text-library-text-secondary">Date:</span>
                              <span className="font-medium">
                                {new Date(torrent.publishDate).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Star className="h-4 w-4 text-muted-foreground" />
                              <span className="text-library-text-secondary">Health:</span>
                              <span className="font-medium">
                                {torrent.seeders > 20 ? "Excellent" : torrent.seeders > 5 ? "Good" : "Poor"}
                              </span>
                            </div>
                          </div>
                        </div>

                        <Button 
                          onClick={() => handleDownload(torrent)}
                          className="bg-gradient-primary hover:opacity-90 gap-2 shrink-0"
                        >
                          <Download className="h-4 w-4" />
                          Download
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TorrentSelectionDialog;