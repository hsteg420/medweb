import { FirebaseAuthProvider } from "../lib/auth-context"
import React from "react"
import "../styles/globals.css"
import Router from "next/router"
import { initializeApp } from "firebase/app"
import { firebaseConfig } from "../lib/config"
import { getAuth } from "firebase/auth"
import { getUserRole } from "../lib/utils"

function MyApp({ Component, pageProps }) {
    const app = initializeApp(firebaseConfig)
    const auth = getAuth(app)

    React.useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            const role = await getUserRole(user)
            if (
                pageProps.protected &&
                (!user || !pageProps.userTypes.includes(role))
            ) {
                if (user) {
                    Router.push(`/${role}`)
                } else {
                    Router.push("/")
                }
            }
        })
        return unsubscribe
    }, [])

    return (
        <FirebaseAuthProvider>
            <Component {...pageProps} />
        </FirebaseAuthProvider>
    )
}

export default MyApp
