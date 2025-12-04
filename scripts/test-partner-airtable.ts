/**
 * Quick E2E test for Partner Airtable integration
 * Run with: npx tsx scripts/test-partner-airtable.ts
 */

import { readFileSync } from "fs";
import { resolve } from "path";

// Simple env loader
function loadEnv() {
  try {
    const envPath = resolve(process.cwd(), ".env.local");
    const content = readFileSync(envPath, "utf-8");
    for (const line of content.split("\n")) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith("#")) {
        const [key, ...valueParts] = trimmed.split("=");
        if (key && valueParts.length > 0) {
          process.env[key.trim()] = valueParts.join("=").trim();
        }
      }
    }
  } catch {
    console.error("Could not load .env.local");
  }
}

loadEnv();

const testData = {
  partnerName: "Test Partner DC (E2E)",
  website: "https://testpartner.example.com",
  countryRegion: "Canada – Quebec",
  cityLocation: "Montreal DC1",
  contactName: "Jane Test",
  contactRole: "CTO",
  contactEmail: "jane.test@example.com",
  contactPhone: "+1 514 555 1234",
  partnershipType: "Colocation",
  capacityMw: "2.5",
  supportedPlatforms: ["GPU", "Bare Metal", "Cloud VMs"],
  aiReadiness: "Already hosting AI GPU workloads",
  infraDetails: "This is an automated E2E test - 5 MW hydro-powered facility with Tier 1 connectivity",
  onboardingTimeline: "0–3 months",
  goals: "Automated E2E test - testing partner form submission to Airtable",
  preferredNextStep: "Book a quick intro call",
};

async function testPartnerAirtable() {
  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const tableName = process.env.AIRTABLE_PARTNERS_TABLE_NAME || "Partners";

  console.log("🔍 Checking environment variables...");
  console.log(`  AIRTABLE_BASE_ID: ${baseId ? "✅ Set" : "❌ Missing"}`);
  console.log(`  AIRTABLE_PARTNERS_TABLE_NAME: ${tableName} ${process.env.AIRTABLE_PARTNERS_TABLE_NAME ? "✅ Set" : "⚠️ Using default"}`);
  console.log(`  AIRTABLE_API_KEY: ${apiKey ? "✅ Set (hidden)" : "❌ Missing"}`);

  if (!apiKey || !baseId) {
    console.error("\n❌ Missing required environment variables!");
    process.exit(1);
  }

  console.log("\n📤 Sending test partner record to Airtable...");

  const airtableRecord = {
    fields: {
      "Partner Name": testData.partnerName,
      "Website": testData.website,
      "Country / Region": testData.countryRegion,
      "City / Facility Location": testData.cityLocation,
      "Contact Name": testData.contactName,
      "Contact Role / Title": testData.contactRole,
      "Contact Email": testData.contactEmail,
      "Contact Phone": testData.contactPhone,
      "Partnership Type": testData.partnershipType,
      "Capacity Available (MW)": parseFloat(testData.capacityMw),
      "Supported Platforms / Services": testData.supportedPlatforms,
      "AI Readiness / Current Use": testData.aiReadiness,
      "Infrastructure Details (Partner)": testData.infraDetails,
      "How soon could you onboard KOEO workloads?": testData.onboardingTimeline,
      "What are you hoping KOEO can help with?": testData.goals,
      "Preferred next step": testData.preferredNextStep,
      "Status": "New",
      "Source": "Website form",
    },
  };

  console.log("\n📋 Record to be created:");
  console.log(JSON.stringify(airtableRecord.fields, null, 2));

  try {
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

    const result = await response.json();

    if (!response.ok) {
      console.error("\n❌ Airtable API Error:");
      console.error(JSON.stringify(result, null, 2));
      process.exit(1);
    }

    console.log("\n✅ SUCCESS! Partner record created in Airtable");
    console.log(`  Record ID: ${result.id}`);
    console.log(`  Created at: ${result.createdTime}`);
    console.log("\n📋 You can delete this test record from your Airtable base.");
  } catch (error) {
    console.error("\n❌ Network/Fetch Error:", error);
    process.exit(1);
  }
}

testPartnerAirtable();
