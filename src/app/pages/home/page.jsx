"use client";
import React from "react";
import styles from "./home.module.css";

import Image from "next/image";
// Importing images
import bannerImagePath from "@/assets/images/bannerImg.png";
import gay from "@/assets/images/gay.png";


// Counter component to animate the count
import { useState, useEffect } from "react";
const Counter = ({ end }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const increment = Math.ceil(end / (4000 / 50));
    let start = 0;

    const timer = setInterval(() => {
      start += increment;
      start >= end ? (clearInterval(timer), setCount(end)) : setCount(start);
    }, 50);

    return () => clearInterval(timer);
  }, [end]);

  return <>{count}</>;
};

// Comments data (later this can be fetched from an API)
const commentsData = [
  {
    img: "#",
    name: "Raj Patel",
    bio: "Community Leader",
    comment:
      "The baithak initiative has brought our neighborhood together in ways I never imagined. Truly groundbreaking approach to community engagement!",
  },
  {
    img: "#",
    name: "Aisha Khan",
    bio: "Educator",
    comment:
      "Their intersection of technology and social justice education is revolutionary. Our students have found new ways to express their ideas.",
  },
  {
    img: "#",
    name: "Sarah Johnson",
    bio: "Artist & Activist",
    comment:
      "Umeed's workshops transformed how I view art's role in social change. The inclusive environment fosters genuine creativity and dialogue.",
  },
  {
    img: "#",
    name: "Raj Patel",
    bio: "Community Leader",
    comment:
      "The baithak initiative has brought our neighborhood together in ways I never imagined. Truly groundbreaking approach to community engagement!",
  },
  {
    img: "#",
    name: "Aisha Khan",
    bio: "Educator",
    comment:
      "Their intersection of technology and social justice education is revolutionary. Our students have found new ways to express their ideas.",
  },
];

export default function Home() {
  // Impact statistics data
  const impactStats = [
    { end: 1000, text: "Workshops facilitated on social change" },
    { end: 200, text: "Events" },
    { end: 5000, text: "People Impacted" },
    { end: 50, text: "Collaborations" },
  ];

  // Verticals content data
  const verticalsContent = [
    {
      title: "Art For Social Change - Baithaks",
      text: "Host free-to-access monthly workshops on social justice...",
    },
    { title: "Technology", text: "We use technology to create social change." },
    {
      title: "Community",
      text: "We build communities to create social change.",
    },
    { title: "Education", text: "We use education to create social change." },
  ];

  return (
    <>
      {/* Banner Section */}
      <section className={styles.bannerContainer}>
        <Image
          src={bannerImagePath}
          alt="Banner"
          className={[styles.bannerImage]}
        />
        <div className={styles.bannerHeader}>
          <h1>Art For Social Change - Baithaks</h1>
        </div>
      </section>

      <section className={styles.homePage}>
        {/* Impact Section */}
        <section className={styles.impactContainer}>
          <h1>Impact</h1>
          <p className={styles.impactDescribtion}>
            We have been able to create a positive impact in the community through
            our events and initiatives.
          </p>
          {impactStats.map((stat, index) => (
            <div key={index} className={styles.impactCard}>
              <h2>
                <Counter end={stat.end} />+
              </h2>
              <p>{stat.text}</p>
            </div>
          ))}
        </section>

        {/* Colored Section */}
        <section className={styles.coloredSection}>
          <div className={styles.coloredSectionBlock}>
            <Image className={styles.coloredSectionImg} src={gay} alt="Vision" />
            <div className={styles.coloredSectionText}>
              <h1>Vision</h1>
              <p>
                We envision an inclusive and just world where all individuals,
                regardless of their background, can thrive and contribute to
                society. lerem ipsum dolor sit amet, consectetur adipiscing elit.
                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
          </div>
          <div className={styles.coloredSectionBlock}>
            <div className={styles.coloredSectionText}>
              <h1>Vision</h1>
              <p>
                We envision an inclusive and just world where all individuals,
                regardless of their background, can thrive and contribute to
                society. lerem ipsum dolor sit amet, consectetur adipiscing elit.
                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
            <Image className={styles.coloredSectionImg} src={gay} alt="Vision" />
          </div>
        </section>

        {/* Verticals Section */}
        <section>
          <div className={styles.verticals}>
            <h1>Our Verticals</h1>
          </div>
          <div className={styles.verticalsContainer}>
            {verticalsContent.map((vertical, index) => (
              <div key={index} className={styles.verticalCard}>
                <Image
                  className={styles.verticalCardImg}
                  src={gay}
                  alt={vertical.title}
                />
                <h2>{vertical.title}</h2>
                <p>{vertical.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Get Involved Section */}
        <section className={styles.getInvolved}>
          <div className={styles.getInvolvedContainer}>
            <div className={styles.getInvolvedText}>
              <h1>Be a Momo to Our Toto?</h1>
              <p>
                Join us in our mission to challenge societal norms, break the
                silence on gender-based violence, and create a more equitable
                future for all. Get involved in our campaigns, come to our
                events, or support us however, you can, every bit counts.
              </p>
              <button onClick={("#")}> Get Involved </button>
            </div>
            <div className={styles.getInvolvedImgContainer}>
              <Image className={styles.getInvolvedImg} src={gay} alt="gay" />
            </div>
          </div>
        </section>

        {/* Peoples Section */}
        <section className={styles.peopleSection}>
          <div className={styles.peoplesView}>
            <div className={styles.peoplesViewText}>
              {["Hear", "what", "people", "think", "about"].map((word, index) => (
                <h1 key={index}>{word}</h1>
              ))}
              <Image src='/Umeedlogo.png' width={150} height={150} alt="umeedLogo" />
            </div>
          </div>
          <div className={styles.peoplesViewComments}>
            <div className={styles.commentsContainer}>
              {commentsData.map((comment, index) => (
                <div key={index} className={styles.commentBox}>
                  <div className={styles.profile}>
                    <img src={comment.img} alt={comment.name} />
                    <div className={styles.profileDescription}>
                      <h1>{comment.name}</h1>
                      <p>{comment.bio}</p>
                    </div>
                  </div>
                  <div className={styles.comment}>
                    <p>{comment.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </section>
    </>
  );
}
