import { uuidv4 } from "@firebase/util"
import { initializeApp } from "firebase/app"
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    getDocs,
    query,
    collection,
    where,
} from "firebase/firestore"
import { firebaseConfig } from "./config"

export const getUserRole = async (user) => {
    if (!user) return ""
    const app = initializeApp(firebaseConfig)
    const db = getFirestore(app)
    const docSnap = await getDoc(doc(db, "userInfo", user.uid))

    if (docSnap.exists()) {
        return docSnap.data().role
    } else {
        return ""
    }
}

export const getFullName = async (user) => {
    if (!user) return ""
    const app = initializeApp(firebaseConfig)
    const db = getFirestore(app)
    const docSnap = await getDoc(doc(db, "userInfo", user.uid))

    if (docSnap.exists()) {
        return `${docSnap.data().firstname} ${docSnap.data().lastname}`
    } else {
        return ""
    }
}

export const getFullNameById = async (uid) => {
    if (!uid) return ""
    const app = initializeApp(firebaseConfig)
    const db = getFirestore(app)
    const docSnap = await getDoc(doc(db, "userInfo", uid))

    if (docSnap.exists()) {
        return `${docSnap.data().firstname} ${docSnap.data().lastname}`
    } else {
        return ""
    }
}

export const getPhoneNumber = async (uid) => {
    if (!uid) return ""
    const app = initializeApp(firebaseConfig)
    const db = getFirestore(app)
    const docSnap = await getDoc(doc(db, "userInfo", uid))

    if (docSnap.exists()) {
        return `${docSnap.data().phone}`
    } else {
        return ""
    }
}

export const getAppointmentsBy = async (uid) => {
    if (!uid) return []
    const app = initializeApp(firebaseConfig)
    const db = getFirestore(app)
    const q = query(collection(db, "appointments"), where("uid", "==", uid))
    const querySnapshot = await getDocs(q)
    return Array.from(querySnapshot.docs)
        .map((doc) => doc.data())
        .filter((value) => JSON.stringify(value) !== "{}")
}

export const getAppointmentsFor = async (uid) => {
    if (!uid) return []
    const app = initializeApp(firebaseConfig)
    const db = getFirestore(app)
    const q = query(collection(db, "appointments"))
    const querySnapshot = await getDocs(q)
    // inefficient, find out faster way
    return Array.from(querySnapshot.docs)
        .map((doc) => doc.data())
        .filter((value) => JSON.stringify(value) !== "{}")
        .filter((apt) => apt.submission.uid === uid)
}

export const getAllSubmissions = async () => {
    const app = initializeApp(firebaseConfig)
    const db = getFirestore(app)
    const q = query(collection(db, "submissions"))
    const querySnapshot = await getDocs(q)
    return Array.from(querySnapshot.docs).map((doc) => doc.data())
}

export const getSubmissions = async (user) => {
    if (!user) return {}
    const app = initializeApp(firebaseConfig)
    const db = getFirestore(app)
    const q = query(collection(db, "submissions"), where("uid", "==", user.uid))
    const querySnapshot = await getDocs(q)
    return Array.from(querySnapshot.docs)
}

export const getNextApt = async (uid) => {
    const apts = await getAppointmentsFor(uid)
    if (apts.length !== 0) {
        const apt = apts.reduce((a, b) =>
            new Date(a.date) > new Date(b.date) ? a : b
        )
        return apt
    }
}

export const textTo = async (phone, msg) => {
    await fetch(`http://localhost:8080/text?phone=${phone}&msg=${msg}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            phone,
            msg,
        }),
    })
}
