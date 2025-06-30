"use client";

import React from "react";
import styles from "@/app/pages/contact/contactus.module.css";
import { FiPhoneCall } from "react-icons/fi";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { FiExternalLink } from 'react-icons/fi';

function contactus() {
  const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORM_ACCESS_KEY);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };
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
            Shoot with us an email, or if you're feeling
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
          <form onSubmit={onSubmit} className={styles.contactForm}>
            <input type="hidden" name="access_key" value={process.env.NEXT_PUBLIC_WEB3FORM_ACCESS_KEY} />
            <input type="hidden" name="subject" value="New Contact Message from Umeed" />
            <input type="hidden" name="from_name" value="Umeed.com Contact Form" />

            {/* Optional: Set a reply-to so user replies go to the sender */}
            {/* <input type="hidden" name="replyto" value="user@example.com" /> */}

            <div className={styles.formGroup}>
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Name"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                pattern="[a-zA-Z0-9._%+-]+@gmail\.com"
                title="Please enter a valid Gmail address"
                placeholder="Gmail Address"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message">Your Message</label>
              <textarea
                id="message"
                name="message"
                placeholder="Write your message here..."
                rows="5"
                required
              ></textarea>
            </div>

            <button type="submit" className={styles.submitButton}>Send Message</button>
          </form>
          <span className={styles.resultMessage}>{result}</span>
        </div>

      </div>
    </>
  );
}

export default contactus;
