import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import moment from 'moment';
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

// Main component for rendering the newsfeed
export default function JarJarNewsfeed({
  title,
  updates,
  onAddUpdate,
  onAddComment,
  onReact,
  commentReactions,
  onReactToComment,
}) {
  const [openComments, setOpenComments] = useState({}); // State to manage the visibility of comments (show/hide)
  const [newComments, setNewComments] = useState({}); // State to hold new comment inputs

  const reactions = [
    { type: 'like', emoji: '❤️' },
    { type: 'love', emoji: '👍' },
    { type: 'wow', emoji: '🤯' },
    { type: 'laugh', emoji: '😆' },
  ]; // Predefined reactions for posts

  return (
    <NewsfeedContainer>
      <Title>{title} - Newsfeed</Title>

      {/* Container for adding new updates(posts) */}
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

      {/* Container for displaying list of updates */}
      <UpdatesContainer>
        <AnimatePresence>
          {updates.map((update) => (
            <UpdateBubble
              key={update.id}
              layout // Enable layout animation for each update
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
            >
              <PostHeader>
                <ProfileImage src={update.imageSrc} alt={update.by} />
                <h3>{update.by}</h3>
                <small>{moment(update.created).format('LLLL')}</small>
              </PostHeader>

              <p>{update.text}</p>
              {/* Show/Hide Comments button */}
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

              {/* Reaction buttons container */}
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
                        <small>{moment(comment.created).format('LLLL')}</small>
                      </PostHeader>
                      <p>{comment.text}</p>

                      {/* Container for comment reactions */}
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

              {/* Adding new comments container */}
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

// ** Prop Type validations **
JarJarNewsfeed.propTypes = {
  onAddUpdate: PropTypes.func.isRequired,
  updates: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  ).isRequired,
  title: PropTypes.string.isRequired,
};
