/**
 * E2E test for Beta Signup Airtable integration
 * Run with: npx tsx scripts/test-beta-airtable.ts
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
  const { getAirtableClient, TABLES, mapBetaSignupFields } = await import("../lib/airtable");

  const client = getAirtableClient();
  
  console.log("🔍 Checking configuration...");
  console.log(`  Airtable configured: ${client.isConfigured() ? "✅" : "❌"}`);
  console.log(`  Table: ${TABLES.BETA_SIGNUPS}`);

  if (!client.isConfigured()) {
    console.error("\n❌ Missing Airtable configuration!");
    process.exit(1);
  }

  const testData = {
    fullName: "Test User (E2E)",
    email: "test-e2e@example.com",
    organizationName: "Test Organization",
    role: "ML Engineer / Data Scientist",
    segment: "Startup / Scaleup",
    aiUseCase: "Testing the Airtable integration - automated E2E test",
    workloadTypes: ["Inference (LLM / RAG / vision)", "Prototyping / experimentation only"],
    currentInfraSources: ["AWS", "Colab / free tiers"],
    monthlySpend: "100–500",
    workflow: "Local dev + call OpenAI API (E2E test)",
    topPainPoints: ["Cost / unpredictable bills", "Environment setup (drivers, CUDA, dependencies)"],
    painNotes: "Automated E2E test submission",
    mostValuableFeatures: ["OpenAI-compatible API", "Friendly pricing for education / startups"],
    pilotInterest: "Yes – ready for pilot",
    anythingElse: "Automated E2E test - please delete this record",
  };

  console.log("\n📤 Sending test record...");

  try {
    const fields = mapBetaSignupFields(testData);
    const result = await client.createRecord(TABLES.BETA_SIGNUPS, fields);
    
    console.log("\n✅ SUCCESS!");
    console.log(`  Record ID: ${result.id}`);
    console.log("\n📋 Delete this test record from Airtable.");
  } catch (error) {
    console.error("\n❌ Error:", error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

main();
