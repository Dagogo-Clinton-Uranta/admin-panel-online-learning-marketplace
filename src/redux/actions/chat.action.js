import { fetchChatsPending, fetchChatsSuccess, fetchInboxMessages, setCurrentChat } from "../reducers/chat.slice";
import { db, fb, auth, storage } from '../../config/firebase';
import { notifyErrorFxn, notifySuccessFxn } from 'src/utils/toast-fxn';
import "firebase/firestore";
import firebase from "firebase/app";

export const addToNotices = (message ) => async (dispatch) => {
   /* db.collection("notices").add({
        header: "sample event",
        message: message,
        time: Date.now()
    })*/
  const adminId = "aPmalurwLta7i2Ygrmkx4dYVfMJ2"

    db.collection('users').doc(adminId).update({
        generalNotices:firebase.firestore.FieldValue.arrayUnion({title:message})
        
      })
    .then((docRef) => {
        console.log("Document updated is: ", docRef);
       
        
        notifySuccessFxn('notice has been added to feed.✔');
        
    })
    .catch((error) => {
        console.error("Error adding notice: ", error);
        notifyErrorFxn('Error adding notice, please try again.❌')
    });

};






export const fetchChats = (user1, user2_data) => async (dispatch) => {
    const user2 = user2_data.uid;
    const users =  {user1, user2};
    console.log('User 1: ', user1);
    console.log('User 2: ', user2);

     dispatch(setCurrentChat(user2_data));
     dispatch(getRealtimeChat(users))
};


export const sendChat = (msgObj) => async (dispatch) => {
    
    console.log('Msg Obj: ', msgObj);
    // const today = new Date();
    // const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

    const today = new Date();
    const date = today.toISOString();

    const user1 = msgObj.user1;
    const user2 = msgObj.user2;
    const users =  {user1, user2};

    db.collection('chats')
    .add({
        ...msgObj,
        isViewed: false,
        unread: 0,
        time: date,
    })
    .then((snapshot) => {
        dispatch(getRealtimeChat(users))
        console.log('Sent Chat: ', snapshot);
}).catch((error) => {
        var errorMessage = error.message;
        console.log('Error sending chat', errorMessage);
});

};

export const getRealtimeChat = (users) => async (dispatch) => {
    db.collection('chats')
    .where('user1', 'in', [users.user1, users.user2])
    .orderBy('time', 'asc')
    .onSnapshot((querySnapshot) => {
        const chats = [];
        querySnapshot.forEach(doc => {
            if(
                (doc.data().user1 == users.user1 && doc.data().user2 == users.user2)
                || 
                (doc.data().user1 == users.user2 && doc.data().user2 == users.user1)
            ){
                chats.push(doc.data())
            }
        });

        dispatch(fetchChatsSuccess(chats));
        console.log('Realtime Fetched Chats: ', chats);
        console.log('Realtime Chat Length: ', chats.length);
    })
};


export const fetchInbox = (uid) => async (dispatch) => {
    db.collection("inbox")
    .where('id', '==', uid)
     .get()
     .then((snapshot) => {
       const allInbox = snapshot.docs.map((doc) => ({ ...doc.data() }));
     if (allInbox.length > 0) {
       console.log("All Inbox Data:", allInbox);
       dispatch(fetchInboxMessages(allInbox));
     } else {
         dispatch(fetchInboxMessages(allInbox));
         console.log("No inbox!");
     }
   }).catch((error) => {
     console.log("Error getting document:", error);
   });
   };

