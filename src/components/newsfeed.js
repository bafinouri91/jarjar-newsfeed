import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  NewsfeedContainer,
  Title,
  AddPostContainer,
  Input,
  AddButton,
  UpdatesContainer,
  UpdateBubble,
  PostHeader,
  ProfileImage,
  ReactionsContainer,
  CommentBubble,
  AddCommentContainer,
  CommentInput,
  ReactionButton,
} from './StyledComponents';

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
                <ProfileImage src={update.imageSrc} alt={update.by} />
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
                        <ProfileImage
                          src={comment.imageSrc || '/jarjar.jpg'}
                          alt={comment.by}
                        />
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
