/*******************************************************
 * CUSTOMER EMAIL EXTRACTION SYSTEM
 * Personal Gmail Demonstration Version
 *
 * IMPORTANT:
 * Row 1 contains STATIC headers.
 *
 * Expected headers:
 * A1 = Customer Email
 * B1 = Source Email
 * C1 = Extraction Date
 *
 * Data starts from Row 2.
 *******************************************************/


/***********************
 * CONFIGURATION
 ***********************/

const CONFIG = {

  // Name of the Google Sheet tab
  OUTPUT_SHEET_NAME: "Customer Email Master",

  // Gmail search period
  // Change this whenever required.
  GMAIL_SEARCH_QUERY: "newer_than:7d",

  // Maximum number of Gmail threads to process
  MAX_THREADS_TO_PROCESS: 200,

  // Additional internal email addresses
  // Add specific internal/system addresses here if required.
  ADDITIONAL_INTERNAL_EMAILS: [],

  // Common automated/system email prefixes
  SYSTEM_EMAIL_PREFIXES: [
    "noreply@",
    "no-reply@",
    "mailer-daemon@",
    "notifications@",
    "donotreply@",
    "do-not-reply@"
  ]
};


/***********************
 * MAIN FUNCTION
 ***********************/

function runEmailExtraction() {

  Logger.log("========================================");
  Logger.log("CUSTOMER EMAIL EXTRACTION STARTED");
  Logger.log("========================================");

  // Identify the Gmail account running the script
  const sourceEmail = Session.getEffectiveUser().getEmail();

  if (!sourceEmail) {
    throw new Error(
      "Unable to identify the Gmail account running this script."
    );
  }

  Logger.log("Source Gmail Account: " + sourceEmail);

  // Get output sheet
  const sheet = getOutputSheet();

  // Get existing customer emails from Row 2 onward
  const existingEmails = getExistingEmails(sheet);

  Logger.log(
    "Existing customer emails in sheet: " +
    existingEmails.size
  );

  // Build internal email list
  const internalEmails = getInternalEmailSet(sourceEmail);

  Logger.log(
    "Internal emails configured: " +
    internalEmails.size
  );

  // Search Gmail
  Logger.log(
    "Gmail Search Query: " +
    CONFIG.GMAIL_SEARCH_QUERY
  );

  const threads = GmailApp.search(
    CONFIG.GMAIL_SEARCH_QUERY,
    0,
    CONFIG.MAX_THREADS_TO_PROCESS
  );

  Logger.log(
    "Threads found: " +
    threads.length
  );

  if (threads.length === 0) {

    Logger.log("No Gmail threads found.");

    return;
  }


  /***********************
   * PROCESSING
   ***********************/

  const rowsToWrite = [];

  // Prevent duplicates within this execution
  const processedEmailsThisRun = new Set();


  for (let i = 0; i < threads.length; i++) {

    const thread = threads[i];

    const messages = thread.getMessages();


    for (let j = 0; j < messages.length; j++) {

      const message = messages[j];

      /***********************
       * GET EMAIL HEADERS
       ***********************/

      const headers = getMessageHeaders(message);

      /***********************
       * EXTRACT EMAIL IDS
       ***********************/

      const extractedEmails = extractEmailsFromHeaders(headers);


      /***********************
       * PROCESS EACH EMAIL
       ***********************/

      for (let k = 0; k < extractedEmails.length; k++) {

        const email = normalizeEmail(
          extractedEmails[k]
        );

        // Validate email
        if (!isValidEmail(email)) {
          continue;
        }

        // Ignore the source/internal account
        if (internalEmails.has(email)) {
          continue;
        }

        // Ignore system-generated addresses
        if (isSystemEmail(email)) {
          continue;
        }

        // Ignore emails already present in sheet
        if (existingEmails.has(email)) {
          continue;
        }

        // Ignore duplicates within current execution
        if (processedEmailsThisRun.has(email)) {
          continue;
        }


        /***********************
         * NEW CUSTOMER EMAIL
         ***********************/

        rowsToWrite.push([
          email,
          sourceEmail,
          new Date()
        ]);

        processedEmailsThisRun.add(email);

      }

    }

  }


  /***********************
   * WRITE RESULTS
   ***********************/

  if (rowsToWrite.length === 0) {

    Logger.log(
      "No new customer email IDs found."
    );

    Logger.log(
      "========================================"
    );

    Logger.log(
      "CUSTOMER EMAIL EXTRACTION COMPLETED"
    );

    Logger.log(
      "========================================"
    );

    return;
  }


  /*
   * Find the first empty row.
   *
   * Row 1 is always reserved for headers.
   */
  const startRow = Math.max(
    sheet.getLastRow() + 1,
    2
  );


  sheet
    .getRange(
      startRow,
      1,
      rowsToWrite.length,
      3
    )
    .setValues(rowsToWrite);


  Logger.log(
    "New records written: " +
    rowsToWrite.length
  );

  Logger.log(
    "Starting row: " +
    startRow
  );

  Logger.log(
    "Ending row: " +
    (startRow + rowsToWrite.length - 1)
  );

  Logger.log(
    "========================================"
  );

  Logger.log(
    "CUSTOMER EMAIL EXTRACTION COMPLETED"
  );

  Logger.log(
    "========================================"
  );
}


