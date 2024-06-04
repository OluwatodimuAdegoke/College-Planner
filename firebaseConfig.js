// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {
  addDoc,
  getFirestore,
  collection,
  onSnapshot,
  setDoc,
  doc,
  updateDoc,
  arrayUnion,
  getDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  and,
  orderBy,
  limit,
} from "firebase/firestore";

import {
  initializeAuth,
  getReactNativePersistence,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  deleteUser,
  updateEmail,
  updatePassword,
} from "firebase/auth";
import { Alert } from "react-native";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
  listAll,
  deleteObject,
} from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { firebaseConfig } from "./env";
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
const db = getFirestore(app);
const storage = getStorage(app);

const createUser = async ({ user, userName }) => {
  try {
    const idRef = doc(db, "users", user.uid);
    await setDoc(idRef, {
      username: userName,
      profile_picture: null,
    });
  } catch (error) {
    console.log("Error adding document: Creat User: ", error);
  }
};

const getUserDetail = async ({ setValue, type }) => {
  try {
    const user = auth.currentUser;
    if (!user) return;
    const termDoc = doc(db, "users", user.uid);
    const unsub = onSnapshot(termDoc, (snapshot) => {
      if (snapshot.exists()) {
        setValue(snapshot.data()[type]);
      } else {
        setValue("No " + type + " found");
        console.log("No data in the user profile");
      }
    });
    return () => unsub();
  } catch (error) {
    console.log("Error getting document: User Details: ", error);
  }
};

const setUserDetail = async ({ value }) => {
  try {
    const user = auth.currentUser;
    const userDoc = doc(db, "users", user.uid);
    await updateDoc(userDoc, value);
  } catch (error) {
    console.log("Error setting document: User Details:  ", error);
  }
};

