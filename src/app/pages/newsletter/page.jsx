import Image from "next/image";
import PdfViewer from '@/components/pdfViewer';
import styles from './newsletter.module.css';

export default function Newsletter() {
  return (
    <div className={styles.wrapper}>
      <header className={styles.hero}>
        <Image
          src="/newsletterPoster.jpg"
          alt="Newsletter banner"
          fill
          priority
          className={styles.heroImage}
          sizes="100vw"
        />

        <div className={styles.heroOverlay}></div>

        <div className={styles.heroContent}>
          {/* <h1>Yearly Newsletters</h1> */}
        </div>
      </header>

      <PdfViewer />
    </div>
  );
}
