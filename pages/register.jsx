import React, { useCallback, useState } from "react"
import { Button, Select, Option, Radio, Form, Input, message } from "antd"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { initializeApp } from "firebase/app"
import { getFirestore, doc, addDoc, setDoc } from "firebase/firestore"
import { Layout } from "../components/Layout"
import { firebaseConfig } from "../lib/config"
import Router from "next/router"

export const Register = () => {
    const app = initializeApp(firebaseConfig)
    const db = getFirestore(app)
    const auth = getAuth(app)

    const onFinish = (values) => {
        const { email, password, phone, firstname, lastname, role } = values
        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                // Signed in
                const user = userCredential.user
                await setDoc(doc(db, "userInfo", user.uid), {
                    role,
                    email,
                    firstname,
                    lastname,
                    phone,
                })
                Router.push(`/${role}`)
            })
            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message
            })
    }

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo)
    }

    return (
        <Layout>
            <Form
                name="basic"
                className="mx-auto pl-40 mt-20"
                style={{ width: "80rem" }}
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 6,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="First Name"
                    name="firstname"
                    rules={[
                        {
                            required: true,
                            message: "Please input your first name!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Last Name"
                    name="lastname"
                    rules={[
                        {
                            required: true,
                            message: "Please input your lastname!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            email: true,
                            message: "Please input your email!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="phone"
                    label="Phone Number"
                    rules={[
                        {
                            required: true,
                            message: "Please input your phone number!",
                        },
                        {
                            pattern: /^\+?[1-9]\d{1,14}$/,
                            message: "Must be in E.164 format",
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
                        {
                            min: 6,
                            message: "Must have a minimum of 6 characters",
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="Confirm Password"
                    name="confirmpassword"
                    dependencies={["password"]}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: "Please confirm your password!",
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (
                                    !value ||
                                    getFieldValue("password") === value
                                ) {
                                    return Promise.resolve()
                                }
                                return Promise.reject(
                                    new Error("Passwords don't match!")
                                )
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="Role"
                    name="role"
                    rules={[
                        {
                            required: true,
                            message: "Must choose a role!",
                        },
                    ]}
                >
                    <Radio.Group>
                        <Radio value="patient">Patient</Radio>
                        <Radio value="doctor">Doctor</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Sign Up
                    </Button>
                </Form.Item>
            </Form>
        </Layout>
    )
}
export default Register

export async function getStaticProps(context) {
    return {
        props: {
            protected: false,
            userTypes: [],
        },
    }
}
