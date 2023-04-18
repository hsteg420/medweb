import { Layout } from "../components/Layout"

export default function Home() {
    const textGradientAnimated = {
        backgroundImage: "linear-gradient(to right, #3c075b, #020112)",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        animation: "animatedGradient 1s ease infinite",
    }

    const text2xl = {
        fontFamily: "Arial, sans-serif",
    }

    return (
        <Layout>
            <section>
                <div className="bg-transparent fixed w-full z-0">
                    <img
                        src="/images/landingbg.png"
                        alt="background"
                        className="opacity-30"
                        width="100%"
                    />
                </div>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "10px",
                    }}
                >
                    <div style={{ textAlign: "left" }}>
                        <h1
                            style={{
                                ...text2xl,
                                fontSize: "2rem",
                                fontWeight: "bold",
                            }}
                        >
                            <span style={textGradientAnimated}>
                                Delivers clinical excellence with compassion and
                                care to the comfort of your home.
                            </span>
                        </h1>
                        <h2
                            style={{
                                ...text2xl,
                                fontSize: "1.125rem",
                                fontWeight: "bold",
                            }}
                        >
                            For Patients:
                        </h2>
                        <ul style={{ listStyle: "disc", paddingLeft: "20px" }}>
                            <li>
                                Connect to a medical professional no matter
                                where you are.
                            </li>
                            <li>
                                Easily access your electronic medical record
                                (EMR).
                            </li>
                        </ul>
                        <h2
                            style={{
                                ...text2xl,
                                fontSize: "1.125rem",
                                fontWeight: "bold",
                            }}
                        >
                            For Doctors:
                        </h2>
                        <ul style={{ listStyle: "disc", paddingLeft: "20px" }}>
                            <li>
                                Guarantees the safety of you and your patient
                                while providing authentic and accurate
                                treatments.
                            </li>
                            <li>A way to have a flexible schedule.</li>
                        </ul>
                    </div>
                    <img src="/images/doctor.png" alt="bg" />
                </div>
            </section>
        </Layout>
    )
}

export async function getStaticProps(context) {
    return {
        props: {
            protected: true,
            userTypes: [],
        },
    }
}
