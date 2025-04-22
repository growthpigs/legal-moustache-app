"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton"; // Ensure Skeleton is imported
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Spinner } from "@/components/ui/spinner";
import { CardFooter } from "@radix-ui/react-card";
import { Progress } from "@/components/ui/progress";

interface AuditResult {
  issues: AuditIssue[];
}

export default function UrlCheckPage() {
  interface AuditIssue {
    title: string;
    description: string;
    impact: string;
    regulation: string;
  }
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingTimeoutExpired, setLoadingTimeoutExpired] = useState(false);
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);

  // Placeholder data
  const placeholderAuditResult: AuditResult = {
    issues: [
      {
        title: "Missing AI usage disclosure in Client Agreement",
        description:
          "Your client agreements must disclose how AI is used in the delivery of legal services. Failure to do so could mislead clients.",
        impact: "Affects: 3 pages",
        regulation: "AI Ethics Framework",
      },
      {
        title: "No clear Opt-Out on marketing emails",
        description:
          "All marketing emails must include a clear and operational unsubscribe option.",
        impact: "Affects: 100+ emails",
        regulation: "Spam Act 2003",
      },
      {
        title: "Potentially misleading marketing claims",
        description:
          "Claims about your services must be accurate and capable of substantiation.",
        impact: "Affects: 2 pages",
        regulation: "Australian Consumer Law",
      },
      {
        title: "Incorrect business registration details",
        description:
          "Business registration numbers must be displayed on the website.",
        impact: "Affects: 1 page",
        regulation: "Various State laws",
      },
      {
        title: "Missing T&Cs",
        description: "Website must include website terms of use",
        impact: "Affects: 1 page",
        regulation: "Various State laws",
      },
    ],
  };

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => setLoadingTimeoutExpired(true), 6000);
      setAuditResult(null);
    } else {
      setLoadingTimeoutExpired(false);
    }
  }, [isLoading]);

  useEffect(() => {
    if (loadingTimeoutExpired) {
      setIsLoading(false);
      setLoadingTimeoutExpired(false);

      // Simulate API call
      setTimeout(() => {
        setAuditResult(placeholderAuditResult);
      }, 1000);
    }
  }, [loadingTimeoutExpired]);

  const renderSkeleton = () => (
    <div className="flex flex-col md:flex-row gap-6 md:gap-12 mt-10 w-full max-w-6xl p-6 md:p-8">
      {/* Sidebar Skeleton */}
      <div className="md:w-1/3 w-full flex flex-col gap-4">
        <Skeleton className="aspect-video w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>

      {/* Main Panel Skeleton */}
      <div className="md:w-2/3 w-full flex flex-col gap-4">
        <Skeleton className="h-10 w-1/2" />
        <div className="flex items-center space-x-4">
          <Skeleton className="h-24 w-24 rounded-full" />
          <Skeleton className="h-6 w-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Card key={index} className="p-4">
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-6 w-full" />
            </Card>
          ))}
        </div>

        <Tabs defaultValue="critical" className="mt-4 px-4">
          <TabsList>
            <TabsTrigger value="critical" className="text-sm">
              <Skeleton className="h-6 w-20" />
            </TabsTrigger>
            <TabsTrigger value="aiPolicy" className="text-sm">
              <Skeleton className="h-6 w-20"/>
            </TabsTrigger>
            <TabsTrigger value="passed" className="text-sm">
              <Skeleton className="h-6 w-20" />
            </TabsTrigger>
            <TabsTrigger value="manual" className="text-sm">
              <Skeleton className="h-6 w-20" />
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
    setError(null);
  };

  const handleFocus = () => {
    setError(null);
  };

  const renderAuditReport = () => {
    if (!auditResult) return null;
    return (
      <div className="flex flex-col md:flex-row gap-6 md:gap-12 mt-10 w-full max-w-6xl p-6 md:p-8">
        {/* Left Sidebar */}
        <div className="md:w-1/3 w-full flex flex-col gap-6">
          <div className="text-sm mb-6">
            <p className="font-bold mb-2">User URL:</p>
            <p className="truncate overflow-hidden text-ellipsis">{url}</p>
          </div>
          <div className="text-sm mb-6">
            <p className="font-bold mb-2">Compliance Status:</p>
            <div className="flex items-center">
              <span className="mr-2">Compliance Risk Identified: Victorian Law</span>
              <span>🇦🇺</span>
            </div>
          </div>
          <Button className="bg-red-600 text-white font-bold w-full" >
            Fix {auditResult.issues.length} Critical Issues Now
          </Button>
        </div>

        {/* Main Panel */}
        <div className="md:w-2/3 w-full flex flex-col gap-6 ">
          <div className="mb-4">
            <h2 className="font-bold text-2xl mb-2">Compliance Audit: {url}</h2>
            <p className="text-sm">
              Scan complete for {url} (1 page analyzed).{" "}
              <a href="#" className="underline text-green-600">
                Scan entire domain?
              </a>
            </p>  
          </div>
          <div className="mb-6">
            <div className="text-red-600 font-bold text-4xl mb-2">
              ❌ URGENT ACTION REQUIRED
            </div>
            <div className="flex flex-col items-center gap-2">
              <Progress value={45} className="w-24" />
              <p className="text-sm">
                Scores under 85% indicate significant non-compliance risk under
                Australian regulations.
              </p>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Card className="p-4">
                <p className="font-semibold">Critical Issues</p>
                <p className="text-2xl font-bold"> {auditResult.issues.filter((issue) => issue.regulation !== "Passed").length}</p>
            </Card>
            <Card className="p-4">
              <p className="font-semibold">AI Policy Gaps</p>
              <p>
                {auditResult.issues.filter((issue) => issue.regulation === "AI Ethics Framework").length}  
              </p>
            </Card>
            <Card className="p-4">
              <p className="font-semibold">Passed Checks</p>
              <p>{auditResult.issues.filter((issue) => issue.regulation === "Passed").length}</p>
            </Card>
            <Card className="p-4">
              <p className="font-semibold">Manual Review Needed</p>
              <p>{auditResult.issues.filter((issue) => issue.regulation === "Manual Review").length}</p>
            </Card>
          </div>

          {/* Issue Sections */}
          <Tabs defaultValue="critical" className="mb-4">
            <TabsList>
              <TabsTrigger value="critical">Critical</TabsTrigger>
              <TabsTrigger value="aiPolicy">AI Policy</TabsTrigger>
              <TabsTrigger value="passed">Passed</TabsTrigger>
              <TabsTrigger value="manual">Manual Review</TabsTrigger>
            </TabsList>
            <TabsContent value="critical" className="pt-4">
              {auditResult.issues
                  .filter((issue) => issue.regulation !== "Passed")
                  .map((issue, index) => (
                    
                  <Card key={index} className="mb-4 p-4">
                    <CardHeader className="p-0">
                      <CardTitle className="text-red-600 font-bold">{issue.title}</CardTitle>
                      <CardDescription className="text-sm">{issue.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0 pt-2 text-sm">
                      <p>{issue.impact}</p>
                      <p>Regulation: {issue.regulation}</p>
                    </CardContent>
                  </Card>
                ))}
            </TabsContent>
            <TabsContent value="aiPolicy" className="pt-4">
             {auditResult.issues
                .filter((issue) => issue.regulation === "AI Ethics Framework")
                .map((issue, index) => (
                  <Card key={index} className="mb-4 p-4">
                  <CardHeader className="p-0">
                      <CardTitle className="text-red-600 font-bold">{issue.title}</CardTitle>
                      <CardDescription className="text-sm">{issue.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0 pt-2 text-sm">
                      <p>{issue.impact}</p>
                      <p>Regulation: {issue.regulation}</p>
                    </CardContent>
                  </Card>
                ))} 
            </TabsContent>
            <TabsContent value="passed" className="pt-4">
              <p>All checks passed successfully</p>
            </TabsContent>
            <TabsContent value="manual" className="pt-4">
              <p>Manual review not available</p>
            </TabsContent>
          </Tabs>
          <Button className="font-bold mt-4 w-fit">
            Discuss Your Compliance Risks
          </Button>
        </div>
      </div>
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    setTimeout(() => {
      setIsLoading(false);
      setLoadingTimeoutExpired(true);
  }, 7000);
};

  const renderLoading = () => {
    return (
      <div className="flex flex-col items-center justify-center mt-10">
        {!loadingTimeoutExpired ? (
          <>
            <Spinner />
            <div className="text-gray-600 mt-4">
              Scanning {url}...
            </div>
          </>
        ) : (
          renderSkeleton()
        )}
      </div>
    );
  };

  const renderResultOrError = () => {
    if (error) {
        return (<div className="mt-8 text-center text-red-600 font-semibold">
                {error}
            </div>
        );}
      return null;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start py-10 px-4 ">
      <div className="max-w-3xl w-full space-y-6">
         <div className="text-center space-y-4">
          <div className="flex flex-col items-center justify-center">
          <h1 className="font-bold text-2xl mt-3 text-center">
              Find out if your website's content is{" "}
              <span className="text-green-600">Legally Compliant</span>
            </h1>
            <div className="text-gray-600 text-base">
              Our free legal compliance checker identifies marketing law risks
              and gives you a quick website risk report.
            </div>
        </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row items-center gap-4" >
        <div className="flex flex-col flex-1">
            <Label htmlFor="url" className="text-sm mb-1">
              Website URL
            </Label>
            <Input
              type="url"
              id="url"
              placeholder="Enter your website URL"
              value={url}
              onChange={handleUrlChange}
              onFocus={handleFocus}
              className="min-w-[240px]"
              required
            />
          </div>

          <Button
            type="submit"
            disabled={!url || isLoading}
            className="bg-green-600 text-white font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {isLoading ? "Scanning..." : "Scan Website"}
          </Button>
        </form>

        <div className="text-center font-semibold text-sm mt-4">
            CHECKS FOR COMPLIANCE:
          <div className="flex flex-wrap justify-center gap-4 text-sm mt-2">
              <span>✔ Spam Act (Opt-out)</span>
              <span>✔ Required Business Info</span>
              <span>✔ Risky Words</span>
            </div>
          </div>
        {renderResultOrError()} {isLoading && renderLoading()}
          {auditResult && renderAuditReport()}

      </div>
    </div>
  );
}
