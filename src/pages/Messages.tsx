
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Send, MoreHorizontal, Phone, Video, Image, Paperclip, Smile } from "lucide-react";

const Messages = () => {
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

  const mockContacts = [
    {
      id: 1,
      name: "Alex Morgan",
      avatar: "https://randomuser.me/api/portraits/women/79.jpg",
      lastMessage: "Thanks for the information!",
      timestamp: "10:32 AM",
      unread: true,
      online: true
    },
    {
      id: 2,
      name: "Michael Patel",
      avatar: "https://randomuser.me/api/portraits/men/54.jpg",
      lastMessage: "Would you be available for a meeting tomorrow?",
      timestamp: "Yesterday",
      unread: false,
      online: false
    },
    {
      id: 3,
      name: "Jessica Thomas",
      avatar: "https://randomuser.me/api/portraits/women/91.jpg",
      lastMessage: "I just sent you the project files.",
      timestamp: "Yesterday",
      unread: false,
      online: true
    },
    {
      id: 4,
      name: "David Lee",
      avatar: "https://randomuser.me/api/portraits/men/28.jpg",
      lastMessage: "Let's schedule a call to discuss the proposal.",
      timestamp: "Mon",
      unread: false,
      online: false
    },
    {
      id: 5,
      name: "Sophia Chen",
      avatar: "https://randomuser.me/api/portraits/women/33.jpg",
      lastMessage: "Great talking to you at the conference!",
      timestamp: "Sun",
      unread: false,
      online: true
    }
  ];

  const mockMessages = [
    {
      id: 1,
      sender: "contact",
      text: "Hi there! I noticed you have experience with React development.",
      timestamp: "10:15 AM"
    },
    {
      id: 2,
      sender: "user",
      text: "Yes, I've been working with React for several years now. How can I help?",
      timestamp: "10:18 AM"
    },
    {
      id: 3,
      sender: "contact",
      text: "I'm looking for recommendations on state management solutions for a new project. Do you prefer Redux, Context API, or something else?",
      timestamp: "10:22 AM"
    },
    {
      id: 4,
      sender: "user",
      text: "It really depends on the complexity of your project. For simpler applications, React's Context API with useReducer hook might be sufficient. For larger apps with complex state, Redux or Zustand are great options. I've been using Zustand recently and it's much simpler than Redux with less boilerplate.",
      timestamp: "10:25 AM"
    },
    {
      id: 5,
      sender: "contact",
      text: "That's really helpful! I'll look into Zustand. I've only used Redux before and found it a bit cumbersome for smaller projects.",
      timestamp: "10:28 AM"
    },
    {
      id: 6,
      sender: "user",
      text: "Absolutely. Redux is powerful but can be overkill. If you want, I can send you some resources about Zustand and other alternatives.",
      timestamp: "10:30 AM"
    },
    {
      id: 7,
      sender: "contact",
      text: "That would be great! Thanks for the information!",
      timestamp: "10:32 AM"
    }
  ];

  const activeContact = mockContacts[0];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container py-6 page-transition">
        <Card className="h-[calc(100vh-16rem)] overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 h-full">
            {/* Contact List */}
            <div className="md:col-span-4 border-r h-full overflow-hidden flex flex-col">
              <div className="p-4 border-b">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search messages"
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="overflow-y-auto flex-1">
                {mockContacts.map((contact) => (
                  <div 
                    key={contact.id} 
                    className={`flex items-center gap-3 p-3 hover:bg-secondary/50 cursor-pointer transition-colors ${contact.id === activeContact.id ? 'bg-secondary' : ''}`}
                  >
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={contact.avatar} alt={contact.name} />
                        <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {contact.online && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium truncate">{contact.name}</h3>
                        <span className="text-xs text-muted-foreground">{contact.timestamp}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-muted-foreground truncate">{contact.lastMessage}</p>
                        {contact.unread && (
                          <span className="w-2 h-2 bg-primary rounded-full"></span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Message Area */}
            <div className="md:col-span-8 flex flex-col h-full">
              {/* Header */}
              <div className="p-4 border-b flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={activeContact.avatar} alt={activeContact.name} />
                    <AvatarFallback>{activeContact.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{activeContact.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {activeContact.online ? 'Online' : 'Offline'}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <Phone className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Video className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {mockMessages.map((message) => (
                  <div 
                    key={message.id} 
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[70%] rounded-lg p-3 ${
                        message.sender === 'user' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-secondary text-secondary-foreground'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p className="text-xs opacity-70 mt-1 text-right">
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Input Area */}
              <div className="p-4 border-t">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Paperclip className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Image className="h-5 w-5" />
                  </Button>
                  <Input 
                    placeholder="Type a message..." 
                    className="flex-1" 
                  />
                  <Button variant="ghost" size="icon">
                    <Smile className="h-5 w-5" />
                  </Button>
                  <Button size="icon">
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default Messages;