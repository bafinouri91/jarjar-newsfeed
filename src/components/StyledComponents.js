import styled from 'styled-components';
import { motion } from 'framer-motion';

// **Styled Components**

// Styling for the main title of the newsfeed
export const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  color: #b0c4de;
  text-shadow:
    0px 0px 10px #00bfff,
    0px 0px 20px #4682b4;

  margin-top: 20px;
  letter-spacing: 2px;
  font-family: 'StarJedi', sans-serif;
`;

// Main container for the newsfeed, styled to be centrally aligned with padding and rounded corners
export const NewsfeedContainer = styled.div`
  background: transparent;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

// Container for individual updates, using a column layout to display a list of posts with consistent spacing
export const UpdatesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 80%;
  max-width: 900px;
  margin: 0 auto;
`;

// Styling for individual Updates bubbles with translucency and shadow for a distinct, elevated look
export const UpdateBubble = motion.create(styled.div`
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

// Container for adding new updates, styled to be central with modern aesthetics and functionality
export const AddPostContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px auto;
  padding: 10px;
  background: rgba(0, 0, 0, 0.5); 
  border-radius: 10px;
  width: 50%;
`;

// Input field styling with no border and adequate padding for ease of text entry
export const Input = styled.input`
  width: 80%;
  padding: 10px;
  font-size: 1.2rem;
  border: none;
  border-radius: 5px;
  outline: none;
`;

// Button for submitting new posts or comments, styled with transparency and hover effects to indicate interactivity
export const AddButton = styled.button`
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

// Styling for comment bubbles, using translucency and shadow to distinctively separate from the main content
export const CommentBubble = styled(motion.div)`
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

// Container for the comment addition area, structured to accommodate input elements and submission buttons adequately
export const AddCommentContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

// Input field for comments, styled minimally to focus on functionality and user ease
export const CommentInput = styled.input`
  flex: 1;
  padding: 8px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

// Buttons for updates reactions, styled as circles with hover effects to enhance user interaction visual feedback
export const ReactionButton = motion.create(styled.button`
  background: rgba(255, 255, 255, 0.2); 
  border: 1px solid rgba(255, 255, 255, 0.3);
  border: none;
  border-radius: 50px; 
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
    background: rgba(255, 255, 255, 0.4); 
    transform: scale(1.1); 
  }
`);

// Profile image styling, circular to maintain visual consistency and user recognition
export const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;


// Styling for the header of each post, including user name and profile image, structured for clear visibility and emphasis
export const PostHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: bold;
  margin-bottom: 10px;
`;


// Container for reaction buttons, laid out horizontally with evenly spaced elements for a clean look
export const ReactionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin-top: 10px;
`;
