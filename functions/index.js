const { onRequest } = require('firebase-functions/v2/https');
const admin = require('firebase-admin');
const { Resend } = require('resend');

admin.initializeApp();
const db = admin.firestore();

// Resend client initialization using server environment variable
const getResendClient = () => {
  const apiKey = process.env.RESEND_API_KEY;
  return new Resend(apiKey);
};

// Helper: Format Admin Notification Email
function buildAdminEmailHtml({ inquiryId, name, email, company, service, message }) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
      <h2 style="color: #0f172a; margin-bottom: 8px;">New Lead Inquiry Received</h2>
      <p style="color: #64748b; font-size: 14px;">Inquiry Reference: <strong>#${inquiryId}</strong></p>
      <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
      
      <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 14px; color: #334155;">
        <tr>
          <td style="padding: 8px 0; font-weight: bold; width: 140px;">Customer Name:</td>
          <td style="padding: 8px 0;">${name}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold;">Email Address:</td>
          <td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold;">Company:</td>
          <td style="padding: 8px 0;">${company || 'N/A'}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold;">Primary Focus:</td>
          <td style="padding: 8px 0;"><span style="background-color: #eff6ff; color: #2563eb; padding: 4px 10px; border-radius: 9999px; font-weight: 600;">${service}</span></td>
        </tr>
      </table>

      <div style="margin-top: 20px; padding: 16px; background-color: #f8fafc; border-radius: 8px; border-left: 4px solid #2563eb;">
        <h4 style="margin: 0 0 8px 0; color: #1e293b;">Project Message:</h4>
        <p style="margin: 0; color: #334155; white-space: pre-wrap; font-size: 14px;">${message}</p>
      </div>

      <p style="margin-top: 24px; font-size: 12px; color: #94a3b8; text-align: center;">Processed securely via Firebase Cloud Function</p>
    </div>
  `;
}

// Helper: Format Customer Auto-Acknowledgement Email
function buildCustomerEmailHtml({ inquiryId, name, service, company }) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff;">
      <h2 style="color: #0f172a; margin-top: 0;">Thank you for contacting Xublix</h2>
      <p style="color: #475569; font-size: 15px; line-height: 1.6;">
        Hi <strong>${name}</strong>,<br/><br/>
        We have received your project inquiry (Reference <strong>#${inquiryId}</strong>). Our engineering team is reviewing your requirements and will reach out to you within 24 hours.
      </p>

      <div style="margin: 20px 0; padding: 16px; background-color: #f8fafc; border-radius: 12px;">
        <h4 style="margin: 0 0 10px 0; color: #0f172a; font-size: 14px;">Inquiry Summary:</h4>
        <ul style="margin: 0; padding-left: 20px; color: #334155; font-size: 14px; line-height: 1.8;">
          <li><strong>Service Area:</strong> ${service}</li>
          ${company ? `<li><strong>Company:</strong> ${company}</li>` : ''}
        </ul>
      </div>

      <p style="color: #475569; font-size: 14px;">
        If you have any urgent updates, reply directly to this email or reach us at <a href="mailto:contact@www.xublix.com" style="color: #2563eb; font-weight: bold;">contact@www.xublix.com</a>.
      </p>

      <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
      <p style="font-size: 12px; color: #94a3b8; text-align: center; margin: 0;">
        &copy; ${new Date().getFullYear()} Xublix Technologies. All rights reserved.
      </p>
    </div>
  `;
}

/**
 * HTTPS Cloud Function Endpoint: submitInquiry
 * 1. Configures invoker: 'public' for unauthenticated website access
 * 2. Handles CORS preflight (OPTIONS)
 * 3. Validates request
 * 4. Saves to Firestore 'leads' collection
 * 5. Sends admin email to contact@www.xublix.com
 * 6. Sends customer auto-acknowledgement email
 * 7. Returns success JSON response
 */
exports.submitInquiry = onRequest({ cors: true, invoker: 'public' }, async (req, res) => {
  // Always attach CORS headers
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(204).send('');
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, email, company, service, message } = req.body || {};

  // 1. Validate request data
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Validation Error: Name, email, and message are required.' });
  }

  const generatedId = `NBX-${Math.floor(100000 + Math.random() * 900000)}`;

  try {
    // 2. Save lead to Firestore
    await db.collection('leads').add({
      inquiryId: generatedId,
      name: name.trim(),
      email: email.trim(),
      company: company ? company.trim() : null,
      service: service || 'General Technical Inquiry',
      message: message.trim(),
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    const resend = getResendClient();

    // 3. Send admin email to contact@www.xublix.com
    await resend.emails.send({
      from: 'Xublix Leads <onboarding@resend.dev>',
      to: ['contact@www.xublix.com'],
      subject: `[New Lead #${generatedId}] ${service} - ${name}`,
      html: buildAdminEmailHtml({ inquiryId: generatedId, name, email, company, service, message }),
    });

    // 4. Send customer auto-acknowledgement email
    await resend.emails.send({
      from: 'Xublix Engineering <onboarding@resend.dev>',
      to: [email.trim()],
      subject: `We've received your inquiry (Ref: #${generatedId}) - Xublix`,
      html: buildCustomerEmailHtml({ inquiryId: generatedId, name, service, company }),
    });

    // 5. Return success JSON response to website
    return res.status(200).json({
      success: true,
      message: 'Enquiry sent successfully',
      inquiryId: generatedId,
    });
  } catch (error) {
    console.error('Error in submitInquiry Cloud Function:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});
