import PropTypes from 'prop-types';
import styled from 'styled-components';
import React, { useState } from 'react';
import { AnimatePresence, motion } from "framer-motion";

// import ViewUpdate from './view-update'
// import AddUpdate from './add-update'

export default function JarJarNewsfeed({
  title,
  updates,
  onAddUpdate,
  onAddComment,
  onReact,
  commentReactions,
  onReactToComment,
}) {
  const [openComments, setOpenComments] = useState({});
  const [newComments, setNewComments] = useState({});

  const reactions = [
    { type: 'like', emoji: '❤️' },
    { type: 'love', emoji: '👍' },
    { type: 'wow', emoji: '🤯' },
    { type: 'laugh', emoji: '😆' },
  ];

  return (
    <NewsfeedContainer>
      <Title>{title} - Newsfeed</Title>

      {/* فرم اضافه کردن پیام جدید */}
      <AddPostContainer>
        <Input type="text" placeholder="What’s new?" id="newUpdateInput" />
        <AddButton
          onClick={() => {
            const inputElement = document.getElementById('newUpdateInput');
            if (inputElement instanceof HTMLInputElement) {
              const text = inputElement.value.trim();
              if (text) {
                onAddUpdate(text);
                inputElement.value = '';
              }
            }
          }}
        >
          Add
        </AddButton>
      </AddPostContainer>

      {/* نمایش لیست پیام‌ها */}
      <UpdatesContainer>
      <AnimatePresence>
        {updates.map((update) => (
          <UpdateBubble
            key={update.id}
            layout // 👈 این باعث می‌شه آپدیت جدید انیمیشن بگیره
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <h3>{update.by}</h3>
            <p>{update.text}</p>

            {/* دکمه نمایش کامنت‌ها */}
            <button
              onClick={() =>
                setOpenComments((prev) => ({
                  ...prev,
                  [update.id]: !prev[update.id],
                }))
              }
            >
              {openComments[update.id] ? 'Hide Comments' : 'View Comments'}
            </button>
            {/* Reaction buttons */}
            <div className="reactions">
              {reactions.map(({ type, emoji }) => (
                <ReactionButton
                  key={type}
                  onClick={() => onReact(update.id, type)}
                >
                  {emoji} {update.reactions?.[type] || 0}
                </ReactionButton>
              ))}
            </div>
            {/* show / hide comments*/}
            {openComments[update.id] && (
              <CommentsContainer>
                {update.comments.map((comment) => (
                  <CommentBubble key={comment.id}>
                    <h4>{comment.by}</h4>
                    <p>{comment.text}</p>

                    {/* نمایش دکمه‌های ری‌اکشن برای هر کامنت */}
                    <div className="comment-reactions">
                      {reactions.map(({ type, emoji }) => (
                        <ReactionButton
                          key={type}
                          onClick={() => onReactToComment(comment.id, type)}
                        >
                          {emoji} {commentReactions?.[comment.id]?.[type] || 0}
                        </ReactionButton>
                      ))}
                    </div>
                  </CommentBubble>
                ))}

                {/* فرم برای اضافه کردن کامنت جدید */}
                <AddCommentContainer>
                  <CommentInput
                    type="text"
                    placeholder="Write a comment..."
                    value={newComments[update.id] || ''}
                    onChange={(e) =>
                      setNewComments((prev) => ({
                        ...prev,
                        [update.id]: e.target.value,
                      }))
                    }
                  />
                  <AddCommentButton
                    onClick={() =>
                      onAddComment(update.id, newComments[update.id])
                    }
                  >
                    Add
                  </AddCommentButton>
                </AddCommentContainer>
              </CommentsContainer>
            )}
          </UpdateBubble>
        ))}
        </AnimatePresence>
      </UpdatesContainer>
    </NewsfeedContainer>
  );
}

// **Prop Types**
JarJarNewsfeed.propTypes = {
  onAddUpdate: PropTypes.func.isRequired,
  updates: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  ).isRequired,
  title: PropTypes.string.isRequired,
};

// **Styled Components**
const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  text-align: center;
  color: #ffcc00;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.8);
  margin-top: 20px;
  letter-spacing: 2px;
  font-family: 'StarJedi', sans-serif;
`;

const NewsfeedContainer = styled.div`
  background: transparent;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const UpdatesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 80%;
  max-width: 900px;
  margin: 0 auto;
`;

const UpdateBubble = motion.create(styled.div`
  background: rgba(255, 255, 255, 0.4);
  border-radius: 15px;
  padding: 15px;
  margin: 10px 0;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(5px);
  width: 100%;
  font-size: 1.2rem;
`);

const AddPostContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px auto;
  padding: 10px;
  background: rgba(0, 0, 0, 0.5); /* پس‌زمینه مشکی شفاف */
  border-radius: 10px;
  width: 50%;
`;

const Input = styled.input`
  width: 80%;
  padding: 10px;
  font-size: 1.2rem;
  border: none;
  border-radius: 5px;
  outline: none;
`;

const AddButton = styled.button`
  padding: 10px 20px;
  margin-left: 10px;
  font-size: 1.2rem;
  font-weight: bold;
  background: #ffcc00; /* رنگ طلایی */
  color: black;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'StarJhol', sans-serif;
  cursor: pointer;

  &:hover {
    background: #ffaa00; /* رنگ طلایی تیره‌تر هنگام هاور */
  }
`;

const CommentsContainer = styled.div`
  margin-top: 15px;
  padding: 15px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  width: 95%;
`;

const CommentBubble = styled.div`
  background: white;
  padding: 8px;
  border-radius: 8px;
  margin-bottom: 5px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
`;

const AddCommentContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const CommentInput = styled.input`
  flex: 1;
  padding: 8px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const AddCommentButton = styled.button`
  padding: 8px 12px;
  font-size: 1rem;
  font-weight: bold;
  background: #ffcc00;
  color: black;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #ffaa00;
  }
`;

const ReactionButton = motion.create(styled.button`
  background-color: #ffcc00;
  border: none;
  border-radius: 10px;
  padding: 5px 10px;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #ffaa00;
    transform: scale(1.1);
  }
`);
