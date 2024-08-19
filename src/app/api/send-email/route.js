// app/api/send-email/route.js

import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

// The POST request handler for sending emails
export async function POST(req) {
  try {
    const formData = await req.formData();
    
    const to = formData.get("to");
    const subject = formData.get("subject");
    const text = formData.get("text");
    const attachment = formData.get("attachment");

    // Configure the email transport
    const transporter = nodemailer.createTransport({
      service: "Gmail", // you can use any other email service
      auth: {
        user: 'crmdivine735@gmail.com', // your Gmail account
        pass: 'hahv ivuk mzyg kklq',// your Gmail password or App password
      },
    });

    // Create the email options
    const mailOptions = {
      from: 'crmdivine735@gmail.com',
      to,
      subject,
      text,
      attachments: [
        {
          filename: "invoice.pdf",
          content: attachment.stream(),
          contentType: attachment.type,
        },
      ],
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);

    // Return a success response
    return NextResponse.json({ success: true, messageId: info.messageId });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
