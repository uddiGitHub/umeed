"use client";

import React from "react";
import styles from "@/app/pages/contact/contactus.module.css";
import { FiPhoneCall } from "react-icons/fi";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { FiExternalLink } from 'react-icons/fi';

function contactus() {
  return (
    <>
      <div className={styles.contactusContainer}>
        <div className={styles.contactusHeaderText}>
          <h1>Get in Touch</h1>
          <p>
            Got questions? Brilliant ideas? Or maybe you just want to vent about
            your day? We’re not your "therapist", but we are here for you.
          </p>
          <p>
            Shoot us an email (we check it… eventually), or if you're feeling
            nostalgic, go ahead and give us a good old-fashioned phone call.
            Yes, we still answer those. Shocking, we know.
          </p>
        </div>
        <div className={styles.contactusInfo}>
          <div className={styles.infoItem}>
            <FiPhoneCall className={styles.icon} />
            <p className={styles.infoLabel}>Phone:</p>
            <div>
              <p className={styles.infoDetail}>
                {process.env.NEXT_PUBLIC_ORG_PHONE_NO}
              </p>
            </div>
          </div>
          <div className={styles.infoItem}>
            <MdEmail className={styles.icon} />
            <p className={styles.infoLabel}>Email:</p>
            <div>
              <a
                href={`mailto:${process.env.NEXT_PUBLIC_ORG_EMAIL}`}
                className={styles.infoDetail}
              >
                {process.env.NEXT_PUBLIC_ORG_EMAIL}
              </a>
            </div>
          </div>
          <div className={styles.infoItem}>
            <FaLocationDot className={styles.icon} />
            <p className={styles.infoLabel}>Location:</p>
            <div className={styles.locationLink}>
              <a
                href="https://maps.google.com/?q=India"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.mapLink}
              >
                <span>India</span>
                <FiExternalLink className={styles.externalIcon} />
              </a>
            </div>
          </div>
        </div>

        <div className={styles.contactFormContainer}>
          <form className={styles.contactForm}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" required></textarea>
            </div>
            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default contactus;
