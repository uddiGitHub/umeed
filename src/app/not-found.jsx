"use client";
import React from "react";
import Lottie from "lottie-react";
import error404 from "../../public/animations/error404.json";
import styles from "./notFound.module.css";

export default function NotFound() {
  return (
    <main className={styles.notFoundSection}>
      <div className={styles.container}>
        <div className={styles.animationWrapper}>
          <Lottie animationData={error404} loop className={styles.animation} />
        </div>

        <div className={styles.textContent}>
          <div className={styles.errorBadge}>
            <span>404 — Page Not Found</span>
          </div>

          <h1 className={styles.title}>We couldn’t find that page.</h1>
          <p className={styles.subtitle}>
            The page you’re looking for might have been moved, deleted, or never
            existed. If you think this is a mistake, please contact support.
          </p>

          <div className={styles.buttonGroup}>
            <a href="/" className={styles.primaryButton}>
              Return to Home
            </a>
            <a href="/pages/contact" className={styles.secondaryButton}>
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
