
import { useState } from "react";
import { FileText, Download, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Navigation from "@/components/Navigation";

const Archive = () => {
  const [inputData, setInputData] = useState("");
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSummarizeData = async () => {
    if (!inputData.trim()) return;
    
    setIsLoading(true);
    // Simulate AI processing
    setTimeout(() => {
      setSummary(`Based on the provided observational data from Mount Abu Observatory, this analysis reveals significant astronomical findings. The data shows consistent patterns in stellar observations with notable variations in magnitude measurements across different wavelengths. 

Key findings include:
• Multiple star systems observed with varying brightness patterns
• Temporal analysis indicating potential variable star behavior  
• Spectroscopic data suggesting diverse stellar compositions
• Positional measurements enabling proper motion calculations

The dataset appears to span multiple observation sessions with consistent instrumental calibration. Further analysis would benefit from cross-correlation with existing catalogs and additional photometric measurements to enhance the scientific value of these observations.`);
      setIsLoading(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent mb-4">
            <FileText className="inline mr-3 h-8 w-8 text-orange-500" />
            Data Summarization Tool
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Paste historical observational data or reports below to generate a concise summary using AI.
          </p>
        </div>

        <Card className="bg-slate-800/50 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white">Input Data</CardTitle>
            <CardDescription className="text-gray-400">
              Paste your observational data, reports, or any text-based information from the observatory archives
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Paste your data here..."
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
              className="min-h-64 bg-slate-700 border-slate-600 text-white placeholder-gray-400 resize-none"
            />
            <div className="mt-4 flex justify-between items-center">
              <span className="text-sm text-gray-500">
                {inputData.length} characters
              </span>
              <Button 
                onClick={handleSummarizeData}
                disabled={!inputData.trim() || isLoading}
                className="bg-orange-500 hover:bg-orange-600"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <FileText className="mr-2 h-4 w-4" />
                    Summarize Data
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {isLoading && (
          <Alert className="bg-blue-500/10 border-blue-500/20 mb-8">
            <Sparkles className="h-4 w-4 text-blue-400" />
            <AlertDescription className="text-blue-300">
              AI is analyzing your data and generating insights. This may take a few moments...
            </AlertDescription>
          </Alert>
        )}

        {summary && !isLoading && (
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Sparkles className="mr-2 h-5 w-5 text-orange-500" />
                AI-Generated Summary
              </CardTitle>
              <CardDescription className="text-gray-400">
                Concise analysis of your submitted data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-700/50 rounded-lg p-6 border border-slate-600">
                <p className="text-gray-200 whitespace-pre-line leading-relaxed">
                  {summary}
                </p>
              </div>
              <div className="mt-4 flex justify-end">
                <Button variant="outline" className="border-slate-600 text-gray-300 hover:bg-slate-700">
                  <Download className="mr-2 h-4 w-4" />
                  Export Summary
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {!summary && !isLoading && (
          <Card className="bg-slate-800/30 border-slate-700">
            <CardContent className="py-16 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mx-auto flex items-center justify-center mb-4">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Ready to Analyze</h3>
              <p className="text-gray-400 max-w-md mx-auto">
                Paste your observational data above and click "Summarize Data" to get AI-powered insights and analysis.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Archive;
