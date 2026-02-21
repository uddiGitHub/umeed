'use client';
import { useState } from "react";
import styles from "./posting.module.css";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
// import { CategoryCombobox } from "@/components/ui/Combobox";

export default function NewsletterPosting() {
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const categories = [
    { value: "tech", label: "Technology" },
    { value: "health", label: "Health" },
    { value: "sports", label: "Sports" },
    { value: "education", label: "Education" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    if (!category || !file) {
      setError("Please fill all fields.");
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append("category", category);
    formData.append("file", file);

    try {
      const response = await fetch("/api/pdf", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Submission failed");

      setShowModal(true);
      setCategory("");
      setFile(null);
    } catch (err) {
      console.error(err);
      setError(err.message || "An error occurred during submission.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.containerNewsletterPosting}>
      <h1 className={styles.heading}>Newsletter Posting</h1>

      {error && <div className={styles.error}>{error}</div>}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <Label htmlFor="category">
            Category 
          </Label>
          <Input
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Enter category"
          />
        </div>


        <div className={styles.field}>
          <label>
            Upload File <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className={styles.input}
            accept=".pdf,.doc,.docx,.txt"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={styles.button}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <span className={styles.loader}></span>
              Submitting...
            </span>
          ) : (
            "Submit Newsletter"
          )}
        </button>
      </form>
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalBox}>
            <h2>Success!</h2>
            <p>Newsletter submitted successfully.</p>
            <button onClick={() => window.location.reload()} className={styles.modalButton}>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
