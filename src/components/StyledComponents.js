import styled from 'styled-components';
import { motion } from 'framer-motion';



// **Styled Components**
export const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  color: #B0C4DE; /* طوسی آبی ملایم */
text-shadow: 0px 0px 10px #00BFFF, 0px 0px 20px #4682B4;

  margin-top: 20px;
  letter-spacing: 2px;
  font-family: 'StarJedi', sans-serif;
`;

export const NewsfeedContainer = styled.div`
  background: transparent;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

export const UpdatesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 80%;
  max-width: 900px;
  margin: 0 auto;
`;

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

export const AddPostContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px auto;
  padding: 10px;
  background: rgba(0, 0, 0, 0.5); /* پس‌زمینه مشکی شفاف */
  border-radius: 10px;
  width: 50%;
`;

export const Input = styled.input`
  width: 80%;
  padding: 10px;
  font-size: 1.2rem;
  border: none;
  border-radius: 5px;
  outline: none;
`;

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

export const AddCommentContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

export const CommentInput = styled.input`
  flex: 1;
  padding: 8px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const ReactionButton = motion.create(styled.button`
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

export const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

export const PostHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const ReactionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin-top: 10px;
`;
