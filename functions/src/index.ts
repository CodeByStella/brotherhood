import {onRequest} from "firebase-functions/v2/https";
import * as define from "firebase-functions/params";
import * as nodemailer from "nodemailer";
import * as cors from "cors";

const adminEmail = define.defineString("ADMIN_EMAIL");
const adminPassword = define.defineString("ADMIN_PASSWORD");

// Configure nodemailer with your email service
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: adminEmail.toString(),
    pass: adminPassword.toString(),
  },
});

const corsHandler = cors({origin: true});

export const sendInviteEmail = onRequest(
  (request, response) => {
    return corsHandler(request, response, async () => {
      console.log("Invoked with request:", JSON.stringify(request.body));
      if (request.method !== "POST") {
        console.log("Method not allowed:", request.method);
        return response.status(405).send("Method Not Allowed");
      }

      try {
        const {email, senderEmail, link} = request.body;
        if (!email || !link) {
          console.log("Email is required but not provided");
          return response.status(400).send("Email is required");
        }

        console.log("Attempting to send email to:", email);
        // send email
        const mailOptions = {
          from: "lw4540279@gmail.com",
          to: email,
          subject: "You are invited to join our app!",
          html: `<p>Hello!</p>
                 <p>You have been invited to join "Brothers website" by 
                 <a href="mailto:${senderEmail}">${senderEmail}</a>.
                 Click the link below to register:</p>
                 <p><a href="${link}">Register Here</a></p>
                 <p>Thank you!</p>`,
        };
        console.log(adminEmail);
        console.log(transporter);
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent successfully:", info.messageId);
        return response.status(200).send("Invite sent successfully");
      } catch (error) {
        console.error("Error sending invite:", error);
        if (error instanceof Error) {
          return response.status(500).send({
            error: "Failed to send invite",
            message: error.message,
          });
        } else {
          return response.status(500).send({
            error: "Failed to send invite",
            message: "An unknown error occurred",
          });
        }
      }
    });
  }
);

