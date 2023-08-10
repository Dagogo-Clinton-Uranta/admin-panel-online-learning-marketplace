import { db, fb, auth, storage } from '../../config/firebase';
import { clearUser, loginFailed, loginSuccess, logoutFxn, signupFailed, storeUserData } from '../reducers/auth.slice';
import { v4 as uuidv4 } from 'uuid';
import { notifyErrorFxn, notifySuccessFxn } from 'src/utils/toast-fxn';
import { isItLoading, saveAllGroup ,saveEmployeer,
         saveCategories ,saveGroupMembers, saveMyGroup,
         savePrivateGroup, savePublicGroup, saveSectionVideos,
          saveCategoryVideos,saveCategoryChapters,
        saveChapterSessions,saveSubjectInfo,
      saveLessonInfo,saveChapterInfo} from '../reducers/group.slice';
import firebase from "firebase/app";

export const createGroup = (groupData, user, file, navigate, setLoading, url) => async (dispatch) => {
  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  var today  = new Date();
   
  db.collection("groups").add({
    groupName: groupData.groupName,
    noOfSavers: groupData.noOfSavers,
    pin: groupData.pin,
    startDate: groupData.startDate,
    amount: groupData.amount,
    status: groupData.status.toLowerCase(),
    imageUrl: url,
    admins: [user.id],
    members: [user.id],
    accountCreated: today.toLocaleDateString("en-US", options),
}).then((res)=>{
    console.log("RESPONSE ID: ", res.id);
    return db.collection('groups').doc(res.id).update({
      groupId: res.id,
    }).then(() => {
        db.collection('groups').doc(res.id).collection('membersCollection').add({
            memberName: user.name,
            memberEmail: user.email,
            memberImageUrl: user.profileImg,
            invitedBy: user.id,
            invite: 0,
            paid: 0,
            users: [user.id, user.id],
            sentAt: today.toLocaleDateString("en-US", options),
          }).then((resp) => {
            console.log("membersCollection RESPONSE: ", resp);
            setLoading(false);
            db.collection('groups').doc(res.id).collection('membersCollection').doc(resp.id).update({
              id: resp.id,
            })
          }).then(() => {
            notifySuccessFxn("Group Created")
            setLoading(false);
            navigate('/dashboard/home', { replace: true });
          }).catch((err) => {
            console.error("Error creating group: ", err);
            var errorMessage = err.message;
            notifyErrorFxn(errorMessage);
            setLoading(false);
          })
    })
  })
}


export const uploadUserSettings = (groupData = 0, file = 0, user = 0) => async (dispatch) => {
 if(file && file.length !== 0){

   /*LOGIC T0 RUN IF WE HAVE A PICTURE */

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
      notifyErrorFxn("Error uploading image,please try again!")
    },
    () => {
      storage
        .ref("profile_images")
        .child(imageName)
        .getDownloadURL()
        .then(url => {
          console.log('Image URL: ', url);
          //dispatch(createGroup(groupData, user, file, navigate, setLoading, url));
 
  

    if(groupData.newPassword){
   //PASSWORD UPDATE LOGIC

   fb.auth().signInWithEmailAndPassword(groupData.email, groupData.password)
   .then((userCredential) => {
     // Signed in
     const user = fb.auth().currentUser;
    
     user.updatePassword(groupData.newPassword).then(() => {
       // Update successful.
       console.log("PASSWORD UPDATE WENT WELL")
     }).catch((error) => {
       // An error ocurred
       console.log("PASSWORD UPDATE FAILED HORRIBLY!")
     });

    
     db.collection('users')
     .doc(groupData.uid)
     .update({
      companySize:groupData.companySize,
      profileImage:url,
      password:groupData.newPassword
     }).then(()=>{
        notifySuccessFxn("data updated successfully")
     }).catch((error)=>{
      notifyErrorFxn("Error updating data,please try again!")
     })

   }).catch(()=>{
    notifyErrorFxn("Please try updating your password again...")
   })

        
          }

  
     if(!groupData.newPassword){
    db.collection('users')
  .doc(groupData.uid)
  .update({
   companySize:groupData.companySize,
   profileImage:url,
   
  }).then(()=>{
     notifySuccessFxn("data updated successfully")
  }).catch((error)=>{
   notifyErrorFxn("Error updating data,please try again!")
  })

  }
        });
    }
  );

} 

