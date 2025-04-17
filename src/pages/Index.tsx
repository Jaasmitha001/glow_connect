
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowRight, CheckCircle, Users, Briefcase, Zap } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 page-transition">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col md:flex-row md:items-center gap-12">
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  Connect, Grow &<br /><span className="gradient-text">Elevate Your Career</span>
                </h1>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto md:mx-0">
                  Join thousands of professionals building meaningful connections
                  and discovering exciting career opportunities.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  {user ? (
                    <Link to="/feed">
                      <Button size="lg" className="button-hover">
                        Go to Feed <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  ) : (
                    <>
                      <Link to="/signup">
                        <Button size="lg" className="button-hover">
                          Get Started <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                      <Link to="/login">
                        <Button size="lg" variant="outline" className="button-hover">
                          Log In
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
              <div className="flex-1 relative">
                <div className="relative z-10 rounded-xl overflow-hidden shadow-xl transform transition-transform hover:scale-[1.02] duration-500">
                  <img 
                    src="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?auto=format&fit=crop&w=800&q=80" 
                    alt="Professionals networking" 
                    className="w-full h-auto"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-full h-full bg-gradient-to-tr from-primary to-accent rounded-xl -z-10"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-secondary/50">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose GlowConnect?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="rounded-full bg-primary/10 p-3 w-fit mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Meaningful Connections</h3>
                <p className="text-muted-foreground">
                  Build a network of professionals who share your interests and can help advance your career.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="rounded-full bg-primary/10 p-3 w-fit mb-4">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Career Opportunities</h3>
                <p className="text-muted-foreground">
                  Discover exciting job opportunities matched to your skills and experience.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="rounded-full bg-primary/10 p-3 w-fit mb-4">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Skill Development</h3>
                <p className="text-muted-foreground">
                  Learn from industry experts and enhance your skills with resources tailored to your goals.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 px-4 sm:px-6">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index} 
                  className="glass-card p-6 rounded-xl relative hover-scale"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                      <img src={testimonial.avatar} alt={testimonial.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-sm">{testimonial.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-6 bg-gradient-to-r from-primary/10 to-accent/10">
          <div className="container mx-auto max-w-5xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to advance your career?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of professionals already building connections and finding opportunities on GlowConnect.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user ? (
                <Link to="/feed">
                  <Button size="lg" className="button-hover">
                    Explore Your Feed <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/signup">
                    <Button size="lg" className="button-hover">
                      Get Started <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button size="lg" variant="outline" className="button-hover">
                      Log In
                    </Button>
                  </Link>
                </>
              )}
            </div>
            
            <div className="mt-10 flex flex-col sm:flex-row gap-6 justify-center items-center text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span>Free to join</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

const testimonials = [
  {
    name: "David Chen",
    role: "Software Engineer",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "GlowConnect helped me find my dream job in just two weeks! The connections I made here were invaluable to my job search."
  },
  {
    name: "Priya Sharma",
    role: "Marketing Director",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    text: "The quality of connections on this platform is outstanding. I've found both clients and mentors through GlowConnect."
  },
  {
    name: "Michael Brown",
    role: "Product Manager",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    text: "What sets GlowConnect apart is how it matches you with relevant opportunities based on your skills and goals."
  }
];

export default Index;