"use client";

import { useState } from 'react';
import styles from '@/app/pages/articles/[id]/typography.module.css';
// import {PostItem} from "../../../models/postItem";

export default function ArticleInteractive({ article, articleId, initialLikes, initialComments }) {
    const [likes, setLikes] = useState(initialLikes);
    const [comments, setComments] = useState(initialComments);
    const [newComment, setNewComment] = useState('');
    const [user, setUser] = useState('');
    const [isLiked, setIsLiked] = useState(false);


    const handleLike = async () => {
        const newLikes = isLiked ? likes - 1 : likes + 1;
        setLikes(newLikes);
        setIsLiked(!isLiked);

        try {
            await fetch(`/api/postitem/${articleId}/likes`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ likes: newLikes }),
            });
        } catch (error) {
            console.error('Error updating likes:', error);
            setLikes(likes);
            setIsLiked(isLiked);
        }

        // article.likes = newLikes;
        // likeUpdate = await article.save();
        // console.log(`Article ${article._id} likes updated to ${newLikes}`);

    };

    const handleSubmitComment = async (e) => {
        e.preventDefault();
        if (!newComment.trim() || !user.trim()) return;

        const commentData = {
            user,
            comment: newComment,
            date: new Date(),
        };

        try {
            const response = await fetch(`/api/postitem/${articleId}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(commentData),
            });

            if (response.ok) {
                const newCommentWithId = {
                    ...commentData,
                    _id: Math.random().toString(36).substr(2, 9), // Temp ID
                };
                setComments([...comments, newCommentWithId]);
                setNewComment('');
                setUser('');
            }
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    };




    return (
        <div className={styles.interactiveSection}>
            <div className={styles.likeSection}>
                <button
                    onClick={handleLike}
                    className={`${styles.likeButton} ${isLiked ? styles.liked : ''}`}
                    aria-label={isLiked ? 'Unlike article' : 'Like article'}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                    </svg>
                    <span className={styles.likeCount}>
                        {likes} {likes === 1 ? 'like' : 'likes'}
                    </span>
                </button>

            </div>

            <div className={styles.commentsSection}>
                <h2 className={styles.commentsHeading}>Comments ({comments.length})</h2>

                <form onSubmit={handleSubmitComment} className={styles.commentForm}>
                    <input
                        type="text"
                        placeholder="Your name"
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                        required
                        className={styles.inputField}
                    />
                    <textarea
                        placeholder="Add a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        required
                        className={`${styles.inputField} ${styles.commentInput}`}
                        rows={3}
                    />
                    <button type="submit" className={styles.submitButton}>Post Comment</button>
                </form>

                <div className={styles.commentsList}>
                    {comments.map((comment) => (
                        <div key={comment._id} className={styles.comment}>
                            <div className={styles.commentHeader}>
                                <span className={styles.commentUser}>{comment.user}</span>
                                <span className={styles.commentDate}>
                                    {new Date(comment.date).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric"
                                    })}
                                </span>
                            </div>
                            <p className={styles.commentText}>{comment.comment}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}