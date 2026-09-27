# OData and FetchXML Patterns

## OData

Use select, filter, orderby, expand and top deliberately.

Example:

?$select=name,productnumber
&$filter=statecode eq 0
&$orderby=name asc
&$top=50

## FetchXML

Use nested filters to make business-rule grouping explicit.

Correct logical structure:

(size matches OR size is null) AND company matches

The XML structure should mirror the business rule rather than relying on assumed operator precedence.
