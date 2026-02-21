'use client';

import React from 'react';
import styles from '@/app/pages/about_us/aboutus.module.css';
import Image from 'next/image';

import bannerImage from '@/assets/images/aboutUsBanner.webp';

export default function AboutUs() {
  // Visually hidden style for screen reader headings
  const srOnly = {
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: 0,
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0,0,0,0)',
    whiteSpace: 'nowrap',
    borderWidth: 0
  };

  return (
    <main className={styles.aboutusPage}>
      {/* Introduction section with banner and heading */}
      <section className={styles.aboutusContainer} aria-labelledby="intro-heading">
        <div className={styles.ownerContainer}>
          <div className={styles.ownerImg}>
            <Image
              src={bannerImage}
              alt="Maan Ki Umeed team at a community outreach program in Assam"
              width={300}
              height={300}
              className={styles.img}
              priority={false}
            />
          </div>
          <div className={styles.bannerCaption}>
            <p>Maan Ki Umeed team at a community outreach program in Assam</p>
          </div>
        </div>

        <div className={styles.aboutusHeaderText}>
          <h1 id="intro-heading">About Us</h1>
          <p>
            Maan Ki Umeed is a youth-led social change platform founded in 2020 in Assam, with a vision to uplift marginalized communities by harnessing the power of young people. What began as a small initiative during the pandemic has now grown into a dynamic movement that empowers children, women, and youth through education, awareness, and action.
          </p>
        </div>
      </section>

      {/* Our Story section */}
      <section className={styles.storyContainer} aria-labelledby="story-heading">
        <h2 id="story-heading" style={srOnly}>Our Story</h2>
        <div className={styles.story}>
          <p>
            Rooted in the belief that lasting change starts from within communities, we work at the intersection of education, gender equality, health, and livelihood. Our aim is to build a society grounded in equity, dignity, and opportunity where every child learns, every woman leads, and every voice matters. At Maan Ki Umeed, we foster leadership and changemaking among youth, encouraging them to challenge social norms, address injustice, and innovate sustainable solutions. Maan Ki Umeed serves as a safe and powerful space for youth to express, engage, and lead encouraging them to challenge societal norms, advocate for justice, and co-create sustainable solutions for a better future.
          </p>
        </div>
      </section>

      {/* Founder section */}
      <section className={styles.FounderContainer} aria-labelledby="founder-heading">
        <div className={styles.Founderstory}>
          <h2 id="founder-heading" className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Founder and CEO: Sagarika Deka
          </h2>
          <p>
            Sagarika Deka is a young changemaker, poet, and social entrepreneur from Guwahati, Assam, who believes that real change begins with courage and compassion. She is the founder of Maan Ki Umeed, a youth-led nonprofit platform that empowers young minds to create solutions for a better tomorrow.<br />
            <br />
            Her journey started in 2019, when, at just 17, she founded the first Girl Up chapter in Guwahati becoming a voice for girls and women in a space where silence was the norm. What began as a small initiative to create conversations around gender equality soon evolved into Maan Ki Umeed, a movement to uplift children, women, and youth through education, empowerment, and empathy.<br />
            <br />
            A STEM graduate with a deep-rooted love for science and research, Sagarika combines her academic background with her creative spirit. She is a passionate slam poet and artist, using her voice and art as powerful tools for activism. Her poetry speaks truth to power, confronting issues like gender-based violence, body shaming, menstruation taboos, and the silencing of women.<br />
            <br />
            In 2020, when Assam was hit by devastating floods amidst the COVID-19 pandemic, Sagarika launched a digital campaign that provided menstrual hygiene support to over 10,000+ women in affected areas. She used online activism to reach places where even relief failed, proving that empathy, when combined with action, can move mountains.<br />
            <br />
            Her efforts have earned her national and international recognition. She is a recipient of the Changemakers Award, a TEDx speaker, and a member of the Ashoka Young Changemakers Community in India. But more than the accolades, it is the impact she creates on the ground with children learning in slums, mothers gaining dignity through work, and youth finding their voice that defines her.<br />
            <br />
            Sagarika’s vision is bold: to build Maan Ki Umeed into a global platform where young people lead with purpose, empathy, and imagination. A platform where education is a right, not a privilege, where women are empowered, not silenced, and where youth are creators of change, not just future leaders.
          </p>
          <div className={styles.founderQuote}>
            <blockquote className={styles.quoteText}>
              You just need a reason, a little hope and a lot of umeed
            </blockquote>
            <div className={styles.quoteAttribution}>
              <span className={styles.quoteDash}>—</span>
              <span className={styles.quoteAuthor}>Sagarika Deka</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}