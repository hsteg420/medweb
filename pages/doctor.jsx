import { useState, useEffect } from "react"
import { Layout } from "../components/Layout"
import {
    Table,
    Button,
    Modal,
    Tag,
    Form,
    Calendar,
    DatePicker,
    TimePicker,
    Input,
    message,
} from "antd"
import Link from "next/link"
import { v4 as uuidv4 } from "uuid"
import { useFirebaseAuth } from "../lib/auth-context"
import { getFirestore, doc, setDoc } from "firebase/firestore"
import { firebaseConfig } from "../lib/config"
import { initializeApp } from "firebase/app"
import {
    getAllSubmissions,
    getAppointmentsBy,
    getFullNameById,
    textTo,
    getPhoneNumber,
} from "../lib/utils"
import { EventCalendar } from "../components/EventCalendar"

export default function Doctor() {
    const user = useFirebaseAuth()
    const app = initializeApp(firebaseConfig)
    const db = getFirestore(app)
    const [isDescModalOpen, setIsDescModalOpen] = useState(false)
    const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false)
    const [currRecord, setCurrRecord] = useState({})
    const [currText, setCurrText] = useState("")
    const [subData, setSubData] = useState([])
    const [meetingData, setMeetingData] = useState([])
    const [form] = Form.useForm()

    const meetingColumns = [
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
        },
        {
            title: "Patient",
            dataIndex: "patient",
            key: "patient",
        },
        {
            title: "Meeting Link",
            dataIndex: "meetingLink",
            key: "meetingLink",
            render: (_, record) => (
                <a href={record.meetingLink}>{record.meetingLink}</a>
            ),
        },
    ]

    const subColumns = [
        {
            title: "Patient",
            dataIndex: "patient",
            key: "patient",
        },
        {
            title: "Preferred Date",
            dataIndex: "date",
            key: "date",
        },
        {
            title: "Preferred Time",
            dataIndex: "time",
            key: "time",
        },
        {
            title: "Video Link",
            dataIndex: "video",
            key: "video",
            render: (_, record) => <a href={record.video}>{record.video}</a>,
        },
        {
            title: "Description",
            key: "view",
            render: (_, record) => (
                <Button
                    onClick={() => {
                        setCurrText(record.description)
                        setIsDescModalOpen(true)
                    }}
                >
                    View
                </Button>
            ),
        },
        {
            title: "Appointment",
            key: "schedule",
            render: (_, record) => (
                <Button
                    onClick={() => {
                        setCurrRecord(record)
                        setIsScheduleModalOpen(true)
                    }}
                >
                    Schedule
                </Button>
            ),
        },
    ]

    useEffect(() => {
        ;(async () => {
            const subs = (await getAllSubmissions())
                .filter((value) => JSON.stringify(value) !== "{}")
                .map(async ({ date, text, time, uid, vid }) => ({
                    uid,
                    patient: await getFullNameById(uid),
                    date,
                    time,
                    description: text,
                    video: vid.url,
                }))
            setSubData(await Promise.all(subs))

            if (user) {
                const meetings = (await getAppointmentsBy(user.uid)).map(
                    async ({ date, meetingLink, submission, ...others }) => ({
                        date,
                        patient: submission.patient,
                        submission,
                        meetingLink,
                        ...others,
                    })
                )
                setMeetingData(await Promise.all(meetings))
            }
        })()
    }, [user])

    return (
        <Layout>
            <div className="m-16">
                <h1>Upcoming Appointments</h1>
                <Table columns={meetingColumns} dataSource={meetingData} />
            </div>
            <div className="mx-16 my-6">
                <h1>Current Submissions</h1>
                <Table columns={subColumns} dataSource={subData} />
            </div>
            <div className="my-10 mt-16 max-w-7xl m-auto">
                <h1>Calendar</h1>
                <EventCalendar events={meetingData} />
            </div>
            <Modal
                title="Description"
                open={isDescModalOpen}
                onOk={() => setIsDescModalOpen(false)}
                onCancel={() => setIsDescModalOpen(false)}
            >
                <p>{currText}</p>
            </Modal>
            <Modal
                title="Schedule Appointment"
                open={isScheduleModalOpen}
                onOk={form.submit}
                onCancel={() => {
                    setIsScheduleModalOpen(false)
                    form.resetFields()
                }}
            >
                <Form
                    form={form}
                    onFinish={async (values) => {
                        setIsScheduleModalOpen(false)

                        const id = uuidv4()
                        const obj = {
                            id,
                            uid: user.uid,
                            submission: currRecord,
                            date: values.date.format("YYYY-MM-DD"),
                            time: values.time.format("HH-mm:ss"),
                            meetingLink: values.link,
                        }
                        await setDoc(doc(db, "appointments", id), obj)
                        form.resetFields()
                        await textTo(
                            await getPhoneNumber(currRecord.uid),
                            `Renosis Reminder: Appointment scheduled for ${date} at ${time}. Meeting link: ${meetingLink}`
                        )
                        message.success("Successfully created appointment")
                        setMeetingData([...meetingData, obj])
                    }}
                >
                    <Form.Item
                        name="link"
                        className="mt-4"
                        rules={[
                            {
                                required: true,
                                message: "Please input the Google Meets link!",
                            },
                        ]}
                    >
                        <Input placeholder="Google Meets link" />
                    </Form.Item>
                    <div className="flex gap-2 mb-4">
                        <Form.Item name="date">
                            <DatePicker
                                disabledDate={(date) =>
                                    date < new Date().setHours(0, 0, 0, 0)
                                }
                            />
                        </Form.Item>
                        <Form.Item name="time">
                            <TimePicker />
                        </Form.Item>
                    </div>
                </Form>
            </Modal>
        </Layout>
    )
}

export async function getStaticProps(context) {
    return {
        props: {
            protected: true,
            userTypes: ["doctor"],
        },
    }
}