if(file.length === 0 && !groupData.newPassword){
   // WE HAVE NO IMAGE AND NO NEW PASSWORD
   db.collection('users')
   .doc(groupData.uid)
   .update({
    companySize:groupData.companySize
   }).then(()=>{
      notifySuccessFxn("data updated successfully")
   }).catch((error)=>{
    notifyErrorFxn("Error updating data,please try again!")
   })

}


if(file.length === 0 && groupData.newPassword){
  // WE HAVE NO IMAGE BUT A NEW PASSWORD
  
  //UPDATING THE PASSWORD
  fb.auth().signInWithEmailAndPassword(groupData.email, groupData.password)
  .then((userCredential) => {
    // Signed in
    const user = fb.auth().currentUser;

    user.updatePassword(groupData.newPassword).then(() => {
      // Update successful.
      console.log("PASSWORD UPDATE WENT WELL")
    }).catch((error) => {
      // An error ocurred
      console.log("PASSWORD UPDATE FAILED HORRIBLY!")
    });
   
    //UPDATING USER INFORMATION
  db.collection('users')
  .doc(groupData.uid)
  .update({
   companySize:groupData.companySize,
   password:groupData.newPassword
  }).then(()=>{
     notifySuccessFxn("data updated successfully")
  }).catch((error)=>{
   notifyErrorFxn("Error updating data,please try again!")
  })
  }).catch(()=>{
   notifyErrorFxn("Please try updating your password again...")
  })
  
 

}






}

export const fetchMyGroups = (coolers) => async (dispatch) => {
  console.log("Clicked...");
  dispatch(isItLoading(true));
  if (coolers.length) {
    const chunkSize = 10;
    const chunks = coolers.reduce((acc, _, i) => (i % chunkSize ? acc : [...acc, coolers.slice(i, i + chunkSize)]), []);
    const promises = chunks.map((chunk) => {
      return db
        .collection("groups")
        .where("groupId", "in", chunk)
        .get()
        .then((snapshot) => snapshot.docs.map((doc) => ({ ...doc.data() })));
    });
    Promise.all(promises)
      .then((results) => {
        const myGroups = results.flat();
        console.log("My Groups Data:", myGroups);
        dispatch(saveMyGroup(myGroups));
        dispatch(isItLoading(false));
      })
      .catch((error) => {
        console.log("Error getting document:", error);
        dispatch(isItLoading(false));
      });
  } else {
    dispatch(saveMyGroup(coolers));
    dispatch(isItLoading(false));
  }
};


// export const fetchMyGroups = (coolers) => async (dispatch) => {
//   console.log("Cilcked...")
//   dispatch(isItLoading(true));
//     if(coolers.length){
//       db.collection("groups")
//       . where('groupId', 'in', coolers)
//        .get()
//        .then((snapshot) => {
//         const myGroups = snapshot.docs.map((doc) => ({ ...doc.data() }));
//         console.log("DATA::: ", myGroups);
//         // return
//       if (myGroups.length) {
//         dispatch(isItLoading(false));
//         console.log("My Groups Data:", myGroups);
//         dispatch(saveMyGroup(myGroups));
//       } else {
//           dispatch(isItLoading(false));
//       }
//      }).catch((error) => {
//        console.log("Error getting document:", error);
//        dispatch(isItLoading(false));
//      });
//     }else{
//       dispatch(saveMyGroup(coolers));
//       dispatch(isItLoading(false));
//     }
//  };


