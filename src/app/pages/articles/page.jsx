"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./articles.module.css";
import Image from "next/image";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function ArticlesPage() {
    const router = useRouter();
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    // const [totalCount, setTotalCount] = useState(0);
    const postsPerPage = 6;

    const fetchArticles = async () => {
        try {
            setLoading(true);
            const response = await fetch(`/api/postitem?page=${currentPage}&limit=${postsPerPage}`);
            if (!response.ok) {
                throw new Error("Failed to fetch articles");
            }
            const data = await response.json();
            setArticles(data.posts || []);
            setTotalPages(data.totalPages);
            // setTotalCount(data.totalCount);
        } catch (error) {
            console.error("Error fetching articles:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchArticles();
    }, [currentPage]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const getExcerpt = (content, maxLength = 100) => {
        if (content.length <= maxLength) return content;
        return content.substring(0, maxLength) + "...";
    };

    return (
        <div className={styles.container}>
            <div className={styles.hero}>
                <div className={styles.heroContent}>
                    <h1>Our Latest Articles</h1>
                    <p>Gender, Equality, Q(LGBTAI)+ and Bla blah</p>
                </div>
            </div>

            {/* Article Content */}
            <section className={styles.mainContent}>
                {loading ? (
                    <div className={styles.loading}>
                        <div className={styles.spinner}></div>
                        <p>Loading articles...</p>
                    </div>
                ) : articles.length > 0 ? (
                    <>
                        <div className={styles.articlesGrid}>
                            {articles.map((article) => (
                                <article key={article._id} className={styles.articleCard}>
                                    {article.img && (
                                        <div className={styles.imageContainer}>
                                            <Image
                                                src={article.img}
                                                alt={article.title}
                                                fill
                                                className={styles.articleImage}
                                                sizes="(max-width: 768px) 80vw, (max-width: 1200px) 50vw, 33vw"
                                            />
                                            <span className={styles.category}>{article.category || "General"}</span>
                                        </div>
                                    )}
                                    <div className={styles.articleContent}>

                                        <h2 className="scroll-m-20 text-left text-2xl font-bold tracking-tight text-balance">{article.title}</h2>
                                        <p className={styles.excerpt}>{getExcerpt(article.content)}</p>
                                        <div className={styles.meta}>
                                            <button
                                                onClick={() => router.push(`/articles/${article._id}`)}
                                                className={styles.readMore}
                                            >
                                                Read More
                                            </button>
                                            <div className={styles.metaArticleInfo}>
                                                <span className={styles.date}>{formatDate(article.createdAt)}</span>
                                                <span className={styles.author}>By {article.author || "Unknown"}</span>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>

                        {/* Pagination */}
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handlePageChange(currentPage - 1);
                                        }}
                                        disabled={currentPage === 1}
                                    />
                                </PaginationItem>

                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                    <PaginationItem key={page}>
                                        <PaginationLink
                                            href="#"
                                            isActive={currentPage === page}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handlePageChange(page);
                                            }}
                                        >
                                            {page}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}

                                {totalPages > 5 && currentPage < totalPages - 2 && (
                                    <PaginationItem>
                                        <PaginationEllipsis />
                                    </PaginationItem>
                                )}

                                <PaginationItem>
                                    <PaginationNext
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handlePageChange(currentPage + 1);
                                        }}
                                        disabled={currentPage === totalPages}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </>
                ) : (
                    <div className={styles.noArticles}>
                        <Image
                            src="/images/no-articles.png"
                            alt="No articles"
                            width={300}
                            height={200}
                        />
                        <h3>No articles available</h3>
                        <p>Check back later for new content</p>
                    </div>
                )}
            </section>
        </div>
    );
}