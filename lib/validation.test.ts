import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import {
  validateEmail,
  validateRequired,
  validateMinLength,
  validateForm,
  BETA_FORM_VALIDATION,
} from './validation';

/**
 * **Feature: koeo-content-expansion, Property 2: Form validation correctly identifies invalid email formats**
 * **Validates: Requirements 10.4**
 */
describe('Property 2: Email validation identifies invalid formats', () => {
  it('should return error for strings without @ symbol', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1 }).filter(s => !s.includes('@') && s.trim().length > 0),
        (invalidEmail) => {
          const result = validateEmail(invalidEmail);
          expect(result).toBe('Please enter a valid email address');
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should return error for strings with @ but no domain', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1 }).filter(s => !s.includes('@') && !s.includes('.') && s.trim().length > 0),
        (localPart) => {
          const invalidEmail = `${localPart}@`;
          const result = validateEmail(invalidEmail);
          expect(result).toBe('Please enter a valid email address');
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should return error for strings with @ but missing TLD', () => {
    fc.assert(
      fc.property(
        fc.tuple(
          fc.string({ minLength: 1 }).filter(s => !s.includes('@') && !s.includes('.') && !s.includes(' ') && s.trim().length > 0),
          fc.string({ minLength: 1 }).filter(s => !s.includes('@') && !s.includes('.') && !s.includes(' ') && s.trim().length > 0)
        ),
        ([localPart, domain]) => {
          const invalidEmail = `${localPart}@${domain}`;
          const result = validateEmail(invalidEmail);
          expect(result).toBe('Please enter a valid email address');
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should return undefined for valid email formats', () => {
    fc.assert(
      fc.property(
        fc.tuple(
          fc.stringMatching(/^[a-zA-Z0-9]+$/),
          fc.stringMatching(/^[a-zA-Z0-9]+$/),
          fc.stringMatching(/^[a-zA-Z]{2,}$/)
        ).filter(([local, domain, tld]) => local.length > 0 && domain.length > 0 && tld.length >= 2),
        ([localPart, domain, tld]) => {
          const validEmail = `${localPart}@${domain}.${tld}`;
          const result = validateEmail(validEmail);
          expect(result).toBeUndefined();
        }
      ),
      { numRuns: 100 }
    );
  });
});


/**
 * **Feature: koeo-content-expansion, Property 3: Form validation prevents submission with empty required fields**
 * **Validates: Requirements 10.3, 8.5**
 */
describe('Property 3: Required field validation prevents empty submissions', () => {
  it('should return error for empty strings', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('name', 'email', 'company', 'role', 'useCase'),
        (fieldName) => {
          const result = validateRequired('', fieldName);
          expect(result).toBe(`${fieldName} is required`);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should return error for whitespace-only strings', () => {
    fc.assert(
      fc.property(
        fc.tuple(
          fc.integer({ min: 1, max: 10 }).map(n => ' '.repeat(n)),
          fc.constantFrom('name', 'email', 'company', 'role', 'useCase')
        ),
        ([whitespace, fieldName]) => {
          const result = validateRequired(whitespace, fieldName);
          expect(result).toBe(`${fieldName} is required`);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should return undefined for non-empty strings', () => {
    fc.assert(
      fc.property(
        fc.tuple(
          fc.string({ minLength: 1 }).filter(s => s.trim().length > 0),
          fc.constantFrom('name', 'email', 'company', 'role', 'useCase')
        ),
        ([value, fieldName]) => {
          const result = validateRequired(value, fieldName);
          expect(result).toBeUndefined();
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should return errors for all empty required fields in form validation', () => {
    fc.assert(
      fc.property(
        fc.record({
          name: fc.constantFrom('', '   ', '\t'),
          email: fc.constantFrom('', '   ', '\t'),
          company: fc.constantFrom('', '   ', '\t'),
          role: fc.constantFrom('', '   ', '\t'),
          useCase: fc.constantFrom('', '   ', '\t'),
        }),
        (formData) => {
          const errors = validateForm(formData, BETA_FORM_VALIDATION);
          // Should have errors for all 5 required fields
          expect(errors.length).toBeGreaterThanOrEqual(5);
          
          const errorFields = errors.map(e => e.field);
          expect(errorFields).toContain('name');
          expect(errorFields).toContain('email');
          expect(errorFields).toContain('company');
          expect(errorFields).toContain('role');
          expect(errorFields).toContain('useCase');
        }
      ),
      { numRuns: 100 }
    );
  });
});
