import PdfViewer from '@/components/pdfViewer';
import styles from './newsletter.module.css';
// import newsletterImg from '../../../../public/newsletterPoster.jpg';

export default function Newsletter() {
  return (
    <div className={styles.wrapper}>
      <header className={styles.hero}>
        {/* <img src={newsletterImg} alt="article image" /> */}
        <div className={styles.heroContent}>
          {/* <h1>Yearly Newsletters</h1> */}
        </div>
      </header>

      <PdfViewer />
    </div>
  );
}