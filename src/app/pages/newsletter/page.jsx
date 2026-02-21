import Image from "next/image";
import PdfViewer from '@/components/pdfViewer';
import styles from './newsletter.module.css';

export default function Newsletter() {
  return (
    <main className={styles.wrapper}>
      <header className={styles.hero}>
        <Image
          src="/newsletterPoster.webp"
          alt="Decorative banner image"
          fill
          priority
          className={styles.heroImage}
          sizes="100vw"
        />

        <div className={styles.heroOverlay}></div>

        <div className={styles.heroContent}>
          <h1>Yearly Newsletters</h1>
        </div>
      </header>

      <PdfViewer />
    </main>
  );
}