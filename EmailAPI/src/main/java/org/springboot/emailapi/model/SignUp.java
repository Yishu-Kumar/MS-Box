package org.springboot.emailapi.model;

import java.util.Date;

public class SignUp {
    private String name;
    private String gender;
    private Date dateOfBirth;
    private String email;
    private String password;
    private long phoneNumber;
    private Date date;

    public SignUp() {

    }

    public SignUp(String name, String gender, Date dateOfBirth, String email, String password, long phoneNumber, Date date) {
        this.name = name;
        this.gender = gender;
        this.dateOfBirth = dateOfBirth;
        this.email = email;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.date = date;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
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

    public long getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(long phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    @Override
    public String toString() {
        return "SignUp[name = " + name + ", gender = " + gender + ", dateOfBirth = " + dateOfBirth + ", email = " + email +
               ", password = " + password + ", phoneNumber = " + phoneNumber + ", date = " + date + "]";
    }
}
