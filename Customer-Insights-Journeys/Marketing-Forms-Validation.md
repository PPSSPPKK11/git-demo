# Marketing Forms Validation

Example validation pattern from a Real-time Marketing form implementation.

## Requirements
- First Name: reject values containing only numbers.
- Last Name: reject values containing only numbers.
- Company Name: reject values containing only numbers.
- Email: validate format.
- Business Phone: validate format.
- Submission must be blocked when validation fails.

## Important implementation detail

Marketing forms can result in more than one form-related handler being present on a page. A hidden popup form can cause duplicate validation messages when handlers are attached indiscriminately.

The safer pattern is to initialize handlers against the relevant visible form and keep initialization idempotent.

Recommended functions:
- initializeNumericOnlyField
- initializeEmailField
- initializePhoneField
- initializeSubmitValidation