/*******************************************************
 * GET OUTPUT SHEET
 *******************************************************/

function getOutputSheet() {

  const spreadsheet =
    SpreadsheetApp.getActiveSpreadsheet();

  const sheet =
    spreadsheet.getSheetByName(
      CONFIG.OUTPUT_SHEET_NAME
    );


  if (!sheet) {

    throw new Error(
      'Sheet tab "' +
      CONFIG.OUTPUT_SHEET_NAME +
      '" was not found.'
    );

  }


  return sheet;
}


/*******************************************************
 * GET EXISTING EMAILS
 *
 * IMPORTANT:
 * Starts from Row 2.
 * Row 1 is never read as data.
 *******************************************************/

function getExistingEmails(sheet) {

  const existingEmails = new Set();

  const lastRow = sheet.getLastRow();


  // No data rows yet
  if (lastRow < 2) {

    return existingEmails;

  }


  const numberOfRows =
    lastRow - 1;


  const values =
    sheet
      .getRange(
        2,
        1,
        numberOfRows,
        1
      )
      .getValues();


  for (let i = 0; i < values.length; i++) {

    const email =
      normalizeEmail(values[i][0]);


    if (email) {

      existingEmails.add(email);

    }

  }


  return existingEmails;
}


/*******************************************************
 * BUILD INTERNAL EMAIL SET
 *******************************************************/

function getInternalEmailSet(sourceEmail) {

  const internalEmails = new Set();


  // Add current Gmail account
  if (sourceEmail) {

    internalEmails.add(
      normalizeEmail(sourceEmail)
    );

  }


  // Add manually configured internal emails
  for (
    let i = 0;
    i < CONFIG.ADDITIONAL_INTERNAL_EMAILS.length;
    i++
  ) {

    const email =
      normalizeEmail(
        CONFIG.ADDITIONAL_INTERNAL_EMAILS[i]
      );


    if (email) {

      internalEmails.add(email);

    }

  }


  return internalEmails;
}


/*******************************************************
 * GET MESSAGE HEADERS
 *******************************************************/

function getMessageHeaders(message) {

  return {

    from: message.getFrom() || "",

    to: message.getTo() || "",

    cc: message.getCc() || ""

  };

}


/*******************************************************
 * EXTRACT EMAILS FROM HEADERS
 *******************************************************/

function extractEmailsFromHeaders(headers) {

  const emails = [];


  addEmailsFromText(
    headers.from,
    emails
  );

  addEmailsFromText(
    headers.to,
    emails
  );

  addEmailsFromText(
    headers.cc,
    emails
  );


  return emails;
}


/*******************************************************
 * EXTRACT EMAIL IDS FROM TEXT
 *
 * Handles examples such as:
 *
 * John <john@gmail.com>
 * john@gmail.com
 * John Doe <john@gmail.com>, Jane <jane@gmail.com>
 *******************************************************/

function addEmailsFromText(text, emailArray) {

  if (!text) {

    return;

  }


  const emailRegex =
    /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi;


  const matches =
    text.match(emailRegex);


  if (!matches) {

    return;

  }


  for (
    let i = 0;
    i < matches.length;
    i++
  ) {

    emailArray.push(matches[i]);

  }
}


/*******************************************************
 * NORMALIZE EMAIL
 *******************************************************/

