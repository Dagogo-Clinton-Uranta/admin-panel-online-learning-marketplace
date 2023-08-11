import { db } from "../../config/firebase";
import { fetchJobs,fetchTeachers,fetchCourses, fetchSingleJob,saveUserCourses } from "../reducers/job.slice";
import { useDispatch, useSelector } from "react-redux";

export const getJobs = (uid) => async (dispatch) => {
    db.collection('students').get().then((snapshot) => {
        const jobs = snapshot.docs.map((doc) => ({id: doc.id, ...doc.data() }));
        // console.log('Jobs: ', jobs);
        dispatch(fetchJobs(jobs));
}).catch((error) => {
        var errorMessage = error.message;
        console.log('Error fetching students', errorMessage);
});

};

export const getTeachers = ( ) => async (dispatch) => {
    db.collection('teachers').get().then((snapshot) => {
        const allTeachers = snapshot.docs.map((doc) => ({id: doc.id, ...doc.data() }));
        // console.log('Jobs: ', jobs);
        dispatch(fetchTeachers(allTeachers));
}).catch((error) => {
        var errorMessage = error.message;
        console.log('Error fetching teachers', errorMessage);
});

};


export const getCourses = ( ) => async (dispatch) => {
    db.collection('courses').get().then((snapshot) => {
        const jobs = snapshot.docs.map((doc) => ({id: doc.id, ...doc.data() }));
        // console.log('Jobs: ', jobs);
        dispatch(fetchCourses(jobs));
}).catch((error) => {
        var errorMessage = error.message;
        console.log('Error fetching courses', errorMessage);
});

};


export const getUserCourses = (uid) => async (dispatch) => {

    const { jobs } = useSelector((state) => state.jobs);
    console.log(" I GOT USERS FROM REDUX STATE",jobs)

    const chosenUser =jobs.length? jobs.filter((item)=>{return item.uid === uid}):[]
    console.log("chosenUser is now",chosenUser)
    const idArray = chosenUser.watched
   
     console.log("id Array is",idArray)
  

    const movie = db.collection('courses').where('uid', 'in', idArray);
    movie.get().then((snapshot) => {
      const courseList = snapshot.docs.map((doc) => ({ ...doc.data() }));
      console.log("courseList array is currenty: equal",courseList)
     
      if (courseList.length) {
      
    dispatch(saveUserCourses([...courseList]));  
    
      //window.alert(doc.data().url);
        
  
    } else {
        
        //notifyErrorFxn("no course for this user❌")
        console.log("No such courses taken for this document!");
    }
  }).catch((error) => {
    window.alert(error);
    console.log("Error getting document:", error);
  });

}



export const getSingleJob = (id) => async (dispatch) => {
    var job = db.collection("Jobs").doc(id);

    job.get().then((doc) => {
    if (doc.exists) {
        console.log("Document data:", doc.data());
        dispatch(fetchSingleJob(doc.data()));
    } else {
        console.log("No such document!");
    }
}).catch((error) => {
    console.log("Error getting document:", error);
});

};

export const addJob = (job, setLoading, clearState) => async (dispatch) => {
    db.collection("Jobs").add({
        title: job.title,
        description: job.description,
        location: job.location,
        rate: job.rate
    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        clearState();
        setLoading(false);
        alert('Job has been added.✔');
        
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
        alert('Error adding job.❌')
    });

};
export const updateJob = (job, setLoading, clearState, history) => async (dispatch) => {

    var jobRef = db.collection("Jobs").doc(job.id);
    const jobData = jobRef.update({
        title: job.title,
        description: job.description,
        location: job.location,
        rate: job.rate
    })
    .then(() => {
        setLoading(false);
        alert('Job has been updated.✔');
        history.push('/company/jobs');
        
    })
    .catch((error) => {
        console.error("Error updating document: ", error);
        // alert('Error updating job.❌')
        setLoading(false);
    });

};