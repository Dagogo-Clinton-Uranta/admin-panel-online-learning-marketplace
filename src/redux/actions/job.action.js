import { db } from "../../config/firebase";
import { fetchJobs,fetchTeachers,fetchCourses, fetchSingleJob,fetchSingleStudent,saveUserCourses,saveAllLessonsOneStudent,saveAllQuizzesOneStudent } from "../reducers/job.slice";
import { useDispatch, useSelector } from "react-redux";
import { notifyErrorFxn, notifySuccessFxn } from 'src/utils/toast-fxn';

export const getJobs = (uid) => async (dispatch) => {
    db.collection('users').get().then((snapshot) => {
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

export const deleteCourse = (id, navigate) => async (dispatch) => {
    // try {
    //     const coursesRef = db.collection('sections');
    //     const query = coursesRef.where('uid', '==', id);
    //     const querySnapshot = await query.get();

    //     console.log("Vcourses", querySnapshot);

    //     const courses = [];
    //     querySnapshot.forEach((doc) => {
    //         if (doc.exists) {
    //             const courseData = doc.data();
    //             courses.push(courseData);
    //         }
    //     });


    //     console.log("courses", courses);
    // } catch (error) {
    //     console.error('Error getting documents: ', error);
    //     return [];
    // }
    const docRef = db.collection('sections').doc(id);

    try {
        await docRef.delete();
        console.log('Document successfully deleted', docRef);
        notifySuccessFxn('Course deleted successfully.✔');
        navigate('/dashboard/home');
    } catch (error) {
        console.error('Error deleting document: ', error);
        notifyErrorFxn('Error deleting course.❌');
    }
}




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


export const getSingleStudent = (id) => async (dispatch) => {
    var job = db.collection("users").doc(id);

    job.get().then((doc) => {
    if (doc.exists) {
        

        dispatch(fetchSingleStudent(doc.data()));

        if(doc.data().lessonsWatched ){
            let allLessonsOneStudent = []
            doc.data().lessonsWatched.forEach((element) => {
              var oneLesson  = db.collection("boneCourses").doc(element.lessonId);
             
              oneLesson.get().then((shrew) => {allLessonsOneStudent = [...allLessonsOneStudent,shrew.data()]})
              
          })
          console.log("what i am fetching for  LESSONS is",allLessonsOneStudent )
          
          setTimeout(()=>{
          if(allLessonsOneStudent.length > 0){
          dispatch(saveAllLessonsOneStudent(allLessonsOneStudent));console.log("ALL LESSONS ONE STUDENT", allLessonsOneStudent)
          }else{
            dispatch(saveAllLessonsOneStudent([ ]));console.log("ALL LESSONS  ONE STUDENT", allLessonsOneStudent)
          }
        }
        ,2000)


        }else{
            dispatch(saveAllLessonsOneStudent([ ]))
        }



        if(doc.data().quizzesTaken){                 
              let allQuizzesOneStudent = []
              doc.data().quizzesTaken.forEach((element) => {
                var oneQuiz  = db.collection("quizzes").doc(element.quizId);
               
                oneQuiz.get().then((shrew) => {allQuizzesOneStudent = [...allQuizzesOneStudent,shrew.data()]})
                
            })
            console.log("what i am fetching for quizzes is",allQuizzesOneStudent )
            
            setTimeout(()=>{
               
            if(allQuizzesOneStudent.length > 0){
           dispatch(saveAllQuizzesOneStudent(allQuizzesOneStudent));console.log("ALL QUIZZES  ONE STUDENT", allQuizzesOneStudent)
            }else{
               dispatch(saveAllQuizzesOneStudent([ ]));console.log("ALL QUIZZES ONE STUDENT", allQuizzesOneStudent)
            }

              }
            ,1000)
        }else{
            dispatch(saveAllQuizzesOneStudent([ ]))
        }

        
    } else {
        console.log("No such student!");
    }
}).catch((error) => {
    console.log("Error getting the student data:", error);
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