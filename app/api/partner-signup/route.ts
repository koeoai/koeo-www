import { NextRequest, NextResponse } from "next/server";
import { getAirtableClient, TABLES, mapPartnerSignupFields } from "@/lib/airtable";
import type { PartnerSignupInput } from "@/lib/airtable";

export async function POST(request: NextRequest) {
  try {
    const data: PartnerSignupInput = await request.json();
    const client = getAirtableClient();

    if (!client.isConfigured()) {
      console.error("Missing Airtable configuration");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const fields = mapPartnerSignupFields(data);
    const result = await client.createRecord(TABLES.PARTNERS, fields);

    return NextResponse.json({ success: true, id: result.id });
  } catch (error) {
    console.error("Partner signup error:", error);
    return NextResponse.json(
      { error: "Failed to submit" },
      { status: 500 }
    );
  }
}
