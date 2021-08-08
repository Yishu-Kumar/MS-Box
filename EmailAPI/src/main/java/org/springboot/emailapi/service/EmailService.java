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

        String host = "smtp.gmail.com"; 
        
        Properties properties = System.getProperties();
        
        properties.put("mail.smtp.host", host); 
        properties.put("mail.smtp.port", "465"); 
        properties.put("mail.smtp.ssl.enable", "true"); 
        properties.put("mail.smtp.starttls.enable", "true");
        properties.put("mail.smtp.auth", "true"); 

        Session session = Session.getInstance(properties, new Authenticator() {

            @Override
            protected PasswordAuthentication getPasswordAuthentication() 
                
                return new PasswordAuthentication(login.getEmail(), login.getPassword()); 
            }
        });
        
        session.setDebug(true); 
        
        MimeMessage mimeMessage = new MimeMessage(session);

        try {

            mimeMessage.setFrom(login.getEmail()); 
            mimeMessage.setRecipient(Message.RecipientType.TO, new InternetAddress(to)); 
            mimeMessage.setSubject(subject);
            mimeMessage.setText(message);

            Transport.send(mimeMessage);

            status = true;

        } catch (MessagingException e) {

            System.out.println(e.getMessage());
            e.printStackTrace();
        }

        return status;
    }

}
