import { useState } from "react";
import { Search as SearchIcon, Grid, List, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import SearchBar from "./SearchBar";
import BookCard from "./BookCard";
import TorrentSelectionDialog from "./TorrentSelectionDialog";

interface SearchPageProps {
  onDownload: (bookId: string) => void;
}

const SearchPage = ({ onDownload }: SearchPageProps) => {
  const [selectedBook, setSelectedBook] = useState<{id: string; title: string; author: string} | null>(null);
  const [isTorrentDialogOpen, setIsTorrentDialogOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([
    {
      id: "1",
      title: "JavaScript: The Definitive Guide",
      author: "David Flanagan",
      cover: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=600&fit=crop",
      rating: 4.5,
      year: 2020,
      pages: 1096,
      format: ["PDF", "EPUB"],
      description: "Master the world's most-used programming language. This comprehensive guide covers everything from basic syntax to advanced programming techniques. Perfect for developers who want to understand JavaScript deeply.",
      genre: ["Programming", "Web Development"],
      language: "English",
      size: "25.4 MB"
    },
    {
      id: "2",
      title: "You Don't Know JS",
      author: "Kyle Simpson",
      cover: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=600&fit=crop",
      rating: 4.7,
      year: 2021,
      pages: 278,
      format: ["PDF", "MOBI", "EPUB"],
      description: "This is a series of books diving deep into the core mechanisms of the JavaScript language. Each book takes on specific core parts of the language that are most commonly misunderstood or under-understood.",
      genre: ["Programming", "JavaScript"],
      language: "English",
      size: "12.1 MB"
    },
    {
      id: "3",
      title: "Clean Architecture", 
      author: "Robert C. Martin",
      cover: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=600&fit=crop",
      rating: 4.6,
      year: 2017,
      pages: 432,
      format: ["PDF"],
      description: "A craftsman's guide to software structure and design. Learn to build systems that are testable and maintainable. Uncle Bob's essential guide to creating software architecture that stands the test of time.",
      genre: ["Programming", "Software Architecture"],
      language: "English",
      size: "18.9 MB"
    },
    {
      id: "4",
      title: "System Design Interview",
      author: "Alex Xu",
      cover: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=600&fit=crop",
      rating: 4.8,
      year: 2020,
      pages: 322,
      format: ["PDF", "EPUB"],
      description: "An insider's guide to system design interviews at tech companies. Learn how to design scalable systems step by step. Covers everything from load balancers to database sharding with real-world examples.",
      genre: ["Programming", "System Design"],
      language: "English",
      size: "16.7 MB"
    },
    {
      id: "5",
      title: "Designing Data-Intensive Applications",
      author: "Martin Kleppmann",
      cover: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=600&fit=crop",
      rating: 4.9,
      year: 2017,
      pages: 616,
      format: ["PDF", "MOBI"],
      description: "The big ideas behind reliable, scalable, and maintainable systems. This book explores the fundamental principles of data systems design, covering everything from databases to stream processing.",
      genre: ["Programming", "Data Engineering"],
      language: "English",
      size: "23.5 MB"
    },
    {
      id: "6",
      title: "The Algorithm Design Manual",
      author: "Steven S. Skiena",
      cover: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=600&fit=crop",
      rating: 4.4,
      year: 2020,
      pages: 748,
      format: ["PDF"],
      description: "A comprehensive guide to algorithm design and analysis techniques. Contains hundreds of algorithmic resources and practical examples, making it an essential reference for any programmer.",
      genre: ["Programming", "Algorithms"],
      language: "English",
      size: "21.8 MB"
    }
  ]);

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (query: string, filters: any) => {
    setIsLoading(true);
    console.log("Searching for:", query, filters);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleDownloadClick = (bookId: string) => {
    const book = searchResults.find(b => b.id === bookId);
    if (book) {
      setSelectedBook({
        id: book.id,
        title: book.title,
        author: book.author
      });
      setIsTorrentDialogOpen(true);
    }
  };

  const handleTorrentSelected = (torrent: any, bookId: string) => {
    onDownload(bookId);
    console.log("Selected torrent:", torrent, "for book:", bookId);
  };

  const handleViewDetails = (bookId: string) => {
    console.log("View details:", bookId);
  };

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <div className="flex items-center gap-2 mb-6">
        <SearchIcon className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold text-library-text-primary">Search Books</h1>
      </div>

      {/* Search Bar */}
      <SearchBar onSearch={handleSearch} />

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <p className="text-library-text-secondary">
            {searchResults.length} books found
          </p>
          {isLoading && (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
              <span className="text-sm text-library-text-secondary">Searching...</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("grid")}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Search Results */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {searchResults.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onDownload={handleDownloadClick}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {searchResults.map((book) => (
            <Card key={book.id} className="bg-gradient-surface border-border/50 hover:border-primary/30 transition-colors">
              <div className="p-6">
                <div className="flex gap-6">
                  <div className="w-24 h-32 bg-gradient-accent rounded-lg flex items-center justify-center">
                    <SearchIcon className="h-8 w-8 text-primary/60" />
                  </div>
                  
                  <div className="flex-1 space-y-3">
                    <div>
                      <h3 className="text-lg font-semibold text-library-text-primary">{book.title}</h3>
                      <p className="text-library-text-secondary">by {book.author}</p>
                    </div>
                    
                    <p className="text-sm text-library-text-secondary line-clamp-2">
                      {book.description}
                    </p>
                    
                    <div className="flex items-center gap-4 text-sm text-library-text-secondary">
                      <span>{book.year}</span>
                      <span>•</span>
                      <span>{book.pages} pages</span>
                      <span>•</span>
                      <span>Rating: {book.rating}/5</span>
                      <span>•</span>
                      <span>{book.size}</span>
                    </div>
                    
                    <div className="flex gap-2 pt-2">
                      <Button onClick={() => handleDownloadClick(book.id)} size="sm" className="bg-gradient-primary hover:opacity-90">
                        Download
                      </Button>
                      <Button onClick={() => handleViewDetails(book.id)} variant="outline" size="sm">
                        Details
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Load More */}
      <div className="flex justify-center pt-8">
        <Button variant="outline" size="lg">
          Load More Results
        </Button>
      </div>

      {/* Torrent Selection Dialog */}
      <TorrentSelectionDialog
        open={isTorrentDialogOpen}
        onOpenChange={setIsTorrentDialogOpen}
        book={selectedBook}
        onDownloadSelected={handleTorrentSelected}
      />
    </div>
  );
};

export default SearchPage;