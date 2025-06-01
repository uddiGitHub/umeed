"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./articles.module.css";

export default function ArticlesPage() {
    const router = useRouter();
    const [articles, setArticles] = useState([]);

    const fetchArticles = async () => {
        try {
            const response = await fetch("/api/postitem");
            if (!response.ok) {
                throw new Error("Failed to fetch articles");
            }
            const data = await response.json();
            setArticles(data);
        } catch (error) {
            console.error("Error fetching articles:", error);
        }
    };
    useEffect(() => {
        fetchArticles();
    }, []);

    return (
        <>
        <section id="article" className={styles.container}>
            <div>
                {articles && articles.length > 0 ? (
                    articles.map((item) => (
                        <div key={item.id} className={styles.article}>
                            <h2>{item.title}</h2>
                            <p>{item.content}</p>
                            <button onClick={() => router.push(`/articles/${item.id}`)}>Read More</button>
                        </div>
                    ))
                ) : (
                    <p>No articles available.</p>
                )}
            </div>
        </section>
        </>
    );
}