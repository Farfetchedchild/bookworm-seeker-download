import { useState } from "react";
import { Plus, Clock, Check, X, User, Calendar, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface BookRequest {
  id: string;
  title: string;
  author: string;
  isbn?: string;
  year?: number;
  requestedBy: string;
  requestedAt: string;
  status: "pending" | "approved" | "downloading" | "completed" | "rejected";
  priority: "low" | "normal" | "high";
  comment?: string;
  adminComment?: string;
}

const RequestSystem = () => {
  const { toast } = useToast();
  const [requests, setRequests] = useState<BookRequest[]>([
    {
      id: "1",
      title: "System Design Interview - An Insider's Guide",
      author: "Alex Xu",
      isbn: "979-8664653403",
      year: 2020,
      requestedBy: "john.doe@example.com",
      requestedAt: "2024-01-15T10:30:00Z",
      status: "pending",
      priority: "high",
      comment: "Needed for upcoming technical interviews"
    },
    {
      id: "2", 
      title: "Kubernetes in Action",
      author: "Marko Luksa",
      requestedBy: "jane.smith@example.com",
      requestedAt: "2024-01-14T14:20:00Z",
      status: "approved",
      priority: "normal",
      comment: "For DevOps learning path"
    },
    {
      id: "3",
      title: "Effective Java",
      author: "Joshua Bloch",
      requestedBy: "developer@example.com",
      requestedAt: "2024-01-13T09:15:00Z",
      status: "completed",
      priority: "normal"
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newRequest, setNewRequest] = useState({
    title: "",
    author: "",
    isbn: "",
    year: "",
    comment: "",
    priority: "normal" as const
  });

  const handleSubmitRequest = () => {
    const request: BookRequest = {
      id: Date.now().toString(),
      title: newRequest.title,
      author: newRequest.author,
      isbn: newRequest.isbn || undefined,
      year: newRequest.year ? parseInt(newRequest.year) : undefined,
      requestedBy: "current.user@example.com", // In real app, get from auth
      requestedAt: new Date().toISOString(),
      status: "pending",
      priority: newRequest.priority,
      comment: newRequest.comment || undefined
    };

    setRequests([request, ...requests]);
    setNewRequest({
      title: "",
      author: "",
      isbn: "",
      year: "",
      comment: "",
      priority: "normal"
    });
    setIsDialogOpen(false);

    toast({
      title: "Request Submitted",
      description: "Your book request has been submitted for approval.",
    });
  };

  const handleStatusChange = (requestId: string, newStatus: BookRequest["status"], adminComment?: string) => {
    setRequests(requests.map(req => 
      req.id === requestId 
        ? { ...req, status: newStatus, adminComment }
        : req
    ));

    toast({
      title: "Request Updated",
      description: `Request has been ${newStatus}.`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-500/20 text-yellow-500";
      case "approved": return "bg-blue-500/20 text-blue-500";
      case "downloading": return "bg-purple-500/20 text-purple-500";
      case "completed": return "bg-green-500/20 text-green-500";
      case "rejected": return "bg-red-500/20 text-red-500";
      default: return "bg-muted/20 text-muted-foreground";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-500/20 text-red-500";
      case "normal": return "bg-blue-500/20 text-blue-500";
      case "low": return "bg-gray-500/20 text-gray-500";
      default: return "bg-muted/20 text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending": return <Clock className="h-4 w-4" />;
      case "approved": return <Check className="h-4 w-4" />;
      case "completed": return <Check className="h-4 w-4" />;
      case "rejected": return <X className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const filterRequests = (status?: string) => {
    if (!status) return requests;
    return requests.filter(req => req.status === status);
  };

  const stats = {
    pending: requests.filter(r => r.status === "pending").length,
    approved: requests.filter(r => r.status === "approved").length,
    completed: requests.filter(r => r.status === "completed").length,
    total: requests.length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-library-text-primary">Book Requests</h1>
          <p className="text-library-text-secondary">Request books to be added to the library</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary hover:opacity-90 gap-2">
              <Plus className="h-4 w-4" />
              Request Book
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Request a New Book</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Book Title *</Label>
                <Input
                  id="title"
                  value={newRequest.title}
                  onChange={(e) => setNewRequest({...newRequest, title: e.target.value})}
                  placeholder="Enter book title"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="author">Author *</Label>
                <Input
                  id="author"
                  value={newRequest.author}
                  onChange={(e) => setNewRequest({...newRequest, author: e.target.value})}
                  placeholder="Enter author name"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="isbn">ISBN (Optional)</Label>
                  <Input
                    id="isbn"
                    value={newRequest.isbn}
                    onChange={(e) => setNewRequest({...newRequest, isbn: e.target.value})}
                    placeholder="978-0000000000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="year">Year (Optional)</Label>
                  <Input
                    id="year"
                    type="number"
                    value={newRequest.year}
                    onChange={(e) => setNewRequest({...newRequest, year: e.target.value})}
                    placeholder="2024"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="comment">Comment (Optional)</Label>
                <Textarea
                  id="comment"
                  value={newRequest.comment}
                  onChange={(e) => setNewRequest({...newRequest, comment: e.target.value})}
                  placeholder="Why do you need this book?"
                  rows={3}
                />
              </div>

              <Button 
                onClick={handleSubmitRequest}
                className="w-full bg-gradient-primary hover:opacity-90"
                disabled={!newRequest.title || !newRequest.author}
              >
                Submit Request
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-surface border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-library-text-secondary">Total Requests</p>
                <p className="text-2xl font-bold text-library-text-primary">{stats.total}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-surface border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-library-text-secondary">Pending</p>
                <p className="text-2xl font-bold text-yellow-500">{stats.pending}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-surface border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-library-text-secondary">Approved</p>
                <p className="text-2xl font-bold text-blue-500">{stats.approved}</p>
              </div>
              <Check className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-surface border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-library-text-secondary">Completed</p>
                <p className="text-2xl font-bold text-green-500">{stats.completed}</p>
              </div>
              <Check className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Requests Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Requests</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {requests.map((request) => (
            <Card key={request.id} className="bg-gradient-surface border-border/50">
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start gap-3">
                      {getStatusIcon(request.status)}
                      <div className="flex-1">
                        <h3 className="font-semibold text-library-text-primary">{request.title}</h3>
                        <p className="text-library-text-secondary">by {request.author}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-library-text-secondary">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {request.requestedBy}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(request.requestedAt).toLocaleDateString()}
                      </div>
                      {request.isbn && (
                        <span>ISBN: {request.isbn}</span>
                      )}
                      {request.year && (
                        <span>Year: {request.year}</span>
                      )}
                    </div>

                    {request.comment && (
                      <p className="text-sm text-library-text-secondary bg-muted/20 p-3 rounded-lg">
                        "{request.comment}"
                      </p>
                    )}

                    {request.adminComment && (
                      <p className="text-sm text-primary bg-primary/10 p-3 rounded-lg">
                        Admin: {request.adminComment}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <div className="flex gap-2">
                      <Badge className={getStatusColor(request.status)}>
                        {request.status}
                      </Badge>
                      <Badge className={getPriorityColor(request.priority)}>
                        {request.priority}
                      </Badge>
                    </div>

                    {request.status === "pending" && (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleStatusChange(request.id, "approved")}
                          className="bg-blue-500 hover:bg-blue-600"
                        >
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleStatusChange(request.id, "rejected", "Not available")}
                        >
                          Reject
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          {filterRequests("pending").map((request) => (
            <Card key={request.id} className="bg-gradient-surface border-border/50">
              {/* Same card content structure */}
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="approved" className="space-y-4">
          {filterRequests("approved").map((request) => (
            <Card key={request.id} className="bg-gradient-surface border-border/50">
              {/* Same card content structure */}
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {filterRequests("completed").map((request) => (
            <Card key={request.id} className="bg-gradient-surface border-border/50">
              {/* Same card content structure */}
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RequestSystem;