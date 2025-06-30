import PdfViewer from '@/components/pdfViewer';
import styles from './newsletter.module.css';

export default function Newsletter() {
  return (
    <div className={styles.wrapper}>
      <header className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Yearly Newsletters</h1>
          {/* <p>
            Browse our community updates and reports
          </p> */}
        </div>
      </header>

      <PdfViewer />
    </div>
  );
}
