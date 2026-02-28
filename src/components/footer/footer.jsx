"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "@/components/footer/footer.module.css";
import { FaInstagram, FaLinkedin, FaFacebookF, FaHeart, FaMapMarkerAlt, FaPhone, FaEnvelope, FaArrowRight, FaTimes } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import Lottie from "lottie-react";
import confetti from "../../../public/animations/confetti.json";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const developerUrl = "https://github.com/uddiGitHub";
  const founderUrl = "about_us";
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  // State for modals
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isCookieOpen, setIsCookieOpen] = useState(false);

  // Cookie consent banner visibility – only shown after mount if no consent
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check localStorage only on the client after mount
    const stored = localStorage.getItem('cookieConsent');
    if (stored !== 'accepted' && stored !== 'rejected') {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowBanner(false);
  };

  const handleAcceptFromModal = () => {
    acceptCookies();
    closeAllModals();
  };

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

  // Prevent body scroll when any modal is open
  useEffect(() => {
    if (isPrivacyOpen || isTermsOpen || isCookieOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isPrivacyOpen, isTermsOpen, isCookieOpen]);

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
    { label: "Volunteer", url: "#" },
    { label: "Donate", url: "#" },
    { label: "Events", url: "#" },
    { label: "Gallery", url: "#" },
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

  // Function to close all modals
  const closeAllModals = () => {
    setIsPrivacyOpen(false);
    setIsTermsOpen(false);
    setIsCookieOpen(false);
  };

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
              {/* Privacy Policy button */}
              <button
                onClick={() => {
                  closeAllModals();
                  setIsPrivacyOpen(true);
                }}
                className={styles.legalLinkButton}
              >
                Privacy Policy
              </button>
              <span className={styles.separator}>|</span>
              {/* Terms of Service button */}
              <button
                onClick={() => {
                  closeAllModals();
                  setIsTermsOpen(true);
                }}
                className={styles.legalLinkButton}
              >
                Terms of Service
              </button>
              <span className={styles.separator}>|</span>
              {/* Cookie Policy button */}
              <button
                onClick={() => {
                  closeAllModals();
                  setIsCookieOpen(true);
                }}
                className={styles.legalLinkButton}
              >
                Cookie Policy
              </button>
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

      {/* Cookie Consent Banner – only shown after mount if no consent */}
      {showBanner && (
        <div className={styles.cookieBanner}>
          <div className={styles.cookieBannerContent}>
            <p className={styles.cookieBannerText}>
              We use cookies to enhance your browsing experience and analyze our traffic. 
              By clicking "Accept", you consent to our use of cookies. 
              <button 
                onClick={() => {
                  closeAllModals();
                  setIsCookieOpen(true);
                }} 
                className={styles.cookiePolicyLink}
              >
                Learn more
              </button>
            </p>
            <button onClick={acceptCookies} className={styles.cookieAcceptButton}>
              Accept
            </button>
          </div>
        </div>
      )}

      {/* Privacy Policy Modal */}
      {isPrivacyOpen && (
        <div className={styles.modalOverlay} onClick={closeAllModals}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.modalCloseButton}
              onClick={closeAllModals}
              aria-label="Close privacy policy"
            >
              <FaTimes />
            </button>
            <h2>Privacy Policy</h2>
            <div className={styles.modalBody}>
              <p><strong>Last Updated: 28 February 2026</strong></p>
              <p>
                This Privacy Policy explains how Maanki Umeed ("we", "our", or "us") collects, uses, and protects information when you visit our website <a href="https://www.maankiumeed.com" target="_blank" rel="noopener noreferrer">https://www.maankiumeed.com</a>.
              </p>

              <h3>1. Information We Collect</h3>
              <p>We do not require users to create accounts or log in to access our website.</p>
              <p>However, we may collect limited technical information automatically when you visit our website, including:</p>
              <ul>
                <li>IP address</li>
                <li>Browser type and version</li>
                <li>Device type and operating system</li>
                <li>Pages visited and time spent</li>
                <li>Referring website</li>
                <li>Date and time of access</li>
              </ul>
              <p>This information is collected through Google Analytics and Vercel Speed Insights for performance monitoring and website improvement.</p>

              <h3>2. Google Analytics</h3>
              <p>We use Google Analytics to understand how visitors interact with our website. Google Analytics uses cookies to collect anonymous information such as:</p>
              <ul>
                <li>How often users visit the site</li>
                <li>Which pages they view</li>
                <li>Where they came from (referral source)</li>
              </ul>
              <p>Google Analytics collects only the IP address assigned to you on the date you visit, not your name or other identifying information. We do not combine the information collected through Google Analytics with personally identifiable information.</p>
              <p>Google’s ability to use and share information collected by Google Analytics about your visits to this site is restricted by the <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">Google Analytics Terms of Use</a> and the <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a>.</p>
              <p>You can opt out of Google Analytics by installing the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out Browser Add-on</a>.</p>

              <h3>3. Performance Monitoring (Vercel Speed Insights)</h3>
              <p>We use Vercel Speed Insights to analyze website speed and technical performance. This tool collects aggregated performance data and does not collect personally identifiable information. It helps us improve website speed and user experience.</p>

              <h3>4. How We Use Information</h3>
              <p>We use collected information to:</p>
              <ul>
                <li>Maintain and improve website functionality</li>
                <li>Analyze website traffic and usage patterns</li>
                <li>Optimize website performance and speed</li>
                <li>Ensure website security</li>
                <li>Diagnose technical issues</li>
              </ul>
              <p>We do not sell, rent, or trade personal information.</p>

              <h3>5. Cookies</h3>
              <p>Our website uses cookies for analytics and essential functions. For detailed information, please review our <button onClick={() => { closeAllModals(); setIsCookieOpen(true); }} className={styles.inlineLink}>Cookie Policy</button>.</p>

              <h3>6. Third-Party Services</h3>
              <p>We use Google Analytics and Vercel as third-party service providers. These services may process limited technical data necessary for analytics, hosting, security, and performance. We do not use advertising networks, marketing tracking tools, or behavioral profiling systems.</p>

              <h3>7. Data Security</h3>
              <p>We implement reasonable technical and organizational measures to protect information from unauthorized access, misuse, or disclosure. However, no method of internet transmission is 100% secure.</p>

              <h3>8. Data Retention</h3>
              <p>We retain technical data only as long as necessary for operational, security, and performance purposes. Google Analytics data is retained for 26 months.</p>

              <h3>9. Your Rights</h3>
              <p>Depending on your location (including under India's Digital Personal Data Protection Act, 2023 or other applicable laws), you may have rights to:</p>
              <ul>
                <li>Request access to your personal data</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Withdraw consent (where applicable)</li>
              </ul>
              <p>To exercise these rights, contact us using the details below.</p>

              <h3>10. Changes to This Policy</h3>
              <p>We may update this Privacy Policy periodically. Updates will be posted on this page with a revised “Last Updated” date.</p>

              <h3>11. Contact Us</h3>
              <p>If you have questions about this Privacy Policy, please contact:</p>
              <p>📧 <a href="mailto:maankiumeed2020@gmail.com">maankiumeed2020@gmail.com</a></p>
            </div>
            <div className={styles.modalFooter}>
              <button
                className={styles.modalAcceptButton}
                onClick={closeAllModals}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Terms of Service Modal */}
      {isTermsOpen && (
        <div className={styles.modalOverlay} onClick={closeAllModals}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.modalCloseButton}
              onClick={closeAllModals}
              aria-label="Close terms of service"
            >
              <FaTimes />
            </button>
            <h2>Terms and Conditions</h2>
            <div className={styles.modalBody}>
              <p><strong>Last Updated: 28 February 2026</strong></p>
              <p>
                Welcome to Maanki Umeed ("we", "our", or "us").
              </p>
              <p>
                By accessing or using our website <a href="https://www.maankiumeed.com" target="_blank" rel="noopener noreferrer">https://www.maankiumeed.com</a>, you agree to comply with and be bound by the following Terms and Conditions. If you do not agree, please do not use this website.
              </p>

              <h3>1. Use of Website</h3>
              <p>This website is provided for informational and general purposes only.</p>
              <p>You agree to use the website:</p>
              <ul>
                <li>Lawfully and ethically</li>
                <li>Without violating any applicable laws</li>
                <li>Without attempting to disrupt or damage the website</li>
              </ul>
              <p>You must not:</p>
              <ul>
                <li>Attempt to hack or interfere with website functionality</li>
                <li>Use the website for fraudulent or unlawful purposes</li>
                <li>Copy or misuse content without permission</li>
              </ul>

              <h3>2. Intellectual Property</h3>
              <p>All content on this website, including but not limited to:</p>
              <ul>
                <li>Text</li>
                <li>Images</li>
                <li>Logos</li>
                <li>Design</li>
                <li>Layout</li>
              </ul>
              <p>is the property of Maanki Umeed, unless otherwise stated.</p>
              <p>You may not reproduce, distribute, or reuse any content without prior written permission.</p>

              <h3>3. No User Accounts</h3>
              <p>We do not require users to create accounts or log in. You are not required to provide personal information to browse this website.</p>

              <h3>4. Third-Party Services and Analytics</h3>
              <p>Our website uses Google Analytics and Vercel services for analytics and performance monitoring. These services may collect anonymous usage data as described in our Privacy and Cookie Policies. By using our website, you consent to the processing of data by these third parties in accordance with their respective policies.</p>

              <h3>5. Disclaimer</h3>
              <p>The content on this website is provided for general informational purposes only.</p>
              <p>We make no warranties or representations regarding:</p>
              <ul>
                <li>Accuracy</li>
                <li>Completeness</li>
                <li>Reliability</li>
                <li>Availability</li>
              </ul>
              <p>Your use of the website is at your own risk.</p>

              <h3>6. Limitation of Liability</h3>
              <p>To the fullest extent permitted by law, Maanki Umeed shall not be liable for:</p>
              <ul>
                <li>Any direct or indirect damages</li>
                <li>Data loss</li>
                <li>Website unavailability</li>
                <li>Technical issues</li>
              </ul>
              <p>arising from the use of this website.</p>

              <h3>7. Privacy and Cookies</h3>
              <p>Your use of this website is also governed by our:</p>
              <ul>
                <li><button onClick={() => { closeAllModals(); setIsPrivacyOpen(true); }} className={styles.inlineLink}>Privacy Policy</button></li>
                <li><button onClick={() => { closeAllModals(); setIsCookieOpen(true); }} className={styles.inlineLink}>Cookie Policy</button></li>
              </ul>
              <p>Please review those documents for details on how we handle data, including the use of Google Analytics.</p>

              <h3>8. Changes to These Terms</h3>
              <p>We may update these Terms and Conditions at any time. Updates will be posted on this page with a revised "Last Updated" date.</p>

              <h3>9. Governing Law</h3>
              <p>These Terms shall be governed by and interpreted in accordance with the laws of India.</p>
              <p>Any disputes arising from the use of this website shall be subject to the jurisdiction of the courts of India.</p>

              <h3>10. Contact Information</h3>
              <p>If you have any questions regarding these Terms and Conditions, please contact:</p>
              <p>📧 <a href="mailto:maankiumeed2020@gmail.com">maankiumeed2020@gmail.com</a></p>
            </div>
            <div className={styles.modalFooter}>
              <button
                className={styles.modalAcceptButton}
                onClick={closeAllModals}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cookie Policy Modal */}
      {isCookieOpen && (
        <div className={styles.modalOverlay} onClick={closeAllModals}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.modalCloseButton}
              onClick={closeAllModals}
              aria-label="Close cookie policy"
            >
              <FaTimes />
            </button>
            <h2>Cookie Policy</h2>
            <div className={styles.modalBody}>
              <p><strong>Last Updated: 28 February 2026</strong></p>
              <p>
                This Cookie Policy explains how Maanki Umeed ("we", "our", or "us") uses cookies and similar technologies when you visit our website <a href="https://www.maankiumeed.com" target="_blank" rel="noopener noreferrer">https://www.maankiumeed.com</a>.
              </p>

              <h3>1. What Are Cookies?</h3>
              <p>Cookies are small text files stored on your device when you visit a website. They help websites function properly and improve user experience.</p>

              <h3>2. Cookies We Use</h3>
              <p>We use the following categories of cookies:</p>
              
              <p><strong>a) Essential Cookies</strong><br />These cookies are required for basic website functionality, including page navigation and security. Without these cookies, certain parts of the website may not function correctly.</p>
              
              <p><strong>b) Analytics Cookies (Google Analytics)</strong><br />We use Google Analytics to collect anonymous information about how visitors use our website. These cookies help us understand:</p>
              <ul>
                <li>Number of visitors and page views</li>
                <li>Which pages are most popular</li>
                <li>How users navigate through the site</li>
                <li>Approximate geographic location (by IP address)</li>
                <li>Technology used (browser, device, operating system)</li>
              </ul>
              <p>Google Analytics sets cookies such as <code>_ga</code>, <code>_gid</code>, and <code>_gat</code>. These cookies are used to distinguish users, throttle request rates, and generate analytics data. Information collected is anonymized and does not personally identify you.</p>
              <p>You can learn more about Google Analytics cookies and how to opt out at:</p>
              <ul>
                <li><a href="https://developers.google.com/analytics/devguides/collection/analyticsjs/cookie-usage" target="_blank" rel="noopener noreferrer">Google Analytics Cookie Usage</a></li>
                <li><a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out Browser Add-on</a></li>
              </ul>
              
              <p><strong>c) Performance Monitoring (Vercel Speed Insights)</strong><br />We use Vercel Speed Insights provided by Vercel to monitor website performance and loading speed. This tool may set cookies or use similar technologies to collect aggregated, anonymous performance data. It does not collect personally identifiable information and is not used for advertising.</p>

              <h3>3. No Advertising or Marketing Cookies</h3>
              <p>We do not use advertising cookies, third-party marketing trackers, behavioral profiling technologies, or social media tracking pixels.</p>

              <h3>4. Managing Cookies</h3>
              <p>You can control or disable cookies through your browser settings. Most browsers allow you to:</p>
              <ul>
                <li>View stored cookies</li>
                <li>Delete individual or all cookies</li>
                <li>Block future cookies</li>
              </ul>
              <p>Please note that disabling essential cookies may affect the functionality of the website. Disabling analytics cookies will not affect your ability to use the site but will prevent us from improving it based on your usage.</p>
              <p>You can also opt out of Google Analytics completely by installing the browser add-on linked above.</p>

              <h3>5. Third-Party Services</h3>
              <p>Our website uses Google Analytics and Vercel services. These third parties may set their own cookies or similar technologies. Please refer to their respective privacy policies for more information:</p>
              <ul>
                <li><a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a></li>
                <li><a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">Vercel Privacy Policy</a></li>
              </ul>

              <h3>6. Changes to This Policy</h3>
              <p>We may update this Cookie Policy from time to time. Any updates will be posted on this page with a revised "Last Updated" date.</p>

              <h3>7. Contact Us</h3>
              <p>If you have any questions about this Cookie Policy, please contact us at:</p>
              <p>📧 <a href="mailto:maankiumeed2020@gmail.com">maankiumeed2020@gmail.com</a></p>
            </div>
            <div className={styles.modalFooter}>
              <button
                className={styles.modalAcceptButton}
                onClick={handleAcceptFromModal}
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default React.memo(Footer);