"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "@/components/footer/footer.module.css";
import { FaInstagram, FaLinkedin, FaFacebookF } from "react-icons/fa6";
import { BiLogoGmail } from "react-icons/bi";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const developerUrl = "www.linkedin.com/in/uddipta-deka";
  const founderUrl = "#";
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubscribe = async () => {
    setStatus("Loading...!");
    try {
      const res = await fetch("/api/subs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setStatus(data.message);
      setIsSuccess(true);
      setEmail("");
    } catch (err) {
      setStatus(
        "❌ Error: Oh don’t worry, the bug will magically disappear… just as soon as the developer gets paid."
      );
      setIsSuccess(false);
    }
  };
  // Reset success message after 5 seconds
  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => setIsSuccess(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  const socialLinks = [
    {
      icon: <FaInstagram aria-hidden="true" />,
      label: "Instagram",
      url: "https://www.instagram.com/maan_ki_umeed/",
    },
    {
      icon: <FaLinkedin aria-hidden="true" />,
      label: "LinkedIn",
      url: "#",
    },
    {
      icon: <FaFacebookF aria-hidden="true" />,
      label: "Facebook",
      url: "#",
    },
    {
      icon: <BiLogoGmail aria-hidden="true" />,
      label: "Email",
      url: "#",
    },
  ];

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          <div className={styles.logoContainer}>
            <div className={styles.logoWrapper}>
              <Image
                src="/Umeedlogo.png"
                alt="Umeed Foundation Logo"
                className={styles.logo}
                width={180}
                height={48}
                priority={false}
              />
              <p className={styles.tagline}>
                Empowering communities through hope and actions.
              </p>
            </div>
          </div>

          <div className={styles.linksContainer}>
            <div className={styles.newsletter}>
              <h3 className={styles.newsletterTitle}>Join Our Newsletter</h3>
              <div className={styles.newsletterForm}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className={styles.newsletterInput}
                />
                <button
                  className={styles.newsletterButton}
                  onClick={handleSubscribe}
                >
                  Subscribe
                </button>
              </div>

              {status && (
                <div
                  className={`${styles.statusMessage} ${
                    isSuccess ? styles.success : ""
                  }`}
                >
                  {isSuccess ? (
                    <div className={styles.checkAnimation}>
                      <svg
                        className={styles.checkmark}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 52 52"
                      >
                        <circle
                          className={styles.checkmarkCircle}
                          cx="26"
                          cy="26"
                          r="25"
                          fill="none"
                        />
                        <path
                          className={styles.checkmarkCheck}
                          fill="none"
                          d="M14.1 27.2l7.1 7.2 16.7-16.8"
                        />
                      </svg>
                      <span>{status}</span>
                    </div>
                  ) : (
                    <p>{status}</p>
                  )}
                </div>
              )}
            </div>

            <nav aria-label="Social media links">
              <ul className={styles.socialLinks}>
                {socialLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit our ${link.label}`}
                      className={styles.socialLink}
                    >
                      {link.icon}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className={styles.copyright}>
          <p style={{ textAlign: "center", marginTop: "1rem" }}>
            &copy; {currentYear} Maan ki Umeed. All rights reserved.
          </p>
          <div className={styles.credits}>
            <p>
              Founded by{" "}
              <a
                href={founderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.developerLink}
              >
                Sagarika Deka
              </a>
            </p>
            <span className={styles.divider}>•</span>
            <p>
              Website by{" "}
              <a
                href={developerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.developerLink}
              >
                Uddipta Deka
              </a>
            </p>
          </div>
          <div className={styles.location}>
            <p>
              {process.env.COMPANY_ADDRESS || 'Office? Nah. We live on the internet. HQ expands worldwide as soon as we go viral.'}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
