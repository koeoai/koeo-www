/**
 * E2E test for Partner Signup Airtable integration
 * Run with: npx tsx scripts/test-partner-airtable.ts
 */

import { readFileSync } from "fs";
import { resolve } from "path";

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

async function main() {
  const { getAirtableClient, TABLES, mapPartnerSignupFields } = await import("../lib/airtable");

  const client = getAirtableClient();
  
  console.log("🔍 Checking configuration...");
  console.log(`  Airtable configured: ${client.isConfigured() ? "✅" : "❌"}`);
  console.log(`  Table: ${TABLES.PARTNERS}`);

  if (!client.isConfigured()) {
    console.error("\n❌ Missing Airtable configuration!");
    process.exit(1);
  }

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
    infraDetails: "Automated E2E test - 5 MW hydro-powered facility",
    onboardingTimeline: "0–3 months",
    goals: "Automated E2E test - testing partner form submission",
    preferredNextStep: "Book a quick intro call",
  };

  console.log("\n📤 Sending test record...");

  try {
    const fields = mapPartnerSignupFields(testData);
    const result = await client.createRecord(TABLES.PARTNERS, fields);
    
    console.log("\n✅ SUCCESS!");
    console.log(`  Record ID: ${result.id}`);
    console.log("\n📋 Delete this test record from Airtable.");
  } catch (error) {
    console.error("\n❌ Error:", error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

main();
