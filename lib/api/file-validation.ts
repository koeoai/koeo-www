/**
 * File upload validation utilities
 * Validates file type, size, and content
 */

// Allowed file extensions for resume uploads
const ALLOWED_RESUME_EXTENSIONS = [".pdf", ".doc", ".docx"];

// MIME type signatures (magic bytes) for file type verification
const FILE_SIGNATURES: Record<string, number[][]> = {
  // PDF: %PDF
  ".pdf": [[0x25, 0x50, 0x44, 0x46]],
  // DOC: Microsoft Compound Document
  ".doc": [[0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]],
  // DOCX: ZIP archive (PK signature)
  ".docx": [[0x50, 0x4b, 0x03, 0x04], [0x50, 0x4b, 0x05, 0x06]],
};

// Maximum file size: 5MB
const MAX_FILE_SIZE = 5 * 1024 * 1024;

// Maximum base64 size (roughly 1.37x the binary size)
const MAX_BASE64_SIZE = Math.ceil(MAX_FILE_SIZE * 1.37);

export interface FileValidationResult {
  valid: boolean;
  error?: string;
}

/**
 * Get file extension from filename (lowercase)
 */
function getFileExtension(filename: string): string {
  const lastDot = filename.lastIndexOf(".");
  if (lastDot === -1) return "";
  return filename.slice(lastDot).toLowerCase();
}

/**
 * Check if file extension is allowed
 */
export function isAllowedExtension(filename: string): boolean {
  const ext = getFileExtension(filename);
  return ALLOWED_RESUME_EXTENSIONS.includes(ext);
}

/**
 * Verify file content matches expected type using magic bytes
 */
function verifyFileSignature(buffer: Buffer, extension: string): boolean {
  const signatures = FILE_SIGNATURES[extension];
  if (!signatures) return false;
  
  return signatures.some((signature) => {
    if (buffer.length < signature.length) return false;
    return signature.every((byte, index) => buffer[index] === byte);
  });
}

/**
 * Validate a base64-encoded file for upload
 */
export function validateFileUpload(
  base64Content: string,
  filename: string
): FileValidationResult {
  // Check filename
  if (!filename || filename.length > 255) {
    return { valid: false, error: "Invalid filename" };
  }
  
  // Check extension
  const extension = getFileExtension(filename);
  if (!isAllowedExtension(filename)) {
    return {
      valid: false,
      error: `File type not allowed. Accepted formats: ${ALLOWED_RESUME_EXTENSIONS.join(", ")}`,
    };
  }
  
  // Check base64 size (before decoding)
  if (base64Content.length > MAX_BASE64_SIZE) {
    return {
      valid: false,
      error: `File too large. Maximum size: ${MAX_FILE_SIZE / (1024 * 1024)}MB`,
    };
  }
  
  // Decode and check actual size
  let buffer: Buffer;
  try {
    buffer = Buffer.from(base64Content, "base64");
  } catch {
    return { valid: false, error: "Invalid file encoding" };
  }
  
  if (buffer.length > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `File too large. Maximum size: ${MAX_FILE_SIZE / (1024 * 1024)}MB`,
    };
  }
  
  // Verify file signature (magic bytes)
  if (!verifyFileSignature(buffer, extension)) {
    return {
      valid: false,
      error: "File content does not match file type. Please upload a valid document.",
    };
  }
  
  return { valid: true };
}

/**
 * Sanitize filename for storage
 * Removes potentially dangerous characters and limits length
 */
export function sanitizeFilename(filename: string): string {
  // Get extension
  const ext = getFileExtension(filename);
  
  // Get base name without extension
  let baseName = filename.slice(0, filename.length - ext.length);
  
  // Remove dangerous characters, keep only alphanumeric, dash, underscore
  baseName = baseName.replace(/[^a-zA-Z0-9_-]/g, "_");
  
  // Limit length
  if (baseName.length > 50) {
    baseName = baseName.slice(0, 50);
  }
  
  // Ensure we have a valid name
  if (!baseName) {
    baseName = "file";
  }
  
  return `${baseName}${ext}`;
}
