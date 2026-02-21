// pdfViewer.jsx
'use client';
import { useState, useEffect } from 'react';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import styles from './pdfViewer.module.css';

// Icons
const FileIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
    <polyline points="13 2 13 9 20 9" />
  </svg>
);

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export default function PdfViewer() {
  const [pdfData, setPdfData] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const limit = 9; // Show more items per page for grid layout
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const fetchPdfs = async (page = 1) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/pdf?page=${page}&limit=${limit}&sort=uploadDate&order=desc`);
      const data = await response.json();
      if (data.success) {
        setPdfData(data.data);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error('Failed to fetch PDFs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPdfs(page);
  }, [page]);

  const totalPages = pagination.totalPages || 1;
  const currentPage = pagination.page || 1;

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const openModal = (pdf) => {
    setSelectedPdf(pdf);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedPdf(null);
  };

  if (!loading && pdfData.length === 0) {
    return (
      <div className={styles.noContent}>
        <svg className={styles.noIcon} viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
        <h3>No newsletters available</h3>
        <p>Please check back later.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.pageTitle}>Newsletter Archive</h2>

      {loading ? (
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Loading documents...</p>
        </div>
      ) : (
        <>
          <div className={styles.grid}>
            {pdfData.map((pdf) => (
              <div
                key={pdf._id}
                className={styles.card}
                onClick={() => openModal(pdf)}
              >
                <div className={styles.cardIcon}>
                  <FileIcon />
                </div>
                <div className={styles.cardInfo}>
                  <h3 className={styles.cardTitle}>{pdf.filename}</h3>
                  <p className={styles.cardMeta}>
                    <ClockIcon />
                    {new Date(pdf.uploadDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                    {pdf.metadata?.category && (
                      <span className={styles.category}>{pdf.metadata.category}</span>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className={styles.pagination}>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={styles.pageButton}
              >
                Previous
              </button>
              <span className={styles.pageInfo}>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={styles.pageButton}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      {/* Modal */}
      {modalOpen && selectedPdf && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>{selectedPdf.filename}</h3>
              <button className={styles.closeButton} onClick={closeModal}>
                <CloseIcon />
              </button>
            </div>
            <div className={styles.modalBody}>
              <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                <Viewer
                  fileUrl={`/api/pdf/${selectedPdf._id}`}
                  plugins={[defaultLayoutPluginInstance]}
                />
              </Worker>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}