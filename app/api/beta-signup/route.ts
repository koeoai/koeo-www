import { NextRequest, NextResponse } from "next/server";

interface SurveyFormData {
  fullName: string;
  email: string;
  organizationName: string;
  role: string;
  segment: string;
  aiUseCase: string;
  workloadTypes: string[];
  currentInfraSources: string[];
  monthlySpend: string;
  workflow: string;
  topPainPoints: string[];
  painNotes: string;
  mostValuableFeatures: string[];
  pilotInterest: string;
  anythingElse: string;
}

export async function POST(request: NextRequest) {
  try {
    const data: SurveyFormData = await request.json();

    const apiKey = process.env.AIRTABLE_API_KEY;
    const baseId = process.env.AIRTABLE_BASE_ID;
    const tableName = process.env.AIRTABLE_TABLE_NAME;

    if (!apiKey || !baseId || !tableName) {
      console.error("Missing Airtable configuration");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // Map form fields to Airtable "User Feedback" table field names
    const airtableRecord = {
      fields: {
        "Name": data.fullName,
        "Email": data.email,
        "Organization Name": data.organizationName || "",
        "Role / Persona": data.role,
        "Segment": data.segment,
        "What are you using (or planning to use) AI for?": data.aiUseCase,
        "Workload Types": data.workloadTypes,
        "Current Infra Sources": data.currentInfraSources,
        "Rough Monthly AI/GPU Spend": data.monthlySpend,
        "How do you work today? (workflow)": data.workflow,
        "Top Pain Points": data.topPainPoints,
        "Pain – Notes": data.painNotes,
        "Most Valuable Features": data.mostValuableFeatures,
        // Default values for all form submissions - they're interested in the pilot by submitting
        "Pilot Interest": data.pilotInterest || "Yes – ready for pilot",
        "Could become": ["Beta tester only", "Lead / Customer", "Design Partner"],
        "Next Step": "Book call / demo",
        "Beta Status": "Applied for Beta",
        "Beta Application Date": new Date().toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric" }).replace(/\//g, "/"), // MM/DD/YYYY format
        "Raw Notes": data.anythingElse || "",
      },
    };

    const response = await fetch(
      `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(airtableRecord),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Airtable error:", errorData);
      return NextResponse.json(
        { error: "Failed to submit survey" },
        { status: response.status }
      );
    }

    const result = await response.json();
    return NextResponse.json({ success: true, id: result.id });
  } catch (error) {
    console.error("Survey submission error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
