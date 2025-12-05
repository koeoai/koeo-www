// Re-export everything for clean imports
export { AirtableClient, getAirtableClient } from "./client";
export type { AirtableConfig, AirtableAttachment, AirtableResponse, AirtableError } from "./client";

export { TABLES, formatDate } from "./tables";
export { mapBetaSignupFields, mapPartnerSignupFields, mapCareerApplicationFields } from "./tables";
export type { BetaSignupInput, PartnerSignupInput, CareerApplicationInput } from "./tables";
