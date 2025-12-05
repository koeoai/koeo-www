/**
 * Vercel Blob storage utilities for file uploads
 */

import { put } from "@vercel/blob";
import type { AirtableAttachment } from "./airtable";

export interface UploadResult {
  url: string;
  filename: string;
}

/**
 * Upload a base64-encoded file to Vercel Blob storage
 */
export async function uploadFile(
  base64Content: string,
  filename: string,
  folder: string = "uploads"
): Promise<UploadResult> {
  const fileBuffer = Buffer.from(base64Content, "base64");
  const timestamp = Date.now();
  const safeName = filename.replace(/[^a-zA-Z0-9.-]/g, "_");
  const blobPath = `${folder}/${timestamp}-${safeName}`;

  const blob = await put(blobPath, fileBuffer, {
    access: "public",
    addRandomSuffix: false,
  });

  return {
    url: blob.url,
    filename: filename,
  };
}

/**
 * Upload a resume and return Airtable-compatible attachment format
 */
export async function uploadResume(
  base64Content: string,
  filename: string
): Promise<AirtableAttachment[]> {
  const result = await uploadFile(base64Content, filename, "resumes");
  return [{ url: result.url, filename: result.filename }];
}
