import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { render } from "@react-email/components";
import Invoice from "@/components/email/Invoice";

// Configure the transporter for nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "crmdivine735@gmail.com", // Replace with your Gmail address
    pass: "dxhq ehvx ntbc izfp", // Replace with your Gmail app password
  },
});

// The POST request handler for sending emails
export async function POST(req) {
  try {
    const body = await req.json();
    const { to, userEmail, invoiceDate, orderId, documentNo, billedTo, products, total } = body;

    const emailHtml = render(
      <Invoice
        userEmail={userEmail}
        invoiceDate={invoiceDate}
        orderId={orderId}
        documentNo={documentNo}
        billedTo={billedTo}
        products={products}
        total={total}
      />
    );

    // Send the email
    const info = await transporter.sendMail({
      from: '"Divine" <crmdivine735@gmail.com>', // Sender's name and email
      to, // Recipient email address
      subject: "Divine Order Invoice", // Subject line
      text: "Hello, this is your Divine order invoice.", // Plain text body
      html: emailHtml, // HTML body
    });

    console.log("Message sent: %s", info.messageId);

    return NextResponse.json({ success: true, messageId: info.messageId });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
