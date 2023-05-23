import { db, fb, auth, storage } from '../../config/firebase';
import { clearUser, loginFailed, loginSuccess, logoutFxn, signupPending, signupFailed, storeUserData,storeProfileImages } from '../reducers/auth.slice';
import { v4 as uuidv4 } from 'uuid';
import { notifyErrorFxn, notifySuccessFxn } from 'src/utils/toast-fxn';
import { clearGroup } from '../reducers/group.slice';


  export const signin = (user, navigate,) => async (dispatch) => {
    console.log("all is still well at this point")
    fb.auth().signInWithEmailAndPassword(user.email, user.password)
    .then((userCredential) => {
      // Signed in
     
      var user = userCredential.user;
      console.log('Signed In user is: ', user.email);
       dispatch(fetchUserData(user.uid, "sigin", navigate));
    })
    .catch((error) => {
      console.log( ' PROBLEM REPORT ', error.message);
      dispatch(loginFailed(error.message));
     
      var errorCode = error.code;
      var errorMessage = error.message;
      //notifyErrorFxn(errorMessage);
      
      console.log('Error Code is: ', errorCode, + ' Msg is: ', errorMessage);
     
    });

};


export const signup = (user,navigate) => async (dispatch) => {
  console.log(user);
   dispatch(signupPending());
   console.log("Just before the sign up happens!!!!")
    fb.auth().createUserWithEmailAndPassword(
      user.email,
      user.password
  ).then((res)=>{
     db.collection('users').doc(res.user.uid).set({
      uid: res.user.uid,
      firstName: user.fName,
      lastName:user.lName,
      email: user.email,
      phone: user.phone,
      password: user.password,
      registeredOn:new Date(),
      businessName:user.bName,
      companySize:user.companySize, 
      regType:user.regType, 
      country:user.country,
      certified:user.certified,
      state:user.state,
      industry:user.industry,
      city:user.city,
       profileImage:'src/assets/images/rec.png'
    })
    

    dispatch(fetchUserData(res.user.uid, "sigin"));
  }).then(() => {
   
    navigate("/dashboard/home");
  }).catch((err) => {
    console.error("Error signing up: ", err);
    var errorMessage = err.message;
    dispatch(signupFailed({ errorMessage }));
  })
}


export const uploadImage = (user, file, navigate, setLoading) => async (dispatch) => {
  const imageName = uuidv4() + '.' + file?.name?.split('.')?.pop();
  console.log('File Name: ', imageName);
  const uploadTask = storage.ref(`profile_images/${imageName}`).put(file);
  uploadTask.on(
    "state_changed",
    snapshot => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      // setProgress(progress);
    },
    error => {
      console.log(error);
    },
    () => {
      storage
        .ref("profile_images")
        .child(imageName)
        .getDownloadURL()
        .then(url => {
          console.log('Image URL: ', url);
          dispatch(signup(user, file, navigate, setLoading, url));
        });
    }
  );
}


export const fetchUserData = (id, type, navigate) => async (dispatch) => {
  var user = db.collection("users").doc(id);
  user.get().then((doc) => {
  if (doc.exists) {
    // console.log("User Data:", doc.data());
    dispatch(storeUserData(doc.data()));
    if(type === "sigin"){
     
      notifySuccessFxn("Logged In😊");
      navigate('/dashboard/home', { replace: true });
    }
  } else {
     
      notifyErrorFxn("Unauthorized❌")
      console.log("No such document!");
  }
}).catch((error) => {
  console.log("Error getting document:", error);
});
return user;
};


export const getUserProfilePic = (idArray) => async (dispatch) => {
  //var user = db.collection("users").doc(id);
   console.log("idArray at this given moment is:",idArray)
const watchListItem =  db.collection('users').where('uid', 'in', idArray);
  
  watchListItem.get().then((snapshot) => {
    const imageLinks = snapshot.docs.map((doc) => (doc.data().profileImage));
    const identifier = snapshot.docs.map((doc) => (doc.data().uid));
    const profileImages = []
    
  //push the profile image where the document in watching matches the id in idArray
    idArray.forEach((item)=>{
      
      profileImages.push(imageLinks[identifier.indexOf(item)])

    })


 
    if (profileImages.length){
     console.log(" 145 auth action- the submitted images array is",profileImages)
  dispatch(storeProfileImages(profileImages));  
 
      
  } else {
     
      //notifyErrorFxn("Unauthorized❌")
      console.log("No users imagse!");
  }
 }
 
  ) 
  .catch((error) => {
  console.log("Error getting document:", error);
});

};


export const uploadProfileImage = (profileData, file, userID, navigate, setLoading) => async (dispatch) => {
  const imageName = uuidv4() + '.' + file?.name?.split('.')?.pop();
  console.log('File Name: ', imageName);
  const uploadTask = storage.ref(`profile_images/${imageName}`).put(file);
  uploadTask.on(
    "state_changed",
    snapshot => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      // setProgress(progress);
    },
    error => {
      console.log(error);
    },
    () => {
      storage
        .ref("profile_images")
        .child(imageName)
        .getDownloadURL()
        .then(url => {
          console.log('Image URL: ', url);
          dispatch(updateProfile(profileData, userID, file, navigate, setLoading, url));
        });
    }
  );
}


export const updateProfile = (profileData, userID, file, navigate, setLoading, url) => async (dispatch) => {
  // return  
  db.collection('users').doc(userID).update({
    paymentLink: profileData.paymentLink,
    imageUrl: url,
  }).then((res)=>{
       if(profileData?.password){
        //update password start
        const user = auth.currentUser;
        user.updatePassword(profileData.password)
          .then(() => {
            setLoading(false);
            console.log("Password updated successfully");
            notifySuccessFxn("Updated successfully");
            navigate('/dashboard/home', { replace: true });
          })
          .catch((error) => {
            setLoading(false);
            console.error("Error updating password: ", error);
            notifyErrorFxn(error.message);
          });
       //update password end
       }else{
        setLoading(false);
        console.error("No Password to update");
        notifySuccessFxn("Updated successfully");
        navigate('/dashboard/home', { replace: true });
       }
     
  }).catch((err) => {
    setLoading(false);
    console.log("ERR-: ", err);
  })
}


export const logout = (navigate) => async (dispatch) => {
  fb.auth().signOut().then(() => {
    dispatch(logoutFxn());
    dispatch(clearUser());
    dispatch(clearGroup());
    navigate('/loginTest', { replace: true });
    console.log('logout successful!');
  }).catch((error) => {
    // An error happened.
    console.log('logout failed response: ', error.message);
  });
  
}