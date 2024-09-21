import nodemailer from 'nodemailer';
import winston from 'winston';
import dotenv from "dotenv";
dotenv.config();

const logger = winston.createLogger({
    level: 'debug',
    format: winston.format.json(),
    transports: [new winston.transports.Console()]
});

export const sendEMail = async ( toEmail: string,comment:string, emotion:string,Product_ID:string,Name_product:string ) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: 587,
            secure: process.env.MAIL_PORT === '465', // true for port 465, false for port 587
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD
        }
    
        
        });
        const htmlContent = `
        <html>
        <body style="font-family: Arial, sans-serif; color: #333;">
            <h2 style="color: #e74c3c;">Warning: Emotional Comment Detected</h2>
            <p>Dear Admin,</p>
            <p>A new comment has been submitted with the following details:</p>
            <ul>
                <li><strong>Product Name:</strong> ${Name_product}</li>
                <li><strong>Product ID:</strong> ${Product_ID}</li>
                <li><strong>Emotion:</strong> ${emotion}</li>
                <li><strong>Comment:</strong> ${comment}</li>
            </ul>
            <p>Please review the comment and take appropriate action if necessary.</p>
            <p>Best Regards,<br>Your Automated Notification System</p>
        </body>
        </html>
    `;
    
    
        const mailOptions = {
            from: '<siripusson.4.2@gmail.com>',
            to: toEmail,
            subject: '<AI_Comment Alart!>',
            html:htmlContent
        };
    
        logger.info(`Sending mail to - ${toEmail}`);
        // console.log(Product_ID)
        transporter.sendMail(mailOptions, (error, info)=> {
            if (error) {
                logger.error(error);
            } else {
                logger.info('Email sent: ' + info.response);
            }
        });
    } catch (error) {
        console.log("error in send Email",error)
    }
    
}