package org.springboot.emailapi.service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.cloud.FirestoreClient;
import org.springboot.emailapi.model.Email;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class FirebaseEmailService {

    private String id = "mb2021jul";
    private static long count = 0;

    private static final String COLLECTION_NAME = "mails";

    public String saveEmail(Email email) throws ExecutionException, InterruptedException {
        count = count + 1;
        email.setId(id + count);

        Firestore firestore = FirestoreClient.getFirestore();

        ApiFuture<WriteResult> collectionApiFuture = firestore.collection(COLLECTION_NAME).document(email.getId()).set(email);
//        ApiFuture<WriteResult> collectionApiFuture = firestore.collection(COLLECTION_NAME).document().set(email); //For automatically generation of "Id".

        return collectionApiFuture.get().getUpdateTime().toString();
    }

    public Email getEmailDetails(String id) throws ExecutionException, InterruptedException {

        Firestore firestore = FirestoreClient.getFirestore();

        DocumentReference documentReference = firestore.collection(COLLECTION_NAME).document(id);

        ApiFuture<DocumentSnapshot> apiFuture = documentReference.get();
        DocumentSnapshot documentSnapshot = apiFuture.get();

        Email email =  null;

        if(documentSnapshot.exists()) {

            email = documentSnapshot.toObject(Email.class);

            return email;

        } else {

            return null;
        }
    }

    public List<Email> getAllEmails() throws ExecutionException, InterruptedException {

        Firestore firestore = FirestoreClient.getFirestore();

        Iterable<DocumentReference> documentReferences = firestore.collection(COLLECTION_NAME).listDocuments();
        Iterator<DocumentReference> documentReferenceIterator = documentReferences.iterator();

        List<Email> emails = new ArrayList<>();
        Email email = null;

        while(documentReferenceIterator.hasNext()) {

            DocumentReference documentReference = documentReferenceIterator.next();
            ApiFuture<DocumentSnapshot> apiFuture = documentReference.get();

            DocumentSnapshot documentSnapshot = apiFuture.get();

            email = documentSnapshot.toObject(Email.class);
            emails.add(email);
        }

        return emails;
    }

    public List<Email> getAllEmailsByUser(String email) throws ExecutionException, InterruptedException {

        Firestore firestore = FirestoreClient.getFirestore();

        Iterable<DocumentReference> documentReferences = firestore.collection(COLLECTION_NAME).listDocuments();
        Iterator<DocumentReference> documentReferenceIterator = documentReferences.iterator();

        List<Email> mails = new ArrayList<>();
        Email mail = null;

        while(documentReferenceIterator.hasNext()) {

            DocumentReference documentReference = documentReferenceIterator.next();
            ApiFuture<DocumentSnapshot> apiFuture = documentReference.get();

            DocumentSnapshot documentSnapshot = apiFuture.get();

            mail = documentSnapshot.toObject(Email.class);

            if(mail.getFrom().equals(email)) {

                mails.add(mail);
            }
        }

        return mails;
    }

    public String deleteEmail(String id) throws ExecutionException, InterruptedException {

        Firestore firestore = FirestoreClient.getFirestore();

        ApiFuture<WriteResult> collectionApiFuture = firestore.collection(COLLECTION_NAME).document(id).delete();

        return "Email sent has been deleted successfully!!";
    }

    public String updateEmail(Email email) throws ExecutionException, InterruptedException {

        Firestore firestore = FirestoreClient.getFirestore();

        ApiFuture<WriteResult> collectionApiFuture = firestore.collection(COLLECTION_NAME).document(email.getFrom()).set(email);

        return collectionApiFuture.get().getUpdateTime().toString();
    }
}
