/**
 * Example configuration for the personal Gmail demo.
 *
 * Copy the relevant settings into your main script if needed.
 * This file is documentation/example configuration only.
 */

const CONFIG_EXAMPLE = {
  // Must match the name of your destination sheet tab.
  OUTPUT_SHEET_NAME: "Customer Email Master",

  // Search emails received or sent within the last 7 days.
  GMAIL_SEARCH_QUERY: "newer_than:7d",

  // Maximum number of Gmail threads searched per execution.
  MAX_THREADS_TO_PROCESS: 200,

  // Add only addresses you own or are authorized to exclude.
  ADDITIONAL_INTERNAL_EMAILS: [
    // "internal@example.com"
  ],

  // Common automated/system email prefixes.
  SYSTEM_EMAIL_PREFIXES: [
    "noreply@",
    "no-reply@",
    "mailer-daemon@",
    "notifications@",
    "donotreply@",
    "do-not-reply@"
  ]
};
