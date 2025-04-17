
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

// Mock user data
const MOCK_USERS = [
  {
    id: "1",
    email: "john@example.com",
    password: "password123",
    name: "John Doe",
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    avatar: "https://randomuser.me/api/portraits/men/43.jpg",
    bio: "Passionate frontend developer with 8+ years of experience building scalable web applications.",
    location: "San Francisco, CA",
    connections: 347,
    skills: ["React", "TypeScript", "UI/UX", "Node.js", "GraphQL"]
  },
  {
    id: "2",
    email: "sarah@example.com",
    password: "password123",
    name: "Sarah Wilson",
    title: "Product Manager",
    company: "Innovate Solutions",
    avatar: "https://randomuser.me/api/portraits/women/63.jpg",
    bio: "Product manager specializing in SaaS products with a background in UX design.",
    location: "New York, NY",
    connections: 512,
    skills: ["Product Strategy", "User Research", "Agile", "Data Analysis", "UX Design"]
  }
];

type User = {
  id: string;
  email: string;
  name: string;
  title: string;
  company: string;
  avatar: string;
  bio: string;
  location: string;
  connections: number;
  skills: string[];
};

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for existing session
    const storedUser = localStorage.getItem("glowconnect_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("glowconnect_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const foundUser = MOCK_USERS.find((u) => u.email === email && u.password === password);
        
        if (foundUser) {
          // Remove password before storing
          const { password, ...userWithoutPassword } = foundUser;
          setUser(userWithoutPassword);
          localStorage.setItem("glowconnect_user", JSON.stringify(userWithoutPassword));
          toast.success("Login successful!");
          resolve(true);
        } else {
          toast.error("Invalid email or password");
          resolve(false);
        }
        setIsLoading(false);
      }, 800);
    });
  };

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const existingUser = MOCK_USERS.find((u) => u.email === email);
        
        if (existingUser) {
          toast.error("Email already in use");
          resolve(false);
        } else {
          // Create a new user (in a real app, we'd send this to the backend)
          const newUser = {
            id: Math.random().toString(36).substr(2, 9),
            email,
            name,
            title: "New Member",
            company: "",
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
            bio: "",
            location: "",
            connections: 0,
            skills: []
          };
          
          setUser(newUser);
          localStorage.setItem("glowconnect_user", JSON.stringify(newUser));
          toast.success("Account created successfully!");
          resolve(true);
        }
        setIsLoading(false);
      }, 800);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("glowconnect_user");
    toast.info("You've been logged out");
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};