export const fetchGroups = (adminID) => async (dispatch) => {
  dispatch(isItLoading(true));
  db.collection("groups")
  .where('admin', '==', adminID)
   .get()
   .then((snapshot) => {
     const allGroups = snapshot.docs.map((doc) => ({ ...doc.data() }));
   if (allGroups.length > 0) {
     dispatch(isItLoading(false));
     console.log("All Groups Data:", allGroups);
     dispatch(saveAllGroup(allGroups));
   } else {
       dispatch(isItLoading(false));
       dispatch(saveAllGroup(allGroups));
       console.log("No groups!");
   }
 }).catch((error) => {
   console.log("Error getting document:", error);
   dispatch(isItLoading(false));
 });
 };


 export const fetchVideoSection = (chosenSection)=> async(dispatch) =>{

  //dispatch(isItLoading(true));
  db.collection("sections")
  .where('category', '==', chosenSection)
   .get()
   .then((snapshot) => {
     const allSectionVids = snapshot.docs.map((doc) => ({ ...doc.data() }));
     const sortFunction = (array)=>{
      if (array.length){
        return  array.sort((a,b)=>(a.subLevel - b.subLevel))
       }else{
        return []
       }
     }
     
     const sortedSectionVids = sortFunction(allSectionVids)


   if (allSectionVids.length > 0) {
     //dispatch(isItLoading(false));
     console.log("ALL sections FROM DATABASE(FOR THIS CATEGORY):", sortedSectionVids);
     dispatch(saveCategoryVideos(sortedSectionVids));
   } else {
      // dispatch(isItLoading(false));
      dispatch(saveCategoryVideos(sortedSectionVids));
       console.log("No sections for this category!");
   }
 }).catch((error) => {
   console.log("Error getting document:", error);
   dispatch(isItLoading(false));
 });
 };




 export const fetchSubjectChapters = (chosenSection)=> async(dispatch) =>{

  //dispatch(isItLoading(true));
  db.collection("chapters")
  .where('sectionId', '==', chosenSection)
   .get()
   .then((snapshot) => {
     const allSectionChapters = snapshot.docs.map((doc) => ({ ...doc.data() }));
     const sortFunction = (array)=>{
      if (array.length){
        return  array.sort((a,b)=>(Number(a.title.substring(7,8)) - Number(b.title.substring(7,8)) ))
       }else{
        return []
       }
     }
     
     const sortedSectionChapters = sortFunction(allSectionChapters)


   if (allSectionChapters.length > 0) {
     //dispatch(isItLoading(false));
     console.log("ALL sections FROM DATABASE(FOR THIS CATEGORY):", sortedSectionChapters);
     dispatch(saveCategoryChapters(sortedSectionChapters));
   } else {
      // dispatch(isItLoading(false));
      dispatch(saveCategoryChapters(sortedSectionChapters));
       console.log("No sections for this category!");
   }
 }).catch((error) => {
   console.log("Error getting document:", error);
   dispatch(isItLoading(false));
 });
 };





 export const fetchChapterSessions = (chosenChapter)=> async(dispatch) =>{

  //dispatch(isItLoading(true));
  db.collection("boneCourses")
  .where('chapterId', '==', chosenChapter)
   .get()
   .then((snapshot) => {
     const allChapterSessions = snapshot.docs.map((doc) => ({ ...doc.data() }));
     const sortFunction = (array)=>{
      if (array.length){
       
        return  array.sort((a,b)=>(Number(a.title.substring(8,9)) - Number(b.title.substring(8,9))   ))
       }else{
        return []
       }
     }
     
     const sortedChapterSessions = sortFunction(allChapterSessions)


   if (allChapterSessions.length > 0) {
     //dispatch(isItLoading(false));
     console.log("ALL sessions FROM DATABASE(FOR THIS CHAPTER):", sortedChapterSessions);
     dispatch(saveChapterSessions(sortedChapterSessions));
   } else {
      // dispatch(isItLoading(false));
      dispatch(saveChapterSessions(sortedChapterSessions));
       console.log("No sections for this category!");
   }
 }).catch((error) => {
   console.log("Error getting document:", error);
   dispatch(isItLoading(false));
 });
 };




 export const fetchVideoSubsection = (chosenSection)=> async(dispatch) =>{

  //dispatch(isItLoading(true));
  db.collection("courses")
  .where('subSection', '==', chosenSection)
   .get()
   .then((snapshot) => {
     const allSectionVids = snapshot.docs.map((doc) => ({ ...doc.data() }));

     const sortFunction = (array)=>{
      if (array.length){
        return  array.sort((a,b)=>(Number(a.levelInfo.underSubSection.replace(".","")) - Number(b.levelInfo.underSubSection.replace(".","")) ))
       }else{
        return []
       }
     }
     
     const sortedSectionVids = sortFunction(allSectionVids)


   if (sortedSectionVids.length > 0) {
     //dispatch(isItLoading(false));
     console.log("SORTED FROM DATABASE:", sortedSectionVids);
     dispatch(saveSectionVideos(sortedSectionVids));
   } else {
      // dispatch(isItLoading(false));
      dispatch(saveSectionVideos(sortedSectionVids));
       console.log("No groups!");
   }
 }).catch((error) => {
   console.log("Error getting document:", error);
   dispatch(isItLoading(false));
 });
 };

 export const fetchSubjectInfo = (uid) =>async (dispatch) => {
  db.collection("sections").doc(uid).get().then((doc) => {
  console.log()
  
    dispatch(saveSubjectInfo(doc.data()))
 }).catch((error) => {
  console.log("Error fetching a particular subject from sections collection:", error);

});
};

