'use client';

import React from 'react';
import Image from 'next/image';
import styles from '@/components/footer/footer.module.css';
import { FaInstagram, FaLinkedin, FaXTwitter, FaFacebookF, FaDiscord } from "react-icons/fa6";
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
                <div className={styles.logoContainer}>
                    <Image
                        src="/Umeedlogo.png"
                        alt="Umeed Foundation Logo"
                        className={styles.logo}
                        width={150}
                        height={40}
                        priority={false}
                    />

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

                <div className={styles.copyright}>
                    <p>&copy; {currentYear} Umeed. All rights reserved.</p>
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
                    <p>
                        Website designed and developed by{" "}
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
        </footer>
    );
};

export default React.memo(Footer);
