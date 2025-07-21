import { useState } from "react";
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SearchBarProps {
  onSearch: (query: string, filters: SearchFilters) => void;
}

interface SearchFilters {
  type: string;
  language: string;
  format: string;
  sortBy: string;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<SearchFilters>({
    type: "all",
    language: "all",
    format: "all",
    sortBy: "relevance"
  });

  const handleSearch = () => {
    onSearch(query, filters);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Card className="p-6 bg-gradient-surface border-border/50 shadow-card">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search for books, authors, series..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="pl-10 bg-background/50 border-border/50 focus:border-primary/50 h-12"
          />
        </div>
        
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="default" className="gap-2">
                <Filter className="h-4 w-4" />
                Type
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setFilters({...filters, type: "all"})}>
                All Types
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilters({...filters, type: "fiction"})}>
                Fiction
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilters({...filters, type: "non-fiction"})}>
                Non-Fiction
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilters({...filters, type: "technical"})}>
                Technical
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="default" className="gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                Sort
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setFilters({...filters, sortBy: "relevance"})}>
                Relevance
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilters({...filters, sortBy: "date"})}>
                Publication Date
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilters({...filters, sortBy: "rating"})}>
                Rating
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilters({...filters, sortBy: "title"})}>
                Title
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button onClick={handleSearch} className="bg-gradient-primary hover:opacity-90 px-8">
            Search
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default SearchBar;