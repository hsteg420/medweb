import * as React from "react"
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { firebaseConfig } from "../lib/config"

const FirebaseAuthContext = React.createContext()

const FirebaseAuthProvider = ({ children }) => {
    const app = initializeApp(firebaseConfig)
    const auth = getAuth(app)
    const [user, setUser] = React.useState(null)
    const value = { user }

    React.useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(setUser)
        return unsubscribe
    }, [])

    return (
        <FirebaseAuthContext.Provider value={value}>
            {children}
        </FirebaseAuthContext.Provider>
    )
}

function useFirebaseAuth() {
    const context = React.useContext(FirebaseAuthContext)
    if (context === undefined) {
        throw new Error(
            "useFirebaseAuth must be used within a FirebaseAuthProvider"
        )
    }
    return context.user
}

export { FirebaseAuthProvider, useFirebaseAuth }
