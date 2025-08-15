import nodemailer from 'nodemailer';

export default async function sendEmail(to, subject, html){
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.NEXT_PUBLIC_ORG_EMAIL,
            pass: "nowtvcbwwcygeknj",
        },
    });
    await transporter.sendMail({
        from: process.env.NEXT_PUBLIC_ORG_EMAIL,
        to,
        subject,
        html,
    });
    console.log("Email sent successfully to:", to);
    return true;
    
}