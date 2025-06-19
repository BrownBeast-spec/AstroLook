
import { Telescope, Search, FileText, Brain, Calendar, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  const features = [
    {
      title: "Data Explorer",
      description: "Search and filter astronomical observations with advanced constraints",
      icon: Search,
      link: "/explorer",
      color: "from-orange-500 to-red-500"
    },
    {
      title: "Observatory Blog",
      description: "Latest discoveries, announcements, and observatory updates",
      icon: FileText,
      link: "/blog",
      color: "from-blue-500 to-purple-500"
    },
    {
      title: "Archive Tool",
      description: "Summarize and analyze historical observational data",
      icon: Calendar,
      link: "/archive",
      color: "from-green-500 to-teal-500"
    },
    {
      title: "AI Insights",
      description: "Get AI-powered insights on astronomical objects and events",
      icon: Brain,
      link: "/insights",
      color: "from-purple-500 to-pink-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-slate-700 bg-slate-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Telescope className="h-8 w-8 text-orange-500" />
              <span className="text-2xl font-bold text-white">AstroLook</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-orange-500 hover:text-orange-400 font-medium">
                Home
              </Link>
              <Link to="/blog" className="text-gray-300 hover:text-white transition-colors">
                Blog
              </Link>
              <Link to="/archive" className="text-gray-300 hover:text-white transition-colors">
                Archive Tool
              </Link>
              <Link to="/insights" className="text-gray-300 hover:text-white transition-colors">
                AI Insights
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-orange-400 via-red-500 to-purple-600 bg-clip-text text-transparent mb-6">
              Mount Abu Observatory
            </h1>
            <h2 className="text-2xl md:text-3xl text-gray-300 mb-8">
              Data Explorer & Research Platform
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12">
              Comprehensive interface to astronomical data with advanced querying, multi-table operations, 
              cross-correlations, and AI-powered insights for modern astronomical research.
            </p>
            <Link to="/explorer">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg">
                <Search className="mr-2 h-5 w-5" />
                Explore Data
              </Button>
            </Link>
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h3 className="text-3xl font-bold text-white mb-4">Observatory Tools</h3>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Access powerful tools for astronomical data analysis, research collaboration, and discovery
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Link key={index} to={feature.link}>
              <Card className="bg-slate-800/50 border-slate-700 hover:border-orange-500/50 transition-all duration-300 hover:transform hover:scale-105 group cursor-pointer">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-white group-hover:text-orange-400 transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-400">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-slate-800/30 border-t border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-orange-500 mb-2">50,000+</div>
              <div className="text-gray-400">Astronomical Objects</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-500 mb-2">200+</div>
              <div className="text-gray-400">Data Tables</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-500 mb-2">24/7</div>
              <div className="text-gray-400">Data Access</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-400">
            <p>&copy; 2025 Mount Abu Observatory. All rights reserved.</p>
            <p className="mt-2">AstroLook - Exploring the Cosmos</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
