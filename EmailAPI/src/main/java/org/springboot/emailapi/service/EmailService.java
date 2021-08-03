package org.springboot.emailapi.service;

import org.springboot.emailapi.model.Login;
import org.springframework.stereotype.Service;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;

@Service
public class EmailService {

    public boolean sendEmail(String subject, String message, String to, Login login) {

        boolean status = false;

        //Variable for gmail.
        String host = "smtp.gmail.com"; //Host for "Gmail" server. "SMTP" -> "Simple Mail Transfer Protocol".

        //Get the system properties.
        Properties properties = System.getProperties();
        System.out.println("Properties: " + properties);

        //Setting the important information to properties object.
        properties.put("mail.smtp.host", host); //for setting "Host".
        properties.put("mail.smtp.port", "465"); //587.
        properties.put("mail.smtp.ssl.enable", "true"); //"SSL" -> "Secure Socket Layer", for security purpose.
        properties.put("mail.smtp.starttls.enable", "true");
        properties.put("mail.smtp.auth", "true"); //for enabling "Authentication".

        //Step 1. Get the "Session" object.
        Session session = Session.getInstance(properties, new Authenticator() {

            @Override
            protected PasswordAuthentication getPasswordAuthentication() {

                if (login.getEmail().equals("goyalyishu94174@gmail.com")) {
                    return new PasswordAuthentication(login.getEmail(), "uwwu gxej orvw qmit"); //From which we want send email.
                }

                return new PasswordAuthentication(login.getEmail(), login.getPassword()); //From which we want send email.
            }
        });
//        ygAx-K79$wC7.#b
        session.setDebug(true); //To get debug message for error.

        //Step 2. Compose the message (text, multi media).
        MimeMessage mimeMessage = new MimeMessage(session);

        try {

            mimeMessage.setFrom(login.getEmail()); //Set "From".
            mimeMessage.setRecipient(Message.RecipientType.TO, new InternetAddress(to)); //Adding "Recipient" to message. We can pass th array of "Addresses" like "InternetAddress()".
            mimeMessage.setSubject(subject); //Set the message subject.
            mimeMessage.setText(message); //Set the message.

            //Step 3. Send the message using "Transport" class.
            Transport.send(mimeMessage);

            status = true;

            System.out.println("Sent message...........................");

        } catch (MessagingException e) {

            System.out.println(e.getMessage());
            e.printStackTrace();
        }

        return status;
    }

}
