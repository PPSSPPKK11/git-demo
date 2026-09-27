# Engineering Notes

This repository is intentionally not a collection of copy-paste tutorials.

The examples are shaped around problems that tend to appear after the first year of Dynamics work:

- A form works in one language but not another.
- A BPF exists in the backend but disappears from the process switcher.
- A plugin fires too often because filtering attributes were omitted.
- A close rule works in the UI but can be bypassed by another integration.
- A product count looks wrong because an OR branch escaped the company filter.
- A flow reports "yesterday" incorrectly on Monday.
- A failure logger works in Dev but points at the wrong SharePoint list in Test.
- A payment update appears to happen before a blocking exception, but transaction rollback means it did not persist.
- A plugin retrieves an entire row just to compare one old value even though a pre-image would have been enough.

The goal of the code is therefore not to maximize the number of files. It is to show how a developer reasons about lifecycle, data shape, transaction boundaries, deployment differences, performance and supportability.

When an example contains a solution-specific logical name or option-set value, it is labelled as such instead of pretending that every Dynamics environment uses the same schema.