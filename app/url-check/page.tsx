"use client";
import React, { useState } from "react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { ChevronDown } from "lucide-react";

const STATES = [
  "NSW", "Victoria", "Queensland", "ACT",
  "Tasmania", "South Australia", "Western Australia", "Northern Territory"
];

export default function UrlCheckPage() {
  const [url, setUrl] = useState("");
  const [state, setState] = useState(""); // Changed from jurisdiction
  const buttonEnabled = !!url && !!state;

  // Placeholder state for loading and results (can be removed if API isn't connected yet)
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ status: string; message: string } | null>(null);

  // Basic placeholder for form submission
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!buttonEnabled) return;
    setLoading(true);
    setResult(null);
    console.log("Scanning:", { url, state });
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    // Simulate a result
    setResult({ status: "success", message: `Scan simulation complete for ${state}.` });
    setLoading(false);
  }

  return (
    // Removed Tailwind classes, using inline styles from snippet
    <div style={{ background: "white", minHeight: "100vh", paddingTop: 32 }}>
      <div style={{ maxWidth: 540, margin: "0 auto", textAlign: "center" }}>
        <div style={{ marginBottom: 18 }}>
          {/* smaller icon - replaced FileSearch with inline SVG */}
          <span style={{ display:"inline-block", fontSize: 44, color: "#18844b", marginBottom: 14 }}>
            <svg width={36} height={36} viewBox="0 0 20 20" fill="none"><path d="M7.5 11.25h5m-5 2.5h2.5m1.88-10.13a1.87 1.87 0 0 1 2.63 2.63l-6.62 6.62a1.06 1.06 0 0 1-.75.31H5v-2.5c0-.28.11-.55.3-.75l6.62-6.62Z" stroke="currentColor" strokeWidth="1.5"/></svg>
          </span>
        </div>
        <h1 style={{ fontWeight: 700, fontSize: "2rem", marginBottom: 6 }}>
          Find out if your website's content is <span style={{ color: "#18844b" }}>Legally Compliant</span>
        </h1>
        <p style={{ fontSize: "1.07rem", color: "#333", margin: "0 0 16px 0" }}>
          Our free legal compliance checker identifies marketing law risks and gives you a quick website risk report.
        </p>
        <form style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 14 }} onSubmit={handleSubmit}>
          <input
            type="url"
            placeholder="Enter your website content URL"
            value={url}
            onChange={e => setUrl(e.target.value)}
            style={{
              flex: 2,
              padding: "10px 12px",
              borderRadius: 7,
              border: "1px solid #d0dcef",
              fontSize: 16,
              outline: "none"
            }}
            aria-label="Website content URL"
            required
          />
          <div style={{ flex: 1, minWidth: 140 }}>
            {/* Using shadcn Select component */}
            <Select value={state} onValueChange={setState} required> 
              <SelectTrigger className="w-full" style={{ fontSize: 16, border: "1px solid #d0dcef", borderRadius: 7, padding: "10px 12px", color: state ? "#111" : "#999", background: "transparent", height: "auto" }}>
                <SelectValue placeholder="State/Territory" />
                {/* Using Lucide ChevronDown */}
                <ChevronDown style={{ marginLeft: 8, width: 18, height: 18, color: "#999" }}/>
              </SelectTrigger>
              <SelectContent>
                {STATES.map(s => (
                  <SelectItem value={s} key={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <button
            type="submit"
            disabled={!buttonEnabled || loading} // Also disable while loading
            style={{
              minWidth: 118,
              background: buttonEnabled ? "#18844b" : "#eee",
              color: buttonEnabled ? "#fff" : "#bbb",
              fontWeight: 600,
              border: "none",
              borderRadius: 7,
              padding: "10px 0",
              fontSize: 16,
              cursor: buttonEnabled ? "pointer" : "not-allowed",
              opacity: loading ? 0.7 : 1 // Indicate loading state
            }}
          >
            {loading ? "Scanning..." : "Scan Website"}
          </button>
        </form>
        <div style={{ marginTop: 4, marginBottom: 5 }}>
          <div style={{ letterSpacing: 0.1, fontSize: 14, fontWeight: 600, color: "#222" }}>
            CHECKS FOR COMPLIANCE:
          </div>
          {/* Using text checkmarks */}
          <div style={{ display: "flex", gap: 22, justifyContent: "center", fontSize: 15, marginTop: 6 }}>
            <span>✅ Spam Act (Opt-out)</span>
            <span>✅ Required Business Info</span>
            <span>✅ Risky Words</span>
          </div>
        </div>
         {/* Display Placeholder Result */}
        {result && (
          <div
            style={{
              marginTop: 16, // Added spacing
              padding: 12,
              borderRadius: 6,
              textAlign: 'left',
              fontSize: 15,
              backgroundColor: result.status === 'success' ? '#e8f5e9' : '#ffebee',
              color: result.status === 'success' ? '#2e7d32' : '#c62828',
            }}
          >
             {result.message}
          </div>
        )}
      </div>
    </div>
  );
} 