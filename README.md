# Google Workspace Customer Email Extractor

An email extraction and consolidation project built with Google Apps Script and Google Sheets.

## Project Overview

This project demonstrates how email addresses can be extracted from Gmail message headers, validated, filtered, deduplicated, and consolidated into a central Google Sheet.

The personal demonstration version uses `GmailApp` and a time-driven Apps Script trigger to automate extraction from the Gmail account that authorizes the script.

The original organizational implementation used a different architecture to access authorized company mailboxes through Gmail API, service-account authentication, and domain-wide delegation.


## Documentation

- [System Architecture](docs/Architecture.md)
- [Extraction Workflow](docs/Workflow.md)
- [Security and Privacy](docs/Security.md)

- [System Architecture](Architecture.md)
- [Extraction Workflow](Workflow.md)
- [Security and Privacy](Security.md)

## Business Problem

Customer email addresses can be distributed across numerous email conversations. Manually collecting and consolidating these addresses is repetitive and can result in duplicate or invalid records.

## Features

- Extract email addresses from From, To, and CC headers
- Normalize email addresses to lowercase
- Validate extracted addresses
- Filter configured internal addresses
- Filter common system-generated email addresses
- Prevent duplicates within an execution
- Skip addresses already recorded in the output sheet
- Append new records without changing the header row
- Support scheduled execution using a time-driven trigger

## Technology Stack

- Google Apps Script
- Gmail / GmailApp
- Google Sheets
- JavaScript
- Time-driven triggers

The original organizational architecture additionally involved Gmail API, Google Cloud, service accounts, OAuth, and domain-wide delegation.

## Output Format

The destination sheet uses these columns:

| Column | Description |
|---|---|
| Customer Email | Extracted email address |
| Source Email | Gmail account running the extraction |
| Extraction Date | Date and time the record was added |

Row 1 contains the static column headers. Data is appended from Row 2 onward.

## Personal Demo Setup

1. Create a Google Sheet with a tab named `Customer Email Master`.
2. Add the headers `Customer Email`, `Source Email`, and `Extraction Date` to cells A1:C1.
3. Open **Extensions → Apps Script**.
4. Add the sanitized source code from `src/CustomerEmailExtractor.gs`.
5. Review the configuration and update the Gmail search query if required.
6. Run the test functions and authorize the requested Google permissions.
7. Run the extraction function to test the output.
8. Configure a time-driven trigger if you want automatic execution.

The script operates under the authorization and permissions of the account running it.

## Project Architecture

The production organizational architecture and the personal demonstration architecture are documented separately. The personal version does not reproduce domain-wide mailbox access.

See `docs/Architecture.md` and `docs/Workflow.md` for the detailed design.

## Security

- Do not commit private keys, OAuth secrets, passwords, or access tokens.
- Do not publish real customer email addresses or confidential company information.
- Use synthetic sample data for demonstrations.
- Obtain appropriate authorization before accessing or processing any mailbox.
- Keep production configuration separate from the public demonstration code.

## Limitations

The personal demo reads the Gmail account under which the script is authorized. Adding another email address to the configuration does not grant access to another Gmail account.

The extraction scope is controlled by the Gmail search query and thread limit. The script is intended as a portfolio demonstration and may require additional pagination, error handling, and monitoring for large-scale production use.

## Repository Structure

- `src/CustomerEmailExtractor.gs` — main Apps Script
- `config/Config.example.gs` — example configuration
- `demo/Sample_Email_Data.csv` — synthetic sample output
- `docs/` — architecture, workflow, and security documentation
- `diagrams/` — project architecture diagram

## Project Purpose

This project demonstrates practical skills in email automation, data processing, data quality, deduplication, Google Sheets integration, and workflow automation.
