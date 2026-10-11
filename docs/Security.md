
# Security and Privacy

## 1. Security Principles

This project follows the principles of least privilege, data minimization, and separation between demonstration code and production credentials.

## 2. Authentication and Authorization

### Organizational implementation

The original organizational architecture used authorized Google Workspace mailbox access through a Google Cloud project, service-account authentication, and domain-wide delegation.

Domain-wide delegation requires explicit configuration and administrator authorization. It must not be enabled or used without the organization's approval.

### Personal demonstration

The public demo uses Google Apps Script and GmailApp under the permissions granted by the account authorizing the script.

It does not grant access to other accounts or bypass Google's authorization controls.

## 3. Credential Protection

Never commit any of the following to this repository:

- Service-account private keys or JSON credential files
- OAuth access tokens or refresh tokens
- Client secrets, passwords, or session cookies
- Private spreadsheet links or organization-specific identifiers
- Confidential company configuration or administrator details

Use placeholders and synthetic examples in public documentation.

## 4. Data Privacy

- Do not publish real customer email addresses or extracted mailbox contents.
- Use fictional example addresses in sample datasets.
- Restrict access to the output spreadsheet to authorized users.
- Collect and retain only the information required for the intended business purpose.
- Follow applicable organizational policies and privacy requirements.

## 5. Access Control

Grant only the permissions needed for the task. Review Apps Script authorization scopes, trigger ownership, spreadsheet sharing, and mailbox access before deployment.

## 6. Public Repository Checklist

Before publishing changes, verify that:

- No credentials or tokens are included.
- No real customer or employee data is included.
- No confidential internal URLs, IDs, or domain configuration are exposed.
- Configuration examples contain placeholders only.
- The README accurately distinguishes the personal demo from the original organizational architecture.

## 7. Incident Response

If a credential is accidentally exposed, remove public access to the affected material where possible and revoke or rotate the exposed credential immediately. Removing a file from the latest commit does not guarantee that the secret has disappeared from repository history.
