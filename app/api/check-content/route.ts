ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const triggerWords = ["guaranteed", "free", "100%", "amazing", "best", "miracle", "unbelievable"];
  const auJurisdictions = ["Victoria", "NSW", "QLD"];

  try {
    const { content, jurisdiction, isElectronic } = await request.json();

    if (!content || !jurisdiction) {
      return NextResponse.json({ error: 'Content and jurisdiction are required' }, { status: 400 });
    }

    // Legal Risk Check
    let legalRiskScore = 0;
    let flaggedWords: string[] = [];
    const lowerCaseContent = content.toLowerCase();
    for (const word of triggerWords) {
      if (lowerCaseContent.includes(word)) {
        legalRiskScore += 0.2; 
        flaggedWords.push(word);
      }
    }
    legalRiskScore = Math.min(legalRiskScore, 1); 
    const riskLevel = legalRiskScore < 0.33 ? 'Low' : legalRiskScore < 0.66 ? 'Medium' : 'High';

    // Fake Plagiarism Check
    let plagiarismScore = 0.1; 
    if (lowerCaseContent.includes("lorem ipsum")) {
      plagiarismScore = 0.5;
    } else {
        plagiarismScore = Math.random() * 0.1; // between 0 and 0.1
    }

    // Opt-Out Check (Placeholder)
    const hasOptOutInfo = isElectronic ? Math.random() > 0.5 : true; // Simplified for demo

    // Business Info Check (Placeholder)
    const hasBusinessInfo = auJurisdictions.includes(jurisdiction) ? Math.random() > 0.5 : true; // Simplified for demo

    // Warnings
    const warnings: string[] = [];
    if (isElectronic && !hasOptOutInfo) {
      warnings.push("Missing opt-out information.");
    }
    if (auJurisdictions.includes(jurisdiction) && !hasBusinessInfo) {
      warnings.push("Missing business information.");
    }
    for (const word of flaggedWords) {
        warnings.push(`Flagged risky word: ${word}`);
    }

    return NextResponse.json({
      legalRiskScore,
      riskLevel,
      plagiarismScore,
      warnings
    });
  } catch (error) {
    console.error('Error processing content check:', error);
    return NextResponse.json({ error: 'Failed to process content' }, { status: 500 })
  }
}
