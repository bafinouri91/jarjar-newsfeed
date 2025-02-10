import './App.css';
import data, { update } from './data';
import JarJarNewsfeed from './components/newsfeed';
import GlobalStyle from './GlobalStyles'; // این خط جدید اضافه شده
import styled from 'styled-components';
import React, { useState } from 'react';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

export default function App() {
  const [updates, setUpdates] = useState(data.updates);
  const [commentReactions, setCommentReactions] = useState({});
  


  const handleAddUpdate = (text) => {
    const newUpdate = update('User', text, '');
    setUpdates((prevUpdates) => [newUpdate, ...prevUpdates]);
    // پست جدید به ابتدای لیست اضافه شود
  };

  const handleAddComment = (postId, text) => {
    if (!text.trim()) return; // جلوگیری از کامنت خالی

    const newComment = {
      id: Math.random().toString(36).substr(2, 9),
      by: 'User',
      text: text.trim(),
      created: Date.now(),
      imageSrc: '',
      reactions: {},
    };

    setUpdates((prevUpdates) =>
      prevUpdates.map((update) =>
        update.id === postId
          ? { ...update, comments: [...update.comments, newComment] }
          : update,
      ),
    );
  };

  const handleReaction = (postId, reactionType) => {
    setUpdates((prevUpdates) =>
      prevUpdates.map((update) =>
        update.id === postId
          ? {
              ...update,
              reactions: {
                ...update.reactions,
                [reactionType]: update.reactions[reactionType] + 1,
              },
            }
          : update,
      ),
    );
  };

  const handleCommentReaction = (commentId, reaction) => {
    setCommentReactions((prev) => ({
      ...prev,
      [commentId]: prev[commentId]
        ? {
            ...prev[commentId],
            [reaction]: (prev[commentId][reaction] || 0) + 1,
          }
        : { [reaction]: 1 },
    }));
  };
  return (
    <>
      <GlobalStyle /> {/* استایل‌های کلی اعمال می‌شوند */}
      <Container>
        <JarJarNewsfeed
          title="Jar Jar Newsfeed"
          updates={updates}
          onAddUpdate={handleAddUpdate}
          onAddComment={handleAddComment}
          onReact={handleReaction}
          commentReactions={commentReactions} // ارسال ری‌اکشن‌ها
          onReactToComment={handleCommentReaction} // ارسال تابع مدیریت ری‌اکشن‌ها
        />
      </Container>
    </>
  );
}
