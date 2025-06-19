
import { useState } from "react";
import { Brain, Search, Sparkles, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Navigation from "@/components/Navigation";
import { generateInsights, generateReferences } from "@/lib/gemini";
import { useToast } from "@/hooks/use-toast";

const Insights = () => {
  const [objectName, setObjectName] = useState("");
  const [insights, setInsights] = useState("");
  const [references, setReferences] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGetInsights = async () => {
    if (!objectName.trim()) return;
    
    setIsLoading(true);
    setInsights("");
    setReferences([]);
    
    try {
      // Generate insights and references in parallel
      const [insightsResult, referencesResult] = await Promise.all([
        generateInsights(objectName),
        generateReferences(objectName)
      ]);
      
      setInsights(insightsResult);
      setReferences(referencesResult);
      
      toast({
        title: "Insights Generated",
        description: `Successfully generated insights for ${objectName}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate insights",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent mb-4">
            <Sparkles className="inline mr-3 h-8 w-8 text-orange-500" />
            AI-Powered Astronomical Insights
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Enter the name of an astronomical object or event to get AI-generated insights powered by Google Gemini, 
            including a summary of research and characteristics.
          </p>
        </div>

        <Card className="bg-slate-800/50 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white">Object Inquiry</CardTitle>
            <CardDescription className="text-gray-400">
              Search for insights on any astronomical object, star, galaxy, nebula, or celestial event
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4">
              <Input
                placeholder="e.g., Betelgeuse, SN 1987A, James Webb Space Telescope..."
                value={objectName}
                onChange={(e) => setObjectName(e.target.value)}
                className="bg-slate-700 border-slate-600 text-white placeholder-gray-400"
                onKeyPress={(e) => e.key === 'Enter' && handleGetInsights()}
              />
              <Button 
                onClick={handleGetInsights}
                disabled={!objectName.trim() || isLoading}
                className="bg-orange-500 hover:bg-orange-600 whitespace-nowrap"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Get Insights
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {isLoading && (
          <Alert className="bg-purple-500/10 border-purple-500/20 mb-8">
            <Brain className="h-4 w-4 text-purple-400" />
            <AlertDescription className="text-purple-300">
              Google Gemini AI is analyzing research data about "{objectName}". Please wait...
            </AlertDescription>
          </Alert>
        )}

        {insights && !isLoading && (
          <div className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Brain className="mr-2 h-5 w-5 text-orange-500" />
                  Gemini AI Analysis: {objectName}
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Generated insights based on current astronomical research
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-slate-700/50 rounded-lg p-6 border border-slate-600">
                  <p className="text-gray-200 whitespace-pre-line leading-relaxed">
                    {insights}
                  </p>
                </div>
              </CardContent>
            </Card>

            {references.length > 0 && (
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <BookOpen className="mr-2 h-5 w-5 text-orange-500" />
                    Research References
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    AI-generated reference examples (for demonstration purposes)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {references.map((ref, index) => (
                      <div key={index} className="bg-slate-700/30 rounded-lg p-4 border border-slate-600">
                        <p className="text-gray-300 text-sm">{ref}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {!insights && !isLoading && (
          <Card className="bg-slate-800/30 border-slate-700">
            <CardContent className="py-16 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto flex items-center justify-center mb-4">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Ready for Analysis</h3>
              <p className="text-gray-400 max-w-md mx-auto">
                Enter the name of any astronomical object above to receive AI-generated insights powered by Google Gemini.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Insights;
