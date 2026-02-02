"use client";
import React from "react";
import styles from "./home.module.css";

import Image from "next/image";
// Importing images
import bannerImagePath from "@/assets/images/bannerImg.jpg";
import visionImage from "@/assets/images/vision.jpeg";
import BecomeAmember from "@/assets/images/BecomeAmember.jpg";

// Importing Pillars images
import Education from "@/assets/images/Pillars/Education.jpg";
import Empowerment from "@/assets/images/Pillars/Empowerment.jpg";
import Employment from "@/assets/images/Pillars/Employment.jpg";
import Service from "@/assets/images/Pillars/Services.jpg";

// Importing SDG images
import NoProverty from "@/assets/images/SDG/NoProverty.jpeg";
import GoodHealth from "@/assets/images/SDG/GoodHealth.jpeg";
import QualityEducation from "@/assets/images/SDG/QualityEducation.png";
import GenderEquality from "@/assets/images/SDG/GenderEquality.png";
import ReducedInequalities from "@/assets/images/SDG/ReduceInequality.png";
import ClimateAction from "@/assets/images/SDG/ClimateAction.png";
import SDGImpactSection from "@/components/SDGImpactSection";


import { Button } from "@/components/ui/button";
import Link from "next/link";

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
  const impactStats = [
    { image: NoProverty },
    { image: GoodHealth },
    { image: QualityEducation },
    { image: GenderEquality },
    { image: ReducedInequalities },
    { image: ClimateAction }
  ];

  // Verticals content data
  const verticalsContent = [
    {
      title: "Education",
      text: "We believe education is the most powerful tool for change. We strive to ensure every child regardless of background or gender has access to quality learning through school enrollments, Sunday classes, and interactive workshops.",
      image: Education,
      link: "https://en.wikipedia.org/wiki/Education",
    },
    {
      title: "Empowerment",
      text: "We focus on empowering women and children by nurturing confidence, knowledge, leadership, and introducing the concept of changemaking. Through menstrual hygiene sessions, educational comics, opinionated articles and awareness campaigns, we challenge taboos and create pathways to self-reliance.",
      image: Empowerment,
      link: "https://en.wikipedia.org/wiki/Empowerment",
    },
    {
      title: "Employment",
      text: "Skill-building and vocational training are central to our work with women and teenagers. From stitching reusable pads to creating sustainable clothing, we support women in earning with dignity and guide youth in transforming sustainable solutions into impactful ideas.",
      image: Employment,
      link: "https://en.wikipedia.org/wiki/Employment",
    },
    {
      title: "Service", text: "Rooted in compassion, our youth-led team actively serves marginalized communities during floods, pandemics, or everyday struggles because real change begins with showing up.",
      image: Service,
      link: "https://en.wikipedia.org/wiki/Service_(economics)",
    },
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
          <h1>WITH THE PEOPLE, FOR THE PEOPLE</h1>
        </div>
      </section>

      <section className={styles.homePage}>
        {/* Impact Section */}
        <SDGImpactSection impactStats={impactStats} />


        {/* vision Section */}
        <section className={styles.visionSection}>
          <div className={styles.visionContainer}>
            <div className={styles.visionContent}>
              <div className={styles.sectionHeader}>
                <div className={styles.subtitle}>Our Guiding Principle</div>
                <h2 className={styles.title}>Vision for Transformative Change</h2>
              </div>

              <div className={styles.visionText}>
                <p>
                  At Maan Ki Umeed, we envision a society where every child receives quality education,
                  every woman lives with dignity and economic independence, and every young person is empowered
                  to lead and create positive change.
                </p>
                <p>
                  Our vision is to build an inclusive and compassionate world free from inequality,
                  discrimination, and injustice where grassroots communities are uplifted through education,
                  empowerment, and opportunity.
                </p>
                <p>
                  We believe that real transformation begins when youth are trusted with responsibility,
                  equipped with the right tools, and inspired to serve.
                </p>
              </div>
            </div>

            <div className={styles.visionImageContainer}>
              <div className={styles.imageWrapper}>
                <Image
                  src={visionImage}
                  alt="Vision for Transformative Change"
                  className={styles.visionImage}
                />
                <div className={styles.imageOverlay}></div>
              </div>

              <div className={styles.visionQuote}>
                <div className={styles.quoteIcon}>❝</div>
                <p className={styles.quoteText}>
                  Real change begins when youth are trusted with responsibility and inspired to serve
                </p>
                <div className={styles.quoteAuthor}>- Maan Ki Umeed</div>
              </div>
            </div>
          </div>
        </section>


        {/* Verticals Section */}
        <section className={styles.verticalsSection}>
          <div className={styles.sectionHeader}>
            <h1>Our Core Pillars</h1>
            <p className={styles.subtitle} style={{
              textAlign: 'center'
            }}>Foundations of our impact-driven approach</p>
          </div>

          <div className={styles.verticalsContainer}>
            {verticalsContent.map((vertical, index) => (
              <div key={index} className={styles.verticalCard}>
                <div className={styles.cardHeader}>
                  <div className={styles.iconContainer}>
                    <div className={styles.cardIcon}>{vertical.title.charAt(0)}</div>
                  </div>
                  <h2>{vertical.title}</h2>
                </div>

                <div className={styles.imageContainer}>
                  <Image
                    className={styles.verticalCardImg}
                    src={vertical.image}
                    alt={vertical.title}
                  />
                </div>

                <div className={styles.cardContent}>
                  <p>{vertical.text}</p>
                </div>

                <div className={styles.cardFooter}>
                  <div className={styles.pillarNumber}>0{index + 1}</div>
                  <div className={styles.divider}></div>
                  <a href={vertical.link} target="_blank" className={styles.learnMore}>Learn more →</a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Get Involved Section */}
        <section className={styles.getInvolved}>
          <div className={styles.getInvolvedContainer}>
            <div className={styles.getInvolvedText}>
              <div className={styles.subtitle}>Join the Movement</div>
              <h2 className={styles.title}>Why Join Maan Ki Umeed?</h2>
              <div className={styles.description}>
                <p>
                  Be more than a volunteer and become a changemaker. Join a community of passionate youth creating real change at the grassroots. As a Umeed Fellow, you'll:
                </p>
                <ul className={styles.benefitsList}>
                  <li>Lead impactful community projects</li>
                  <li>Work directly with underserved populations</li>
                  <li>Develop leadership and professional skills</li>
                  <li>Contribute to meaningful social change</li>
                  <li>Join a network of like-minded activists</li>
                </ul>
                <p>
                  It's more than a fellowship, it's a journey of purpose, voice, and leadership.
                </p>
              </div>
              <Button asChild>
                <Link href="https://surveyheart.com/form/62696e2a74c1c748d8970799" target="_blank" rel="noopener noreferrer">
                  Get Involved
                </Link>
              </Button>
            </div>
            <div className={styles.getInvolvedImgContainer}>
              <Image className={styles.getInvolvedImg} src={BecomeAmember} alt="Become a Member" />
            </div>
          </div>
        </section>


        {/* Peoples Section */}
        {/* <section className={styles.peopleSection}>
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
                <div
                  key={index}
                  className={styles.commentBox}
                  style={{ '--rotate': index % 2 === 0 ? '-1deg' : '1deg' }}
                >
                  <div className={styles.profile}>
                    <div className={styles.avatarPlaceholder} />
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
        </section> */}

      </section>
    </>
  );
}
