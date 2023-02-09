import { useState } from "react"
import { Modal, Tag, Calendar, Button } from "antd"
import Link from "next/link"

export const EventCalendar = ({ events }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [calEvents, setCalEvents] = useState([])

    const dateCellRender = (value) => {
        const eventsAtDate = events.filter(
            (e) => e.date == value.format("YYYY-MM-DD")
        )
        if (eventsAtDate)
            return (
                <ul
                    className="events p-0 flex flex-col gap-1"
                    onClick={() => {
                        setCalEvents(eventsAtDate)
                        setIsModalOpen(true)
                    }}
                >
                    {eventsAtDate.map((item) => (
                        <li key={item.content} className="">
                            <Tag color="blue">
                                {item.submission.description}
                            </Tag>
                        </li>
                    ))}
                </ul>
            )
        else return <></>
    }
    return (
        <>
            <Calendar dateCellRender={dateCellRender} className="rounded" />
            <Modal
                title="Appointments"
                open={isModalOpen}
                onOk={() => setIsModalOpen(false)}
                onCancel={() => setIsModalOpen(false)}
            >
                <ul className="flex flex-col gap-2">
                    {calEvents.map((item) => (
                        <li key={item.id}>
                            <p className="mb-2">
                                {item.submission.description} at {item.time}
                            </p>
                            <Link href={item.meetingLink}>
                                <Button type="primary">Join Now</Button>
                            </Link>
                        </li>
                    ))}
                </ul>
            </Modal>
        </>
    )
}
