import connectDB from "../../../../../config/db";
import PostItem from "../../../../../models/postItem";
import { notFound } from "next/navigation";
import mongoose from "mongoose";
import Image from "next/image";
import styles from "./typography.module.css";
import ShareButton from "@/components/shareButton";
import ArticleInteractive from "@/components/ui/articleInteractive";
import parse from 'html-react-parser';

export default async function ArticlePage({ params }) {
  const { id } = await params;

  await connectDB();
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return notFound();
  }

  const article = await PostItem.findById(id).lean();
  if (!article) {
    notFound();
  }
  const wordCount = article.content ? article.content.split(/\s+/).length : 0;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));


  return (
    <div className={styles.container}>
      <article className={styles.article}>
        <header className={styles.header}>
          <div className={styles.categoryTag}>{article.category || "Industry Insights"}</div>
          <h1 className={styles.title}>{article.title}</h1>

          <div className={styles.metaContainer}>
            <div className={styles.authorInfo}>
              <div className={styles.authorName}>By {article.author}</div>
              <div className={styles.metaDivider}>•</div>
              <div className={styles.date}>
                {new Date(article.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </div>
              <div className={styles.metaDivider}>•</div>
              <div className={styles.readingTime}>{readingTime} min read</div>
            </div>

            <div className={styles.shareContainer}>
              <ShareButton title={article.title} />
            </div>

          </div>
        </header>

        {article.img && (
          <div className={styles.heroImage}>
            <Image
              src={article.img}
              alt={article.title}
              layout="responsive"
              width={1200}
              height={630}
              priority
              className={styles.heroImage}
            />
          </div>
        )}

        <div className={styles.content}>
          {parse(article.content)}
        </div>

        {/* <div className={styles.articleFooter}>
          <ArticleInteractive 
            articleId={id} 
            initialLikes={article.likes || 0} 
            initialComments={article.comments || []} 
          />
        </div> */}
      </article>
    </div>
  );
}