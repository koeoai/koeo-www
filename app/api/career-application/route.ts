import { NextRequest, NextResponse } from "next/server";
import { getAirtableClient, TABLES, mapCareerApplicationFields } from "@/lib/airtable";
import { uploadResume } from "@/lib/blob";

interface CareerFormData {
  fullName: string;
  email: string;
  phone?: string;
  linkedIn?: string;
  portfolio?: string;
  currentRole?: string;
  yearsExperience?: string;
  areasOfInterest: string[];
  whyKoeo: string;
  whatYouBring: string;
  resumeFileName?: string;
  resumeBase64?: string;
  anythingElse?: string;
}

export async function POST(request: NextRequest) {
  try {
    const data: CareerFormData = await request.json();
    const client = getAirtableClient();

    if (!client.isConfigured()) {
      console.error("Missing Airtable configuration");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // Upload resume if provided
    let resumeAttachment;
    if (data.resumeBase64 && data.resumeFileName) {
      try {
        resumeAttachment = await uploadResume(data.resumeBase64, data.resumeFileName);
      } catch (uploadError) {
        console.error("Resume upload error:", uploadError);
        // Continue without attachment
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

    const result = await client.createRecord(TABLES.CAREER_APPLICATIONS, fields);

    return NextResponse.json({ success: true, id: result.id });
  } catch (error) {
    console.error("Career application error:", error);
    return NextResponse.json(
      { error: "Failed to submit" },
      { status: 500 }
    );
  }
}
