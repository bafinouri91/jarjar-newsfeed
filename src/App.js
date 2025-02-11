import './App.css';
import data from './data';
import JarJarNewsfeed from './components/newsfeed';
import GlobalStyle from './GlobalStyles';
import styled from 'styled-components';
import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';


//Styled container for the main app component
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;


export default function App() {
  const [updates, setUpdates] = useState(data.updates); // State for storing the list of updates
  const [commentReactions, setCommentReactions] = useState({}); // State for managing reactions on comments

  // Function to handle adding a new update
  const handleAddUpdate = (text) => {
    if (!text.trim()) return; // Prevent adding empty updates

    const newUpdate = {
      id: uuid(),
      by: 'User', // Default user attribution
      text,
      imageSrc: '/jarjar.jpg', // Default image for new updates
      reactions: { like: 0, love: 0, wow: 0, laugh: 0 },
      comments: [],
      created: Date.now(),
    };
    setUpdates((prevUpdates) => [newUpdate, ...prevUpdates]); // Add the new update at the beginning of the list
  };
  
  // Function to handle adding a new comment to a specific post
  const handleAddComment = (postId, text) => {
    if (!text.trim()) return;

    const newComment = {
      id: uuid(),
      by: 'User',
      text: text.trim(),
      created: Date.now(),
      imageSrc: '',
      reactions: {},
    };

    setUpdates((prevUpdates) =>
      prevUpdates.map((update) =>
        update.id === postId
          ? { ...update, comments: [...update.comments, newComment] } // Append new comment to the existing array of comments
          : update,
      ),
    );
  };

   // Function to handle adding reactions to an update
  const handleReaction = (postId, reactionType) => {
    setUpdates((prevUpdates) =>
      prevUpdates.map((update) =>
        update.id === postId
          ? {
              ...update,
              reactions: {
                ...update.reactions,
                [reactionType]: (update.reactions[reactionType] || 0) + 1,
              },
            }
          : update,
      ),
    );
  };

  
  
  // Function to handle adding reactions to a comment
  const handleCommentReaction = (commentId, reaction) => {
    setCommentReactions((prev) => ({
      ...prev,
      [commentId]: {
        ...prev[commentId],
        [reaction]: (prev[commentId]?.[reaction] || 0) + 1,
      },
    }));
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <JarJarNewsfeed
          title="Jar Jar Newsfeed"
          updates={updates}
          onAddUpdate={handleAddUpdate}
          onAddComment={handleAddComment}
          onReact={handleReaction}
          commentReactions={commentReactions}
          onReactToComment={handleCommentReaction}
        />
      </Container>
    </>
  );
}
