package org.springboot.emailapi.model;

public class SignUpResponse {
    private String response;

    public SignUpResponse(String response) {
        this.response = response;
    }

    public String getResponse() {
        return response;
    }

    public void setResponse(String response) {
        this.response = response;
    }

    @Override
    public String toString() {
        return "SignUpResponse[response = " + response + "]";
    }
}
