import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { render } from '@testing-library/react';
import { FormField } from './form-field';

/**
 * **Feature: koeo-content-expansion, Property 4: Form fields have accessible label associations**
 * **Validates: Requirements 10.1**
 */
describe('Property 4: Form fields have accessible label associations', () => {
  it('should have label htmlFor matching input id for text inputs', () => {
    fc.assert(
      fc.property(
        fc.tuple(
          fc.string({ minLength: 1, maxLength: 20 }).filter(s => /^[a-zA-Z][a-zA-Z0-9-]*$/.test(s)),
          fc.string({ minLength: 1, maxLength: 50 }).filter(s => s.trim().length > 0)
        ),
        ([id, label]) => {
          const { container } = render(
            <FormField
              id={id}
              label={label}
              type="text"
              value=""
              onChange={() => {}}
            />
          );
          
          const labelElement = container.querySelector('label');
          const inputElement = container.querySelector('input');
          
          expect(labelElement).toBeTruthy();
          expect(inputElement).toBeTruthy();
          expect(labelElement?.getAttribute('for')).toBe(id);
          expect(inputElement?.getAttribute('id')).toBe(id);
          expect(labelElement?.getAttribute('for')).toBe(inputElement?.getAttribute('id'));
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should have label htmlFor matching textarea id', () => {
    fc.assert(
      fc.property(
        fc.tuple(
          fc.string({ minLength: 1, maxLength: 20 }).filter(s => /^[a-zA-Z][a-zA-Z0-9-]*$/.test(s)),
          fc.string({ minLength: 1, maxLength: 50 }).filter(s => s.trim().length > 0)
        ),
        ([id, label]) => {
          const { container } = render(
            <FormField
              id={id}
              label={label}
              type="textarea"
              value=""
              onChange={() => {}}
            />
          );
          
          const labelElement = container.querySelector('label');
          const textareaElement = container.querySelector('textarea');
          
          expect(labelElement).toBeTruthy();
          expect(textareaElement).toBeTruthy();
          expect(labelElement?.getAttribute('for')).toBe(id);
          expect(textareaElement?.getAttribute('id')).toBe(id);
        }
      ),
      { numRuns: 100 }
    );
  });


  it('should have label htmlFor matching select id', () => {
    fc.assert(
      fc.property(
        fc.tuple(
          fc.string({ minLength: 1, maxLength: 20 }).filter(s => /^[a-zA-Z][a-zA-Z0-9-]*$/.test(s)),
          fc.string({ minLength: 1, maxLength: 50 }).filter(s => s.trim().length > 0)
        ),
        ([id, label]) => {
          const { container } = render(
            <FormField
              id={id}
              label={label}
              type="select"
              options={[{ value: 'test', label: 'Test' }]}
              value=""
              onChange={() => {}}
            />
          );
          
          const labelElement = container.querySelector('label');
          const selectElement = container.querySelector('select');
          
          expect(labelElement).toBeTruthy();
          expect(selectElement).toBeTruthy();
          expect(labelElement?.getAttribute('for')).toBe(id);
          expect(selectElement?.getAttribute('id')).toBe(id);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should link error messages via aria-describedby', () => {
    fc.assert(
      fc.property(
        fc.tuple(
          fc.string({ minLength: 1, maxLength: 20 }).filter(s => /^[a-zA-Z][a-zA-Z0-9-]*$/.test(s)),
          fc.string({ minLength: 1, maxLength: 50 }).filter(s => s.trim().length > 0),
          fc.string({ minLength: 1, maxLength: 100 }).filter(s => s.trim().length > 0)
        ),
        ([id, label, errorMessage]) => {
          const { container } = render(
            <FormField
              id={id}
              label={label}
              type="text"
              value=""
              onChange={() => {}}
              error={errorMessage}
            />
          );
          
          const inputElement = container.querySelector('input');
          const errorElement = container.querySelector('[role="alert"]');
          
          expect(inputElement).toBeTruthy();
          expect(errorElement).toBeTruthy();
          expect(inputElement?.getAttribute('aria-describedby')).toContain(`${id}-error`);
          expect(errorElement?.getAttribute('id')).toBe(`${id}-error`);
        }
      ),
      { numRuns: 100 }
    );
  });
});