export const fetchChapterInfo = (uid) =>async (dispatch) => {
  db.collection("chapters").doc(uid).get().then((doc) => {
  console.log("FRESHLY FETCHED FROM CHAPTERZ",doc.data())
  
    dispatch(saveChapterInfo(doc.data()))
 }).catch((error) => {
  console.log("Error fetching a particular subject from sections collection:", error);

});
};

export const fetchLessonInfo = (uid) =>async (dispatch) => {
  db.collection("boneCourses").doc(uid).get().then((doc) => {
  console.log()
  
    dispatch(saveLessonInfo(doc.data()))
 }).catch((error) => {
  console.log("Error fetching a particular subject from sections collection:", error);

});
};


 export const updateSubjectNow = (uid,updateObject) => async (dispatch) => {
 
  db.collection("sections").doc(uid).update({
      body:updateObject.body,
      category:updateObject.category,
      title:updateObject.title,
      subLevel:updateObject.level,
      instructor:updateObject.instructor
      
    }).then((snapshot) => {
    
     notifySuccessFxn("updated successfully")

 }).catch((error) => {
   console.log("Error updating document:", error);
   notifyErrorFxn(error)


 });



 };


 export const addSubject = (addObject) => async (dispatch) => {


  db.collection("sections")
  .where("title", "==", addObject.title)
  .where("category", "==", addObject.category)
  .get()
  .then((snapshot) => {
    const existingSubject = snapshot.docs.map((doc) => ({ ...doc.data() }));
  if (existingSubject.length) {
   
    notifyErrorFxn(`This subject already exists,consider changing the subject name`)

  } else {
     
    
    db.collection("sections").add(
      {
        body:addObject.body,
        category:addObject.category,
        title:addObject.title,
        subLevel:addObject.level,
        categoryId:addObject.categoryId,
        instructor:addObject.instructor
      }
    ).then((doc) => {
       //const publicGroups = snapshot.docs.map((doc) => ({ ...doc.data() }));
       db.collection("sections").doc(doc.id).update({
      uid:doc.id
       })
  
      console.log("the documents id is",doc.id)
       notifySuccessFxn(`new subject ${addObject.title} added!`)
  
   }).catch((error) => {
     console.log("Error adding subject:", error);
     notifyErrorFxn(error)
  
  
   });





  }
}).catch((error) => {
  console.log("Error adding subject:", error);
  notifyErrorFxn(error)


});

 };




 export const updateSubject = (uid,updateObject) => async (dispatch) => {
  console.log("I have reached the subject again land")
  db.collection("sections").doc(uid).update(
    {
      body:updateObject.body,
      category:updateObject.category,
      title:updateObject.title,
      subLevel:updateObject.subLevel,
      uid:uid
    }
  ).then((snapshot) => {
     //const publicGroups = snapshot.docs.map((doc) => ({ ...doc.data() }));
   
     notifySuccessFxn("updated successfully")

 }).catch((error) => {
   console.log("Error updating document:", error);
   notifyErrorFxn(error)


 });
 };

 


 export const addChapter = (addObject) => async (dispatch) => {


  db.collection("chapters")
  .where("title", "==", addObject.title)
  .where("category", "==", addObject.category)
  .where("subject", "==", addObject.subject)
  .get()
  .then((snapshot) => {
    const existingSubject = snapshot.docs.map((doc) => ({ ...doc.data() }));
  if (existingSubject.length) {
   
    notifyErrorFxn(`This chapter already exists,consider changing the chapter name`)

  } else {
     
    
    db.collection("chapters").add(
      {
        body:addObject.body,
        category:addObject.category,
        title:addObject.title,
        sectionId:addObject.sectionId,
        subject:addObject.subject,
        chapterNumber:addObject.chapterNumber
      }
    ).then((doc) => {
       //const publicGroups = snapshot.docs.map((doc) => ({ ...doc.data() }));
       db.collection("chapters").doc(doc.id).update({
      uid:doc.id
       })
  
      console.log("the documents id is",doc.id)
       notifySuccessFxn(`new chapter ${addObject.title} added!`)
  
   }).catch((error) => {
     console.log("Error adding chapter:", error);
     notifyErrorFxn(error)
  
  
   });





  }
}).catch((error) => {
  console.log("Error adding chapter:", error);
  notifyErrorFxn(error)


});

 };

 export const updateChapter = (uid,updateObject) => async (dispatch) => {
  console.log("I have reached the chapter land")
  db.collection("chapters").doc(uid).update(
    {
      
      category:updateObject.category,
      title:updateObject.title,
      subject:updateObject.subject,
      chapterNumber:updateObject.chapterNumber
    
    }
  ).then((snapshot) => {
     //const publicGroups = snapshot.docs.map((doc) => ({ ...doc.data() }));
   
     notifySuccessFxn("updated successfully")

 }).catch((error) => {
   console.log("Error updating document:", error);
   notifyErrorFxn("Problem Updating subject, please try again")


 });
 };


 export const updateLesson = (uid,updateObject) => async (dispatch) => {
 
  db.collection("boneCourses").doc(uid).update(
    {
     
      lessonUrl:updateObject.lessonUrl,
      title:updateObject.title,
      section:updateObject.section,
      duration:updateObject.duration,
      body:updateObject.body,
      lessonNumber:updateObject.lessonNumber
    
    }
  ).then((snapshot) => {
     //const publicGroups = snapshot.docs.map((doc) => ({ ...doc.data() }));
     
     notifySuccessFxn("updated successfully")

 }).catch((error) => {
   console.log("Error updating document:", error);
   notifyErrorFxn("Problem Updating subject, please try again")


 });
 };


 export const addLesson = (addObject) => async (dispatch) => {


  db.collection("boneCourses")
  .where("title", "==", addObject.title)
  .where("category", "==", addObject.category)
  .where("section", "==", addObject.subject)
  .get()
  .then((snapshot) => {
    const existingLesson = snapshot.docs.map((doc) => ({ ...doc.data() }));
  if (existingLesson.length) {
   
    notifyErrorFxn(`This lesson already exists,consider changing the lesson name`)

  } else {
     
    
    db.collection("boneCourses").add(
      {
        body:addObject.body,
        category:addObject.category,
        title:addObject.title,
        chapterId:addObject.chapterId,
        duration:addObject.duration,
        section:addObject.subject,
        lessonUrl:addObject.lessonUrl,
        lessonNumber:addObject.lessonNumber
      }
    ).then((doc) => {
       //const publicGroups = snapshot.docs.map((doc) => ({ ...doc.data() }));
       db.collection("boneCourses").doc(doc.id).update({
      uid:doc.id
       })
  
      console.log("the documents id is",doc.id)
       notifySuccessFxn(`new lesson ${addObject.title} added!`)
  
   }).catch((error) => {
     console.log("Error adding lesson:", error);
     notifyErrorFxn(error)
  
  
   });





  }
}).catch((error) => {
  console.log("Error adding chapter:", error);
  notifyErrorFxn(error)


});

 };

 

