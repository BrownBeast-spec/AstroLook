
import { useState } from "react";
import { Plus, Calendar, ExternalLink, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Navigation from "@/components/Navigation";

interface BlogPost {
  id: number;
  title: string;
  summary: string;
  date: string;
  imageUrl?: string;
  aiHint?: string;
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([
    {
      id: 1,
      title: "New Exoplanet Discovery by Mount Abu Observatory",
      summary: "Researchers at Mount Abu Observatory have announced the discovery of a new Earth-like exoplanet orbiting a nearby star. Detailed observations are underway.",
      date: "6/1/2023",
      imageUrl: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=600&h=400&fit=crop"
    },
    {
      id: 2,
      title: "Annual Open House Event Announced",
      summary: "Join us for our annual open house on August 15th! Explore the observatory, meet our astronomers, and enjoy nighttime sky viewing sessions.",
      date: "5/15/2023",
      imageUrl: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=600&h=400&fit=crop"
    },
    {
      id: 3,
      title: "Upgrades to 1.2m Telescope Completed",
      summary: "The primary 1.2m telescope has undergone significant upgrades, enhancing its imaging capabilities and sensitivity for future research projects.",
      date: "4/20/2023",
      imageUrl: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=600&h=400&fit=crop"
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newPost, setNewPost] = useState({
    title: "",
    summary: "",
    imageUrl: "",
    aiHint: ""
  });

  const handleAddPost = () => {
    if (newPost.title && newPost.summary) {
      const post: BlogPost = {
        id: posts.length + 1,
        title: newPost.title,
        summary: newPost.summary,
        date: new Date().toLocaleDateString(),
        imageUrl: newPost.imageUrl || undefined,
        aiHint: newPost.aiHint || undefined
      };
      setPosts([post, ...posts]);
      setNewPost({ title: "", summary: "", imageUrl: "", aiHint: "" });
      setIsDialogOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent mb-4">
              <Edit className="inline mr-3 h-8 w-8 text-orange-500" />
              Observatory Blog
            </h1>
            <p className="text-gray-400 text-lg">
              Latest discoveries, announcements, and observatory updates
            </p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-orange-500 hover:bg-orange-600">
                <Plus className="mr-2 h-4 w-4" />
                Add New Article
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-orange-400">Create New Article</DialogTitle>
                <DialogDescription className="text-gray-400">
                  Add a new blog post to share observatory news and discoveries.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title" className="text-gray-300">Article Title</Label>
                  <Input
                    id="title"
                    value={newPost.title}
                    onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                    placeholder="Enter the article title"
                    className="bg-slate-700 border-slate-600 text-white mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="summary" className="text-gray-300">Summary/Content</Label>
                  <Textarea
                    id="summary"
                    value={newPost.summary}
                    onChange={(e) => setNewPost({...newPost, summary: e.target.value})}
                    placeholder="Write the main content or summary of the article"
                    className="bg-slate-700 border-slate-600 text-white mt-1 min-h-32"
                  />
                </div>
                <div>
                  <Label htmlFor="imageUrl" className="text-gray-300">Image URL (Optional)</Label>
                  <Input
                    id="imageUrl"
                    value={newPost.imageUrl}
                    onChange={(e) => setNewPost({...newPost, imageUrl: e.target.value})}
                    placeholder="https://example.com/image.jpg"
                    className="bg-slate-700 border-slate-600 text-white mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="aiHint" className="text-gray-300">AI Hint for Image Generation (Optional)</Label>
                  <Input
                    id="aiHint"
                    value={newPost.aiHint}
                    onChange={(e) => setNewPost({...newPost, aiHint: e.target.value})}
                    placeholder="e.g., telescope under starry night sky"
                    className="bg-slate-700 border-slate-600 text-white mt-1"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button 
                  onClick={handleAddPost} 
                  className="bg-orange-500 hover:bg-orange-600"
                  disabled={!newPost.title || !newPost.summary}
                >
                  Publish Article
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Card key={post.id} className="bg-slate-800/50 border-slate-700 hover:border-orange-500/50 transition-all duration-300 hover:transform hover:scale-105 group">
              {post.imageUrl && (
                <div className="aspect-video overflow-hidden rounded-t-lg">
                  <img 
                    src={post.imageUrl} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-white group-hover:text-orange-400 transition-colors line-clamp-2">
                  {post.title}
                </CardTitle>
                <CardDescription className="text-gray-400 flex items-center">
                  <Calendar className="mr-1 h-4 w-4" />
                  {post.date}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4 line-clamp-3">
                  {post.summary}
                </p>
                <Button variant="outline" className="border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-white w-full">
                  Read More
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mx-auto flex items-center justify-center mb-4">
              <Edit className="h-8 w-8 text-white" />
            </div>
            <p className="text-gray-300 text-lg mb-2">No blog posts yet</p>
            <p className="text-gray-400">Start by adding your first article!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
