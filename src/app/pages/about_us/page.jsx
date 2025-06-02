'use client';

import React from 'react';
import styles from '@/app/pages/about_us/aboutus.module.css';
import Image from 'next/image';
import { FaInstagram, FaLinkedin, FaXTwitter } from "react-icons/fa6";

import sagarikaImage from '@/assets/images/SagarikaGhibliInk.png';

function Aboutus() {
  return (
    <section className={styles.aboutusPage}>
      <div className={styles.aboutusContainer}>
        <div className={styles.ownerContainer}>
          <div className={styles.ownerImg}>
            <Image
              src={sagarikaImage}
              alt="Sagarika Deka"
              width={300}
              height={300}
              className={styles.img}
              priority={false}
            />
          </div>
          <div className={styles.ownerContactLinksContainer}>
            <a href="#" aria-label="Instagram"><FaInstagram /></a>
            <a href="#" aria-label="LinkedIn"><FaLinkedin /></a>
            <a href="#" aria-label="Twitter"><FaXTwitter /></a>
          </div>
        </div>

        <div className={styles.aboutusHeaderText}>
          <h1>About Us</h1>
          <p>
            We're an intersectional feminist organization that uses art and storytelling based interventions to talk about gender-based violence and social justice.
          </p>
          <button>Have a look at our work</button>
        </div>
      </div>

      {/* Our Story */}
      <div className={styles.storyContainer}>
        <div className={styles.story}>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Our Story So Far
          </h2>
          <p>
            Friends of Toto was born from a deeply personal journey. It started when Pragya, a victim-survivor of sexual assault and passionate advocate for gender justice, realized that her own story could be a source of strength for others. She wanted to ensure that no one else would feel alone in their experiences. Pragya is the voice behind Toto!
          </p>
        </div>
      </div>

      {/* Media and Awards */}
      <div className={styles.MediaAndAwardContainer}>
        <div className={styles.MediaAndAwards}>
          <h1>In Media!</h1>
          <p>
            1 - GirlUp Champion of Change Award 2023:
            <br />
            For the work done to address gender-based violence by Friends of Toto (FOT Foundation), Pragya Sikka - founder/director received the 'GirlUp Champion of Change Award' in the category 'The Future is Safe.' Girl Up is a UN Foundation initiative - a global network of girls and women across 155 countries.
            <br />
            This award was presented to her by Dia Mirza, actor, filmmaker, and UNEP Goodwill Ambassador, and Shompi Sharp, United Nations Resident Coordinator India at Girl Up’s first-ever Leadership Summit in India.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Aboutus;