export const fetchPublicGroup = () => async (dispatch) => {
 dispatch(isItLoading(true));
 db.collection("groups")
  .where("status", "==", "public")
  .get()
  .then((snapshot) => {
    const publicGroups = snapshot.docs.map((doc) => ({ ...doc.data() }));
  if (publicGroups.length) {
    dispatch(isItLoading(false));
    console.log("Public Groups Data:", publicGroups);
    dispatch(savePublicGroup(publicGroups));
  } else {
      dispatch(isItLoading(false));
      console.log("No public groups!");
  }
}).catch((error) => {
  console.log("Error getting document:", error);
  dispatch(isItLoading(false));
});
};

export const fetchPrivateGroup = () => async (dispatch) => {
    dispatch(isItLoading(true));
    db.collection("groups")
     .where("status", "==", "private")
     .get()
     .then((snapshot) => {
       const privateGroups = snapshot.docs.map((doc) => ({ ...doc.data() }));
     if (privateGroups.length) {
       dispatch(isItLoading(false));
       console.log("Private Groups Data:", privateGroups);
       dispatch(savePrivateGroup(privateGroups));
     } else {
         dispatch(isItLoading(false));
         console.log("No private groups!");
     }
   }).catch((error) => {
     console.log("Error getting document:", error);
     dispatch(isItLoading(false));
   });
   };


   export const joinGroup = (groupID, user, today, navigate, userWalletBal, groupFee, groupBal, groupName, accruedBalance) => async (dispatch) => {
    let todaysDate = new Date().toISOString().slice(0, 10) //2018-08-03
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var today  = new Date();
    const date = today.toISOString();  

   
    let newUserBal = userWalletBal - groupFee;
    let newGroupBal = groupBal + groupFee;
    let newAccruedBal = accruedBalance + groupFee;
      // console.log("New Group Bal: ", newGroupBal);
    dispatch(isItLoading(true));
    let newMembers;
    var docRef = db.collection("groups").doc(groupID);
    docRef.get().then((doc) => {
    const data = doc.data();
    const members = data.members;
    newMembers = [...members, user.id];
}).then(() => {
  db.collection('groups')
  var userRef = db.collection("groups").doc(groupID);
  userRef.update({
    accountBalance: newGroupBal,
    members: [...newMembers],
  }).then((res) => {
    db.collection('employees')
    .doc(user.id)
    .update({
      walletBalance: newUserBal,
      accruedBalance: newAccruedBal,
      coolers: [...user?.coolers, groupID],
    })
   .then(() => {
    db.collection('groups').doc(groupID).collection('membersCollection').add({
      memberName: user.firstName + " " + user.lastName,
      memberEmail: user.email,
      memberImageUrl: "",
      invitedBy: user.id,
      invite: 0,
      paid: 1,
      users: user.id,
      sentAt: today,
    }).then((resp) => {
      console.log("membersCollection RESPONSE: ", resp);
      db.collection('groups').doc(groupID).collection('membersCollection').doc(resp.id).update({
        id: resp.id,
      }).then(() => {
        return db.collection('inbox')
          .add({
              id: user.id,
              msg: `You have joined ${groupName}`,
              coolerName: groupName,
              amount: groupFee,
              isViewed: false,
              unread: 0,
              time: date,
          })
      }).then(() => {
        return db.collection('transactions')
          .add({
              userID: user.id,
              coolerID: groupID,
              type: 'Payment',
              amount: groupFee,
              date: todaysDate,
              createdAt: today.toLocaleDateString("en-US", options),
          })
      })
  }).then(() => {
    dispatch(isItLoading(false));
    notifySuccessFxn("Joined Group")
    // window.location = '/dashboard/home';
    navigate('/dashboard/home', { replace: true });
    }).catch((error) => {
    console.log("Error joining group:", error);
    var errorMessage = error.message;
    notifyErrorFxn(errorMessage)
    dispatch(isItLoading(false));
  });
   }) 
   })
})
 };
