
# System Architecture

## 1. Project Overview

The Customer Email Extractor is designed to identify external customer email addresses from Gmail messages, remove unwanted internal or system addresses, eliminate duplicates, and consolidate the results into Google Sheets.

The project documents two related implementations:

- **Organizational architecture:** The original approach used authorized Google Workspace mailboxes, Gmail API access, service-account authentication, and domain-wide delegation.
- **Personal demonstration:** A simplified Google Apps Script implementation processes the currently authorized Gmail account and writes results to a Google Sheet.

The personal demonstration does not reproduce organization-wide mailbox access.

## 2. Organizational Architecture

The original organizational solution follows this logical architecture:

1. Google Workspace domain and administrator-approved configuration
2. Google Cloud project with the required APIs enabled
3. Service account and authorized domain-wide delegation
4. Gmail API authentication and access to permitted organizational mailboxes
5. Retrieval of relevant Inbox, Sent, recipient, and CC information
6. Email address extraction and validation
7. Filtering of internal and system-generated addresses
8. Duplicate removal
9. Consolidation into a central Google Sheet

Domain-wide delegation must be explicitly configured and authorized by an appropriate Workspace administrator. A service account alone does not grant access to organizational mailboxes.

## 3. Personal Demonstration Architecture

The public demo uses the following components:

- **GmailApp:** Reads messages accessible to the account that authorized the script.
- **Google Apps Script:** Executes the extraction and processing logic.
- **Filtering and deduplication:** Removes invalid, unwanted, and previously recorded email addresses according to the configured rules.
- **Google Sheets:** Stores the consolidated output.
- **Time-driven trigger:** Runs the configured function on a schedule.

The demo is intended for learning and portfolio demonstration. It does not access other Gmail accounts merely because their addresses are added to a configuration file.

## 4. Output Schema

| Column | Description |
|---|---|
| Customer Email | Extracted external email address |
| Source Email | Email account associated with the extraction |
| Extraction Date | Date the record was extracted |

## 5. Design Considerations

- Separate extraction, filtering, and storage responsibilities.
- Use configuration values for adjustable search criteria and processing limits.
- Avoid inserting duplicate customer email addresses into the existing output.
- Apply least-privilege access and protect credentials.
- Account for Gmail search limits, execution quotas, and monitoring needs before using the design at production scale.

## 6. Scope and Limitations

The personal demo processes messages accessible to one authorized Gmail account. Its search window and thread-processing limit constrain the records it examines. A production implementation requires appropriate authorization, coverage checks, error handling, monitoring, and validation against the organization's requirements.
