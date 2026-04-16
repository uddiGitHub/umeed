"use client";

import { useState, useEffect } from "react";
import { Loader2, Plus, Edit, Trash2 } from "lucide-react";
import { useAuth } from "@clerk/nextjs";

export default function ArticleList({ onAddNew, onEdit }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { getToken } = useAuth();
  const [deletingId, setDeletingId] = useState(null);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      // Just fetching 50 for now, could add pagination UI later if needed.
      const res = await fetch("/api/postitem?limit=50");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load articles");
      setArticles(data.posts || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this article? This action cannot be undone.")) return;
    
    setDeletingId(id);
    try {
      const token = await getToken();
      const res = await fetch(`/api/postitem/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete");
      }
      // Remove from UI
      setArticles(articles.filter(a => a._id !== id));
    } catch (err) {
      alert("Error deleting article: " + err.message);
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="animate-spin text-gray-500 w-8 h-8" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Articles</h2>
        <button
          onClick={onAddNew}
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition shadow-sm"
        >
          <Plus size={18} /> Add New Article
        </button>
      </div>

      {error ? (
        <div className="bg-red-50 text-red-600 p-4 rounded-md">{error}</div>
      ) : articles.length === 0 ? (
        <div className="bg-gray-50 text-center py-10 rounded-md border text-gray-500">
          No articles found. Create your first one!
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b text-gray-600 text-sm">
                  <th className="p-4 font-medium">Title</th>
                  <th className="p-4 font-medium">Category</th>
                  <th className="p-4 font-medium">Author</th>
                  <th className="p-4 font-medium">Date</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y text-sm">
                {articles.map((article) => (
                  <tr key={article._id} className="hover:bg-gray-50 transition">
                    <td className="p-4 font-medium text-gray-900 max-w-xs truncate">
                      {article.title}
                    </td>
                    <td className="p-4 text-gray-600">
                      <span className="bg-gray-100 px-2 py-1 rounded text-xs">
                        {article.category || "Uncategorized"}
                      </span>
                    </td>
                    <td className="p-4 text-gray-600">{article.author}</td>
                    <td className="p-4 text-gray-500 text-xs">
                      {new Date(article.createdAt || article.date).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => onEdit(article)}
                          disabled={deletingId === article._id}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition disabled:opacity-50"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(article._id)}
                          disabled={deletingId === article._id}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition disabled:opacity-50"
                          title="Delete"
                        >
                          {deletingId === article._id ? (
                            <Loader2 size={18} className="animate-spin" />
                          ) : (
                            <Trash2 size={18} />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
