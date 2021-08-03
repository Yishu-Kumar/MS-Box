package org.springboot.emailapi.controller;

import org.springboot.emailapi.model.*;
import org.springboot.emailapi.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Random;
import java.util.concurrent.ExecutionException;

@RestController
@CrossOrigin
public class EmailController {
    private static Login login;

    private Random random = new Random(10000);

    @Autowired
    private EmailService emailService;

    @Autowired
    private FirebaseEmailService firebaseEmailService;

    @Autowired
    private FirebaseSignUpService firebaseSignUpService;

    @Autowired
    private FirebaseLoginService firebaseLoginService;

    @RequestMapping("/welcome")
    public String welcome() {

        return "Hello";
    }

    @PostMapping("/sendEmail")
    public ResponseEntity<EmailResponse> sendEmail(@RequestBody EmailRequest emailRequest) {

        System.out.println("Email request: " + emailRequest + " -> " + this.login);
        boolean result = this.emailService.sendEmail(emailRequest.getSubject(), emailRequest.getMessage(), emailRequest.getTo(), login);

        if(result) {

            try {

                Email email = new Email("", this.login.getEmail(), emailRequest.getTo(), emailRequest.getSubject(),
                                        emailRequest.getMessage(), new Date());

                String response = this.firebaseEmailService.saveEmail(email);

                System.out.println("Email data has been saved in firebase database: " + response);

            } catch (Exception e) {

                System.out.println("ERROR! Couldn't save the email data: " + e.getMessage());
            }

            return ResponseEntity.ok(new EmailResponse("Email is sent successfully..."));

        } else{

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new EmailResponse("Email is not sent..."));
        }
    }

    @GetMapping("/email/{id}")
    public Email getEmail(@PathVariable("id") String id) throws ExecutionException, InterruptedException {

        Email email = this.firebaseEmailService.getEmailDetails(id);
        System.out.println("Email details: " + email);

        if(email != null) {

            return email;

        } else {

            return null;
        }
    }

    @GetMapping("/emails")
    public List<Email> getAllEmails() throws ExecutionException, InterruptedException {

        List<Email> emails = this.firebaseEmailService.getAllEmails();
        System.out.println(emails);

        if(!emails.isEmpty()) {

            return emails;

        } else {

            return null;
        }
    }

    @GetMapping("/emails/{userEmail}")
    public List<Email> getAllEmailsByUser(@PathVariable("userEmail") String email) throws ExecutionException, InterruptedException {

        List<Email> emails = this.firebaseEmailService.getAllEmailsByUser(email);
        System.out.println(emails);

        if(!emails.isEmpty()) {

            return emails;

        } else {

            return null;
        }
    }

    @DeleteMapping("/deleteEmail/{id}")
    public ResponseEntity<EmailResponse> deleteEmail(@PathVariable("id") String id) throws ExecutionException, InterruptedException {

        String response = this.firebaseEmailService.deleteEmail(id);

        return ResponseEntity.status(HttpStatus.OK).body(new EmailResponse("Success! " + response));
    }

    @PutMapping("/updateEmail")
    public ResponseEntity<?> updateEmail(@RequestBody Email email) {

        System.out.println("Email request: " + email);

        boolean result = this.emailService.sendEmail(email.getSubject(), email.getMessage(), email.getTo(), login);

        if(result) {

            try {

                Email email1 = new Email(email.getId(), "9417446746yishu@gmail.com", email.getTo(), email.getSubject(), email.getMessage(),
                                         email.getDate());
                String response = this.firebaseEmailService.updateEmail(email1);

                System.out.println("Email data has been saved in firebase database: " + response);

            } catch (Exception e) {

                System.out.println("ERROR! Couldn't save the email data: " + e.getMessage());
            }

            return ResponseEntity.ok(new EmailResponse("Email is sent successfully..."));

        } else{

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new EmailResponse("Email is not sent..."));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Login login) throws ExecutionException, InterruptedException {

        login.setDate(new Date());

        SignUp signUp = this.firebaseSignUpService.getSignup(login.getEmail());

        try {

            if(signUp != null && signUp.getPassword().equals(login.getPassword())) {

                String response = this.firebaseLoginService.login(login);
                this.login = login;
                System.out.println(login);

                return ResponseEntity.status(HttpStatus.OK).body(new LoginResponse("You logged in successfully on " + response + " !!"));

            } else {

                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new LoginResponse("ERROR! You need to sign up!!"));
            }

        } catch (Exception e) {

            System.out.println("ERROR! Couldn't login!!" + e.getMessage());
        }

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new LoginResponse("ERROR! Something went wrong!!!"));
    }

    @GetMapping("/login/{email}")
    public Login getLogin(@PathVariable("email") String email) throws ExecutionException, InterruptedException {

        Login login = this.firebaseLoginService.getLogin(email);

        if(login != null) {

            return login;

        } else {

            return null;
        }
    }

    @DeleteMapping("/logout/{email}")
    public ResponseEntity<?> logout(@PathVariable("email") String email) throws ExecutionException, InterruptedException {

        String response = this.firebaseLoginService.logout(email);

        return ResponseEntity.status(HttpStatus.OK).body(new LoginResponse("Success! " + response));
    }

    @PostMapping("/signUp")
    public ResponseEntity<SignUpResponse> signUp(@RequestBody SignUp signUp) throws ExecutionException, InterruptedException {

        SignUp signUp1 = this.firebaseSignUpService.getSignup(signUp.getEmail());

        if(signUp1 == null) {

            signUp.setDate(new Date());
            String response = this.firebaseSignUpService.signup(signUp);

            return ResponseEntity.status(HttpStatus.OK).body(new SignUpResponse("Success! You are sign in successfully!!"));

        } else {

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new SignUpResponse("ERROR! You are already signed up using this email!!"));
        }
    }

    @GetMapping("/signUp/{email}")
    public SignUp getSignup(@PathVariable("email") String email) throws ExecutionException, InterruptedException {

        SignUp signUp = this.firebaseSignUpService.getSignup(email);
        System.out.println("Signup: " + signUp);

        if(signUp != null) {

            return signUp;

        } else {

            return null;
        }
    }

    @DeleteMapping("/signOut/{email}")
    public ResponseEntity<SignUpResponse> signOut(@PathVariable("email") String email) throws ExecutionException, InterruptedException {

        String response = this.firebaseSignUpService.deleteSignup(email);

        return ResponseEntity.status(HttpStatus.OK).body(new SignUpResponse("Success! " + response));
    }

    @PutMapping("/updateProfile")
    public ResponseEntity<SignUpResponse> updateSignUpProfile(@RequestBody SignUp signUp) throws ExecutionException, InterruptedException {

        System.out.println("Profile update request: " + signUp);

        SignUp signIn = this.firebaseSignUpService.getSignup(signUp.getEmail());

        if (signIn != null) {

            signUp.setDate(signIn.getDate());
            String response = this.firebaseSignUpService.updateSignup(signUp);

            return ResponseEntity.ok(new SignUpResponse("Success! " + response));

        } else {

            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new SignUpResponse("Sorry! Your profile doesn't exist!!"));
        }
    }

    @PostMapping("/forgot-password")
    public long forgotPassword(@RequestBody String email) throws ExecutionException, InterruptedException {

        SignUp signUp = this.firebaseSignUpService.getSignup(email);
//        System.out.println(email + " -> " + signUp);

        if(signUp != null) {

            long otp = random.nextInt(1000000);

            Login login = new Login(signUp.getEmail(), signUp.getPassword(), new Date());

            String message = "OTP is " + otp;

            boolean response = this.emailService.sendEmail("Please confirm your email address", message, email, login);
//            System.out.println(response);

            if(response) {

                return otp;

            } else {

                return 0;
            }

        } else {

            return -1;
        }
    }
}
