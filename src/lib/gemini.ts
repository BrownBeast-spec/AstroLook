
import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = 'AIzaSyCfVQuDCYT_4QZrLGp6oEuDGZo7HZgs5Xo';
const genAI = new GoogleGenerativeAI(API_KEY);

export const generateInsights = async (objectName: string) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const prompt = `As an expert astronomer, provide detailed insights about the astronomical object "${objectName}". Include:

**Physical Characteristics:**
Describe the object's key physical properties, composition, and structure.

**Research Findings:**
Summarize recent scientific discoveries and observations about this object.

**Observational History:**
Explain the historical significance and key observations from observatories.

**Scientific Significance:**
Discuss why this object is important for astronomical research.

Please provide accurate, scientifically sound information based on current astronomical knowledge.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return text;
  } catch (error) {
    console.error('Error generating insights:', error);
    throw new Error('Failed to generate insights. Please try again.');
  }
};

export const generateReferences = async (objectName: string) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const prompt = `Generate 4 realistic academic references for the astronomical object "${objectName}". Format each as:
"Author, A. et al. (Year). 'Title about ${objectName}' - Journal Name, Volume, Page"

Make them sound realistic but clearly indicate they are AI-generated examples.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Split the response into individual references
    const references = text.split('\n').filter(ref => ref.trim().length > 0);
    return references.slice(0, 4); // Ensure we get exactly 4 references
  } catch (error) {
    console.error('Error generating references:', error);
    return [
      `AI-Generated Reference: Research on ${objectName} - Astronomical Journal (Example)`,
      `AI-Generated Reference: Observational Study of ${objectName} - Astrophysics Review (Example)`,
      `AI-Generated Reference: Analysis of ${objectName} Properties - Space Science Letters (Example)`,
      `AI-Generated Reference: ${objectName} in Modern Astronomy - Observatory Reports (Example)`
    ];
  }
};

export const summarizeData = async (inputData: string) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const prompt = `As an expert astronomical data analyst familiar with Mount Abu Observatory, analyze and summarize the following observational data or report:

${inputData}

Provide a comprehensive summary that includes:
• Key findings and observations
• Data patterns and trends
• Scientific significance
• Recommendations for further analysis

Focus on extracting the most important astronomical insights from this data.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return text;
  } catch (error) {
    console.error('Error summarizing data:', error);
    throw new Error('Failed to summarize data. Please try again.');
  }
};
