import React, { useEffect, useState } from "react"
import { Space, Button, Table, Modal, Tag } from "antd"
import { Layout } from "../../components/Layout"
import {
    getAppointmentsFor,
    getSubmissions,
    getFullNameById,
} from "../../lib/utils"
import { useFirebaseAuth } from "../../lib/auth-context"

const MedHistory = () => {
    const user = useFirebaseAuth()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [currText, setCurrText] = useState("")
    const [data, setData] = useState([])

    const showModal = () => {
        setIsModalOpen(true)
    }

    const handleOk = () => {
        setIsModalOpen(false)
    }

    const handleCancel = () => {
        setIsModalOpen(false)
    }

    const columns = [
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
        },
        {
            title: "Doctor",
            dataIndex: "doctor",
            key: "doctor",
        },
        {
            title: "Notes",
            key: "view",
            render: (_, record) => (
                <Button
                    onClick={() => {
                        setCurrText(record.description)
                        showModal()
                    }}
                >
                    View
                </Button>
            ),
        },
        {
            title: "Video Link",
            dataIndex: "video",
            key: "video",
            render: (_, record) => (
                <a href={record.meetingLink}>{record.meetingLink}</a>
            ),
        },
    ]

    useEffect(() => {
        ;(async () => {
            if (user) {
                const meetings = (await getAppointmentsFor(user.uid))
                    .filter((value) => JSON.stringify(value) !== "{}")
                    .filter((meeting) => new Date(meeting.date) < new Date())
                    .map(async ({ uid, date, meetingLink, submission }) => ({
                        date,
                        doctor: await getFullNameById(uid),
                        description: submission.description,
                        meetingLink,
                    }))
                setData(await Promise.all(meetings))
            }
        })()
    }, [user])

    return (
        <Layout>
            <div className="m-16">
                <h1>Medical History</h1>
                <Table columns={columns} dataSource={data} />
            </div>
            <Modal
                title="Doctor Notes"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <p>{currText}</p>
            </Modal>
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

export default MedHistory
