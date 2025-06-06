import connectDB from "../../../../../config/db";
import PostItem from "../../../../../models/postItem";
import { notFound } from "next/navigation";
import mongoose from "mongoose";
import Image from "next/image";
import styles from "./typography.module.css";
import ArticleInteractive from "@/components/ui/articleInteractive";

export default async function ArticlePage({ params }) {
  const { id } = await params;

  // Connect to the database
  await connectDB();
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return notFound();
  }

  // Fetching the article from the database
  const article = await PostItem.findById(id).lean();
  if (!article) {
    notFound();
  }


  return (
    <div className={styles.container}>
      <article className={styles.article}>
        <header className={styles.header}>
          <h1 className={styles.title}>{article.title}</h1>
        </header>

        {article.img && (
          <div className={styles.heroImage}>
            <Image
              src={article.img}
              alt={article.title}
              layout="fill"
              objectFit="cover"
              priority
            />
          </div>
        )}

        <div className={styles.content}>
          {article.content.split('\n\n').map((paragraph, i) => (
            <p key={i} className={styles.paragraph}>{paragraph}</p>
          ))}
        </div>

        {/* <div className={styles.inContentImages}>
          {article.inContentImg1 && (
            <div className={styles.imageWrapper}>
              <Image
                src={article.inContentImg1}
                alt="Article content image 1"
                layout="fill"
                objectFit="contain"
              />
            </div>
          )}
          {article.inContentImg2 && (
            <div className={styles.imageWrapper}>
              <Image
                src={article.inContentImg2}
                alt="Article content image 2"
                layout="fill"
                objectFit="contain"
              />
            </div>
          )}
        </div> */}
        <div className={styles.meta}>
          <span className={styles.date}>
            {new Date(article.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <span className={styles.author}>-By {article.author}</span>
        </div>
      </article>

      {/* <ArticleInteractive 
        // article={article}
        articleId={id} 
        initialLikes={article.likes || 0} 
        initialComments={article.comments || []} 
      /> */}
    </div>
  );
}