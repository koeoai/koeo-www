/**
 * Check Airtable table schema
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

async function checkSchema() {
  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;

  console.log("🔍 Fetching Airtable base schema...\n");

  try {
    const response = await fetch(
      `https://api.airtable.com/v0/meta/bases/${baseId}/tables`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error("❌ Error:", result);
      return;
    }

    console.log("📋 Tables in base:\n");
    for (const table of result.tables) {
      console.log(`Table: "${table.name}" (ID: ${table.id})`);
      console.log("Fields:");
      for (const field of table.fields) {
        console.log(`  - "${field.name}" (${field.type})`);
      }
      console.log("");
    }
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

checkSchema();
