import Mailgun from "mailgun-js";

const mailGunClient = new Mailgun({
  apiKey: process.env.MAILGUN_API_KEY || "",
  domain: "sandboxf9e4c2ecc71a440c87e3fe0de2ee4baf.mailgun.org"
})

const sendEmail = ( subject: string, html: string ) => {
    const emailData = {
        from: "seogenie@naver.com",
        to: "seogenie@naver.com",
        subject,
        html
      };
      return mailGunClient.messages().send(emailData);
    };
    
    export const sendVerificationEmail = (fullName: string, key: string) => {
      const emailSubject = `Hello! ${fullName}, please verify your email@@@@@@`;
      const emailBody = `Verify your email by clicking <a href="http://nuber.com/verification/${key}/">here</a>`;
      return sendEmail(emailSubject, emailBody);
    };