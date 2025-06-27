'use client';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext, PaginationEllipsis } from '@/components/ui/pagination';


import { useState, useEffect } from 'react';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import styles from './pdfViewer.module.css';

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
        if (content.length <= maxLength) return content;
        return content.substring(0, maxLength) + "...";
    };

    if (!loading && pdfData.length === 0) {
        return (
            <div className={styles.noContent}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={styles.noIcon}
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

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    return (
        <div className={styles.container}>
            <aside>
                <h2 className={styles.heading}>Newsletters</h2>
                {loading ? (
                    <div className={styles.loading}>
                        <div className={styles.spinner}></div>
                        <p>Loading PDFs...</p>
                    </div>
                ) : (
                    pdfData.map((pdf) => (
                        <div
                            key={pdf._id}
                            onClick={() => setSelectedPdf(pdf)}
                            className={`${styles.card} ${selectedPdf?._id === pdf._id ? styles.activeCard : ''}`}
                        >
                            <h3 className={styles.title}>{getExcerpt(pdf.filename)}</h3>
                            <p className={styles.meta}>
                                {new Date(pdf.uploadDate).toLocaleDateString()} •{' '}
                                <span className={styles.category}>{pdf.metadata?.category}</span>
                            </p>
                        </div>
                    ))
                )}
            </aside>

            <section className={styles.viewerSection}>
                <div className={styles.viewerContainer}>
                    {selectedPdf ? (
                        <>
                            <h2 className={styles.viewerTitle}>{selectedPdf.filename}</h2>
                            <div className={styles.pdfViewerWrapper}>
                                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                                    <Viewer
                                        fileUrl={`/api/pdf/${selectedPdf._id}`}
                                        plugins={[defaultLayoutPluginInstance]}
                                    />
                                </Worker>
                            </div>
                        </>
                    ) : !loading && pdfData.length > 0 ? (
                        <div className={styles.emptyState}>Select a newsletter to view</div>
                    ) : null}
                </div>

                {pdfData.length > 0 && (
                    <Pagination className="mt-6">
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handlePageChange(currentPage - 1);
                                    }}
                                    disabled={currentPage === 1}
                                />
                            </PaginationItem>

                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
                                <PaginationItem key={pg}>
                                    <PaginationLink
                                        href={`?page=${pg}`}
                                        isActive={pg === currentPage}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handlePageChange(pg);
                                        }}
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
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                )}
            </section>
        </div>
    );
}
