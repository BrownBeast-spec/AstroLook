
import { useState } from "react";
import { Search, Filter, Calendar, MapPin, Download, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import Navigation from "@/components/Navigation";

const Explorer = () => {
  const [target, setTarget] = useState("");
  const [generalSearch, setGeneralSearch] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [objectType, setObjectType] = useState("all");
  const [instrument, setInstrument] = useState("all");
  const [isLoading, setIsLoading] = useState(false);

  const handleApplyFilters = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const handleClearFilters = () => {
    setTarget("");
    setGeneralSearch("");
    setDateFrom("");
    setDateTo("");
    setObjectType("all");
    setInstrument("all");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent mb-4">
            Mount Abu Observatory Data Explorer
          </h1>
          <p className="text-gray-400 text-lg">
            Search and filter astronomical observations with advanced constraints
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Filter Panel */}
          <div className="lg:col-span-1">
            <Card className="bg-slate-800/50 border-slate-700 sticky top-8">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Filter className="mr-2 h-5 w-5 text-orange-500" />
                  Filter Observations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="target" className="text-gray-300 flex items-center mb-2">
                      <MapPin className="mr-1 h-4 w-4" />
                      Target
                    </Label>
                    <Input
                      id="target"
                      placeholder="e.g., M31 or 00h42"
                      value={target}
                      onChange={(e) => setTarget(e.target.value)}
                      className="bg-slate-700 border-slate-600 text-white placeholder-gray-400"
                    />
                  </div>
                  <div>
                    <Label htmlFor="general" className="text-gray-300 mb-2 block">
                      General Search
                    </Label>
                    <Input
                      id="general"
                      placeholder="e.g., Orion, Nebula..."
                      value={generalSearch}
                      onChange={(e) => setGeneralSearch(e.target.value)}
                      className="bg-slate-700 border-slate-600 text-white placeholder-gray-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="dateFrom" className="text-gray-300 flex items-center mb-2">
                      <Calendar className="mr-1 h-4 w-4" />
                      Date From
                    </Label>
                    <Input
                      id="dateFrom"
                      type="date"
                      value={dateFrom}
                      onChange={(e) => setDateFrom(e.target.value)}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="dateTo" className="text-gray-300 mb-2 block">
                      Date To
                    </Label>
                    <Input
                      id="dateTo"
                      type="date"
                      value={dateTo}
                      onChange={(e) => setDateTo(e.target.value)}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-gray-300 mb-2 block">Object Type</Label>
                  <Select value={objectType} onValueChange={setObjectType}>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="galaxy">Galaxy</SelectItem>
                      <SelectItem value="star">Star</SelectItem>
                      <SelectItem value="nebula">Nebula</SelectItem>
                      <SelectItem value="cluster">Cluster</SelectItem>
                      <SelectItem value="planet">Planet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-gray-300 mb-2 block">Instrument</Label>
                  <Select value={instrument} onValueChange={setInstrument}>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      <SelectItem value="all">All Instruments</SelectItem>
                      <SelectItem value="telescope-1.2m">1.2m Telescope</SelectItem>
                      <SelectItem value="ccd-camera">CCD Camera</SelectItem>
                      <SelectItem value="spectrograph">Spectrograph</SelectItem>
                      <SelectItem value="photometer">Photometer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex space-x-2">
                  <Button 
                    onClick={handleApplyFilters} 
                    className="flex-1 bg-orange-500 hover:bg-orange-600"
                    disabled={isLoading}
                  >
                    <Search className="mr-2 h-4 w-4" />
                    {isLoading ? "Searching..." : "Apply Filters & Update View"}
                  </Button>
                </div>
                
                <Button 
                  onClick={handleClearFilters} 
                  variant="outline" 
                  className="w-full border-slate-600 text-gray-300 hover:bg-slate-700"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2">
            <Card className="bg-slate-800/50 border-slate-700 mb-6">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Settings className="mr-2 h-5 w-5 text-orange-500" />
                  Explore the Cosmos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-20">
                  {isLoading ? (
                    <div className="space-y-4">
                      <div className="animate-spin w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full mx-auto"></div>
                      <p className="text-gray-300">Loading Sky Visualizer...</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mx-auto flex items-center justify-center">
                        <Search className="h-8 w-8 text-white" />
                      </div>
                      <p className="text-gray-300 text-lg">
                        Use the filters above to search for astronomical observations from Mount Abu Observatory.
                      </p>
                      <p className="text-gray-400">
                        Search by target coordinates, object names, observation dates, and instrument types.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Results Summary */}
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="bg-slate-800/30 border-slate-700">
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-orange-500 mb-1">2,847</div>
                  <div className="text-gray-400 text-sm">Total Observations</div>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/30 border-slate-700">
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-blue-400 mb-1">156</div>
                  <div className="text-gray-400 text-sm">Unique Objects</div>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/30 border-slate-700">
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-green-400 mb-1">89</div>
                  <div className="text-gray-400 text-sm">Recent Additions</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explorer;
