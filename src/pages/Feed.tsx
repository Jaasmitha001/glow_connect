
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThumbsUp, MessageCircle, Share2, MoreHorizontal, Briefcase, Heart, MapPin } from "lucide-react";
import { NETWORK_POSTS, JOBS } from "@/data/mockData";

const Feed = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/login");
    }
  }, [user, isLoading, navigate]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-primary">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container py-6 page-transition">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Profile Summary - Left Sidebar */}
          <aside className="lg:col-span-3 space-y-6">
            <Card className="overflow-hidden">
              <div className="h-24 bg-gradient-to-r from-primary to-accent"></div>
              <CardContent className="pt-0 relative">
                <div className="-mt-12 flex justify-center">
                  <Avatar className="h-24 w-24 border-4 border-background">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </div>
                <div className="text-center mt-2">
                  <h3 className="font-semibold text-lg">{user.name}</h3>
                  <p className="text-sm text-muted-foreground">{user.title}</p>
                  {user.company && (
                    <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground mt-1">
                      <Briefcase className="h-3 w-3" />
                      <span>{user.company}</span>
                    </div>
                  )}
                  {user.location && (
                    <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground mt-1">
                      <MapPin className="h-3 w-3" />
                      <span>{user.location}</span>
                    </div>
                  )}
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Profile views</span>
                    <span className="text-sm font-medium">142</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Connections</span>
                    <span className="text-sm font-medium">{user.connections}</span>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <Button variant="outline" className="w-full">View full profile</Button>
              </CardContent>
            </Card>
            
            {/* Skills Section */}
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-4">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {user.skills.map((skill, index) => (
                    <div key={index} className="bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-xs">
                      {skill}
                    </div>
                  ))}
                  {user.skills.length === 0 && (
                    <p className="text-sm text-muted-foreground">Add skills to your profile to highlight your expertise.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </aside>
          
          {/* Main Content - Feed Posts */}
          <div className="lg:col-span-6 space-y-6">
            {/* Post Creator */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex gap-3">
                  <Avatar>
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" className="w-full justify-start text-muted-foreground rounded-full h-auto py-3">
                    What's on your mind, {user.name.split(' ')[0]}?
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Network Posts */}
            {NETWORK_POSTS.map((post) => (
              <Card key={post.id} className="overflow-hidden animate-fade-in">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-3">
                      <Avatar>
                        <AvatarImage src={post.author.avatar} alt={post.author.name} />
                        <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold">{post.author.name}</h4>
                        <p className="text-xs text-muted-foreground">{post.author.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(post.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="mt-3">
                    <p className="text-sm whitespace-pre-line">{post.content}</p>
                  </div>
                  
                  {post.image && (
                    <div className="mt-4 rounded-lg overflow-hidden">
                      <img src={post.image} alt="Post content" className="w-full h-auto hover-scale" />
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center mt-4 pt-4 border-t text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Heart className="h-4 w-4 text-accent" />
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex gap-4">
                      <span>{post.comments} comments</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between mt-2 pt-2 border-t">
                    <Button variant="ghost" className="flex-1 flex items-center gap-2">
                      <ThumbsUp className="h-4 w-4" />
                      <span className="text-sm">Like</span>
                    </Button>
                    <Button variant="ghost" className="flex-1 flex items-center gap-2">
                      <MessageCircle className="h-4 w-4" />
                      <span className="text-sm">Comment</span>
                    </Button>
                    <Button variant="ghost" className="flex-1 flex items-center gap-2">
                      <Share2 className="h-4 w-4" />
                      <span className="text-sm">Share</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Right Sidebar - Job Recommendations */}
          <aside className="lg:col-span-3 space-y-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-4">Jobs for you</h3>
                <div className="space-y-4">
                  {JOBS.slice(0, 3).map((job) => (
                    <div key={job.id} className="flex gap-3 pb-4 border-b last:border-b-0 last:pb-0">
                      <div className="flex-shrink-0 w-10 h-10 rounded overflow-hidden bg-secondary flex items-center justify-center">
                        {job.logo ? (
                          <img src={job.logo} alt={job.company} className="w-full h-full object-cover" />
                        ) : (
                          <Briefcase className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">{job.title}</h4>
                        <p className="text-xs text-muted-foreground">{job.company}</p>
                        <p className="text-xs text-muted-foreground">{job.location}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  View all jobs
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-4">People you may know</h3>
                <div className="space-y-4">
                  {[
                    {
                      name: "Alex Morgan",
                      title: "Frontend Developer at TechCorp",
                      avatar: "https://randomuser.me/api/portraits/women/79.jpg"
                    },
                    {
                      name: "Michael Patel",
                      title: "UX Designer at DesignHub",
                      avatar: "https://randomuser.me/api/portraits/men/54.jpg"
                    },
                    {
                      name: "Jessica Thomas",
                      title: "Product Manager at InnoTech",
                      avatar: "https://randomuser.me/api/portraits/women/91.jpg"
                    }
                  ].map((person, index) => (
                    <div key={index} className="flex gap-3 pb-4 border-b last:border-b-0 last:pb-0">
                      <Avatar>
                        <AvatarImage src={person.avatar} alt={person.name} />
                        <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium text-sm">{person.name}</h4>
                        <p className="text-xs text-muted-foreground">{person.title}</p>
                        <Button variant="outline" size="sm" className="mt-2 h-7 text-xs">
                          Connect
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Feed;