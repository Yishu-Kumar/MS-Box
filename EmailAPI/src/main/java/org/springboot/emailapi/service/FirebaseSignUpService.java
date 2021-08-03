package org.springboot.emailapi.service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.cloud.FirestoreClient;
import org.springboot.emailapi.model.SignUp;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class FirebaseSignUpService {

    private final String COLLECTION_NAME = "signup";

    public String signup(SignUp signUp) throws ExecutionException, InterruptedException {

        Firestore firestore = FirestoreClient.getFirestore();

        ApiFuture<WriteResult> apiFuture = firestore.collection(COLLECTION_NAME).document(signUp.getEmail()).set(signUp);

        return apiFuture.get().getUpdateTime().toString();
    }

    public String updateSignup(SignUp signUp) throws ExecutionException, InterruptedException {

        Firestore firestore = FirestoreClient.getFirestore();

        ApiFuture<WriteResult> apiFuture = firestore.collection(COLLECTION_NAME).document(signUp.getEmail()).set(signUp);

        return apiFuture.get().getUpdateTime().toString();
    }

    public String deleteSignup(String email) throws ExecutionException, InterruptedException {

        Firestore firestore = FirestoreClient.getFirestore();

        ApiFuture<WriteResult> apiFuture = firestore.collection(COLLECTION_NAME).document(email).delete();

        return "Signup profile made using '" + email + "' has been deleted successfully!!";
    }

    public SignUp getSignup(String email) throws ExecutionException, InterruptedException {

        Firestore firestore = FirestoreClient.getFirestore();

        DocumentReference documentReference = firestore.collection(COLLECTION_NAME).document(email);

        ApiFuture<DocumentSnapshot> apiFuture = documentReference.get();
        DocumentSnapshot documentSnapshot = apiFuture.get();

        SignUp signUp = null;

        if(documentSnapshot.exists()) {

            signUp = documentSnapshot.toObject(SignUp.class);

            return signUp;

        } else {

            return null;
        }
    }

    public List<SignUp> getAllSignups() throws ExecutionException, InterruptedException {

        Firestore firestore = FirestoreClient.getFirestore();

        Iterable<DocumentReference> documentReferences = firestore.collection(COLLECTION_NAME).listDocuments();
        Iterator<DocumentReference> documentReferenceIterator = documentReferences.iterator();

        List<SignUp> signUps = new ArrayList<>();
        SignUp signUp = null;

        while(documentReferenceIterator.hasNext()) {

            DocumentReference documentReference = documentReferenceIterator.next();
            ApiFuture<DocumentSnapshot> apiFuture = documentReference.get();

            DocumentSnapshot documentSnapshot = apiFuture.get();

            signUp = documentSnapshot.toObject(SignUp.class);
            signUps.add(signUp);
        }

        return signUps;
    }
}
