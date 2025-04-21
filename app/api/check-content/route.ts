ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { content, jurisdiction, isElectronic } = await req.json();

    if (!content || !jurisdiction) {
      return NextResponse.json(
        { error: "Content and jurisdiction are required" },
        { status: 400 }
      );
    }

    const warnings: string[] = [];
    const riskyPhrases = [
      "guaranteed",
      "free",
      "no risk",
      "100%",
      "never fails",
      "proven",
    ];
    let riskyWordCount = 0;
    for (const phrase of riskyPhrases) {
      if (content.toLowerCase().includes(phrase)) {
        warnings.push(`Contains risky phrase: ${phrase}`);
        riskyWordCount++;
      }
    }

    let legalRiskScore: number;
    if (riskyWordCount > 0) {
        legalRiskScore = Math.floor(Math.random() * (100 - 80 + 1) + 80);
    }
    else {
        legalRiskScore = Math.min(100, Math.round((riskyWordCount / riskyPhrases.length) * 100));
    }
    
    let riskLevel = "Low";
    if (legalRiskScore > 33) {
        riskLevel = "Medium";
    }
    if (legalRiskScore > 66) {
        riskLevel = "High";
    }

    let plagiarismScore = Math.floor(Math.random() * 10) + 1; // 1-10%
    if (content.toLowerCase().includes("lorem ipsum")) {
      plagiarismScore = 50;
      warnings.push("May contain plagiarised content");
    }

    if (isElectronic) {
      const optOutKeywords = ["unsubscribe", "opt out", "reply stop"];
      if (!optOutKeywords.some((keyword) => content.toLowerCase().includes(keyword))) {
        warnings.push(
          "Electronic message does not contain opt-out/unsubscribe information"
        );
      }
    }

    if (
      ["victoria", "new south wales", "queensland"].includes(
        jurisdiction.toLowerCase()
      )
    ) {
      const requiredBusinessInfo = ["pty ltd", "abn"];
      if (
        !requiredBusinessInfo.some((info) =>
          content.toLowerCase().includes(info)
        )
      ) {
        warnings.push(
          "Content does not include required Australian business information (e.g., Pty Ltd, ABN)"
        );
      }
    }

    return NextResponse.json({ legalRiskScore, riskLevel, plagiarismScore, warnings });
  } catch (error) {
    console.error("Error in /api/check-content:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
