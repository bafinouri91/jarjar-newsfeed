import PropTypes from 'prop-types';
import styled from 'styled-components';
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';


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
                onAddUpdate({
                  text,
                  by: 'User',
                  imageSrc: '/jarjar.jpg',
                  id: Date.now().toString(),
                });
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
              {/* ✅ عکس پروفایل برای هر پست اضافه شد */}
              <PostHeader>
                <ProfileImage
                  src={update.imageSrc}
                  alt={update.by}
                />
                <h3>{update.by}</h3>
              </PostHeader>

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

              <ReactionsContainer>
                {reactions.map(({ type, emoji }) => (
                  <ReactionButton
                    key={type}
                    onClick={() => onReact(update.id, type)}
                  >
                    {emoji} {update.reactions?.[type] || 0}
                  </ReactionButton>
                ))}
              </ReactionsContainer>

              {/* show / hide comments*/}

              {openComments[update.id] && (
                <div>
                  {update.comments.map((comment) => (
                    <CommentBubble key={comment.id}>
                      <PostHeader>
                        <ProfileImage src={comment.imageSrc || '/jarjar.jpg'} alt={comment.by} />
                        <h4>{comment.by}</h4>
                      </PostHeader>
                      <p>{comment.text}</p>

                      {/* نمایش دکمه‌های ری‌اکشن برای هر کامنت */}

                      <ReactionsContainer>
                        {reactions.map(({ type, emoji }) => (
                          <ReactionButton
                            key={type}
                            onClick={() => onReactToComment(comment.id, type)}
                          >
                            {emoji}{' '}
                            {commentReactions?.[comment.id]?.[type] || 0}
                          </ReactionButton>
                        ))}
                      </ReactionsContainer>
                    </CommentBubble>
                  ))}
                </div>
              )}

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
                <AddButton
                  onClick={() =>
                    onAddComment(update.id, newComments[update.id])
                  }
                >
                  Add
                </AddButton>
              </AddCommentContainer>
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
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  color: #B0C4DE; /* طوسی آبی ملایم */
text-shadow: 0px 0px 10px #00BFFF, 0px 0px 20px #4682B4;

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
  max-width: 600px;
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
  background: rgba(0, 150, 255, 0.3);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  padding: 10px 15px;
  cursor: pointer;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease-in-out;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  font-size: 1rem;
  font-weight: bold;

  &:hover {
    background: rgba(0, 150, 255, 0.5);
    transform: scale(1.05);
  }
`;

const CommentBubble = styled(motion.div)`
  position: relative; /* بجای absolute */
  width: auto; /* اندازه متناسب با متن */
  max-width: 85%; /* تا زیادی بزرگ نشه */
  background: rgba(255, 255, 255, 0.3); /* شیشه‌ای تر و خواناتر */
  backdrop-filter: blur(10px);
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.3);
  margin-top: 10px; /* فاصله از پست اصلی */
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 5px;
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

const ReactionButton = motion.create(styled.button`
  background: rgba(255, 255, 255, 0.2); /* پس‌زمینه شیشه‌ای */
  border: 1px solid rgba(255, 255, 255, 0.3);
  border: none;
  border-radius: 50px; /* دایره‌ای شدن دکمه */
  padding: 5px 8px;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease-in-out;

  &:hover {
    background: rgba(255, 255, 255, 0.4); /* تغییر رنگ موقع هاور */
    transform: scale(1.1); /* کمی بزرگ‌تر شدن */
  }
`);

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

const PostHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const ReactionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin-top: 10px;
`;