//    export const joinGroup = (groupID, user, today, navigate, userBal, groupFee) => async (dispatch) => {
//     dispatch(isItLoading(true));
//     let newMembers;
//     var docRef = db.collection("groups").doc(groupID);
//     docRef.get().then((doc) => {
//     const data = doc.data();
//     const members = data.members;
//     newMembers = [...members, user.id];
// }).then(() => {
//   db.collection('groups')
//   var userRef = db.collection("groups").doc(groupID);
//   userRef.update({
//     members: [...newMembers],
//   }).then((res) => {
//     db.collection('employees')
//     .doc(user.id)
//     .update({
//       coolers: [...user?.coolers, groupID],
//     })
//    .then(() => {
//     db.collection('groups').doc(groupID).collection('membersCollection').add({
//       memberName: user.firstName + " " + user.lastName,
//       memberEmail: user.email,
//       memberImageUrl: "",
//       invitedBy: user.id,
//       invite: 0,
//       paid: 1,
//       users: user.id,
//       sentAt: today,
//     }).then((resp) => {
//       console.log("membersCollection RESPONSE: ", resp);
//       db.collection('groups').doc(groupID).collection('membersCollection').doc(resp.id).update({
//         id: resp.id,
//       })
//   }).then(() => {
//     dispatch(isItLoading(false));
//     notifySuccessFxn("Joined Group")
//     navigate('/dashboard/home', { replace: true });
//     }).catch((error) => {
//     console.log("Error joining group:", error);
//     var errorMessage = error.message;
//     notifyErrorFxn(errorMessage)
//     dispatch(isItLoading(false));
//   });
//    })
      
