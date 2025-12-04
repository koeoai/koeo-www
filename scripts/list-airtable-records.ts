/**
 * List Airtable records to see field names
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

async function listRecords() {
  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const tableName = process.env.AIRTABLE_TABLE_NAME;

  console.log("🔍 Fetching records from Airtable...\n");

  try {
    const response = await fetch(
      `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName!)}?maxRecords=1`,
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

    if (result.records && result.records.length > 0) {
      console.log("📋 Field names from first record:\n");
      const fields = Object.keys(result.records[0].fields);
      for (const field of fields) {
        console.log(`  - "${field}"`);
      }
    } else {
      console.log("No records found in table. Table might be empty.");
    }
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

listRecords();
