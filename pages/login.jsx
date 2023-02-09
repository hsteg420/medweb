import React from "react"
import { Button, Checkbox, Form, Input, message } from "antd"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { initializeApp } from "firebase/app"
import { Layout } from "../components/Layout"
import { firebaseConfig } from "../lib/config"
import Router from "next/router"
import { getUserRole } from "../lib/utils"

export const Login = () => {
    const app = initializeApp(firebaseConfig)
    const auth = getAuth(app)

    const onFinish = (values) => {
        const { email, password } = values
        signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                // Signed in
                const user = userCredential.user
                Router.push(`/${await getUserRole(user)}`)
            })
            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message
                console.log(error)
                message.error("Unable to login: Invalid credentials")
            })
    }

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo)
    }

    return (
        <Layout>
            <Form
                name="basic"
                className="mx-auto pr-20 mt-20"
                style={{ width: "30rem" }}
                labelCol={{
                    span: 8,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            type: "email",
                            message: "Please input a valid email!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your password!",
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </Layout>
    )
}

export default Login

export async function getStaticProps(context) {
    return {
        props: {
            protected: false,
            userTypes: [],
        },
    }
}
