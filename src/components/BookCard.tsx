import { useState } from "react";
import { Download, Star, Info, Heart, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface BookCardProps {
  book: {
    id: string;
    title: string;
    author: string;
    cover?: string;
    rating: number;
    year: number;
    pages: number;
    format: string[];
    description: string;
    genre: string[];
    language: string;
    size?: string;
  };
  onDownload: (bookId: string) => void;
  onViewDetails: (bookId: string) => void;
}

const BookCard = ({ book, onDownload, onViewDetails }: BookCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const { toast } = useToast();

  const handleDownload = () => {
    onDownload(book.id);
    toast({
      title: "Download Started",
      description: `"${book.title}" has been added to your download queue.`,
    });
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    toast({
      title: isLiked ? "Removed from Wishlist" : "Added to Wishlist",
      description: `"${book.title}" ${isLiked ? "removed from" : "added to"} your wishlist.`,
    });
  };

  return (
    <Card className="group overflow-hidden bg-gradient-surface border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-book hover:scale-[1.02]">
      <div className="relative">
        <div className="aspect-[3/4] bg-gradient-accent overflow-hidden">
          {book.cover ? (
            <img
              src={book.cover}
              alt={`${book.title} cover`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-primary/20">
              <BookOpen className="h-16 w-16 text-primary/60" />
            </div>
          )}
        </div>
        
        <div className="absolute top-2 right-2 flex gap-1">
          <Button
            size="sm"
            variant="secondary"
            className="h-8 w-8 p-0 bg-background/80 backdrop-blur-sm"
            onClick={handleLike}
          >
            <Heart className={`h-4 w-4 ${isLiked ? "fill-primary text-primary" : ""}`} />
          </Button>
        </div>

        <div className="absolute bottom-2 left-2">
          <div className="flex items-center gap-1 bg-background/80 backdrop-blur-sm rounded-full px-2 py-1">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-medium">{book.rating.toFixed(1)}</span>
          </div>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-library-text-primary line-clamp-2 group-hover:text-primary transition-colors">
              {book.title}
            </h3>
            <p className="text-sm text-library-text-secondary">{book.author}</p>
          </div>

          <div className="flex items-center gap-2 text-xs text-library-text-secondary">
            <span>{book.year}</span>
            <span>•</span>
            <span>{book.pages} pages</span>
            <span>•</span>
            <span>{book.language}</span>
          </div>

          <div className="flex flex-wrap gap-1">
            {book.genre.slice(0, 2).map((genre) => (
              <Badge key={genre} variant="secondary" className="text-xs">
                {genre}
              </Badge>
            ))}
            {book.format.slice(0, 2).map((format) => (
              <Badge key={format} variant="outline" className="text-xs">
                {format}
              </Badge>
            ))}
          </div>

          <p className="text-xs text-library-text-secondary line-clamp-2">
            {book.description}
          </p>

          <div className="flex gap-2 pt-2">
            <Button 
              size="sm" 
              onClick={handleDownload}
              className="flex-1 bg-gradient-primary hover:opacity-90 gap-2"
            >
              <Download className="h-4 w-4" />
              Download
            </Button>
            <Button 
              size="sm" 
              variant="secondary" 
              onClick={() => onViewDetails(book.id)}
              className="gap-2"
            >
              <Info className="h-4 w-4" />
              Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookCard;