package org.springboot.emailapi.model;

import java.util.Date;

public class Login {
    private String email;
    private String password;
    private Date date;

    public Login() {

    }

    public Login(String email, String password, Date date) {
        this.email = email;
        this.password = password;
        this.date = date;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    @Override
    public String toString() {
        return "Login[email = " + email + ", password = " + password + ", date = " + date + "]";
    }
}
