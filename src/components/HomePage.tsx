import { useState } from "react";
import { TrendingUp, Clock, Star, BookOpen, Download, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import BookCard from "./BookCard";
import heroImage from "@/assets/hero-library.jpg";

interface HomePageProps {
  onTabChange: (tab: string) => void;
}

const HomePage = ({ onTabChange }: HomePageProps) => {
  const [featuredBooks] = useState([
    {
      id: "1",
      title: "The Pragmatic Programmer",
      author: "David Thomas, Andrew Hunt",
      cover: "",
      rating: 4.8,
      year: 2019,
      pages: 352,
      format: ["PDF", "EPUB"],
      description: "Your journey to mastery. A comprehensive guide to software development best practices.",
      genre: ["Programming", "Technology"],
      language: "English",
      size: "15.2 MB"
    },
    {
      id: "2", 
      title: "Clean Code",
      author: "Robert C. Martin",
      cover: "",
      rating: 4.7,
      year: 2008,
      pages: 464,
      format: ["PDF", "MOBI"],
      description: "A handbook of agile software craftsmanship. Learn to write code that is readable and maintainable.",
      genre: ["Programming", "Software Engineering"],
      language: "English",
      size: "12.8 MB"
    },
    {
      id: "3",
      title: "Design Patterns",
      author: "Gang of Four",
      cover: "",
      rating: 4.6,
      year: 1994,
      pages: 395,
      format: ["PDF"],
      description: "Elements of reusable object-oriented software. The definitive guide to design patterns.",
      genre: ["Programming", "Software Architecture"],
      language: "English", 
      size: "18.5 MB"
    }
  ]);

  const stats = [
    { label: "Total Books", value: "125,847", icon: BookOpen, trend: "+1,234" },
    { label: "Active Downloads", value: "23", icon: Download, trend: "+5" },
    { label: "Library Users", value: "8,432", icon: Users, trend: "+156" },
    { label: "Completed Today", value: "89", icon: Star, trend: "+12" }
  ];

  const handleDownload = (bookId: string) => {
    console.log("Download book:", bookId);
  };

  const handleViewDetails = (bookId: string) => {
    console.log("View details:", bookId);
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <Card className="relative overflow-hidden bg-gradient-surface border-border/50">
        <div className="relative">
          <div className="aspect-[21/9] lg:aspect-[21/6] overflow-hidden">
            <img 
              src={heroImage} 
              alt="Digital Library" 
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent" />
          </div>
          
          <div className="absolute inset-0 flex items-center">
            <div className="p-8 lg:p-12 max-w-2xl">
              <h1 className="text-4xl lg:text-6xl font-bold text-library-text-primary mb-4 leading-tight">
                Your Digital
                <span className="bg-gradient-primary bg-clip-text text-transparent block">
                  Library Hub
                </span>
              </h1>
              <p className="text-lg lg:text-xl text-library-text-secondary mb-6 leading-relaxed">
                Search, discover, and download books from multiple sources. 
                Manage your collection with powerful tools inspired by Readarr and LazyLibrarian.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-gradient-primary hover:opacity-90 shadow-glow"
                  onClick={() => onTabChange("search")}
                >
                  <BookOpen className="mr-2 h-5 w-5" />
                  Start Searching
                </Button>
                <Button 
                  size="lg" 
                  variant="secondary"
                  onClick={() => onTabChange("library")}
                >
                  <Star className="mr-2 h-5 w-5" />
                  View Library
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="bg-gradient-surface border-border/50 hover:border-primary/30 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-library-text-secondary">{stat.label}</p>
                    <p className="text-2xl font-bold text-library-text-primary">{stat.value}</p>
                    <p className="text-xs text-primary font-medium">{stat.trend} this week</p>
                  </div>
                  <div className="p-3 bg-gradient-primary rounded-lg">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-gradient-surface border-border/50 hover:shadow-card transition-shadow cursor-pointer"
              onClick={() => onTabChange("trending")}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-library-text-primary">
              <TrendingUp className="h-5 w-5 text-primary" />
              Trending Books
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-library-text-secondary">
              Discover the most popular books right now across all genres and categories.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-surface border-border/50 hover:shadow-card transition-shadow cursor-pointer"
              onClick={() => onTabChange("recent")}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-library-text-primary">
              <Clock className="h-5 w-5 text-primary" />
              Recent Releases
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-library-text-secondary">
              Stay up to date with the latest book releases and new editions.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-surface border-border/50 hover:shadow-card transition-shadow cursor-pointer"
              onClick={() => onTabChange("downloads")}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-library-text-primary">
              <Download className="h-5 w-5 text-primary" />
              Download Manager
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-library-text-secondary">
              Monitor and manage your active downloads from qBittorrent and Transmission.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Featured Books */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-library-text-primary">Featured Books</h2>
          <Button variant="outline" onClick={() => onTabChange("search")}>
            View All
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onDownload={handleDownload}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;