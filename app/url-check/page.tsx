"use client";
import React, { useState } from "react";

const STATES = [
  "NSW", "Victoria", "Queensland", "ACT",
  "Tasmania", "South Australia", "Western Australia", "Northern Territory"
  ];

  export default function UrlCheckPage() {
  const [url, setUrl] = useState("");
  const [state, setState] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setResult(null);
    setError(null);

    try {
      const response = await fetch("/api/url-check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url, state }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to scan website.");
      }

      const data = await response.json();
      setResult(
        `Legal Risk Score: ${data.legalRiskScore}\nRisk Level: ${
          data.riskLevel
        }\nWarnings: ${data.warnings.join(", ")}`
      );
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  const canSubmit = url && state;

  const renderResultOrError = () => {
    if (error) return <div style={{ marginTop: 30, textAlign: "center", color: "red", fontWeight: 600 }}>{error}</div>;
    if (result) return <div style={{ marginTop: 30, textAlign: "center", color: "#16a34a", fontWeight: 600 }}>{result}</div>;
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-start py-10 px-4">
      <div className="max-w-3xl w-full">
        <div className="text-center">
          <div className="flex flex-col items-center mb-4">
            <svg width={36} height={36} fill="none" stroke="#16a34a" strokeWidth={2}><path d="M9 19l-5-5 1.41-1.41L9 16.17l8.59-8.59L19 9l-10 10z" /></svg>
            <h1 style={{ fontWeight: 700, fontSize: "2rem", margin: "12px 0 6px" }}>Find out if your website's content is <span style={{ color: '#16a34a' }}>Legally Compliant</span></h1>
            <div style={{ fontSize: "1.1rem", color: "#444", marginBottom: 12 }}>Our free legal compliance checker identifies marketing law risks and gives you a quick website risk report.</div>
          </div>
        </div>
        <form onSubmit={handleSubmit} style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 18 }}>
          <input
            type="url"
            placeholder="Enter your website URL"
            value={url}
            onChange={e => {
              setUrl(e.target.value);
              setResult(null)
            }}
            onFocus={() => {
              setError(null);
            }}
            onKeyDown={() => {
              setError(null);
            }}
            onKeyUp={() => {
              setError(null);
            }}

            className="border border-gray-300 rounded px-3 py-2 flex-1"
            style={{fontSize:16,minWidth:240}}
            required
          />
          <select
            value={state}
            onChange={e => setState(e.target.value)}
            onFocus={() => {
              setError(null);
            }}
            className="border border-gray-300 rounded px-3 py-2"
            onBlur={()=>{
              setResult(null)
            }}
            style={{fontSize:16,minWidth:150}}
            required
          >
            <option value="">State/Territory</option>
            {STATES.map(s => <option value={s} key={s}>{s}</option>)}
          </select>
          <button
            type="submit"
            disabled={!canSubmit}
            className="rounded px-6 py-2 font-semibold"
            style={{
              background: canSubmit ? "#16a34a" : "#ccc",
              color: canSubmit ? "#fff" : "#444",
              cursor: canSubmit ? "pointer" : "not-allowed",
              fontSize: 16
            }}
          >
            Scan Website
          </button>
        </form>
        {isLoading && (
          <div style={{ textAlign: "center", marginBottom: 20 }}>Loading...</div>
        )}
        <div style={{ textAlign: "center", fontWeight: 600, fontSize: 14, marginBottom: 10 }}>
          CHECKS FOR COMPLIANCE:
        </div>
        <div style={{ display: "flex", gap: 18, justifyContent: "center", fontSize: 15 }}>
          <span>✔ Spam Act (Opt-out)</span>
          <span>✔ Required Business Info</span>
          <span>✔ Risky Words</span>
        </div>
        {renderResultOrError()}

      </div>
    </div>
  );
}
