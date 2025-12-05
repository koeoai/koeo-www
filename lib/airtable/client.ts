/**
 * Airtable API client with centralized configuration and error handling
 */

export interface AirtableConfig {
  apiKey: string;
  baseId: string;
}

export interface AirtableAttachment {
  url: string;
  filename: string;
}

export interface AirtableResponse<T = Record<string, unknown>> {
  id: string;
  createdTime: string;
  fields: T;
}

export interface AirtableError {
  type: string;
  message: string;
}

export class AirtableClient {
  private apiKey: string;
  private baseId: string;
  private baseUrl = "https://api.airtable.com/v0";

  constructor(config?: Partial<AirtableConfig>) {
    this.apiKey = config?.apiKey || process.env.AIRTABLE_API_KEY || "";
    this.baseId = config?.baseId || process.env.AIRTABLE_BASE_ID || "";
  }

  isConfigured(): boolean {
    return Boolean(this.apiKey && this.baseId);
  }

  async createRecord<T extends Record<string, unknown>>(
    tableName: string,
    fields: T
  ): Promise<AirtableResponse<T>> {
    if (!this.isConfigured()) {
      throw new Error("Airtable client not configured");
    }

    const url = `${this.baseUrl}/${this.baseId}/${encodeURIComponent(tableName)}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fields }),
    });

    const result = await response.json();

    if (!response.ok) {
      const error = result.error as AirtableError;
      throw new Error(`Airtable error: ${error?.message || "Unknown error"}`);
    }

    return result as AirtableResponse<T>;
  }
}

// Singleton instance
let client: AirtableClient | null = null;

export function getAirtableClient(): AirtableClient {
  if (!client) {
    client = new AirtableClient();
  }
  return client;
}
