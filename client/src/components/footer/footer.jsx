import React from 'react';
import styles from './footer.module.css';
import { FaInstagram, FaLinkedin, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const developerUrl = "https://github.com/uddiGitHub";
  const founderrUrl = "#";

  const socialLinks = [
    {
      icon: <FaInstagram aria-hidden="true" />,
      label: "Instagram",
      url: "#",
    },
    {
      icon: <FaLinkedin aria-hidden="true" />,
      label: "LinkedIn",
      url: "#",
    },
    {
      icon: <FaXTwitter aria-hidden="true" />,
      label: "Twitter",
      url: "#",
    },
  ];

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <img
            src="./src/assets/logo-transparent-copy.png"
            alt="Umeed Foundation Logo"
            className={styles.logo}
            width={150}
            height={40}
            loading="lazy"
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
          <p>
            &copy; {currentYear} Umeed. All rights reserved.
          </p>
          <p>
            Founded by{" "}<a
              href={founderrUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.developerLink}
            >Sagarika Deka</a>
          </p>
          <p>
            Website designed and developed by{" "}
            <a
              href={developerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.developerLink}
            >
              uddiGitHub
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);