const queryTask = async ({ setData, type }) => {
  try {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    const user = auth.currentUser;
    if (!user) return;
    const collectionRef = collection(db, "users", user.uid, type);

    const termDoc = doc(db, "users", user.uid);
    const termValue = await getDoc(termDoc);
    if (termValue.exists()) {
      const term = termValue.data()["currentTermId"];
      if (!term) {
        console.log("No term found");
        setData([]);
        return;
      }
      let q = 0;
      if (type == "tasks") {
        q = query(
          collectionRef,
          where("date", ">=", startOfToday),
          where("completed", "==", false),
          where("termId", "==", term),
          orderBy("date", "asc"),
          limit(5)
        );
      } else if (type == "assignments") {
        q = query(
          collectionRef,
          where("date", ">=", startOfToday),
          where("completed", "==", false),
          where("termId", "==", term),
          orderBy("date", "asc"),
          limit(3)
        );
      } else if (type == "courses") {
        const days = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];
        const day = days[startOfToday.getDay()];
        q = query(
          collectionRef,
          where("days", "array-contains", day),
          where("termId", "==", term),
          orderBy("startTime", "asc")
        );
      } else if (type == "exams") {
        q = query(
          collectionRef,
          where("date", ">=", startOfToday),
          where("termId", "==", term),
          orderBy("date", "asc"),
          limit(3)
        );
      } else {
        q = query(
          collectionRef,
          where("termId", "==", term),
          orderBy("date", "asc")
        );
      }

      const unsub = onSnapshot(q, (snapshot) => {
        if (!snapshot.empty) {
          const data = snapshot.docs.map((doc) => {
            let data = doc.data();
            data.id = doc.id;
            return data;
          });
          setData(data);
        } else {
          //Here
          setData([]);
          console.log("No tasks for today, Here");
        }
      });
      return () => unsub();
    } else {
      console.log("TODO: Add a term first");
    }
  } catch (error) {
    console.log("Error getting document: Query : ", error);
  }
};
// Getting individual course data
const loadCourse = async ({ setData, courseId }) => {
  try {
    const user = auth.currentUser;
    const courseDoc = doc(db, "users", user.uid, "courses", courseId);
    const unsub = onSnapshot(courseDoc, (snapshot) => {
      if (snapshot.exists()) {
        let data = snapshot.data();
        data.id = snapshot.id;
        setData(data);
      } else {
        console.log("No such course found!");
      }
    });
    return () => unsub();
  } catch (error) {
    console.log("Error getting document: For Course: ", error);
  }
};
// Load all data for a specific course
const loadByParent = async ({ setData, type, parentId, completed }) => {
  try {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const user = auth.currentUser;
    const collectionRef = collection(db, "users", user.uid, type);
    let q = 0;
    if (type === "assignments") {
      q = query(
        collectionRef,
        where("courseId", "==", parentId),
        where("completed", "==", completed),
        orderBy("date", "asc")
      );
    } else if (type === "studyHistory") {
      q = query(
        collectionRef,
        where("sessionId", "==", parentId),
        orderBy("date", "asc")
      );
    } else {
      q =
        completed === false
          ? query(
              collectionRef,
              where("courseId", "==", parentId),
              where("date", ">=", startOfToday),
              orderBy("date", "asc")
            )
          : query(
              collectionRef,
              where("courseId", "==", parentId),
              where("date", "<", startOfToday),
              orderBy("date", "asc")
            );
    }

    const unsub = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const data = snapshot.docs.map((doc) => {
          let data = doc.data();
          data.id = doc.id;
          return data;
        });
        setData(data);
      } else {
        //Here
        setData([]);
        console.log("No", type, " for today, Here");
      }
    });
    return () => unsub();
  } catch (error) {
    console.log("Error getting document: For Course: ", error);
  }
};
//Load all data for a specific type
const loadData = async ({ setData, type, completed }) => {
  const user = auth.currentUser;
  if (!user) return;
  try {
    const termDoc = doc(db, "users", user.uid);
    const termValue = await getDoc(termDoc);
    if (termValue.exists()) {
      const term = termValue.data()["currentTermId"];
      if (!term && type !== "terms") {
        console.log("No term found");
        return;
      }
      const idCollection = collection(db, "users", user.uid, type);
      let q = 0;
      if (type === "tasks" || type === "assignments") {
        q = query(
          idCollection,
          where("termId", "==", term),
          where("completed", "==", completed),
          orderBy("date", "asc")
        );
      } else {
        q =
          type === "terms"
            ? idCollection
            : query(
                idCollection,
                where("termId", "==", term),
                orderBy("date", "asc")
              );
      }

      const unsub = onSnapshot(q, (snapshot) => {
        if (!snapshot.empty) {
          const value = snapshot.docs.map((doc) => {
            let data = doc.data();
            data.id = doc.id;
            return data;
          });

          setData(value);
        } else {
          setData([]);
          console.log("No such document!");
        }
      });

      return () => unsub();
    } else {
      console.log("TODO: Add a term first");
    }
  } catch (error) {
    console.log("Error adding document: General Data", error);
  }
};

const addData = async ({ value, type }) => {
  const user = auth.currentUser;
  try {
    const idDoc = doc(
      db,
      "users",
      user.uid,
      type,
      String(new Date().getTime())
    );

    if (type !== "terms") {
      const termDoc = doc(db, "users", user.uid);
      const termValue = await getDoc(termDoc);
      if (termValue.exists()) {
        const temp = termValue.data()["currentTermId"];
        if (!temp) {
          Alert.alert("No Term", "Please add a term first");
          return;
        }
        value.termId = temp;
      } else {
        console.log("TODO: Add a term first");
      }
    }

    await setDoc(idDoc, value);
  } catch (error) {
    console.log("Error adding document: ", error);
  }
};

