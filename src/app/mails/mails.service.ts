import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Mail } from "./mail.model";

@Injectable()
export class MailsService {
    mailDeletedResponse?: string;

    constructor(private http: HttpClient) {}

    sendMail(mail: Mail) {

        return this.http.post("http://localhost:8080/sendEmail", {
            subject: mail.subject,
            message: mail.message,
            to: mail.to
        });
    }
    
    getMail(id: string) {
        
        return this.http.get<Mail>("http://localhost:8080/email/" + id);
    }

    getAllMails() {

        return this.http.get<Mail[]>("http://localhost:8080/emails");
    }

    getAllMailsByUser(email: string) {

        return this.http.get<Mail[]>("http://localhost:8080/emails/" + email);
    }

    deleteMail(id: string) {

        return this.http.delete<string>("http://localhost:8080/deleteEmail/" + id);
    }

}

