"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import styles from "./articlePosting.module.css";

export default function ArticlePosting() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/postitem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          category,
          content,
          img: image,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create post");
      }

      const result = await response.json();
      router.push(`/admin/posts/${result.post._id}`);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Create New Article Post</h2>

      {error && <div className={styles.error}>{error}</div>}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Enter post title"
          />
        </div>

        <div className={styles.field}>
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Enter category"
          />
        </div>

        <div className={styles.field}>
          <Label htmlFor="image">Image URL</Label>
          <Input
            id="image"
            type="url"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div className={styles.field}>
          <Label htmlFor="content">Content *</Label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={10}
            placeholder="Write your post content here..."
            style={{ minHeight: "200px" }}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={styles.button}
        >
          {isSubmitting ? (
            <>
              <Loader2 className={styles.loader} />
              Creating Post...
            </>
          ) : (
            "Create Post"
          )}
        </button>
      </form>
    </div>
  );
}
