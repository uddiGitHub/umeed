"use client";

import React from 'react';

const MenuBar = ({ editor }) => {
    if (!editor) return null;

    return (
        <div className="flex flex-wrap gap-1 p-2 border-b bg-white rounded-t-lg shadow-sm">
            {/* Headings */}
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={`p-2 rounded-md ${editor.isActive('heading', { level: 1 })
                    ? 'bg-blue-100 text-blue-700 border border-blue-300'
                    : 'hover:bg-gray-100'}`}
                title="Heading 1"
            >
                <span className="font-bold text-lg">H1</span>
            </button>

            <button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={`p-2 rounded-md ${editor.isActive('heading', { level: 2 })
                    ? 'bg-blue-100 text-blue-700 border border-blue-300'
                    : 'hover:bg-gray-100'}`}
                title="Heading 2"
            >
                <span className="font-bold text-base">H2</span>
            </button>

            <button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                className={`p-2 rounded-md ${editor.isActive('heading', { level: 3 })
                    ? 'bg-blue-100 text-blue-700 border border-blue-300'
                    : 'hover:bg-gray-100'}`}
                title="Heading 3"
            >
                <span className="font-bold text-sm">H3</span>
            </button>

            {/* Text styling */}
            <div className="border-l border-gray-300 mx-1"></div>

            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`p-2 rounded-md ${editor.isActive('bold')
                    ? 'bg-blue-100 text-blue-700 border border-blue-300'
                    : 'hover:bg-gray-100'}`}
                title="Bold"
            >
                <strong>B</strong>
            </button>

            <button
                type="button"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`p-2 rounded-md ${editor.isActive('italic')
                    ? 'bg-blue-100 text-blue-700 border border-blue-300'
                    : 'hover:bg-gray-100'}`}
                title="Italic"
            >
                <em>I</em>
            </button>

            <button
                type="button"
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={`p-2 rounded-md ${editor.isActive('underline')
                    ? 'bg-blue-100 text-blue-700 border border-blue-300'
                    : 'hover:bg-gray-100'}`}
                title="Underline"
            >
                <u>U</u>
            </button>

            <button
                type="button"
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className={`p-2 rounded-md ${editor.isActive('strike')
                    ? 'bg-blue-100 text-blue-700 border border-blue-300'
                    : 'hover:bg-gray-100'}`}
                title="Strikethrough"
            >
                <s>S</s>
            </button>

            {/* Lists */}
            <div className="border-l border-gray-300 mx-1"></div>

            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`p-2 rounded-md ${editor.isActive('bulletList')
                    ? 'bg-blue-100 text-blue-700 border border-blue-300'
                    : 'hover:bg-gray-100'}`}
                title="Bullet List"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M8 4h13v2H8V4zM4.5 6.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 7a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 6.9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM8 11h13v2H8v-2zm0 7h13v2H8v-2z" />
                </svg>
            </button>

            <button
                type="button"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`p-2 rounded-md ${editor.isActive('orderedList')
                    ? 'bg-blue-100 text-blue-700 border border-blue-300'
                    : 'hover:bg-gray-100'}`}
                title="Numbered List"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M8 4h13v2H8V4zM5 3v3h1v1H3V6h1V4H3V3h2zM3 14v-2.5h2V11H3v-1h3v2.5H4v.5h2v1H3zm2 5.5H3v-1h2V18H3v-1h3v4H3v-1h2v-.5zM8 11h13v2H8v-2zm0 7h13v2H8v-2z" />
                </svg>
            </button>
        </div>
    );
};

export { MenuBar };