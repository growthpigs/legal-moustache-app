'use client'; // Need client component for state and interaction

import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader, CardTitle
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';

const logoUrl =
  'https://p129.p0.n0.cdn.zight.com/items/geuQwwwq/f7d9efe4-ed40-4a90-b537-064700bb38ca.svg?source=client&v=2c15211e8cd072bbfc32794cd20c1ab2';

interface CheckContentResults {
  legalRiskScore: number;
  legalRiskLabel: string;
  fakePlagiarismScore: number;
  hasBusinessInfo: boolean;
  hasOptOutInfo: boolean;
  flaggedPhrases: string[];
}

export default function CheckContentPage() {
  const { status } = useSession({
    required: true, // Require authentication
    onUnauthenticated() {
      redirect('/login');
    },
  });

  const [content, setContent] = useState('');
  const [results, setResults] = useState<CheckContentResults | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<
    'Victoria' | 'NSW' | 'QLD'
  >('Victoria');
  const [isElectronic, setIsElectronic] = useState(false);

  const jurisdictionOptions = ['Victoria', 'NSW', 'QLD'];
  
  useEffect(() => {
    console.log('Selected jurisdiction:', selectedJurisdiction);
  }, [selectedJurisdiction]);
  
  const resetResults = () => {
    setResults(null);
  );
  };

  const handleCheckCompliance = async () => {
    if (!content.trim()) {
      setResults("Please enter some content to check.");
      return;
    }
    setIsLoading(true);

    resetResults();

    try {
      const response = await fetch('/api/check-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: content,
          jurisdiction: selectedJurisdiction,
          isElectronic: isElectronic,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || 'Failed to fetch compliance results'
        );
      }

      const data: CheckContentResults = await response.json();
      setResults(data);
    } catch (error: any) {
      setResults({
        legalRiskScore: 1,
        legalRiskLabel: "Error",
        fakePlagiarismScore: 1,
        hasBusinessInfo: true,
        hasOptOutInfo: true,
        flaggedPhrases: [error.message],
      });
    }
    setIsLoading(false);
  };

  // Show loading state while session is verifying
  if (status === 'loading') {
    return <p className="p-6 text-center">Loading...</p>;
  }

  return (
    <div className="container mx-auto p-6">
          <div className="flex items-center justify-center mb-6">
            <img
              src={logoUrl}
              alt="Legal Moustache Logo"
              className="h-20 w-auto"
            />
          </div>


      <h1 className="text-3xl font-semibold mb-6 text-center">Check Content Compliance</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Input Area */}
        <Card>
          <CardContent>
            <Tabs
              defaultValue="UK"
              className="w-full "
              onValueChange={setSelectedJurisdiction}
            >
              <TabsList className="grid w-full grid-cols-3">
                {jurisdictionOptions.map((jurisdiction) => (
                  <TabsTrigger
                    key={jurisdiction}
                   value={jurisdiction}
                    className="data-[state=active]:bg-[#A453F2] data-[state=active]:text-white"
                  >
                    {jurisdiction}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
           
          </CardContent>

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
                
                className="min-h-[200px]"

                id="marketing-content"
                placeholder="Paste your content here..."
                id="marketing-content"                  className="min-h-[200px]"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                disabled={isLoading}
              />
            </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="electronic"
              checked={isElectronic}
              onCheckedChange={setIsElectronic}
            />
            <Label htmlFor="electronic">Is this an electronic message?</Label>
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
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Compliance Results</CardTitle>
            <CardDescription>
              Potential issues found in your content.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <p>Checking content...</p>
              </div>
              ) : results ? (
              <>
                <div className="mb-4">
                  <h3 className="font-semibold">Legal Risk</h3>
                  <p>
                    Score: {results.legalRiskScore.toFixed(2)} -{' '}
                    <span className="font-bold text-[#A453F2]">
                      {results.legalRiskLabel}
                    </span>
                  </p>
                </div>
                
                <div className="mb-4">
                  <h3 className="font-semibold">Fake Plagiarism</h3>
                  <p>
                    Score: {results.fakePlagiarismScore.toFixed(2)}
                  </p>
                </div>

                <div className="mb-4">
                  <h3 className="font-semibold">Business Info</h3>
                  <p>
                    {results.hasBusinessInfo
                      ? 'Business information found.'
                      : 'No business information found.'}
                  </p>
                </div>

                <div className="mb-4">
                  <h3 className="font-semibold">Opt-Out Info</h3>
                  <p>
                    {results.hasOptOutInfo
                      ? 'Opt-out information found.'
                      : 'No opt-out information found.'}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold">Flagged Phrases</h3>
                  {results.flaggedPhrases.length > 0 ? (
                    <ul className="list-disc list-inside">
                      {results.flaggedPhrases.map((phrase, index) => (
                        <li key={index}>{phrase}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>No flagged phrases found.</p>
                  )}
                </div>
              </>
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
