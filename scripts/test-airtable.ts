/**
 * Quick E2E test for Airtable integration
 * Run with: npx tsx scripts/test-airtable.ts
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
  fullName: "Test User (E2E)",
  email: "test-e2e@example.com",
  organizationName: "Test Organization",
  role: "ML Engineer / Data Scientist",
  segment: "Startup / Scaleup",
  aiUseCase: "Testing the Airtable integration - this is an automated E2E test",
  workloadTypes: ["Inference (LLM / RAG / vision)", "Prototyping / experimentation only"],
  currentInfraSources: ["AWS", "Colab / free tiers"],
  monthlySpend: "100–500",
  workflow: "Local dev + call OpenAI API (E2E test)",
  topPainPoints: ["Cost / unpredictable bills", "Environment setup (drivers, CUDA, dependencies)"],
  painNotes: "This is an automated E2E test submission",
  mostValuableFeatures: ["OpenAI-compatible API", "Friendly pricing for education / startups"],
  pilotInterest: "Yes – ready for pilot",
  anythingElse: "Automated E2E test - please delete this record",
};

async function testAirtableIntegration() {
  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const tableName = process.env.AIRTABLE_TABLE_NAME;

  console.log("🔍 Checking environment variables...");
  console.log(`  AIRTABLE_BASE_ID: ${baseId ? "✅ Set" : "❌ Missing"}`);
  console.log(`  AIRTABLE_TABLE_NAME: ${tableName ? "✅ Set" : "❌ Missing"}`);
  console.log(`  AIRTABLE_API_KEY: ${apiKey ? "✅ Set (hidden)" : "❌ Missing"}`);

  if (!apiKey || !baseId || !tableName) {
    console.error("\n❌ Missing required environment variables!");
    process.exit(1);
  }

  console.log("\n📤 Sending test record to Airtable...");

  const airtableRecord = {
    fields: {
      "Name": testData.fullName,
      "Email": testData.email,
      "Organization Name": testData.organizationName,
      "Role / Persona": testData.role,
      "Segment": testData.segment,
      "What are you using (or planning to use) AI for?": testData.aiUseCase,
      "Workload Types": testData.workloadTypes,
      "Current Infra Sources": testData.currentInfraSources,
      "Rough Monthly AI/GPU Spend": testData.monthlySpend,
      "How do you work today? (workflow)": testData.workflow,
      "Top Pain Points": testData.topPainPoints,
      "Pain – Notes": testData.painNotes,
      "Most Valuable Features": testData.mostValuableFeatures,
      "Pilot Interest": testData.pilotInterest,
      "Could become": ["Beta tester only", "Lead / Customer", "Design Partner"],
      "Next Step": "Book call / demo",
      "Beta Status": "Applied for Beta",
      "Beta Application Date": new Date().toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric" }),
      "Raw Notes": testData.anythingElse,
    },
  };

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

    console.log("\n✅ SUCCESS! Record created in Airtable");
    console.log(`  Record ID: ${result.id}`);
    console.log(`  Created at: ${result.createdTime}`);
    console.log("\n📋 You can delete this test record from your Airtable base.");
  } catch (error) {
    console.error("\n❌ Network/Fetch Error:", error);
    process.exit(1);
  }
}

testAirtableIntegration();
