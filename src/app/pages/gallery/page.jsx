"use client";

import { useState, useEffect } from "react";
import styles from "./gallery.module.css";

export default function GalleryPage() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    async function fetchImages() {
      try {
        const res = await fetch("/api/gallery-images");

        if (!res.ok) throw new Error("Failed to fetch images");

        const data = await res.json();
        setImages(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchImages();
  }, []);

  // keyboard navigation
  useEffect(() => {
    function handleKey(e) {
      if (selectedIndex === null) return;

      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "Escape") setSelectedIndex(null);
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  const nextImage = () => {
    setSelectedIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  if (loading) {
    return (
      <div className={styles.loader}>
        <div className={styles.spinner}></div>
        <p>Loading gallery...</p>
      </div>
    );
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  return (
    <main className={styles.galleryPage}>
      <div className={styles.header}>
        <h1>Gallery</h1>
        <p>Moments from our journey</p>
      </div>

      {images.length === 0 ? (
        <div className={styles.empty}>
          <p>No images found</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {images.map((img, index) => (
            <div
              key={img.id}
              className={styles.card}
              onClick={() => setSelectedIndex(index)}
            >
              <div className={styles.imageWrapper}>
                <img
                  src={img.thumbnail}
                  alt={img.name}
                  className={styles.image}
                  loading="lazy"
                />
              </div>

              <div className={styles.overlay}>
                <span>{img.name.replace(/\.[^/.]+$/, "")}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {selectedIndex !== null && (
        <div
          className={styles.modal}
          onClick={() => setSelectedIndex(null)}
        >
          <span className={styles.close}>&times;</span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            style={{
              position: "absolute",
              left: "30px",
              fontSize: "40px",
              color: "white",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            ‹
          </button>

          <img
            className={styles.modalContent}
            src={images[selectedIndex].full}
            alt={images[selectedIndex].name}
          />

          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            style={{
              position: "absolute",
              right: "30px",
              fontSize: "40px",
              color: "white",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            ›
          </button>

          <div className={styles.caption}>
            {images[selectedIndex].name}
          </div>
        </div>
      )}
    </main>
  );
}