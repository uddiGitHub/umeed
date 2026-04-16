"use client";

import { useState, useEffect } from "react";
import ArticleList from "./ArticleList";
import NewsletterList from "./NewsletterList";
import ArticlePosting from "../posting/articalPosting";
import NewsletterPosting from "../posting/newsletterPosting";

export default function AdminContent({ type }) {
  const [view, setView] = useState("list"); // 'list', 'add', 'edit'
  const [editingItem, setEditingItem] = useState(null);

  // Reset view when type changes
  useEffect(() => {
    setView("list");
    setEditingItem(null);
  }, [type]);

  const handleAddNew = () => {
    setEditingItem(null);
    setView("add");
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setView("edit");
  };

  const handleCancel = () => {
    setView("list");
    setEditingItem(null);
  };

  if (type === "article") {
    if (view === "list") {
      return <ArticleList onAddNew={handleAddNew} onEdit={handleEdit} />;
    }
    return <ArticlePosting initialData={editingItem} onCancel={handleCancel} />;
  }

  if (type === "newsletter") {
    if (view === "list") {
      return <NewsletterList onAddNew={handleAddNew} />;
    }
    return <NewsletterPosting onCancel={handleCancel} />;
  }

  return null;
}
