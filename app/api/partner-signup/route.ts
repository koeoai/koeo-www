import { NextRequest, NextResponse } from "next/server";

interface PartnerFormData {
  partnerName: string;
  website: string;
  countryRegion: string;
  cityLocation: string;
  contactName: string;
  contactRole: string;
  contactEmail: string;
  contactPhone: string;
  partnershipType: string;
  capacityMw: string;
  supportedPlatforms: string[];
  aiReadiness: string;
  infraDetails: string;
  onboardingTimeline: string;
  goals: string;
  preferredNextStep: string;
}

export async function POST(request: NextRequest) {
  try {
    const data: PartnerFormData = await request.json();

    const apiKey = process.env.AIRTABLE_API_KEY;
    const baseId = process.env.AIRTABLE_BASE_ID;
    const tableName = process.env.AIRTABLE_PARTNERS_TABLE_NAME || "Partners";

    if (!apiKey || !baseId) {
      console.error("Missing Airtable configuration");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // Map form fields to Airtable "Partners" table field names
    const airtableRecord = {
      fields: {
        "Partner Name": data.partnerName,
        "Website": data.website || "",
        "Country / Region": data.countryRegion,
        "City / Facility Location": data.cityLocation || "",
        "Contact Name": data.contactName,
        "Contact Role / Title": data.contactRole,
        "Contact Email": data.contactEmail,
        "Contact Phone": data.contactPhone || "",
        "Partnership Type": data.partnershipType,
        "Capacity Available (MW)": data.capacityMw ? parseFloat(data.capacityMw) : null,
        "Supported Platforms / Services": data.supportedPlatforms,
        "AI Readiness / Current Use": data.aiReadiness,
        "Infrastructure Details (Partner)": data.infraDetails || "",
        "How soon could you onboard KOEO workloads?": data.onboardingTimeline,
        "What are you hoping KOEO can help with?": data.goals || "",
        "Preferred next step": data.preferredNextStep,
        "Status": "New",
        "Source": "Website form",
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
        { error: "Failed to submit partner inquiry" },
        { status: response.status }
      );
    }

    const result = await response.json();
    return NextResponse.json({ success: true, id: result.id });
  } catch (error) {
    console.error("Partner submission error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