//    })
// })
//  };


export const joinPublicGroup = (groupID, user, today, navigate) => async (dispatch) => {
    dispatch(isItLoading(true));
    let newMembers;
    var docRef = db.collection("groups").doc(groupID);
    docRef.get().then((doc) => {
    const data = doc.data();
    const members = data.members;
    newMembers = [...members, user.id];
}).then(() => {
  db.collection('groups')
  var userRef = db.collection("groups").doc(groupID);
  userRef.update({
    members: [...newMembers],
  }).then((res) => {
    db.collection('groups').doc(groupID).collection('membersCollection').add({
      memberName: user.firstName + " " + user.lastName,
      memberEmail: user.email,
      memberImageUrl: user.imageUrl,
      invitedBy: user.id,
      invite: 0,
      paid: 1,
      users: [user.id, user.id],
      sentAt: today,
    }).then((resp) => {
      console.log("membersCollection RESPONSE: ", resp);
      db.collection('groups').doc(groupID).collection('membersCollection').doc(resp.id).update({
        id: resp.id,
      })
  }).then(() => {
    dispatch(isItLoading(false));
    notifySuccessFxn("Joined Group")
    navigate('/dashboard/home', { replace: true });
    }).catch((error) => {
    console.log("Error joining group:", error);
    var errorMessage = error.message;
    notifyErrorFxn(errorMessage)
    dispatch(isItLoading(false));
  });
   })
})
 };

 
