'use client';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext, PaginationEllipsis } from '@/components/ui/pagination';
import { useState, useEffect } from 'react';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

// Custom SVG Icons
const FolderIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
  </svg>
);

const FileIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
    <polyline points="13 2 13 9 20 9" />
  </svg>
);

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const DocumentIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

export default function PdfViewer() {
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [pdfData, setPdfData] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const limit = 5;
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const fetchPdfs = async (page = 1) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/pdf?page=${page}&limit=${limit}&sort=uploadDate&order=desc`);
      const data = await response.json();
      if (data.success) {
        setPdfData(data.data);
        setPagination(data.pagination);
        if (data.data.length > 0 && !selectedPdf) {
          setSelectedPdf(data.data[0]);
        }
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

  const getExcerpt = (content, maxLength = 10) => {
    if (!content) return '';
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + "...";
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  if (!loading && pdfData.length === 0) {
    return (
      <div className="noContent">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="noIcon"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd"
          />
        </svg>
        <h3>No newsletters available</h3>
        <p>Please check back later.</p>
      </div>
    );
  }

  return (
    <div className="container">
      <aside className="sidebar">
        <div className="sidebarHeader">
          <h2 className="heading">
            <span className="icon">
              <FolderIcon />
            </span>
            Documents
          </h2>
          {/* <div className="countBadge">{pagination.totalDocs || 0} files</div> */}
        </div>
        
        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading PDFs...</p>
          </div>
        ) : (
          <div className="cardList">
            {pdfData.map((pdf) => (
              <div
                key={pdf._id}
                onClick={() => setSelectedPdf(pdf)}
                className={`card ${selectedPdf?._id === pdf._id ? 'activeCard' : ''}`}
              >
                <div className="cardHeader">
                  <span className="fileIcon">
                    <FileIcon />
                  </span>
                  <h3 className="title">{getExcerpt(pdf.filename, 35)}</h3>
                </div>
                <p className="meta">
                  <span className="metaIcon">
                    <ClockIcon />
                  </span>
                  {new Date(pdf.uploadDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                  {pdf.metadata?.category && (
                    <span className="category">{pdf.metadata.category}</span>
                  )}
                </p>
              </div>
            ))}
          </div>
        )}
      </aside>

      <section className="viewerSection">
        <div className="viewerContainer">
          {selectedPdf ? (
            <>
              <div className="viewerHeader">
                <h2 className="viewerTitle">{selectedPdf.filename}</h2>
                <div className="viewerMeta">
                  <span>
                    <ClockIcon /> Uploaded: {new Date(selectedPdf.uploadDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="pdfViewerWrapper">
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                  <Viewer
                    fileUrl={`/api/pdf/${selectedPdf._id}`}
                    plugins={[defaultLayoutPluginInstance]}
                  />
                </Worker>
              </div>
            </>
          ) : !loading && pdfData.length > 0 ? (
            <div className="emptyState">
              <DocumentIcon className="emptyIcon" />
              <h3>Select a Document</h3>
              <p>Choose a newsletter from the archive to preview</p>
            </div>
          ) : null}
        </div>

        {pdfData.length > 0 && (
          <Pagination className="pagination">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(currentPage - 1);
                  }}
                  disabled={currentPage === 1}
                  className="pageButton"
                />
              </PaginationItem>

              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map((pg) => (
                <PaginationItem key={pg}>
                  <PaginationLink
                    href="#"
                    isActive={pg === currentPage}
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(pg);
                    }}
                    className="pageButton"
                  >
                    {pg}
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
                  className="pageButton"
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </section>

      <style jsx>{`
        /* No Content State */
        .noContent {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 50vh;
          text-align: center;
          padding: 50px 0;
          background: #f9fafb;
          border-radius: 10px;
          border: 1px solid #e5e7eb;
          margin: 1rem 0;
        }

        .noIcon {
          width: 3rem;
          height: 3rem;
          color: #ef4444;
          margin-bottom: 1rem;
        }

        .noContent h3 {
          font-size: 1.5rem;
          margin: 20px 0 10px;
          color: #1f2937;
          font-weight: 600;
        }

        .noContent p {
          color: #6b7280;
          font-size: 1.05rem;
          max-width: 500px;
          line-height: 1.5;
        }

        /* Main Container */
        .container {
          display: grid;
          grid-template-columns: 1fr 4fr;
          gap: 1.5rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        @media (max-width: 768px) {
          .container {
            grid-template-columns: 1fr;
          }
        }

        /* Sidebar */
        .sidebar {
          background: #fff;
          border-radius: 0.5rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          border: 1px solid #e5e7eb;
          padding: 1.25rem;
          height: fit-content;
        }

        .sidebarHeader {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 1rem;
          border-bottom: 1px solid #e5e7eb;
          margin-bottom: 1rem;
        }

        .heading {
          font-size: 1.25rem;
          font-weight: 600;
          color: #1f2937;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin: 0;
        }

        .icon {
          display: flex;
          align-items: center;
        }

        .countBadge {
          background: #f3f4f6;
          color: #4b5563;
          font-size: 0.8rem;
          font-weight: 500;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
        }

        .cardList {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .card {
          padding: 1rem;
          border-radius: 0.5rem;
          border: 1px solid #e5e7eb;
          transition: all 0.2s ease;
          cursor: pointer;
          background: #f9fafb;
        }

        .card:hover {
          background: #f3f4f6;
          border-color: #d1d5db;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
        }

        .activeCard {
          background: #fef3c7;
          border-color: #f59e0b;
          box-shadow: 0 4px 10px rgba(245, 158, 11, 0.1);
        }

        .cardHeader {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.5rem;
        }

        .fileIcon {
          color: #3182ce;
          flex-shrink: 0;
          display: flex;
          align-items: center;
        }

        .title {
          font-weight: 500;
          color: #1f2937;
          font-size: 1rem;
          margin: 0;
          line-height: 1.4;
        }

        .meta {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          color: #6b7280;
          margin: 0;
        }

        .metaIcon {
          flex-shrink: 0;
          display: flex;
          align-items: center;
        }

        .category {
          background: #fffbeb;
          color: #b45309;
          font-size: 0.75rem;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          margin-left: auto;
          font-weight: 500;
        }

        /* Loading State */
        .loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 300px;
          gap: 1rem;
        }

        .spinner {
          border: 4px solid rgba(0, 0, 0, 0.1);
          border-left-color: #f59e0b;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* Viewer Section */
        .viewerSection {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .viewerContainer {
          background-color: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 0.5rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          padding: 1.5rem;
          height: 75vh;
          display: flex;
          flex-direction: column;
        }

        .viewerHeader {
          padding-bottom: 1rem;
          margin-bottom: 1rem;
          border-bottom: 1px solid #e5e7eb;
        }

        .viewerTitle {
          font-size: 1.5rem;
          font-weight: 600;
          margin: 0 0 0.5rem;
          color: #1f2937;
        }

        .viewerMeta {
          font-size: 0.9rem;
          color: #6b7280;
          display: flex;
          gap: 1.5rem;
        }

        .pdfViewerWrapper {
          flex-grow: 1;
          overflow: hidden;
          border-radius: 0.375rem;
        }

        .emptyState {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          color: #9ca3af;
          font-size: 1rem;
          text-align: center;
          padding: 2rem;
        }

        .emptyIcon {
          width: 48px;
          height: 48px;
          color: #d1d5db;
          margin-bottom: 1rem;
        }

        /* Pagination */
        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.75rem;
          margin-top: 1rem;
        }

        .pageButton {
          padding: 0.5rem 1rem;
          border-radius: 0.375rem;
          background-color: #f9fafb;
          color: #4b5563;
          font-size: 0.875rem;
          font-weight: 500;
          transition: all 0.2s;
          border: 1px solid #e5e7eb;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .pageButton:hover {
          background-color: #f3f4f6;
          border-color: #d1d5db;
        }

        .pageButton[disabled] {
          background-color: #f3f4f6;
          color: #9ca3af;
          cursor: not-allowed;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .viewerContainer {
            height: 60vh;
            padding: 1rem;
          }
          
          .pagination {
            flex-wrap: wrap;
            gap: 0.5rem;
          }
          
          .viewerTitle {
            font-size: 1.2rem;
          }
          
          .viewerMeta {
            flex-direction: column;
            gap: 0.25rem;
          }
        }

        @media (max-width: 480px) {
          .card {
            padding: 0.75rem;
          }
          
          .heading {
            font-size: 1.1rem;
          }
          
          .viewerTitle {
            font-size: 1.1rem;
          }
        }
      `}</style>
    </div>
  );
}