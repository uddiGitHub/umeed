"use client";

import { Suspense, useTransition } from 'react';
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./articles.module.css";
import Image from "next/image";
import parse from 'html-react-parser';

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
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ArticlesContent />
        </Suspense>
    );
}

function ArticlesContent() {
    const router = useRouter();
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isNavigating, startNavigation] = useTransition();

    const searchParams = useSearchParams();
    const searchQuery = searchParams.get('search') || '';
    // const [totalCount, setTotalCount] = useState(0);
    const postsPerPage = 8;

    const fetchArticles = async () => {
        try {
            setLoading(true);
            const url = `/api/postitem?page=${currentPage}&limit=${postsPerPage}&search=${encodeURIComponent(searchQuery)}`;
            const response = await fetch(url);
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
    }, [currentPage, searchQuery]);

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
        if (Array.isArray(content)) {
            let plainText = '';
            content.forEach(block => {
                if (block._type === 'block' && block.children) {
                    block.children.forEach(child => {
                        if (child.text) {
                            plainText += child.text + ' ';
                        }
                    });
                }
            });
            plainText = plainText.trim();
            return plainText.length <= maxLength
                ? plainText
                : plainText.substring(0, maxLength) + "...";
        }
        if (typeof content === 'string') {
            const plainText = content.replace(/<[^>]*>/g, '');
            return plainText.length <= maxLength
                ? plainText
                : plainText.substring(0, maxLength) + "...";
        }
        return typeof content === 'string'
            ? (content.length <= maxLength ? content : content.substring(0, maxLength) + "...")
            : "";
    };
    const clearSearch = () => {
        router.push('/pages/articles');
    };
    const navigateToArticle = (id) => {
        startNavigation(() => {
            router.push(`/pages/articles/${id}/`);
        });
    };

    return (
        <div className={styles.container}>
            {isNavigating && (
                <div className={styles.navigationOverlay}>
                    <div className={styles.navigationSpinner}></div>
                </div>
            )}
            <div className={styles.hero}>
                <div className={styles.heroContent}>
                    {/* <h1>Our Latest Articles</h1> */}
                </div>
            </div>
            <div className={styles.searchControls}>
                {searchQuery && (
                    <div className={styles.searchStatus}>
                        <p>Showing results for: "{searchQuery}"</p>
                        <button onClick={clearSearch} className={styles.clearSearch}>
                            Clear search
                        </button>
                    </div>
                )}
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
                                <article key={article._id} onClick={() => navigateToArticle(article._id)} className={styles.articleCard}>
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
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    navigateToArticle(article._id);
                                                }}
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
                                            href={`/pages/articles?search=${encodeURIComponent(searchQuery)}&page=${page}`}
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
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={styles.noArticlesIcon}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <h3>No articles available</h3>
                        <p>Check back later for new content</p>
                    </div>
                )}
            </section>
        </div>
    );
}