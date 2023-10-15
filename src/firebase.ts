import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import {
  getFirestore,
  setDoc,
  doc,
  Bytes,
  addDoc,
  getDoc,
  getDocs,
  collection,
} from "firebase/firestore";
import type { User } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyDGQAEVRuBrFKvDfEH9AzwWv6LiThhx9VU",
  authDomain: "create-a-community-d1d7b.firebaseapp.com",
  projectId: "create-a-community-d1d7b",
  storageBucket: "create-a-community-d1d7b.appspot.com",
  messagingSenderId: "468415496209",
  appId: "1:468415496209:web:1e3f7c41d62f14310031b0",
  measurementId: "G-M76ZB6P701",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

type status = {
  success: boolean;
  message: string;
};

export const signUp = (form: any): Promise<status> => {
  return createUserWithEmailAndPassword(auth, form.username, form.password)
    .then((userCredential) => {
      const user = userCredential.user;
      return {
        success: true,
        message: "User has been created successfully!",
      };
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      return {
        success: false,
        message: errorMessage,
      };
    });
};

export const logIn = (form: any): Promise<status> => {
  return signInWithEmailAndPassword(auth, form.username, form.password)
    .then((userCredential) => {
      const user = userCredential.user;
      return {
        success: true,
        message: "User has been created successfully!",
      };
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      return {
        success: false,
        message: errorMessage,
      };
    });
};

export const logInGoogle = (): Promise<status> => {
  return signInWithPopup(auth, new GoogleAuthProvider())
    .then((userCredential) => {
      const user = userCredential.user;
      return {
        success: true,
        message: "User has been created successfully!",
      };
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      return {
        success: false,
        message: errorMessage,
      };
    });
};

export const addProfile = async (form: any): Promise<status> => {
  // adds a new document with the name, profile picture, instagram handle,
  // community, room number, and description
  const bytes = Bytes.fromUint8Array(
    new Uint8Array(await form.profilePicture.file.originFileObj.arrayBuffer())
  );
  try {
    await setDoc(doc(db, "users", auth.currentUser!.uid), {
      name: form.name,
      profilePicture: bytes,
      profilePictureType: form.profilePicture.file.type,
      instagramHandle: form.instagramHandle ?? "",
      community: form.community,
      roomNumber: form.roomNumber,
      description: form.description,
    });
    const docRef = doc(
      db,
      "communities",
      form.community.toString(),
      "floors",
      form.floorNumber.toString(),
      "rooms",
      form.roomNumber.toString()
    );
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      await Promise.all([
        setDoc(docRef, {
          requests: [],
        }),
        setDoc(doc(db, "communities", form.community.toString()), {
          name: form.community.toString(),
        }),
        setDoc(
          doc(db, "communities", form.community.toString(), "floors", form.floorNumber.toString()),
          {
            name: form.floorNumber.toString(),
          }
        )
      ]);
    }
    return {
      success: true,
      message: "Profile has been created successfully!",
    };
  } catch (e: any) {
    console.log(e);
    return {
      success: false,
      message: e.message,
    };
  }
};

export const userHasProfile = async (): Promise<boolean> => {
  if (auth.currentUser == null) {
    return false;
  }
  const docRef = doc(db, "users/" + auth.currentUser!.uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return true;
  } else {
    return false;
  }
};

export const getFloorsFromCommunity = async (
  community: string
): Promise<string[]> => {
  console.log(community);
  const docRef = collection(db, "communities", community, "floors");
  const querySnapshot = await getDocs(docRef);
  const docs: string[] = [];
  querySnapshot.forEach((doc) => {
    docs.push(doc.id);
    console.log(doc);
  });
  return docs;
};

type Room = {
  id: string;
  data: any;
};

export const getRoomsFromFloor = async (
  community: string,
  floor: string
): Promise<Room[]> => {
  const docRef = collection(
    db,
    "communities",
    community,
    "floors",
    floor,
    "rooms"
  );
  const querySnapshot = await getDocs(docRef);
  const docs: Room[] = [];
  querySnapshot.forEach((doc) => {
    docs.push({
      id: doc.id,
      data: doc.data(),
    });
  });
  return docs;
};

export const getUserInfo = async (user: User): Promise<any> => {
  const docRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const data = docSnap.data();
    console.log(data);
    return data;
  } else {
    return null;
  }
};

export const logout = async (): Promise<void> => {
  await auth.signOut();
}