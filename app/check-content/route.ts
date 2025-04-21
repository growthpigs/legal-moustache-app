import { NextRequest, NextResponse } from 'next/server';

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
    const { content, jurisdiction, isElectronic } = await req.json();

    // 1. Legal Risk Score
    let foundWords: string[] = [];
    riskyWords.forEach((word) => {
      if (content.toLowerCase().includes(word)) {
        foundWords.push(word);
      }
    });
    let legalRiskScore = Math.min(100, foundWords.length * 35); // up to 100
    let riskLevel = "Low";
    if (legalRiskScore >= 80) riskLevel = "High";
    else if (legalRiskScore >= 40) riskLevel = "Medium";

    // 2. Fake Plagiarism Score
    let plagiarismScore = content.toLowerCase().includes("lorem ipsum")
      ? 50
      : Math.floor(Math.random() * 10) + 1;

    // 3. Opt-Out/Unsubscribe Check
    let warnings: string[] = [];
    if (
      isElectronic &&
      !optOutPhrases.some((phrase) =>
        content.toLowerCase().includes(phrase)
      )
    ) {
      warnings.push(
        "Missing opt-out/unsubscribe statement (required for electronic marketing messages)"
      );
    }

    // 4. Required Business Info
    if (
      ["victoria", "nsw", "qld"].includes(jurisdiction.toLowerCase()) &&
      !requiredBusinessInfo.some((word) =>
        content.toLowerCase().includes(word.toLowerCase())
      )
    ) {
      warnings.push(
        "Missing business info (e.g., 'Pty Ltd' or 'ABN') required for AU jurisdictions"
      );
    }

    // Add risky word warnings
    foundWords.forEach((word) =>
      warnings.push(`Contains risky word: ${word}`)
    );

    return NextResponse.json(
      {
        legalRiskScore,
        riskLevel,
        plagiarismScore,
        warnings
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Error checking compliance. Please try again." },
      { status: 400 }
    );
  }
}
