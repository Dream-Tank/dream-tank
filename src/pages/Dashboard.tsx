import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { IdeaCard } from "@/components/IdeaCard";
import { Lightbulb, Search, TrendingUp, Plus, Trophy, Filter, LogOut, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { ideas as ideasAPI, analytics as analyticsAPI } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

const CATEGORIES = ["All", "Science", "Humanities", "Business", "IT", "Design"];

const SAMPLE_IDEAS = [
  {
    id: "1",
    title: "AI-Powered Study Assistant",
    description:
      "A personalized AI tutor that adapts to each student's learning style and provides 24/7 homework help.",
    category: "IT",
    author: "Sarah Chen",
    votes: 42,
    comments: 8,
    aiScore: 85,
    imageUrl:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    tags: ["AI", "Education", "Mobile App"],
    mentorPick: true,
  },
  {
    id: "2",
    title: "Sustainable Campus Cafeteria",
    description:
      "Transform campus dining with locally sourced ingredients, zero-waste packaging, and composting programs.",
    category: "Science",
    author: "Marcus Johnson",
    votes: 38,
    comments: 12,
    aiScore: 78,
    imageUrl:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80",
    tags: ["Sustainability", "Food", "Environment"],
    mentorPick: false,
  },
  {
    id: "3",
    title: "Virtual Career Fair Platform",
    description:
      "An immersive VR platform connecting students with employers for networking and interviews.",
    category: "Business",
    author: "Emma Williams",
    votes: 35,
    comments: 6,
    aiScore: 72,
    imageUrl:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
    tags: ["VR", "Careers", "Networking"],
    mentorPick: false,
  },
  {
    id: "4",
    title: "Mental Health Chatbot",
    description:
      "Anonymous peer support chatbot providing resources and connecting students with counseling services.",
    category: "Humanities",
    author: "David Park",
    votes: 51,
    comments: 15,
    aiScore: 88,
    imageUrl:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80",
    tags: ["Mental Health", "AI", "Wellbeing"],
    mentorPick: true,
  },
  {
    id: "5",
    title: "Campus Innovation Lab",
    description:
      "A physical makerspace with 3D printers, laser cutters, and tools for students to prototype their ideas.",
    category: "Design",
    author: "Lisa Anderson",
    votes: 29,
    comments: 9,
    aiScore: 81,
    imageUrl:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
    tags: ["Makerspace", "Prototyping", "Hardware"],
    mentorPick: false,
  },
  {
    id: "6",
    title: "Smart Parking System",
    description:
      "IoT sensors and mobile app to find available parking spots in real-time across campus.",
    category: "IT",
    author: "Ryan Thompson",
    votes: 44,
    comments: 11,
    aiScore: 76,
    imageUrl:
      "https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=800&q=80",
    tags: ["IoT", "Mobile", "Transportation"],
    mentorPick: false,
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { toast } = useToast();
  
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [ideas, setIdeas] = useState<any[]>([]);
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchIdeas();
  }, [selectedCategory, searchQuery]);

  const fetchData = async () => {
    try {
      const [analyticsRes] = await Promise.all([
        analyticsAPI.getOverview(),
      ]);
      setAnalytics(analyticsRes.data.overview);
    } catch (error) {
      console.error("Failed to fetch analytics:", error);
      // Fallback to demo analytics data
      setAnalytics({
        totalIdeas: 142,
        ideasThisWeek: 23,
        totalUsers: 856,
        topInnovators: 12
      });
    }
  };

  const fetchIdeas = async () => {
    try {
      setLoading(true);
      const response = await ideasAPI.getAll({
        category: selectedCategory !== "All" ? selectedCategory : undefined,
        search: searchQuery || undefined,
        sortBy: "createdAt",
        order: "desc",
      });
      setIdeas(response.data.ideas);
    } catch (error: any) {
      console.error("Failed to fetch ideas from API, using demo data:", error);
      // Fallback to demo data when API fails
      const filteredIdeas = SAMPLE_IDEAS.filter((idea) => {
        const matchesCategory =
          selectedCategory === "All" || idea.category === selectedCategory;
        const matchesSearch =
          searchQuery === "" ||
          idea.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          idea.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          idea.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
          idea.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          );
        return matchesCategory && matchesSearch;
      });
      setIdeas(filteredIdeas);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border shadow-sm backdrop-blur-sm bg-card/95">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div 
              className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => navigate('/')}
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Lightbulb className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Dream Tank</h1>
                <p className="text-xs text-muted-foreground">
                  {user ? `Welcome, ${user.name}` : "Innovation Hub"}
                </p>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center gap-2">
              <Button variant="ghost" onClick={() => navigate('/dashboard')}>
                <TrendingUp className="w-4 h-4 mr-2" />
                Browse
              </Button>
              <Button variant="ghost" onClick={() => navigate('/leaderboard')}>
                <Trophy className="w-4 h-4 mr-2" />
                Leaderboard
              </Button>
              {user && (
                <Button onClick={() => navigate('/submit')} className="bg-gradient-primary">
                  <Plus className="w-4 h-4 mr-2" />
                  Submit Idea
                </Button>
              )}
              {user ? (
                <Button variant="ghost" onClick={handleLogout} size="sm">
                  <LogOut className="w-4 h-4" />
                </Button>
              ) : (
                <Button variant="ghost" onClick={() => navigate('/login')} size="sm">
                  Login
                </Button>
              )}
            </nav>

            <Button 
              onClick={() => navigate('/submit')}
              className="md:hidden bg-gradient-primary"
              size="sm"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Hero Stats */}
        {analytics && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <StatCard title="Total Ideas" value={analytics.totalIdeas.toString()} icon={<Lightbulb className="w-5 h-5" />} />
            <StatCard title="This Week" value={`+${analytics.ideasThisWeek}`} icon={<TrendingUp className="w-5 h-5" />} trending />
            <StatCard title="Active Users" value={analytics.totalUsers.toString()} icon={<Lightbulb className="w-5 h-5" />} />
            <StatCard title="Top Innovators" value={analytics.topInnovators?.toString() || "12"} icon={<Trophy className="w-5 h-5" />} />
          </div>
        )}

        {/* Search & Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search ideas, tags, or authors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 bg-card"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <Filter className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            {CATEGORIES.map(category => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`cursor-pointer whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? "bg-gradient-primary text-white hover:opacity-90"
                    : "hover:bg-muted"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
          </div>
        ) : (
          <>
            {/* Ideas Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ideas.map(idea => (
                <IdeaCard key={idea.id} idea={{
                  ...idea,
                  author: idea.author?.name || "Unknown",
                  votes: idea.voteCount || 0,
                  comments: idea.commentCount || 0,
                  status: idea.status || "SUBMITTED",
                  aiProcessed: idea.aiProcessed || false,
                }} />
              ))}
            </div>

            {ideas.length === 0 && (
              <div className="text-center py-16">
                <Lightbulb className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No ideas found</h3>
                <p className="text-muted-foreground mb-6">
                  {searchQuery || selectedCategory !== "All" 
                    ? "Try adjusting your search or filters" 
                    : "Be the first to submit an innovative idea!"}
                </p>
                <Button onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}>
                  Clear Filters
                </Button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

const StatCard = ({ title, value, icon, trending }: { title: string; value: string; icon: React.ReactNode; trending?: boolean }) => {
  return (
    <div className="bg-card rounded-xl p-4 shadow-card border border-border">
      <div className="flex items-center justify-between mb-2">
        <div className="text-muted-foreground">{icon}</div>
        {trending && (
          <Badge className="bg-accent text-accent-foreground">
            <TrendingUp className="w-3 h-3 mr-1" />
            Hot
          </Badge>
        )}
      </div>
      <div className="text-2xl font-bold text-foreground">{value}</div>
      <div className="text-sm text-muted-foreground">{title}</div>
    </div>
  );
};

export default Dashboard;