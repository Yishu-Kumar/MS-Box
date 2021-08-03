package org.springboot.emailapi.model;

import java.util.Date;

public class Email {
    private String id;
    private String from;
    private String to;
    private String subject;
    private String message;
    private Date date;

    public Email() {

    }

    public Email(String id, String from, String to, String subject, String message, Date date) {
        this.id = id;
        this.from = from;
        this.to = to;
        this.subject = subject;
        this.message = message;
        this.date = date;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFrom() {
        return from;
    }

    public void setFrom(String from) {
        this.from = from;
    }

    public String getTo() {
        return to;
    }

    public void setTo(String to) {
        this.to = to;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    @Override
    public String toString() {
        return "Email[id = " + id + ", from = " + from + ", to = " + to + ", subject = " + subject + ", message = " + message +
               ", date = " + date + "]";
    }
}
