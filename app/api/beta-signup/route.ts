import { NextRequest, NextResponse } from "next/server";
import { getAirtableClient, TABLES, mapBetaSignupFields } from "@/lib/airtable";
import type { BetaSignupInput } from "@/lib/airtable";

export async function POST(request: NextRequest) {
  try {
    const data: BetaSignupInput = await request.json();
    const client = getAirtableClient();

    if (!client.isConfigured()) {
      console.error("Missing Airtable configuration");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const fields = mapBetaSignupFields(data);
    const result = await client.createRecord(TABLES.BETA_SIGNUPS, fields);

    return NextResponse.json({ success: true, id: result.id });
  } catch (error) {
    console.error("Beta signup error:", error);
    return NextResponse.json(
      { error: "Failed to submit" },
      { status: 500 }
    );
  }
}
