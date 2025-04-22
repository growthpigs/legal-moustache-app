import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();
    // For now, just simulate a fake result!
    return NextResponse.json({
      legalRiskScore: 65,
      riskLevel: "Medium",
      warnings: [
        "Missing opt-out statement",
        "No ABN found",
        "Contains risky word: 'guaranteed'",
      ],
    });
  } catch (err) {
    return NextResponse.json({ error: "Unable to scan your website." }, { status: 400 });
  }
}