'use client';

import React from 'react';
import Image from 'next/image';
import styles from '@/components/footer/footer.module.css';
import { FaInstagram, FaLinkedin, FaFacebookF } from "react-icons/fa6";
import { BiLogoGmail } from "react-icons/bi";

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const developerUrl = "https://github.com/uddiGitHub";
    const founderUrl = "#";

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
                            <p className={styles.tagline}>Empowering communities through hope and actions.</p>
                        </div>
                        
                        
                    </div>

                    <div className={styles.linksContainer}>
                        <div className={styles.newsletter}>
                            <h3 className={styles.newsletterTitle}>Join Our Newsletter</h3>
                            <div className={styles.newsletterForm}>
                                <input 
                                    type="email" 
                                    placeholder="Your email address" 
                                    className={styles.newsletterInput}
                                    aria-label="Email for newsletter"
                                />
                                <button className={styles.newsletterButton}>Subscribe</button>
                            </div>
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
                    <p>&copy; {currentYear} Umeed. All rights reserved.</p>
                    
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
                </div>
            </div>
        </footer>
    );
};

export default React.memo(Footer);