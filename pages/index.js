import React from "react";
import Image from "next/image";
import styles from "../styles/page.module.css";
import ScrollJourneyTop from "../src/components/Compiled/ScrollJourneyTop";
import ScrollJourneyBottom  from "../src/components/Compiled/ScrollJourneyBottom";
import {ParallaxProvider} from "react-scroll-parallax";
import AutoPlayVideo from "@/components/AutoPlayVideo";

export default function Home() {
    return (
        <main className={styles.main}>
            <header className="App-header">
                <h1 style={{marginTop: "0", color: "#333333"}}>
                    The scale of Labour U-Turns <Image src="/logo.svg" alt="Logo" width={30} height={30} margin={0} />
                </h1>

                <p className="responsive-paragraph">
                    Explore our AI-powered commentary on climate change. Every 10 minutes, we scour headlines from
                    Western media outlets for the latest updates on climate change. These headlines are then fed into a
                    sophisticated language model, which crafts stories in the style of Western news agencies. Can you
                    discern the difference?
                </p>
            </header>

            <section className={styles.body}>
                <ParallaxProvider>
                    <ScrollJourneyTop />
                </ParallaxProvider>
            </section>

            <section className={styles.section_two}>
                <AutoPlayVideo src="../../videos/Labour_Shadow.mp4" type="video/mp4" />
            </section>

            <section className={styles.section_three}>
                <ScrollJourneyBottom />
            </section>
        </main>
    );
}
