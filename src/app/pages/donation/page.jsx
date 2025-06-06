"use client";

import { HandCoins } from "lucide-react";

export default function Donation() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-lg w-full text-center border border-gray-200">
        <div className="flex justify-center mb-4">
          <div className="bg-pink-100 text-pink-600 p-3 rounded-full">
            <HandCoins className="w-6 h-6" />
          </div>
        </div>
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Donation Page Under Construction
        </h1>
        <p className="text-gray-600 mb-6">
          This masterpiece of generosity is still under construction. 
          Because We’re still deciding how to take your money — credit card, crypto, or emotional manipulation.
        </p>
        <button
          disabled
          className="bg-gray-300 cursor-not-allowed text-white font-medium px-6 py-2 rounded-full"
        >
          Throw Money Later
        </button>
        <p className="text-xs text-gray-400 mt-4 italic">
          We promise your generous donation will definitely go to pure, honest, 100% non-corrupt social work — right after we decide whether the donate button should sparkle or sing.
        </p>
      </div>
    </div>
  );
}