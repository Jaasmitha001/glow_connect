

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Briefcase, Search, MapPin, Building, DollarSign, Calendar, Clock, ChevronRight, Filter } from "lucide-react";
import { JOBS, POPULAR_SKILLS } from "@/data/mockData";

const Jobs = () => {
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      return 'Posted yesterday';
    } else if (diffDays <= 7) {
      return `Posted ${diffDays} days ago`;
    } else {
      return `Posted on ${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container py-6 page-transition">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Job Board</h1>
          <p className="text-muted-foreground">Find your next opportunity from our curated job listings</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Filters - Left Sidebar */}
          <aside className="lg:col-span-3 space-y-6">
            <Card>
              <CardContent className="pt-6">
                <h2 className="font-semibold mb-4 flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Job Type</h3>
                    <div className="space-y-2">
                      {['Full-time', 'Part-time', 'Contract', 'Remote'].map((type) => (
                        <div key={type} className="flex items-center">
                          <input type="checkbox" id={type} className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
                          <label htmlFor={type} className="ml-2 text-sm">{type}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Experience Level</h3>
                    <div className="space-y-2">
                      {['Entry-level', 'Mid-level', 'Senior', 'Director', 'Executive'].map((level) => (
                        <div key={level} className="flex items-center">
                          <input type="checkbox" id={level} className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
                          <label htmlFor={level} className="ml-2 text-sm">{level}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Location</h3>
                    <div className="space-y-2">
                      {['Remote', 'San Francisco, CA', 'New York, NY', 'Seattle, WA', 'Boston, MA'].map((location) => (
                        <div key={location} className="flex items-center">
                          <input type="checkbox" id={location.replace(/,/g, '')} className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
                          <label htmlFor={location.replace(/,/g, '')} className="ml-2 text-sm">{location}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Salary Range</h3>
                    <div className="space-y-2">
                      {['$0 - $50K', '$50K - $100K', '$100K - $150K', '$150K+'].map((range) => (
                        <div key={range} className="flex items-center">
                          <input type="checkbox" id={range.replace(/\$/g, '').replace(/\s/g, '')} className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
                          <label htmlFor={range.replace(/\$/g, '').replace(/\s/g, '')} className="ml-2 text-sm">{range}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    Apply Filters
                  </Button>
                </div>
              </CardContent>
            </Card>
          </aside>
          
          {/* Main Content - Job Listings */}
          <div className="lg:col-span-6 space-y-6">
            {/* Search Bar */}
            <Card>
              <CardContent className="pt-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search job titles, companies, or keywords"
                    className="pl-10"
                  />
                </div>
              </CardContent>
            </Card>
            
            {/* Job Listings */}
            {JOBS.map((job) => (
              <Card key={job.id} className="overflow-hidden animate-fade-in hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex">
                    <div className="flex-shrink-0 w-14 h-14 rounded overflow-hidden bg-secondary flex items-center justify-center mr-4">
                      {job.logo ? (
                        <img src={job.logo} alt={job.company} className="w-full h-full object-cover" />
                      ) : (
                        <Building className="h-6 w-6 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{job.title}</h3>
                      <p className="text-muted-foreground">{job.company}</p>
                      
                      <div className="grid grid-cols-2 gap-2 mt-4">
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{job.type}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <span>{job.salary}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{formatDate(job.postedDate)}</span>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <p className="text-sm">{job.description}</p>
                      </div>
                      
                      <div className="mt-4 flex flex-wrap gap-2">
                        {job.requirements.slice(0, 3).map((req, index) => (
                          <div key={index} className="bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-xs">
                            {req.length > 30 ? req.substring(0, 30) + '...' : req}
                          </div>
                        ))}
                        {job.requirements.length > 3 && (
                          <div className="text-xs text-primary flex items-center">
                            +{job.requirements.length - 3} more
                          </div>
                        )}
                      </div>
                      
                      <div className="mt-6 flex justify-end">
                        <Button className="button-hover">
                          View job <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Right Sidebar - Job Suggestions */}
          <aside className="lg:col-span-3 space-y-6">
            <Card>
              <CardContent className="pt-6">
                <h2 className="font-semibold mb-4">Skills in Demand</h2>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_SKILLS.map((skill, index) => (
                    <div key={index} className="bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-xs hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                      {skill}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h2 className="font-semibold mb-4">Featured Companies</h2>
                <div className="space-y-4">
                  {[
                    {
                      name: "TechGrowth Inc.",
                      logo: "https://logo.clearbit.com/google.com",
                      jobCount: 12
                    },
                    {
                      name: "InnovateSoft",
                      logo: "https://logo.clearbit.com/facebook.com",
                      jobCount: 8
                    },
                    {
                      name: "DesignMasters",
                      logo: "https://logo.clearbit.com/adobe.com",
                      jobCount: 5
                    },
                    {
                      name: "CloudScale",
                      logo: "https://logo.clearbit.com/aws.amazon.com",
                      jobCount: 9
                    }
                  ].map((company, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded overflow-hidden bg-secondary flex items-center justify-center">
                        <img src={company.logo} alt={company.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h3 className="font-medium text-sm">{company.name}</h3>
                        <p className="text-xs text-muted-foreground">{company.jobCount} open positions</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-primary/10 to-accent/10">
              <CardContent className="pt-6">
                <h2 className="font-semibold mb-2">Job Alert</h2>
                <p className="text-sm text-muted-foreground mb-4">Get notified when new jobs match your profile.</p>
                <Button className="w-full">Create Job Alert</Button>
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Jobs;
