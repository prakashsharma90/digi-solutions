import * as brevo from '@getbrevo/brevo';

const apiInstance = new brevo.TransactionalEmailsApi();

// Configure API key authorization
apiInstance.setApiKey(
    brevo.TransactionalEmailsApiApiKeys.apiKey,
    process.env.BREVO_API_KEY || ''
);

interface WelcomeEmailParams {
    email: string;
    name?: string;
}

interface NewsletterEmailParams {
    email: string;
    subject: string;
    content: string;
    name?: string;
}

/**
 * Send welcome email to new newsletter subscriber
 */
export async function sendWelcomeEmail({ email, name }: WelcomeEmailParams) {
    try {
        const sendSmtpEmail = new brevo.SendSmtpEmail();

        sendSmtpEmail.subject = "Welcome to Digihub Newsletter! 🚀";
        sendSmtpEmail.to = [{ email, name: name || email.split('@')[0] }];
        sendSmtpEmail.sender = {
            name: "Digihub Solutions",
            email: "prakash032100@gmail.com" // Replace with your verified sender email
        };
        sendSmtpEmail.htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to Digihub</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0B0F14;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0B0F14; padding: 40px 20px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #1a1f2e 0%, #0f1419 100%); border-radius: 16px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1);">
                  
                  <!-- Header -->
                  <tr>
                    <td style="padding: 40px 40px 20px; text-align: center;">
                      <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 700;">
                        Welcome to Digihub! 🎉
                      </h1>
                    </td>
                  </tr>

                  <!-- Content -->
                  <tr>
                    <td style="padding: 20px 40px;">
                      <p style="margin: 0 0 20px; color: #d1d5db; font-size: 16px; line-height: 1.6;">
                        Hi ${name || 'there'},
                      </p>
                      <p style="margin: 0 0 20px; color: #d1d5db; font-size: 16px; line-height: 1.6;">
                        Thank you for subscribing to our newsletter! You're now part of an exclusive community of 4,000+ marketers who receive:
                      </p>
                      
                      <ul style="margin: 0 0 20px; padding-left: 20px; color: #d1d5db; font-size: 16px; line-height: 1.8;">
                        <li>🎯 <strong style="color: #ffffff;">Weekly SEO strategies</strong> that actually work</li>
                        <li>🤖 <strong style="color: #ffffff;">AI marketing insights</strong> to stay ahead</li>
                        <li>📊 <strong style="color: #ffffff;">Growth tactics</strong> from real case studies</li>
                        <li>💡 <strong style="color: #ffffff;">Exclusive tips</strong> not shared anywhere else</li>
                      </ul>

                      <p style="margin: 0 0 30px; color: #d1d5db; font-size: 16px; line-height: 1.6;">
                        Expect your first newsletter within the next few days. In the meantime, check out our latest resources:
                      </p>

                      <!-- CTA Button -->
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td align="center" style="padding: 20px 0;">
                            <a href="https://digihub.agency/blog" style="display: inline-block; padding: 16px 32px; background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: #ffffff; text-decoration: none; border-radius: 9999px; font-weight: 600; font-size: 16px; box-shadow: 0 10px 25px rgba(99, 102, 241, 0.3);">
                              Explore Our Blog
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="padding: 30px 40px; border-top: 1px solid rgba(255,255,255,0.1); text-align: center;">
                      <p style="margin: 0 0 10px; color: #9ca3af; font-size: 14px;">
                        Digihub Solutions - AI-Powered Digital Marketing
                      </p>
                      <p style="margin: 0; color: #6b7280; font-size: 12px;">
                        <a href="https://digihub.agency" style="color: #6366f1; text-decoration: none;">Visit Website</a> | 
                        <a href="https://digihub.agency/blog" style="color: #6366f1; text-decoration: none;">Blog</a> | 
                        <a href="{{unsubscribe}}" style="color: #6b7280; text-decoration: none;">Unsubscribe</a>
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `;

        const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
        console.log('Welcome email sent successfully:', data);
        return { success: true, messageId: data.messageId };
    } catch (error) {
        console.error('Error sending welcome email:', error);
        throw error;
    }
}

/**
 * Send custom newsletter email
 */
export async function sendNewsletterEmail({
    email,
    subject,
    content,
    name
}: NewsletterEmailParams) {
    try {
        const sendSmtpEmail = new brevo.SendSmtpEmail();

        sendSmtpEmail.subject = subject;
        sendSmtpEmail.to = [{ email, name: name || email.split('@')[0] }];
        sendSmtpEmail.sender = {
            name: "Digihub Solutions",
            email: "prakash032100@gmail.com"
        };
        sendSmtpEmail.htmlContent = content;

        const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
        console.log('Newsletter email sent successfully:', data);
        return { success: true, messageId: data.messageId };
    } catch (error) {
        console.error('Error sending newsletter email:', error);
        throw error;
    }
}

/**
 * Add contact to Brevo list (for segmentation)
 */
export async function addToBrevoList(email: string, listId: number, attributes?: Record<string, any>) {
    try {
        const contactsApi = new brevo.ContactsApi();
        contactsApi.setApiKey(
            brevo.ContactsApiApiKeys.apiKey,
            process.env.BREVO_API_KEY || ''
        );

        const createContact = new brevo.CreateContact();
        createContact.email = email;
        createContact.listIds = [listId];
        createContact.attributes = attributes || {};
        createContact.updateEnabled = true;

        const data = await contactsApi.createContact(createContact);
        console.log('Contact added to Brevo list:', data);
        return { success: true, id: data.id };
    } catch (error: any) {
        // If contact already exists, update it
        if (error.response?.body?.code === 'duplicate_parameter') {
            console.log('Contact already exists, updating...');
            return { success: true, message: 'Contact already exists' };
        }
        console.error('Error adding contact to Brevo:', error);
        throw error;
    }
}
