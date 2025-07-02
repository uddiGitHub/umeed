"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import styles from "./posting.module.css";
import { useAuth } from "@clerk/nextjs";

// Tiptap imports
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Placeholder from '@tiptap/extension-placeholder'

import { MenuBar } from "../ui/MenuBar";


export default function ArticlePosting() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { getToken } = useAuth();
  const [author, setAuthor] = useState("UMEED");

  // Initialize Tiptap editor
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
        bulletList: {
          HTMLAttributes: {
            class: 'list-disc pl-4',
          },
        },
        listItem: {
          HTMLAttributes: {
            class: 'list-item',
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: 'list-decimal pl-4',
          },
        },
      }),
      Underline,
      Placeholder.configure({
        placeholder: 'Write your post content here...',
      }),
    ],
    content: "",
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const token = await getToken();
      if (!token) {
        setError("Missing authentication token");
        return;
      }

      const response = await fetch("/api/postitem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, category, content, img: image, author }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to create post");
      }

      // router.push(`/admin/posts/${result._id}`); //later change this when edit article feature is implemented
      router.push("/pages/articles");

    } catch (err) {
      setError(err.message);
      console.error("Submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.containerArticlePosting}>
        <h2 className={styles.heading}>Create New Article Post</h2>

        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <Label htmlFor="title">Title <span className="text-red-500">*</span></Label>
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
            <Label htmlFor="content">Content <span className="text-red-500">*</span></Label>

            <div className="border rounded-lg">
              <MenuBar editor={editor} />
              <EditorContent
                editor={editor}
                className={`p-4 min-h-[200px] border-t focus:outline-none ${styles.editorContent}`}
                style={{ minHeight: '200px' }}
              />
            </div>
          </div>

          <div className={styles.field}>
            <Label htmlFor="author">Author</Label>
            <Input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Default author UMEED"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={styles.button}
            id="submit-post-button"
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
    </div>
  );
}
