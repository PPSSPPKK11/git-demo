# Customer Insights — First Invoice Journey

A recurring Journey requirement was to start a Customer Insights - Journeys process only when the first invoice exists.

## Business rule

Start only when:
- First Invoice Date has a value.
- Welcome Journey Triggered = No.

Once the journey has been initiated:

~~~text
Welcome Journey Triggered = Yes
~~~

That flag makes the trigger idempotent.

## Trigger pattern

~~~text
Invoice created/updated
        ↓
Resolve invoice customer
        ↓
Account or Contact?
   ┌────┴────┐
 Account   Contact
   ↓          ↓
Resolve related customer fields
        ↓
First Invoice Date exists?
        ↓
Welcome Journey Triggered = No?
        ↓
Start journey trigger
        ↓
Set Welcome Journey Triggered = Yes
~~~

Do not assume the invoice customer lookup is always an account or always a contact. Resolve the actual relationship first.

Keep segmentation-based membership separate from trigger-based journey logic so the two approaches can be tested independently.