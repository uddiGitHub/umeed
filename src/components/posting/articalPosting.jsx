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
import TextAlign from '@tiptap/extension-text-align'
import Color from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'

import { MenuBar } from "../ui/MenuBar";


export default function ArticlePosting({ initialData, onCancel }) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [category, setCategory] = useState(initialData?.category || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [image, setImage] = useState(initialData?.img || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { getToken } = useAuth();
  const [author, setAuthor] = useState(initialData?.author || "UMEED");

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
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      TextStyle,
      Color,
      Placeholder.configure({
        placeholder: 'Write your post content here...',
      }),
    ],
    content: initialData?.content || "",
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

      const isEditing = !!initialData;
      const url = isEditing ? `/api/postitem/${initialData._id}` : "/api/postitem";
      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
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

      if (onCancel) {
        onCancel();
      } else {
        router.push("/pages/articles");
      }

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
        <h2 className={styles.heading}>{initialData ? "Edit Article" : "Create New Article Post"}</h2>

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

          <div className="flex gap-4">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                disabled={isSubmitting}
                className={`${styles.button} !bg-gray-200 !text-black hover:!bg-gray-300`}
              >
                Cancel
              </button>
            )}
            <button
               type="submit"
               disabled={isSubmitting}
               className={styles.button}
               id="submit-post-button"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <Loader2 className={styles.loader} />
                  {initialData ? "Updating..." : "Creating Post..."}
                </span>
              ) : (
                initialData ? "Update Post" : "Create Post"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
