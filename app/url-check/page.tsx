"use client";
import React, { useState } from "react";

export default function UrlCheckPage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null as null | any);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setResult(null);
    setLoading(true);
    try {
      const res = await fetch("/api/url-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      if (!res.ok) throw new Error("Could not fetch compliance report.");
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError("We couldn't analyze that website. Try a different URL.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 420, margin: "4rem auto", padding: 24, background: "white", borderRadius: 12, boxShadow: "0 2px 16px #0001" }}>
      <h2 style={{ fontSize: "1.5rem", marginBottom: 18 }}>Quick Compliance Check</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="url"
          required
          placeholder="Paste your blog or company URL"
          value={url}
          onChange={e => setUrl(e.target.value)}
          style={{ width: "100%", padding: 14, fontSize: 16, border: "1px solid #ddd", borderRadius: 6, marginBottom: 16 }}
        />
        <button
          disabled={loading}
          type="submit"
          style={{ width: "100%", padding: 14, background: "#0059d9", color: "#fff", border: "none", borderRadius: 6, fontWeight: 600, fontSize: 16 }}>
          {loading ? "Checking..." : "Check My Website"}
        </button>
      </form>
      {error && <div style={{ color: "red", marginTop: 16 }}>{error}</div>}
      {result && (
        <div style={{ marginTop: 24, padding: 14, background: "#f7f8fa", borderRadius: 8 }}>
          <h3>Your Website's Risk Report</h3>
          <p><strong>Overall risk score:</strong> {result.legalRiskScore} ({result.riskLevel})</p>
          {result.warnings && result.warnings.length > 0 ? (
            <>
              <p><strong>Potential issues detected:</strong></p>
              <ul>
                {result.warnings.map((w: string, i: number) => <li key={i}>{w}</li>)}
              </ul>
              <p style={{ marginTop: 12, color: "#216dd2" }}>
                Want a complete action plan & detailed fixes? <br />
                <strong><a href="/signup">Install the Legal Moustache app</a></strong>
              </p>
            </>
          ) : (
            <p style={{ color: "green" }}>No critical issues detected 🎉</p>
          )}
        </div>
      )}
    </div>
  );
} 