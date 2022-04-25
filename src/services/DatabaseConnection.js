import { getDatabase, ref, set, onValue, push } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { app } from './firebase';

const userId = localStorage.getItem("userId");
const projId = localStorage.getItem("id");
const date = new Date;

// ------- authentication

export const createUserFirebase = (email, password) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        
        })
        .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode)
        console.log(errorMessage)
  });
};

export const signInFirebase = (email, password) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode)
            console.log(errorMessage)
        });
}

//-------- notes

export const getDatabaseNoteData = () => {
    let dbData = {};
    const db = getDatabase(app);
    
    const readNoteRef = ref(db, 'notes/');
    onValue(readNoteRef, (snapshot) => {
        const data = snapshot.val();
        dbData = {...data}
    });
    return dbData;
}

export const getDatabaseUsers = dbData => {
    const users = [];
    for (const user in dbData) {
        users.push(user);
    }
    return users;
}

export const getDatabaseNotes = (comparisonMatch, setExistingNotes) => {

    if (comparisonMatch.length === 1) {
        const db = getDatabase(app);
        
        const readNoteRef = ref(db, `notes/${userId}/${comparisonMatch.sort().join(',')}`);
        onValue(readNoteRef, (snapshot) => {
            const data = snapshot.val();
            const notes = Object.values(data || {});
            setExistingNotes([]);
            setExistingNotes( existingNotes => [...existingNotes, ...notes]);
        });
    } else {
        setExistingNotes([]);
    }
} 

export const writeFirstUserNote = (note, selectedProj) => {
    const db = getDatabase(app);
    set(ref(db, `notes/${userId}/${selectedProj.sort().join(',')}/0`), {
        note,
        date: date.toLocaleDateString()
    });
};

export const pushDataToExistingComparison = (note, comparisonMatch) => {
    const db = getDatabase();
    push(ref(db, `notes/${userId}/${comparisonMatch.sort().join(',')}`), {
        note, 
        date: date.toLocaleDateString()
    });
};

export const pushDataToNewComparison = (note, selectedProj) => {
    const db = getDatabase();
    push(ref(db, `notes/${userId}/${selectedProj.sort().join(',')}`), {
        note,
        date: date.toLocaleDateString()
    });
};

//------ index table

export const getDatabaseIndexData = (projId) => {
    let dbData = {};
    const db = getDatabase(app);
    
    const readIndexRef = ref(db, `index/${projId}`);
    onValue(readIndexRef, (snapshot) => {
        const data = snapshot.val();
        dbData = {...data}
    });
    return dbData;
}

export const writeProjIndex = (date, aParticipants, qEngagements, debEngagements, divEngagements, projId) => {
    const db = getDatabase(app);
    set(ref(db, `index/${projId}/${date}`), {
        activeParticipants: aParticipants,
        questionsEngagements: qEngagements,
        debatesEngagements: debEngagements,
        divergencesEngagements: divEngagements
    });
};

export const getDatabaseProjIndex = (comparisonMatch, setExistingNotes) => {

    if (comparisonMatch.length === 1) {
        const db = getDatabase(app);
        
        const readNoteRef = ref(db, `notes/${userId}/${comparisonMatch.sort().join(',')}`);
        onValue(readNoteRef, (snapshot) => {
            const data = snapshot.val();
            const notes = Object.values(data || {});
            setExistingNotes([]);
            setExistingNotes( existingNotes => [...existingNotes, ...notes]);
        });
    } else {
        setExistingNotes([]);
    }
}

