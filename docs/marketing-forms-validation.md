# Real-Time Marketing Form Validation

A real incident involved hundreds of Customer Insights - Journeys forms embedded on a website from a small set of templates.

The validation requirement:
- First Name: reject values containing only numbers.
- Last Name: reject values containing only numbers.
- Company Name: reject values containing only numbers.
- Email: validate format.
- Business Phone: validate format.
- Submit: block while any validation error remains.

## The non-obvious failure

The English form worked while a Chinese form produced duplicate messages.

The debugging path showed that a hidden/popup form earlier in the DOM was also being initialized, so the same handlers could be attached more than once.

Defensive flow:

~~~text
discover loaded D365 marketing form scripts
        ↓
identify the visible form
        ↓
initialize handlers once
        ↓
validate fields
        ↓
intercept submit only when invalid
~~~

Initialization was separated into focused functions:

~~~text
initializeNumericOnlyField
initializeEmailField
initializePhoneField
initializeSubmitValidation
~~~

This is a client-side validation layer. Dataverse/server-side validation remains the authoritative data-integrity boundary.