import { Layout } from "../../components/Layout"
import { InboxOutlined } from "@ant-design/icons"
import { message, Upload, DatePicker, TimePicker, Button } from "antd"
import { useState } from "react"
import { Input } from "antd"
import { initializeApp } from "firebase/app"
import {
    getStorage,
    getDownloadURL,
    ref,
    uploadBytes,
    uploadBytesResumable,
} from "firebase/storage"
import { getFirestore, doc, addDoc, setDoc } from "firebase/firestore"
import { v4 as uuidv4 } from "uuid"
import { useFirebaseAuth } from "../../lib/auth-context"
import { firebaseConfig } from "../../lib/config"

const { TextArea } = Input
const { Dragger } = Upload

export default function NewSubmission() {
    const user = useFirebaseAuth()
    const app = initializeApp(firebaseConfig)
    const db = getFirestore(app)
    const [vid, setVid] = useState({})
    const [text, setText] = useState("")
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")
    const [progress, setProgress] = useState([])

    const props = {
        name: "file",
        multiple: false,
        accept: "video/*",
        onChange(info) {
            const { status } = info.file
            if (status === "done") {
                message.success(`${info.file.name} file uploaded successfully.`)
            } else if (status === "error") {
                message.error(`${info.file.name} file upload failed.`)
            }
        },
        beforeUpload(file) {
            const storage = getStorage()
            const uuid = uuidv4()
            const storageRef = ref(storage, uuid)

            const task = uploadBytesResumable(storageRef, file)
            task.on(
                "state_changed",
                (snapshot) => {
                    const p = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    )
                    setProgress([
                        {
                            name: file.name,
                            percent: p,
                            uid: file.uid,
                            status: p === 100 ? "success" : "uploading",
                        },
                    ])
                },
                (error) => {
                    console.error(error)
                },
                () => {
                    getDownloadURL(task.snapshot.ref).then((url) => {
                        setVid({ url, name: uuid })
                    })
                }
            )
            return false
        },
        onDrop(e) {
            console.log("Dropped files", e.dataTransfer.files)
        },
    }
    return (
        <Layout>
            <div className="container m-auto w-3/5 mt-12">
                <h1>New Submission</h1>
                <TextArea
                    rows={4}
                    placeholder="Enter a short description of your video and symptoms here"
                    onChange={(event) => setText(event.target.value)}
                    className="mb-4"
                    required={true}
                />
                <div className="mb-4">
                    <Dragger {...{ ...props, fileList: progress }}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">
                            Click or drag file to this area to upload
                        </p>
                        <p className="ant-upload-hint">
                            Upload a valid video file with a thorough
                            description of your symptoms, conditions, etc.
                        </p>
                    </Dragger>
                </div>
                <div className="flex gap-2 mb-4">
                    <DatePicker
                        placeholder="Preferred Date"
                        disabledDate={(date) =>
                            date < new Date().setHours(0, 0, 0, 0)
                        }
                        onChange={(date, dateString) => {
                            setDate(dateString)
                        }}
                    />
                    <TimePicker
                        placeholder="Preferred Time"
                        onChange={(time, timeString) => {
                            setTime(timeString)
                        }}
                    />
                </div>
                <Button
                    type="primary"
                    disabled={!("name" in vid)}
                    onClick={async () => {
                        const now = new Date()
                        const obj = {
                            uid: user.uid,
                            id: vid.name,
                            vid,
                            text,
                            date,
                            time,
                            createdAt: now,
                        }
                        await setDoc(doc(db, "submissions", vid.name), obj)
                        Router.push("/patient")
                    }}
                >
                    Submit
                </Button>
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
