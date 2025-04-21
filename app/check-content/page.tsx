"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, FormEvent, ChangeEvent } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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
  };


  
  return (
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