const deleteData = async ({ id, type }) => {
  try {
    const user = auth.currentUser;
    const docRef = doc(db, "users", user.uid, type, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.log("Error deleting document: ", error);
  }
};

const deleteByParent = async ({ id, type, parentField }) => {
  try {
    const user = auth.currentUser;
    const querySnapshot = await getDocs(
      query(
        collection(db, "users", user.uid, type),
        where(parentField, "==", id)
      )
    );
    querySnapshot.forEach(async (doc) => {
      await deleteData({ id: doc.id, type });
    });
  } catch (error) {
    console.log("Error deleting document: ", error);
  }
};

const deleteParent = async ({ id, type }) => {
  try {
    if (type === "courses") {
      await deleteByParent({
        id,
        type: "assignments",
        parentField: "courseId",
      });
      await deleteByParent({ id, type: "exams", parentField: "courseId" });
      await deleteData({ id, type: "courses" });
    } else if (type === "studySessions") {
      await deleteByParent({
        id,
        type: "studyHistory",
        parentField: "sessionId",
      });
      await deleteData({ id, type: "studySessions" });
    }
  } catch (error) {
    console.log("Error deleting course: ", error);
  }
};

const deleteTerm = async ({ id }) => {
  try {
    const user = auth.currentUser;

    const types = ["courses", "studySessions", "tasks"];

    const querySnapshot = await getDocs(
      query(
        collection(db, "users", user.uid, "courses"),
        where("termId", "==", id)
      )
    );
    querySnapshot.forEach(async (doc) => {
      await deleteParent({ id: doc.id, type: "courses" });
    });

    const querySnapshot2 = await getDocs(
      query(
        collection(db, "users", user.uid, "studySessions"),
        where("termId", "==", id)
      )
    );
    querySnapshot2.forEach(async (doc) => {
      await deleteParent({ id: doc.id, type: "studySessions" });
    });

    const querySnapshot3 = await getDocs(
      query(
        collection(db, "users", user.uid, "tasks"),
        where("termId", "==", id)
      )
    );
    querySnapshot3.forEach(async (doc) => {
      await deleteData({ id: doc.id, type: "tasks" });
    });

    await deleteData({ id, type: "terms" });
  } catch (error) {
    console.log("Error deleting term: ", error);
  }
};

const updateData = async ({ id, value, type }) => {
  try {
    const user = auth.currentUser;
    const docRef = doc(db, "users", user.uid, type, id);
    await updateDoc(docRef, value);
  } catch (error) {
    console.log("Error updating document", error);
  }
};

// Register a user
const registerUser = ({ email, password, cPassword, userName, navigator }) => {
  if (password != cPassword) {
    Alert.alert("Password Error", "Passwords do not match!");
  }
  // Check if userName has a value
  else if (!userName) {
    Alert.alert("Username Error", "Please enter a username!");
  } else {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        createUser({ user, userName });
      })

      .then(() => {
        loadImages();
        navigator.replace("Home");
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          Alert.alert("Email-In-Use", "That email address is already in use!", [
            {
              text: "Ok",
            },
            {
              text: "Login",
              onPress: () => navigator.navigate("Login"),
            },
          ]);
        } else if (error.code === "auth/invalid-email") {
          Alert.alert("Invalid Email", "That email address is invalid!");
        } else {
          console.log(error);
          Alert.alert(error.name, error.message);
        }
      });
  }
};

// Log in a User
const loginUser = ({ email, password, navigator }) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {})
    .then(() => {
      loadImages();
      navigator.replace("Home");
    })
    .catch((error) => {
      Alert.alert(error.title, error.message);
    });
};

// Logs Out a User
const logOutUser = ({ navigator }) => {
  auth
    .signOut()
    .then(() => {
      navigator.replace("Login");
    })
    .catch((error) => {
      Alert.alert(error.title, error.message);
    });
};

const deleteUserAndData = async ({ navigator }) => {
  // Get the user document reference
  try {
    const user = auth.currentUser;
    await deleteUser(user);
    const userDocRef = doc(db, "users", user.uid);
    const storageRef = ref(storage, `Media/${user.uid}/profile_picture`);
    await deleteObject(storageRef);
    // Define the subcollections to delete
    const subcollections = [
      "courses",
      "tasks",
      "terms",
      "studySessions",
      "exams",
      "assignments",
      "studyHistory",
    ];

    // Delete all documents in all subcollections of the user document
    for (const subcollection of subcollections) {
      const querySnapshot = await getDocs(
        collection(userDocRef, subcollection)
      );
      querySnapshot.forEach((doc) => {
        deleteDoc(doc.ref);
      });
    }

    // Delete the user document
    await deleteDoc(userDocRef);

    navigator.replace("Login");
  } catch (error) {
    console.log("Error deleting User ", error);
    if (error.code === "auth/requires-recent-login") {
      Alert.alert("Error", "Please log in again to delete your account");
    }
  }
};

// Automatically log in a user
const autoLogin = ({ navigator }) => {
  setTimeout(() => {
    auth.onAuthStateChanged((user) => {
      if (user != null) {
        navigator.replace("Home");
      } else {
        navigator.replace("Login");
      }
    });
  }, 1000);
};

