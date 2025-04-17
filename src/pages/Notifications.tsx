
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, UserPlus, MessageCircle, Briefcase, Star, ThumbsUp, MoreHorizontal } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Notifications = () => {
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

  const mockNotifications = [
    {
      id: 1,
      type: "connection",
      actor: {
        name: "Alex Morgan",
        avatar: "https://randomuser.me/api/portraits/women/79.jpg"
      },
      content: "sent you a connection request",
      timestamp: "10 minutes ago",
      unread: true
    },
    {
      id: 2,
      type: "like",
      actor: {
        name: "Michael Patel",
        avatar: "https://randomuser.me/api/portraits/men/54.jpg"
      },
      content: "liked your post about React development",
      timestamp: "2 hours ago",
      unread: true
    },
    {
      id: 3,
      type: "message",
      actor: {
        name: "Jessica Thomas",
        avatar: "https://randomuser.me/api/portraits/women/91.jpg"
      },
      content: "sent you a message",
      timestamp: "Yesterday",
      unread: false
    },
    {
      id: 4,
      type: "job",
      actor: {
        name: "TechGrowth Inc.",
        avatar: "https://logo.clearbit.com/google.com"
      },
      content: "posted a new Senior Frontend Developer position that matches your profile",
      timestamp: "Yesterday",
      unread: false
    },
    {
      id: 5,
      type: "endorsement",
      actor: {
        name: "David Lee",
        avatar: "https://randomuser.me/api/portraits/men/28.jpg"
      },
      content: "endorsed you for React",
      timestamp: "2 days ago",
      unread: false
    },
    {
      id: 6,
      type: "connection",
      actor: {
        name: "Sophia Chen",
        avatar: "https://randomuser.me/api/portraits/women/33.jpg"
      },
      content: "accepted your connection request",
      timestamp: "3 days ago",
      unread: false
    },
    {
      id: 7,
      type: "mention",
      actor: {
        name: "Robert Johnson",
        avatar: "https://randomuser.me/api/portraits/men/45.jpg"
      },
      content: "mentioned you in a comment",
      timestamp: "4 days ago",
      unread: false
    }
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "connection":
        return <UserPlus className="h-5 w-5 text-primary" />;
      case "like":
        return <ThumbsUp className="h-5 w-5 text-primary" />;
      case "message":
        return <MessageCircle className="h-5 w-5 text-primary" />;
      case "job":
        return <Briefcase className="h-5 w-5 text-primary" />;
      case "endorsement":
        return <Star className="h-5 w-5 text-primary" />;
      case "mention":
        return <Bell className="h-5 w-5 text-primary" />;
      default:
        return <Bell className="h-5 w-5 text-primary" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container py-6 page-transition">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Notifications</h1>
            <Button variant="outline" size="sm">Mark all as read</Button>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <Tabs defaultValue="all">
                <TabsList className="grid grid-cols-3 w-full rounded-none">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="unread">Unread</TabsTrigger>
                  <TabsTrigger value="mentions">Mentions</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="p-0">
                  <div className="divide-y">
                    {mockNotifications.map((notification) => (
                      <div 
                        key={notification.id} 
                        className={`flex gap-4 p-4 hover:bg-secondary/50 transition-colors ${notification.unread ? 'bg-secondary/30' : ''}`}
                      >
                        <div className="flex-shrink-0 w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-secondary">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={notification.actor.avatar} alt={notification.actor.name} />
                                <AvatarFallback>{notification.actor.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm">
                                  <span className="font-medium">{notification.actor.name}</span>{" "}
                                  {notification.content}
                                </p>
                                <p className="text-xs text-muted-foreground">{notification.timestamp}</p>
                              </div>
                            </div>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        {notification.unread && (
                          <div className="flex-shrink-0 w-2 h-2 rounded-full bg-primary self-center"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="unread" className="p-0">
                  <div className="divide-y">
                    {mockNotifications.filter(n => n.unread).map((notification) => (
                      <div 
                        key={notification.id} 
                        className={`flex gap-4 p-4 hover:bg-secondary/50 transition-colors bg-secondary/30`}
                      >
                        <div className="flex-shrink-0 w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-secondary">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={notification.actor.avatar} alt={notification.actor.name} />
                                <AvatarFallback>{notification.actor.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm">
                                  <span className="font-medium">{notification.actor.name}</span>{" "}
                                  {notification.content}
                                </p>
                                <p className="text-xs text-muted-foreground">{notification.timestamp}</p>
                              </div>
                            </div>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="flex-shrink-0 w-2 h-2 rounded-full bg-primary self-center"></div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="mentions" className="p-0">
                  <div className="divide-y">
                    {mockNotifications.filter(n => n.type === 'mention').map((notification) => (
                      <div 
                        key={notification.id} 
                        className={`flex gap-4 p-4 hover:bg-secondary/50 transition-colors ${notification.unread ? 'bg-secondary/30' : ''}`}
                      >
                        <div className="flex-shrink-0 w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-secondary">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={notification.actor.avatar} alt={notification.actor.name} />
                                <AvatarFallback>{notification.actor.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm">
                                  <span className="font-medium">{notification.actor.name}</span>{" "}
                                  {notification.content}
                                </p>
                                <p className="text-xs text-muted-foreground">{notification.timestamp}</p>
                              </div>
                            </div>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        {notification.unread && (
                          <div className="flex-shrink-0 w-2 h-2 rounded-full bg-primary self-center"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Notifications;