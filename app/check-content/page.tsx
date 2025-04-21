'use client'; // Need client component for state and interaction

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

export default function CheckContentPage() {
  const { status } = useSession({
    required: true, // Require authentication
    onUnauthenticated() {
      redirect('/login'); // Redirect if not logged in
    },
  });

  const [content, setContent] = useState('');
  const [results, setResults] = useState<string | null>(null); // To store compliance results
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckCompliance = async () => {
    if (!content.trim()) {
      setResults("Please enter some content to check.");
      return;
    }
    setIsLoading(true);
    setResults(null); // Clear previous results

    // --- Placeholder for AI Check ---
    // In a real app, you would send 'content' to your backend API,
    // which would then call the AI service (e.g., Gemini via Firebase Extensions or Cloud Functions).
    console.log("Checking content:", content);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    // Simulate receiving results
    // Replace this with actual logic later
    const mockResult = `Compliance Check Results:\n- Issue 1: Potential misleading claim found near "...".\n- Issue 2: Missing required disclaimer for feature X.\n- Overall: Requires review.`;
    setResults(mockResult);
    // --- End Placeholder ---

    setIsLoading(false);
  };

  // Show loading state while session is verifying
  if (status === 'loading') {
    return <p className="p-6 text-center">Loading...</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6">Check Marketing Content</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Input Area */}
        <Card>
          <CardHeader>
            <CardTitle>Enter Content</CardTitle>
            <CardDescription>
              Paste your marketing copy, ad text, or website content below.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid w-full gap-1.5">
              <Label htmlFor="marketing-content">Your Content</Label>
              <Textarea
                placeholder="Paste your content here..."
                id="marketing-content"
                className="min-h-[200px]" // Make textarea larger
                value={content}
                onChange={(e) => setContent(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <Button
               onClick={handleCheckCompliance}
               disabled={isLoading || !content.trim()}
               className="w-full bg-[#A453F2] hover:bg-[#A453F2]/90 text-white"
             >
               {isLoading ? 'Checking...' : 'Check Compliance'}
             </Button>
          </CardContent>
        </Card>

        {/* Results Area */}
        <Card className="flex flex-col"> {/* Added flex flex-col */}
          <CardHeader>
            <CardTitle>Compliance Results</CardTitle>
            <CardDescription>
              Potential issues based on standard marketing regulations.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1"> {/* Added flex-1 */}
             {/* Display loading indicator or results */}
             {isLoading ? (
               <div className="flex items-center justify-center h-full">
                 <p>Checking content...</p> {/* Add a better spinner later */}
               </div>
             ) : results ? (
               <pre className="text-sm whitespace-pre-wrap bg-muted/30 p-4 rounded-md h-full">
                 {results}
               </pre>
             ) : (
               <p className="text-sm text-muted-foreground text-center pt-10">
                 Results will appear here after checking.
               </p>
             )}
           </CardContent>
        </Card>
      </div>
    </div>
  );
}