function normalizeEmail(email) {

  if (!email) {

    return "";

  }


  return String(email)
    .trim()
    .toLowerCase();

}


/*******************************************************
 * EMAIL VALIDATION
 *******************************************************/

function isValidEmail(email) {

  if (!email) {

    return false;

  }


  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


  return emailRegex.test(email);

}


/*******************************************************
 * SYSTEM EMAIL FILTER
 *******************************************************/

function isSystemEmail(email) {

  const normalizedEmail =
    normalizeEmail(email);


  for (
    let i = 0;
    i < CONFIG.SYSTEM_EMAIL_PREFIXES.length;
    i++
  ) {

    if (
      normalizedEmail.startsWith(
        CONFIG.SYSTEM_EMAIL_PREFIXES[i]
      )
    ) {

      return true;

    }

  }


  return false;
}


/*******************************************************
 * TEST 1
 * CHECK CURRENT USER
 *******************************************************/

function testCurrentUser() {

  const email =
    Session.getEffectiveUser().getEmail();


  Logger.log(
    "Current Script User: " +
    email
  );

}


/*******************************************************
 * TEST 2
 * CHECK OUTPUT SHEET
 *******************************************************/

function testOutputSheet() {

  const sheet =
    getOutputSheet();


  Logger.log(
    "Spreadsheet: " +
    sheet.getParent().getName()
  );


  Logger.log(
    "Sheet Tab: " +
    sheet.getName()
  );


  Logger.log(
    "Last Row: " +
    sheet.getLastRow()
  );


  Logger.log(
    "Last Column: " +
    sheet.getLastColumn()
  );

}


/*******************************************************
 * TEST 3
 * TEST GMAIL SEARCH
 *******************************************************/

function testGmailSearch() {

  const threads =
    GmailApp.search(
      CONFIG.GMAIL_SEARCH_QUERY,
      0,
      10
    );


  Logger.log(
    "Search Query: " +
    CONFIG.GMAIL_SEARCH_QUERY
  );


  Logger.log(
    "Threads Found: " +
    threads.length
  );


  for (
    let i = 0;
    i < threads.length;
    i++
  ) {

    Logger.log(
      "Thread " +
      (i + 1) +
      ": " +
      threads[i].getFirstMessageSubject()
    );

  }

}


/*******************************************************
 * TEST 4
 * TEST EMAIL EXTRACTION
 *
 * Does NOT write anything to Sheet.
 *******************************************************/

function testEmailExtraction() {

  const threads =
    GmailApp.search(
      CONFIG.GMAIL_SEARCH_QUERY,
      0,
      10
    );


  let totalMessages = 0;

  let totalEmails = 0;


  for (
    let i = 0;
    i < threads.length;
    i++
  ) {

    const messages =
      threads[i].getMessages();


    for (
      let j = 0;
      j < messages.length;
      j++
    ) {

      totalMessages++;


      const headers =
        getMessageHeaders(
          messages[j]
        );


      const emails =
        extractEmailsFromHeaders(
          headers
        );


      totalEmails += emails.length;


      Logger.log(
        "Message: " +
        messages[j].getSubject()
      );


      Logger.log(
        "Extracted: " +
        emails.join(", ")
      );

    }

  }


  Logger.log(
    "Total Messages: " +
    totalMessages
  );


  Logger.log(
    "Total Email IDs Extracted: " +
    totalEmails
  );

}


/*******************************************************
 * TEST 5
 * FULL EXTRACTION
 *
 * This writes records to the sheet.
 *******************************************************/

function testFullExtraction() {

  runEmailExtraction();

}


/*******************************************************
 * CUSTOM MENU
 *******************************************************/

function onOpen() {

  SpreadsheetApp
    .getUi()
    .createMenu(
      "Customer Email Extraction"
    )

    .addItem(
      "1. Test Current User",
      "testCurrentUser"
    )

    .addItem(
      "2. Test Output Sheet",
      "testOutputSheet"
    )

    .addItem(
      "3. Test Gmail Search",
      "testGmailSearch"
    )

    .addItem(
      "4. Test Email Extraction",
      "testEmailExtraction"
    )

    .addItem(
      "5. Run Full Extraction",
      "testFullExtraction"
    )

    .addToUi();

}
