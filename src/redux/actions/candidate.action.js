import { db } from "../../config/firebase";
import { fetchCandidates, fetchSingleCandidate ,fetchGeneralNotices} from "../reducers/candidate.slice";


export const getCandidates = (uid) => async (dispatch) => {
    db.collection('Candidates').get().then((snapshot) => {
        const cand = snapshot.docs.map((doc) => ({id: doc.id, ...doc.data() }));
        console.log("Candidates Data: ", cand);
        dispatch(fetchCandidates(cand));
    }).catch((error) => {
        var errorMessage = error.message;
        console.log('Error fetching candidates', errorMessage);
    });
};


export const fetchFeed = (id) => async (dispatch) => {
    const adminId = "aPmalurwLta7i2Ygrmkx4dYVfMJ2"
    var feed = db.collection("users").doc(adminId);

    feed.get().then((doc) => {
    if (doc.exists) {
        console.log("the admins data is:", doc.data());
        dispatch(fetchGeneralNotices(doc.data().generalNotices));
    } else {
        console.log("No such document!");
    }
}).catch((error) => {
    console.log("Error getting document:", error);
});

};

export const getSingleCandidate = (id) => async (dispatch) => {
    var cand = db.collection("Candidates").doc(id);

    cand.get().then((doc) => {
    if (doc.exists) {
        console.log("Single Candidate data:", doc.data());
        dispatch(fetchSingleCandidate(doc.data()));
    } else {
        console.log("No such document!");
    }
}).catch((error) => {
    console.log("Error getting document:", error);
});

};
