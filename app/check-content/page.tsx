"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, FormEvent, ChangeEvent } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

<<<<<<< HEAD
interface ComplianceResult {
  result: string;
  legalRiskScore: number;
  riskLevel: "Low" | "Medium" | "High";
  plagiarismScore: number;
  warnings: string[];
}

export default function CheckContentPage() {
  const [jurisdiction, setJurisdiction] = useState("victoria");
  const [result, setResult] = useState<ComplianceResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState<string>("");
  const [isElectronic, setIsElectronic] = useState(false);

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
=======
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
>>>>>>> 5afd933286e31ebdda8a47cb2980022c51eb7b87

    try {
      const response = await fetch("/api/check-content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: content,
          jurisdiction: jurisdiction,
          isElectronic: isElectronic,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.error) {
        setResult({
          legalRiskScore: 0,
          riskLevel: "Low",
          plagiarismScore: 0,
          warnings: [data.error],
        });
      } else {
        setResult(data);
      }
    } catch (error) {
      console.error("Error checking compliance:", error);
        setResult(null);
      
    } finally {
      setLoading(false);
    }
<<<<<<< HEAD
=======
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
>>>>>>> 5afd933286e31ebdda8a47cb2980022c51eb7b87
  };


  
  return (
<<<<<<< HEAD
    <div className="bg-[#FFFFF6] min-h-screen py-8 px-4 md:px-8 lg:px-16 flex justify-center items-start">
      <Card className="w-full max-w-2xl rounded-lg shadow-lg">
        <Tabs value={jurisdiction} onValueChange={setJurisdiction} className="w-full">
          <TabsList className="mb-6 p-6 bg-white rounded-t-md">
            <TabsTrigger value="victoria">Victoria</TabsTrigger>
            <TabsTrigger value="nsw">NSW</TabsTrigger>
            <TabsTrigger value="qld">Queensland</TabsTrigger>
          </TabsList>
          <CardContent className="p-6 bg-white rounded-b-md">
            <JurisdictionForm
              loading={loading}
              handleCheck={handleCheck}
              result={result}
              content={content}
              setContent={setContent}
              isElectronic={isElectronic}
              setIsElectronic={setIsElectronic}
            />
              <ComplianceResults result={result} loading={loading} />
          </CardContent>
        </Tabs>
      </Card>
=======
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
>>>>>>> 5afd933286e31ebdda8a47cb2980022c51eb7b87
    </div>
  );
}

interface JurisdictionFormProps {
  loading: boolean;
  handleCheck: (e: FormEvent) => void;
  result: string | null;
  content: string;
    setContent: (content: string) => void;
  isElectronic: boolean;
  setIsElectronic: (isElectronic: boolean) => void;
}

function JurisdictionForm({
  loading,
  handleCheck,
  setIsElectronic,
    content,
    isElectronic,
    setContent,
  }: JurisdictionFormProps) {
    
  return (
    <form onSubmit={handleCheck}>
        <Label htmlFor="content" className="block text-sm font-medium mb-1 text-[#343534]">
          Content to check:
        </Label>
        <Textarea
            id="content"
            className="w-full border rounded-md p-2 mb-4 bg-[#FFFFF6] text-[#343534]"
            rows={6}
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Paste your marketing content here..."
            
        />
        <div className="flex items-center mb-4">
            <Checkbox
                id="is-electronic"
                checked={isElectronic}
                onCheckedChange={setIsElectronic}
                className="mr-2 accent-[#A453F2]"
            />
            <label htmlFor="is-electronic" className="text-sm text-[#343534]">
                Is this an electronic message (e.g., email, SMS)?
            </label>
        </div>
        <Button
            type="submit"
            className="bg-[#A453F2] text-white hover:bg-[#A453F2]/90 mb-4"
            disabled={loading}
        >
            {loading ? "Checking..." : "Check Compliance"}
        </Button>
    </form>
  );
}



function ComplianceResults({ result, loading }: { result: ComplianceResult | null; loading: boolean }) {
    return (
        <Card className="mt-4 p-4 min-h-[60px]">
            {loading ? (
                <span className="text-[#A453F2] font-medium">Checking for compliance...</span>
            ) : result ? (
                <div>
                    <p className="font-bold">Legal Risk: {result.legalRiskScore} ({result.riskLevel})</p>
                    <p>Plagiarism Score: {result.plagiarismScore}%</p>
                    {result.warnings.length > 0 ? (
                        <div className="mt-2">
                            <p className="font-bold">Compliance Warnings:</p>
                            <ul className="list-disc list-inside mt-2">
                                {result.warnings.map((issue, index) => (
                                    <li key={index} className="text-red-600">
                                        {issue}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <p className="text-green-600 font-medium">No issues found.</p>
                    )}
                </div>
            ) : (
                <span className="text-gray-400">Results will appear here</span>
            )}
        </Card>
    );
}
