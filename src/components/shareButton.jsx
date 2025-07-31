"use client";
import { useEffect, useState } from "react";

export default function ShareButton({ title }) {
  const [canShare, setCanShare] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setCanShare(typeof window !== "undefined" && !!navigator.share);
  }, []);

  const handleShare = async () => {
    const url = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        // Shared successfully, nothing else to do
      } else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      if (err.name !== "AbortError") {
        console.error("Share failed:", err);
        alert("Failed to share the article.");
      }
      // Do nothing
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-sm rounded-full border border-gray-300 transition duration-200"
      title={canShare ? "Share this article" : "Copy link to clipboard"}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <circle cx="18" cy="5" r="3"></circle>
        <circle cx="6" cy="12" r="3"></circle>
        <circle cx="18" cy="19" r="3"></circle>
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
      </svg>
      {copied ? "Link Copied!" : "Share"}
    </button>
  );
}
