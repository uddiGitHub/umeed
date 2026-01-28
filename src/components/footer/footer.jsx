"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "@/components/footer/footer.module.css";
import { FaInstagram, FaLinkedin, FaFacebookF, FaHeart, FaMapMarkerAlt, FaPhone, FaEnvelope, FaArrowRight } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import Lottie from "lottie-react";
import confetti from "../../../public/animations/confetti.json";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const developerUrl = "https://github.com/uddiGitHub";
  const founderUrl = "#";
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) {
      setStatus("Please enter a valid email address");
      setIsSuccess(false);
      return;
    }
    
    setStatus("Subscribing...");
    try {
      const res = await fetch("/api/subs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setStatus("Successfully subscribed! Thank you.");
      setIsSuccess(true);
      setEmail("");
    } catch (err) {
      setStatus("Unable to subscribe. Please try again.");
      setIsSuccess(false);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => setIsSuccess(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  const socialLinks = [
    {
      icon: <FaInstagram />,
      label: "Instagram",
      url: "https://www.instagram.com/maan_ki_umeed/",
    },
    {
      icon: <FaLinkedin />,
      label: "LinkedIn",
      url: "https://www.linkedin.com/company/maan-ki-umeed/",
    },
    {
      icon: <FaFacebookF />,
      label: "Facebook",
      url: "https://www.facebook.com/share/16v5RvxcM8/",
    },
    {
      icon: <BiLogoGmail />,
      label: "Email",
      url: `mailto:${process.env.NEXT_PUBLIC_ORG_EMAIL}`,
    },
  ];

  const quickLinks = [
    { label: "About Us", url: "#" },
    // { label: "Our Programs", url: "#" },
    // { label: "Success Stories", url: "#" },
    { label: "Volunteer", url: "#" },
    { label: "Donate", url: "#" },
    // { label: "Contact", url: "#" },
    { label: "Events", url: "#" },
    { label: "Gallery", url: "#" },
    // { label: "Blog", url: "#" },
  ];

  const contactInfo = [
    {
      icon: <FaMapMarkerAlt />,
      text: "Based in Assam, India",
    },
    {
      icon: <FaPhone />,
      text: "+91 987 654 3210",
    },
    {
      icon: <FaEnvelope />,
      text: "info@maanki-umeed.org",
    },
  ];

  return (
    <footer className={styles.footer} role="contentinfo">
      {/* Decorative Elements */}
      <div className={styles.decorativeTop}></div>
      
      <div className={styles.container}>
        {/* Main Content */}
        <div className={styles.mainContent}>
          
          {/* Left Column - Brand & Mission */}
          <div className={styles.brandSection}>
            <div className={styles.logoContainer}>
              <Image
                src="/Umeedlogo.png"
                alt="Umeed Foundation Logo"
                className={styles.logo}
                width={180}
                height={48}
                priority={false}
              />
              <div className={styles.missionStatement}>
                <FaHeart className={styles.heartIcon} />
                <h3 className={styles.missionTitle}>Our Mission</h3>
              </div>
              <p className={styles.missionText}>
                Empowering communities through sustainable initiatives, creating 
                lasting impact through education, healthcare, and economic development.
              </p>
            </div>
          </div>

          {/* Middle Column - Quick Links */}
          <div className={styles.linksSection}>
            <h3 className={styles.sectionTitle}>Quick Navigation</h3>
            <div className={styles.linksGrid}>
              {quickLinks.map((link, index) => (
                <a key={index} href={link.url} className={styles.navLink}>
                  <span className={styles.linkIcon}>→</span>
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Right Column - Newsletter */}
          <div className={styles.newsletterSection}>
            <div className={styles.newsletterCard}>
              <div className={styles.newsletterHeader}>
                <h3 className={styles.sectionTitle}>Stay Connected</h3>
                <p className={styles.newsletterDescription}>
                  Subscribe to receive updates about our initiatives, success stories, 
                  and opportunities to make a difference.
                </p>
              </div>
              
              {isSuccess && (
                <div className={styles.confettiWrapper}>
                  <Lottie
                    animationData={confetti}
                    loop={false}
                    autoplay
                  />
                </div>
              )}
              
              <form onSubmit={handleSubscribe} className={styles.newsletterForm}>
                <div className={styles.inputGroup}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className={styles.newsletterInput}
                    required
                  />
                  <button type="submit" className={styles.subscribeButton}>
                    <span>Join Now</span>
                    <FaArrowRight className={styles.arrowIcon} />
                  </button>
                </div>
                
                {status && (
                  <div className={`${styles.statusMessage} ${isSuccess ? styles.success : styles.error}`}>
                    {isSuccess ? (
                      <div className={styles.successContent}>
                        <div className={styles.successCheck}></div>
                        <span>{status}</span>
                      </div>
                    ) : (
                      <span>{status}</span>
                    )}
                  </div>
                )}
              </form>
              
              <div className={styles.privacyNote}>
                <small>We respect your privacy. Unsubscribe at any time.</small>
              </div>
              {/* Social Links */}
            <div className={styles.socialSection}>
              <h4 className={styles.sectionSubtitle}>Follow Our Journey</h4>
              <div className={styles.socialLinks}>
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className={styles.socialLink}
                  >
                    {link.icon}
                    <span className={styles.socialLabel}>{link.label}</span>
                  </a>
                ))}
              </div>
            </div>
            </div>
          </div>
          
        </div>
        
        {/* Divider */}
        <div className={styles.divider}></div>

        {/* Bottom Section */}
        <div className={styles.bottomSection}>
          <div className={styles.copyrightInfo}>
            <p className={styles.copyright}>
              © {currentYear} <strong>Maan ki Umeed Foundation</strong>. All rights reserved.
            </p>
            <div className={styles.legalLinks}>
              <a href="#" className={styles.legalLink}>Privacy Policy</a>
              <span className={styles.separator}>|</span>
              <a href="#" className={styles.legalLink}>Terms of Service</a>
              <span className={styles.separator}>|</span>
              <a href="#" className={styles.legalLink}>Cookie Policy</a>
            </div>
          </div>
          
          <div className={styles.credits}>
            <div className={styles.creditItem}>
              <span className={styles.creditLabel}>Founded by</span>
              <a href={founderUrl} className={styles.creditName}>Sagarika Deka</a>
            </div>
            <div className={styles.creditDivider}></div>
            <div className={styles.creditItem}>
              <span className={styles.creditLabel}>Website crafted by</span>
              <a href={developerUrl} target="_blank" rel="noopener noreferrer" className={styles.creditName}>
                Uddipta Deka
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);