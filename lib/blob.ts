/**
 * Vercel Blob storage utilities for file uploads
 */

import { put } from "@vercel/blob";
import type { AirtableAttachment } from "./airtable";
import { sanitizeFilename } from "./api/file-validation";

export interface UploadResult {
  url: string;
  filename: string;
}

/**
 * Upload a base64-encoded file to Vercel Blob storage
 * Note: File validation should be done BEFORE calling this function
 */
export async function uploadFile(
  base64Content: string,
  filename: string,
  folder: string = "uploads"
): Promise<UploadResult> {
  const fileBuffer = Buffer.from(base64Content, "base64");
  const timestamp = Date.now();
  const randomSuffix = Math.random().toString(36).substring(2, 8);
  const safeName = sanitizeFilename(filename);
  const blobPath = `${folder}/${timestamp}-${randomSuffix}-${safeName}`;

  const blob = await put(blobPath, fileBuffer, {
    access: "public",
    addRandomSuffix: false,
  });

  return {
    url: blob.url,
    filename: safeName,
  };
}

/**
 * Upload a resume and return Airtable-compatible attachment format
 * Note: File validation should be done BEFORE calling this function
 */
export async function uploadResume(
  base64Content: string,
  filename: string
): Promise<AirtableAttachment[]> {
  const result = await uploadFile(base64Content, filename, "resumes");
  return [{ url: result.url, filename: result.filename }];
}
