import { NextRequest, NextResponse } from "next/server";

const riskyWords = [
  "guaranteed",
  "free",
  "no risk",
  "100%",
  "never fails",
  "proven"
];
const requiredBusinessInfo = ["Pty Ltd", "ABN"];
const optOutPhrases = ["unsubscribe", "opt out", "reply STOP"];

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    // Fetch the (public) website content
    const resp = await fetch(url, { method: "GET" });
    const html = await resp.text();

    // Extract only the visible text content for a simple check
    const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").slice(0, 1000);

    // Run simplified compliance logic
    let foundWords: string[] = [];
    riskyWords.forEach(word => {
      if (text.toLowerCase().includes(word)) foundWords.push(word);
    });
    let legalRiskScore = Math.min(100, foundWords.length * 35);
    let riskLevel = "Low";
    if (legalRiskScore >= 80) riskLevel = "High";
    else if (legalRiskScore >= 40) riskLevel = "Medium";

    let warnings: string[] = [];
    if (!optOutPhrases.some(phrase => text.toLowerCase().includes(phrase))) {
      warnings.push("Missing opt-out/unsubscribe statement (required for electronic marketing).");
    }
    if (!requiredBusinessInfo.some(word => text.toLowerCase().includes(word.toLowerCase()))) {
      warnings.push("Missing business info (e.g., 'Pty Ltd' or 'ABN') required for AU compliance.");
    }
    foundWords.forEach(word => warnings.push(`Contains risky word: ${word}`));

    return NextResponse.json({
      legalRiskScore,
      riskLevel,
      warnings,
    });
  } catch (err) {
    return NextResponse.json({ error: "Unable to scan your website. Please check the URL and try again." }, { status: 400 });
  }
} 