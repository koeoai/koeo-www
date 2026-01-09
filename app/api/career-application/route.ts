import { NextRequest, NextResponse } from "next/server";
import {
  getAirtableClient,
  TABLES,
  mapCareerApplicationFields,
} from "@/lib/airtable";
import { uploadResume } from "@/lib/blob";
import {
  careerApplicationSchema,
  safeValidateRequest,
  checkRateLimit,
  getClientIp,
  validateFileUpload,
  RATE_LIMITS,
} from "@/lib/api";

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientIp = getClientIp(request);
    const rateLimitKey = `career-application:${clientIp}`;
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
    const validation = safeValidateRequest(careerApplicationSchema, body);

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

    // Validate and upload resume if provided
    let resumeAttachment;
    if (data.resumeBase64 && data.resumeFileName) {
      // Validate file before upload
      const fileValidation = validateFileUpload(
        data.resumeBase64,
        data.resumeFileName
      );

      if (!fileValidation.valid) {
        return NextResponse.json(
          { error: fileValidation.error },
          { status: 400 }
        );
      }

      try {
        resumeAttachment = await uploadResume(
          data.resumeBase64,
          data.resumeFileName
        );
      } catch (uploadError) {
        console.error("Resume upload error:", uploadError);
        return NextResponse.json(
          { error: "Failed to upload resume. Please try again." },
          { status: 500 }
        );
      }
    }

    const fields = mapCareerApplicationFields({
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      linkedIn: data.linkedIn,
      portfolio: data.portfolio,
      currentRole: data.currentRole,
      yearsExperience: data.yearsExperience,
      areasOfInterest: data.areasOfInterest,
      whyKoeo: data.whyKoeo,
      whatYouBring: data.whatYouBring,
      resumeAttachment,
      anythingElse: data.anythingElse,
    });

    const result = await client.createRecord(
      TABLES.CAREER_APPLICATIONS,
      fields
    );

    return NextResponse.json({ success: true, id: result.id });
  } catch (error) {
    console.error("Career application error:", error);
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
  }
}
