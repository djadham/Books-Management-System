import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: process.env.EMAIL, 
    pass: process.env.PASSWORD   
  }
});

const registerUserEmail = async (name, email, verificationLink) => {
  try{
    const mailOptions = {
        from: 'no-reply@bookshelf.com',
        to: email,
        subject: 'Welcome to BookShelf!',
        html: `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Welcome to BookShelf!</title>
                    <style>
                        body {
                            font-family: 'Arial', sans-serif;
                            color: #333;
                            margin: 0;
                            padding: 0;
                            background-color: #f4f4f4;
                        }
                        .email-container {
                            width: 100%;
                            background-color: #f4f4f4;
                            padding: 20px;
                            box-sizing: border-box;
                        }
                        .container {
                            width: 90%;
                            max-width: 600px;
                            margin: 0 auto;
                            background: #ffffff;
                            padding: 20px;
                            border-radius: 10px;
                            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                        }
                        h1 {
                            color: #00796b; /* Teal color for headers */
                            font-size: 24px;
                            margin-bottom: 10px;
                        }
                        p {
                            font-size: 16px;
                            line-height: 1.5;
                            margin: 0 0 15px;
                        }
                        a {
                            color: #00796b; /* Teal color for links */
                            text-decoration: none;
                            font-weight: bold;
                        }
                        .button {
                            display: inline-block;
                            padding: 12px 20px;
                            font-size: 16px;
                            color: #ffffff;
                            background-color: #00796b; /* Teal color for button */
                            border-radius: 5px;
                            text-decoration: none;
                            margin: 20px 0;
                            text-align: center;
                            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                            transition: background-color 0.3s ease;
                        }
                        .button:hover {
                            background-color: #004d40; /* Darker teal for hover effect */
                        }
                        .footer {
                            margin-top: 20px;
                            font-size: 14px;
                            color: #777;
                            text-align: center;
                        }
                        .footer a {
                            color: #00796b; /* Teal color for footer links */
                            text-decoration: none;
                        }
                    </style>
                </head>
                <body>
                    <div class="email-container">
                        <div class="container">
                            <h1>Welcome to BookShelf, ${name}!</h1>
                            <p>Thank you for joining BookShelf, the ultimate destination for book lovers!</p>
                            <p>We’re thrilled to have you as part of our community. To get started, please confirm your email address by clicking the button below:</p>
                            <a href="${verificationLink}" class="button">Confirm Your Email</a>
                            <p>If you did not create this account, or if you believe this email was sent to you in error, you can safely ignore this message.</p>
                            <p>For any questions or support, feel free to reach out to us at <a href="mailto:support@bookshelf.com">support@bookshelf.com</a>.</p>
                            <div class="footer">
                                <p>&copy; ${new Date().getFullYear()} BookShelf Inc. All rights reserved.</p>
                            </div>
                        </div>
                    </div>
                </body>
                </html>
    `
    };
    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

  }catch(error){
    console.log(error);
  }
}



export { registerUserEmail};



