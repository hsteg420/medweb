import { useFirebaseAuth } from "../lib/auth-context"
import { getUserRole } from "../lib/utils"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "antd"
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { firebaseConfig } from "../lib/config"
import Router from "next/router"

export const Navbar = () => {
    const user = useFirebaseAuth()
    const app = initializeApp(firebaseConfig)
    const auth = getAuth(app)
    const [role, setRole] = useState("")

    useEffect(() => {
        ; (async () => {
            const role = await getUserRole(user)
            setRole(role)
        })()
    }, [user])

    return (
        <div className="bg-white shadow">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between py-4">
                    <div>
                        <Link href={`/${role}`}>
                            <img
                                src="/images/Renosis_Logo.png"
                                alt=""
                                height="50"
                                align="center"
                            />
                        </Link>
                    </div>

                    {user !== null ? (
                        <div className="hidden sm:flex sm:items-center">
                            <a className="text-gray-800 text-lg font-semibold border px-4 py-2">
                                <Button
                                    onClick={() => {
                                        auth.signOut()
                                            .then(function() {
                                                Router.push("/login")
                                            })
                                            .catch(function(error) {
                                                console.log(error)
                                            })
                                    }}
                                >
                                    Log Out
                                </Button>
                            </a>
                        </div>
                    ) : (
                        <div className="hidden sm:flex sm:items-center">
                            <a
                                href="/login"
                                className="text-gray-800 text-lg font-semibold hover:text-blue-600 mr-4"
                            >
                                Log in
                            </a>
                            <a
                                href="/register"
                                className="text-gray-800 text-lg font-semibold border px-4 py-2 rounded-lg hover:text-blue-600 hover:border-blue-600"
                            >
                                Register
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
