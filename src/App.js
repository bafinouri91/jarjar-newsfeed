import React, {useCallback, useState,} from 'react'
import './App.css'
import data, {update } from './data'
import JarJarNewsfeed from './components/newsfeed'
import GlobalStyle from "./GlobalStyles"; // این خط جدید اضافه شده
import styled from "styled-components";


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;



export default function App() {
  const [updates, setUpdates] = useState(data.updates);

  const handleAddUpdate = useCallback((text) => {
    const newUpdate = update("User", text, "");
    setUpdates([newUpdate, ...updates]);
  }, [updates]);

  const handleAddComment = (postId, text) => {
    if (!text.trim()) return; // جلوگیری از کامنت خالی
  
    const newComment = {
      id: Math.random().toString(36).substr(2, 9),
      by: "User",
      text: text.trim(),
      created: Date.now(),  
      imageSrc: ""
    };
  
    setUpdates((prevUpdates) =>
      prevUpdates.map((update) =>
        update.id === postId
          ? { ...update, comments: [...update.comments, newComment] }
          : update
      )
    );
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
        />
      </Container>
    </>
  );
  
}


