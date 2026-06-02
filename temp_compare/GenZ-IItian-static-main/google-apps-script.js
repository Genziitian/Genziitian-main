function doPost(e) {
  // Selects the currently active sheet in this spreadsheet
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // Setup headers if the sheet is completely empty
  setupHeaders(sheet);
  
  try {
    // Parse the JSON data sent from the website
    const data = JSON.parse(e.postData.contents);
    
    // Create an array mapping exactly to what the user inputted
    // Add columns in the sheet in this order:
    // Timestamp | Name | Email | Phone | IITM Student | Level | Subject | Language | CGPA | Resume Link
    const row = [
      new Date(),
      data.name || '',
      data.email || '',
      data.phone || '',
      data.isIITM || '',
      data.level || '',
      data.subject || '',
      data.language || '',
      data.cgpa || '',
      data.resumeLink || ''
    ];
    
    // Append the row to Google Sheets
    sheet.appendRow(row);

    // Send a beautiful thank you email to the applicant
    if (data.email) {
      sendThankYouEmail(data.email, data.name);
    }
    
    // Return a success JSON response
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Thank you For Applying we will contact You soon'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Return error if something goes wrong
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.message
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Function to setup the headers in an empty sheet
function setupHeaders(sheet) {
  // If run manually from the editor, sheet will be undefined, so we get it
  if (!sheet) {
    sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  }
  
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'Timestamp',
      'Name',
      'Email',
      'Phone',
      'IITM Student',
      'Level',
      'Subject',
      'Language',
      'CGPA',
      'Resume Link'
    ]);
    // Optional: make the header row bold and give it a background color
    sheet.getRange(1, 1, 1, 10).setFontWeight('bold').setBackground('#f3f3f3');
  }
}

// Function to send the customized HTML email
function sendThankYouEmail(recipientEmail, applicantName) {
  const subject = "Thank you for applying to Gen-Z IITian!";
  const name = applicantName ? applicantName : "Applicant";
  
  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px; color: #333;">
      <h2 style="color: #0b1120;">Hello ${name},</h2>
      <p>Thank you for applying to join the team at <strong>Gen-Z IITian</strong>!</p>
      <p>We have successfully received your application. Our team will review your profile and get back to you soon.</p>
      <p>For further communication and updates, please join our dedicated WhatsApp group:</p>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="https://chat.whatsapp.com/KZeFNETGNYB5FT4UOrAuzj" style="background-color: #25D366; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Join WhatsApp Group</a>
      </div>
      
      <p style="font-size: 14px; color: #666;">If the button above does not work, simply copy and paste this link into your browser:<br>
      <a href="https://chat.whatsapp.com/KZeFNETGNYB5FT4UOrAuzj" style="color: #25D366;">https://chat.whatsapp.com/KZeFNETGNYB5FT4UOrAuzj</a></p>
      
      <hr style="border-top: 1px solid #eaeaea; margin: 30px 0;">
      <p style="font-size: 14px;">Best regards,<br><strong>Gen-Z IITian Team</strong></p>
    </div>
  `;
  
  try {
    GmailApp.sendEmail(recipientEmail, subject, "", {
      htmlBody: htmlBody,
      name: "Gen-Z IITian Careers"
    });
  } catch(e) {
    console.error("Failed to send email: " + e.message);
  }
}

// Needed to pre-flight CORS requests coming from browsers
function doOptions(e) {
  var headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  };
  return ContentService.createTextOutput("")
    .setMimeType(ContentService.MimeType.JSON);
}