import { Layout } from "../../components/Layout"
import { Card } from "antd"
import { Badge, Modal, Tag, Calendar, Button } from "antd"
import Link from "next/link"
import { useState, useEffect } from "react"
import { getAppointmentsFor, getNextApt } from "../../lib/utils"
import { EventCalendar } from "../../components/EventCalendar"
import { useFirebaseAuth } from "../../lib/auth-context"

export default function Patient() {
    const [nextApt, setNextApt] = useState({})
    const [allApt, setAllApt] = useState([])
    const user = useFirebaseAuth()

    useEffect(() => {
        ;(async () => {
            if (user) {
                const apt = await getNextApt(user.uid)
                setNextApt(apt)

                const apts = await getAppointmentsFor(user.uid)
                setAllApt(apts)
            }
        })()
    }, [user])

    return (
        <Layout>
            {nextApt ? (
                <div className="p-4">
                    <Card
                        style={{
                            width: "100%",
                            textAlign: "center",
                            background: "#dcf1fa",
                        }}
                    >
                        <h1>
                            Next appointment on {nextApt.date} at {nextApt.time}
                        </h1>
                        <Link href={nextApt.meetingLink || ""}>
                            <Button type="primary">Join Now</Button>
                        </Link>
                    </Card>
                </div>
            ) : (
                <></>
            )}
            <div className="flex gap-2 my-5 m-auto justify-center">
                <Link href="/patient/new-submission">
                    <Card
                        style={{ width: 200, textAlign: "center" }}
                        className="hover:opacity-80 hover:shadow transition-all"
                    >
                        <h3>New Submission</h3>
                    </Card>
                </Link>
                <Link href="/patient/med-history">
                    <Card
                        style={{ width: 200, textAlign: "center" }}
                        className="hover:opacity-80 hover:shadow transition-all"
                    >
                        <h3>View History</h3>
                    </Card>
                </Link>
            </div>
            <div className="my-10 max-w-7xl m-auto">
                <EventCalendar events={allApt} />
            </div>
        </Layout>
    )
}

export async function getStaticProps(context) {
    return {
        props: {
            protected: true,
            userTypes: ["patient"],
        },
    }
}