const sendVerification = async () => {
  try {
    const user = auth.currentUser;
    await sendEmailVerification(user);
    Alert.alert("Verification Email Sent", "Check your email!");
  } catch (error) {
    Alert.alert(error.code, error.message);
  }
};

// Change the email of a user
const changeEmail = async ({ newEmail, navigator }) => {
  const user = auth.currentUser;
  try {
    await updateEmail(user, newEmail);
    // const data = { email: newEmail };
    // await setUserDetail({ value: data });
    Alert.alert("Email Updated", "Your email has been updated!");
  } catch (error) {
    if (error.code === "auth/requires-recent-login") {
      Alert.alert("Error", "Please log in again to change your email", [
        {
          text: "Ok",
        },
        {
          text: "Login",
          onPress: () => logOutUser({ navigator: navigator }),
        },
      ]);
    } else if (error.code === "auth/email-already-in-use") {
      Alert.alert("Email In Use", "That email is already in use!");
    } else if (error.code === "auth/invalid-email") {
      Alert.alert("Invalid Email", "That email is invalid!");
    } else if (error.code === "auth/operation-not-allowed") {
      Alert.alert("Email Verification", "Please verify your email first!");
    } else {
      Alert.alert(error.code, error.message);
    }
  }
};

// Send a password reset email
const forgotPassword = ({ email }) => {
  sendPasswordResetEmail(auth, email)
    .then(() => Alert.alert("Email Sent", "Check your Email!"))
    .catch((error) => Alert.alert(error.title, error.message));
};

const changePassword = async ({ newPassword }) => {
  const user = auth.currentUser;
  try {
    await updatePassword(user, newPassword);
    Alert.alert("Password Updated", "Your password has been updated!");
  } catch (error) {
    Alert.alert(error.code, error.message);
  }
};

const uploadImage = async ({ uri, name, setIsLoading }) => {
  const respone = await fetch(uri);
  const blob = await respone.blob();

  const user = auth.currentUser;
  const storageRef = ref(storage, `Media/${user.uid}/${name}`);
  const uploadTask = uploadBytesResumable(storageRef, blob);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setIsLoading(true);
    },
    (error) => {
      console.log(error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then(async (downloadUrl) => {
        const data = { profile_picture: downloadUrl };
        await setUserDetail({ value: data });
        Alert.alert("Image Uploaded", `Your ${name} has been updated`);
        setIsLoading(false);
      });
    }
  );
};

const loadImages = async () => {
  try {
    const storageRef = ref(storage, `Media/courses`);
    let data = [];
    await listAll(storageRef).then(async (res) => {
      const urlPromises = res.items.map((itemRef) => getDownloadURL(itemRef));
      data = await Promise.all(urlPromises);
    });
    await setCourseImages({ value: { imageUrl: data } });
  } catch (error) {
    console.log("Error loading image for courses: ", error);
  }
};

const getCourseImages = async ({ setValue }) => {
  try {
    // const user = auth.currentUser;
    // if (!user) return;
    const termDoc = doc(db, "Images", "courseImages");
    const unsub = onSnapshot(termDoc, (snapshot) => {
      if (snapshot.exists()) {
        setValue(snapshot.data()["imageUrl"]);
      } else {
        setValue("No " + type + " found");
        console.log("No data in the image profile");
      }
    });
    return () => unsub();
  } catch (error) {
    console.log("Error getting document: Course Images: ", error);
  }
};

const setCourseImages = async ({ value }) => {
  try {
    const userDoc = doc(db, "Images", "courseImages");
    await updateDoc(userDoc, value);
  } catch (error) {
    console.log("Error setting document: Course Images:  ", error);
  }
};
export {
  auth,
  getCourseImages,
  loadImages,
  loadCourse,
  uploadImage,
  registerUser,
  changeEmail,
  loginUser,
  sendVerification,
  changePassword,
  forgotPassword,
  logOutUser,
  autoLogin,
  addData,
  loadData,
  deleteData,
  updateData,
  getUserDetail,
  queryTask,
  loadByParent,
  setUserDetail,
  deleteParent,
  deleteTerm,
  deleteUserAndData,
};
