import { Layout } from "../components/Layout"

export default function Home() {
    return (
        <Layout>
            <section>
                <div className="bg-transparent fixed w-full z-0">
                    <img
                        src="/images/landingbg.png"
                        alt="background"
                        className="opacity-20"
                        width="100%"
                    />
                </div>
                <div className="z-10 text-center pt-10">
                    <img src="/images/Renosis_Logo.png" alt="Logo" />
                    <h1 className="text-2xl">
                        A better remote medical diagnosis platform.
                    </h1>
                    <h2>For Patients:</h2>
                    <ul>
                        Connect to a medical professional no matter where you
                        are.
                    </ul>
                    <ul>Easily access your electronic medical record (EMR).</ul>
                    <h2>For Doctors:</h2>
                    <ul>
                        Guarantees the safety of you and your patient while
                        providing authentic and accurate treatments.
                    </ul>
                    <ul>A way to have a flexible schedule.</ul>
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
