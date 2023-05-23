import { db, fb, auth, storage } from '../../config/firebase';
import { fetchTransactions, isItLoading } from '../reducers/transactions.slice';

export const fetchMyTransactions = (uid) => async (dispatch) => {
     dispatch(isItLoading(true));
      db.collection("transactions")
      . where('userID', '==', uid)
       .get()
       .then((snapshot) => {
        const myTransactions = snapshot.docs.map((doc) => ({ ...doc.data() }));
        console.log("myTransactions: ", myTransactions);
        dispatch(isItLoading(false));
        dispatch(fetchTransactions(myTransactions));
     }).catch((error) => {
       console.log("Error getting document:", error);
       dispatch(isItLoading(false));
     });
 };