export const joinPrivateGroup = (groupID, user, today, navigate) => async (dispatch) => {
  dispatch(isItLoading(true));
  let newMembers;
  var docRef = db.collection("groups").doc(groupID);
  docRef.get().then((doc) => {
  const data = doc.data();
  const members = data.members;
  newMembers = [...members, user.id];
}).then(() => {
db.collection('groups')
var userRef = db.collection("groups").doc(groupID);
userRef.update({
  members: [...newMembers],
}).then((res) => {
  db.collection('groups').doc(groupID).collection('membersCollection').add({
    memberName: user.firstName + " " + user.lastName,
    memberEmail: user.email,
    memberImageUrl: user.imageUrl,
    invitedBy: user.id,
    invite: 0,
    paid: 1,
    users: [user.id, user.id],
    sentAt: today,
  }).then((resp) => {
    console.log("membersCollection RESPONSE: ", resp);
    db.collection('groups').doc(groupID).collection('membersCollection').doc(resp.id).update({
      id: resp.id,
    })
}).then(() => {
  dispatch(isItLoading(false));
  notifySuccessFxn("Joined Group")
  navigate('/dashboard/home', { replace: true });
  }).catch((error) => {
  console.log("Error joining group:", error);
  var errorMessage = error.message;
  notifyErrorFxn(errorMessage)
  dispatch(isItLoading(false));
});
 })
})
};


export const fetchGroupMembers = (groupMembers) => async (dispatch) => {
  dispatch(isItLoading(true));
  db.collection('employees')
    .where('id', 'in', groupMembers)
    .get()
    .then((snapshot) => {
      const groupMembers = snapshot.docs.map((doc) => ({ ...doc.data() }));
      if (groupMembers.length) {
        dispatch(isItLoading(false));
        console.log('groupMembers Data:', groupMembers);
        dispatch(saveGroupMembers(groupMembers));
      } else {
        dispatch(isItLoading(false));
        console.log('No group members!');
      }
    })
    .catch((error) => {
      console.log('Error getting document:', error);
      dispatch(isItLoading(false));
    });
};

/*========== do group fetching of categories HERE ======================= */

export const fetchAllCategories = () => async (dispatch) => {
  var categories = db.collection("categories");
  categories.get().then((snapshot) => {
    const groupMembers = snapshot.docs.map((doc) => ({ ...doc.data() }));
    console.log("ALL CATEGORIES ARE:",groupMembers)
    if (groupMembers.length) {
    dispatch(saveCategories(groupMembers));
  } else {
      console.log("No categories in database!");
  }
}).catch((error) => {
  console.log("Error getting categories:", error);
});
//return user;
};


/*===============do fetching of categories ABOVE ===================== */


/*===============Add to video watchlist and user watchlict BELOW ===================== */


export const updateVideoAndUserWatchlists = (userId,videoId) => async (dispatch) => {
  console.log('about to add title',videoId.trim())


  db.collection("courses").doc(videoId.trim()).update({
    watched:firebase.firestore.FieldValue.arrayUnion(userId)
  }).then((docRef) => {
    console.log(" course Document updated is: ", docRef);
    
    //dispatch(fetchWatchListData)
    //dispatch(playlistUpdate(true));
  })
  .catch((error) => {
    console.error("Error adding USER to  VIDEO watch List: ", error);
    notifyErrorFxn("Error adding USER to  VIDEO watch List: ")
    
  });





  
  db.collection("users").doc(userId).update({
  watched:firebase.firestore.FieldValue.arrayUnion(videoId),
  currentlyWatching:firebase.firestore.FieldValue.arrayUnion(videoId)
}).then((docRef) => {
  console.log("user Document updated is: ", docRef);
  
  //dispatch(fetchWatchListData)
  //dispatch(playlistUpdate(true));
})
.catch((error) => {
  console.error("Error adding video  to USER watch List: ", error);
  notifyErrorFxn("Error adding video  to USER watch List")
  
});




}

/*===============Add to video watchlist and user watchlict ABOVE ===================== */


export const fetchEmployeer = (id) => async (dispatch) => {
  var user = db.collection("employers").doc(id);
  user.get().then((doc) => {
  if (doc.exists) {
    dispatch(saveEmployeer(doc.data()));
  } else {
      console.log("No such document!");
  }
}).catch((error) => {
  console.log("Error getting document:", error);
});
return user;
};