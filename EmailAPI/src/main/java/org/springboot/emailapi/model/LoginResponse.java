package org.springboot.emailapi.model;

public class LoginResponse {
    private String content;

    public LoginResponse(String content) {
        this.content = content;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    @Override
    public String toString() {
        return "LoginResponse[content = " + content + "]";
    }
}
