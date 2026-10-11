
# Data Extraction Workflow

## 1. Objective

Convert relevant Gmail message information into a clean, deduplicated list of external email addresses stored in Google Sheets.

## 2. Workflow Steps

### Step 1 — Configure the extraction

Set the Gmail search query, processing limit, output spreadsheet, and filtering rules.

### Step 2 — Retrieve matching messages

Search the mailbox authorized for the script and retrieve matching Gmail threads and their messages.

### Step 3 — Identify email addresses

Extract sender, recipient, and CC addresses from the available message fields.

### Step 4 — Validate addresses

Check that candidate values have a valid email-address format and exclude empty or malformed values.

### Step 5 — Filter unwanted addresses

Exclude addresses matching configured internal-domain rules and system-generated email prefixes.

### Step 6 — Remove duplicates

Compare candidate addresses against records already stored in the output sheet and prevent duplicate entries according to the script's matching rules.

### Step 7 — Prepare the output

Prepare the resulting records using the following fields:

- Customer Email
- Source Email
- Extraction Date

### Step 8 — Append new records

Write new records to the Google Sheet while preserving the existing header and previously recorded data.

### Step 9 — Schedule execution

Use a time-driven Apps Script trigger to run the configured extraction function automatically.

### Step 10 — Review execution

Check the Apps Script execution history for successful runs and errors. For a production implementation, add appropriate alerts, audit logging, and completeness checks.

## 3. Workflow Summary

Gmail Search → Message Retrieval → Email Extraction → Validation → Filtering → Deduplication → Google Sheets Output → Execution Review

## 4. Important Limitations

- The personal demo processes only the mailbox accessible to the account authorizing the script.
- A search matching a thread may return messages in that thread outside the intended date window; validate individual message dates if strict date filtering is required.
- A configured thread limit may prevent complete mailbox coverage.
- Scheduled execution does not by itself guarantee successful completion or complete extraction.
