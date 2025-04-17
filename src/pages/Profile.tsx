
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Edit, Briefcase, MapPin, Calendar, GraduationCap, 
  Link as LinkIcon, Mail, Plus, UserPlus, FileText, Building 
} from "lucide-react";

const Profile = () => {
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
        {/* Profile Header */}
        <Card className="mb-6 overflow-hidden">
          <div className="h-48 bg-gradient-to-r from-primary/30 to-accent/30 relative">
            <Button variant="ghost" size="sm" className="absolute top-4 right-4 bg-background/80 hover:bg-background/90">
              <Edit className="h-4 w-4 mr-2" />
              Edit Cover
            </Button>
          </div>
          
          <CardContent className="pt-0 relative">
            <div className="-mt-16 flex items-end justify-between">
              <div className="flex items-end">
                <Avatar className="h-32 w-32 border-4 border-background">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="ml-4 mb-4">
                  <h1 className="text-2xl font-bold">{user.name}</h1>
                  <p className="text-muted-foreground">{user.title}</p>
                  
                  <div className="flex flex-wrap items-center gap-4 mt-2">
                    {user.company && (
                      <div className="flex items-center gap-1 text-sm">
                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                        <span>{user.company}</span>
                      </div>
                    )}
                    {user.location && (
                      <div className="flex items-center gap-1 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{user.location}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{user.email}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-4 flex gap-2">
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
                <Button size="sm">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Connect
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* About Section */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-semibold text-lg">About</h2>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
                
                <p className="text-sm whitespace-pre-line">
                  {user.bio || "Add a bio to tell people more about yourself, your experience, and interests."}
                </p>
              </CardContent>
            </Card>
            
            {/* Experience Section */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-semibold text-lg">Experience</h2>
                  <Button variant="ghost" size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                
                {user.id === "1" ? (
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded bg-secondary flex items-center justify-center">
                        <Building className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div>
                        <h3 className="font-medium">Senior Frontend Developer</h3>
                        <p className="text-sm text-muted-foreground">TechCorp Inc.</p>
                        <p className="text-xs text-muted-foreground">Jan 2020 - Present · 4 yrs 3 mos</p>
                        <p className="text-xs text-muted-foreground">San Francisco, CA</p>
                        <p className="text-sm mt-2">
                          Leading the frontend development team, building scalable web applications using React and TypeScript.
                        </p>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded bg-secondary flex items-center justify-center">
                        <Building className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div>
                        <h3 className="font-medium">Frontend Developer</h3>
                        <p className="text-sm text-muted-foreground">WebSolutions Inc.</p>
                        <p className="text-xs text-muted-foreground">Mar 2017 - Dec 2019 · 2 yrs 10 mos</p>
                        <p className="text-xs text-muted-foreground">San Francisco, CA</p>
                        <p className="text-sm mt-2">
                          Developed responsive web applications and collaborated with UX designers to implement user interfaces.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : user.id === "2" ? (
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded bg-secondary flex items-center justify-center">
                        <Building className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div>
                        <h3 className="font-medium">Product Manager</h3>
                        <p className="text-sm text-muted-foreground">Innovate Solutions</p>
                        <p className="text-xs text-muted-foreground">Jun 2019 - Present · 4 yrs 10 mos</p>
                        <p className="text-xs text-muted-foreground">New York, NY</p>
                        <p className="text-sm mt-2">
                          Leading product strategy and roadmap development for SaaS products. Working closely with engineering, design, and marketing teams.
                        </p>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded bg-secondary flex items-center justify-center">
                        <Building className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div>
                        <h3 className="font-medium">UX Designer</h3>
                        <p className="text-sm text-muted-foreground">DesignWorks</p>
                        <p className="text-xs text-muted-foreground">Aug 2016 - May 2019 · 2 yrs 10 mos</p>
                        <p className="text-xs text-muted-foreground">New York, NY</p>
                        <p className="text-sm mt-2">
                          Created user flows, wireframes, and prototypes. Conducted user research and usability testing.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-sm text-muted-foreground">Add your work experience to highlight your career path.</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Experience
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Education Section */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-semibold text-lg">Education</h2>
                  <Button variant="ghost" size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                
                {user.id === "1" ? (
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded bg-secondary flex items-center justify-center">
                      <GraduationCap className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="font-medium">University of California, Berkeley</h3>
                      <p className="text-sm text-muted-foreground">Bachelor of Science, Computer Science</p>
                      <p className="text-xs text-muted-foreground">2013 - 2017</p>
                    </div>
                  </div>
                ) : user.id === "2" ? (
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded bg-secondary flex items-center justify-center">
                      <GraduationCap className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="font-medium">New York University</h3>
                      <p className="text-sm text-muted-foreground">Master of Business Administration</p>
                      <p className="text-xs text-muted-foreground">2014 - 2016</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-sm text-muted-foreground">Add your education details to showcase your academic background.</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Education
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          {/* Middle Column */}
          <div className="space-y-6">
            {/* Skills Section */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-semibold text-lg">Skills</h2>
                  <Button variant="ghost" size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {user.skills.map((skill, index) => (
                    <div key={index} className="bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-sm">
                      {skill}
                    </div>
                  ))}
                  {user.skills.length === 0 && (
                    <p className="text-sm text-muted-foreground">Add skills to your profile to highlight your expertise.</p>
                  )}
                </div>
              </CardContent>
            </Card>
            
            {/* Projects Section */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-semibold text-lg">Projects</h2>
                  <Button variant="ghost" size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                
                {user.id === "1" ? (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium">E-commerce Platform Redesign</h3>
                      <p className="text-xs text-muted-foreground">Jan 2022 - Apr 2022</p>
                      <p className="text-sm mt-2">
                        Led the frontend development for a complete redesign of an e-commerce platform, resulting in a 35% increase in conversion rate.
                      </p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <div className="bg-secondary text-secondary-foreground rounded-full px-2 py-0.5 text-xs">React</div>
                        <div className="bg-secondary text-secondary-foreground rounded-full px-2 py-0.5 text-xs">TypeScript</div>
                        <div className="bg-secondary text-secondary-foreground rounded-full px-2 py-0.5 text-xs">GraphQL</div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="font-medium">Internal Dashboard</h3>
                      <p className="text-xs text-muted-foreground">May 2021 - Aug 2021</p>
                      <p className="text-sm mt-2">
                        Developed a comprehensive admin dashboard for internal teams to manage content and user data.
                      </p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <div className="bg-secondary text-secondary-foreground rounded-full px-2 py-0.5 text-xs">React</div>
                        <div className="bg-secondary text-secondary-foreground rounded-full px-2 py-0.5 text-xs">Redux</div>
                        <div className="bg-secondary text-secondary-foreground rounded-full px-2 py-0.5 text-xs">Node.js</div>
                      </div>
                    </div>
                  </div>
                ) : user.id === "2" ? (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium">SaaS Product Launch</h3>
                      <p className="text-xs text-muted-foreground">Sep 2021 - Mar 2022</p>
                      <p className="text-sm mt-2">
                        Led the product strategy and launch of a new SaaS platform targeting small businesses, exceeding first-quarter goals by 25%.
                      </p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <div className="bg-secondary text-secondary-foreground rounded-full px-2 py-0.5 text-xs">Product Strategy</div>
                        <div className="bg-secondary text-secondary-foreground rounded-full px-2 py-0.5 text-xs">User Research</div>
                        <div className="bg-secondary text-secondary-foreground rounded-full px-2 py-0.5 text-xs">Market Analysis</div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="font-medium">Mobile App Redesign</h3>
                      <p className="text-xs text-muted-foreground">Feb 2020 - Jul 2020</p>
                      <p className="text-sm mt-2">
                        Managed the redesign of a mobile application, resulting in a 40% increase in user engagement and a 20% reduction in churn.
                      </p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <div className="bg-secondary text-secondary-foreground rounded-full px-2 py-0.5 text-xs">UX Design</div>
                        <div className="bg-secondary text-secondary-foreground rounded-full px-2 py-0.5 text-xs">Product Management</div>
                        <div className="bg-secondary text-secondary-foreground rounded-full px-2 py-0.5 text-xs">Agile</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-sm text-muted-foreground">Showcase your projects and accomplishments here.</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Project
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          {/* Right Column */}
          <div className="space-y-6">
            {/* Connections Section */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-semibold text-lg">Connections</h2>
                  <span className="text-sm text-muted-foreground">{user.connections}</span>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-4">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="text-center">
                      <Avatar className="mx-auto">
                        <AvatarImage src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'men' : 'women'}/${30 + i}.jpg`} />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                    </div>
                  ))}
                </div>
                
                <Button variant="outline" className="w-full" size="sm">
                  View all connections
                </Button>
              </CardContent>
            </Card>
            
            {/* Activity Section */}
            <Card>
              <CardContent className="pt-6">
                <h2 className="font-semibold text-lg mb-4">Activity</h2>
                
                <div className="space-y-4">
                  <div className="border-l-2 border-primary/50 pl-4 pb-4">
                    <p className="text-sm">John shared an article</p>
                    <p className="text-xs text-muted-foreground">2 days ago</p>
                  </div>
                  
                  <div className="border-l-2 border-primary/50 pl-4 pb-4">
                    <p className="text-sm">John started a new position at TechCorp Inc.</p>
                    <p className="text-xs text-muted-foreground">1 month ago</p>
                  </div>
                  
                  <div className="border-l-2 border-primary/50 pl-4">
                    <p className="text-sm">John added new skills: GraphQL, Next.js</p>
                    <p className="text-xs text-muted-foreground">3 months ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Contact Information */}
            <Card>
              <CardContent className="pt-6">
                <h2 className="font-semibold text-lg mb-4">Contact Information</h2>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{user.email}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <LinkIcon className="h-4 w-4 text-muted-foreground" />
                    <a href="#" className="text-sm text-primary">linkedin.com/in/johndoe</a>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <LinkIcon className="h-4 w-4 text-muted-foreground" />
                    <a href="#" className="text-sm text-primary">github.com/johndoe</a>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <a href="#" className="text-sm text-primary">Download Resume</a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;