package org.springboot.emailapi.service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.cloud.FirestoreClient;
import org.springboot.emailapi.model.Login;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class FirebaseLoginService {

    private static final String COLLECTION_NAME = "login";

    public String login(Login login) throws ExecutionException, InterruptedException {

        Firestore firestore = FirestoreClient.getFirestore();

        ApiFuture<WriteResult> apiFuture = firestore.collection(COLLECTION_NAME).document(login.getEmail()).set(login);

        return apiFuture.get().getUpdateTime().toString();
    }

    public String updateLogin(Login login) throws ExecutionException, InterruptedException {

        Firestore firestore = FirestoreClient.getFirestore();

        ApiFuture<WriteResult> apiFuture = firestore.collection(COLLECTION_NAME).document(login.getEmail()).set(login);

        return apiFuture.get().getUpdateTime().toString();
    }

    public String logout(String email) throws ExecutionException, InterruptedException {

        Firestore firestore = FirestoreClient.getFirestore();

        ApiFuture<WriteResult> apiFuture = firestore.collection(COLLECTION_NAME).document(email).delete();

        return "User logged in using '" + email + "' is logged out successfully!!";
    }

    public Login getLogin(String email) throws ExecutionException, InterruptedException {

        Firestore firestore = FirestoreClient.getFirestore();

        DocumentReference documentReference = firestore.collection(COLLECTION_NAME).document(email);

        ApiFuture<DocumentSnapshot> apiFuture = documentReference.get();
        DocumentSnapshot documentSnapshot = apiFuture.get();

        Login login = null;

        if(documentSnapshot.exists()) {

            login = documentSnapshot.toObject(Login.class);

            return login;

        } else {

            return null;
        }
    }

    public List<Login> getAllLogins() throws ExecutionException, InterruptedException {

        Firestore firestore = FirestoreClient.getFirestore();

        Iterable<DocumentReference> documentReferences = firestore.collection(COLLECTION_NAME).listDocuments();
        Iterator<DocumentReference> documentReferenceIterator = documentReferences.iterator();

        List<Login> logins = new ArrayList<>();
        Login login = null;

        while(documentReferenceIterator.hasNext()) {

            DocumentReference documentReference = documentReferenceIterator.next();
            ApiFuture<DocumentSnapshot> apiFuture = documentReference.get();

            DocumentSnapshot documentSnapshot = apiFuture.get();

            login = documentSnapshot.toObject(Login.class);
            logins.add(login);
        }

        return logins;
    }

}
