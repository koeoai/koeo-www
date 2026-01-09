import { NextRequest, NextResponse } from "next/server";
import { getAirtableClient, TABLES, mapBetaSignupFields } from "@/lib/airtable";
import {
  betaSignupSchema,
  safeValidateRequest,
  checkRateLimit,
  getClientIp,
  RATE_LIMITS,
} from "@/lib/api";

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientIp = getClientIp(request);
    const rateLimitKey = `beta-signup:${clientIp}`;
    const rateLimit = checkRateLimit(rateLimitKey, RATE_LIMITS.formSubmission);

    if (!rateLimit.success) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        {
          status: 429,
          headers: {
            "Retry-After": String(
              Math.ceil((rateLimit.resetTime - Date.now()) / 1000)
            ),
          },
        }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validation = safeValidateRequest(betaSignupSchema, body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid input", details: validation.errors },
        { status: 400 }
      );
    }

    const data = validation.data;
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
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
  }
}
