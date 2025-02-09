import React from 'react'
import PropTypes from 'prop-types'
import { update } from '../data'
import styled from "styled-components";


// import ViewUpdate from './view-update'
// import AddUpdate from './add-update'

export default function JarJarNewsfeed({title, updates, onAddUpdate}) {
  
  return (
    <NewsfeedContainer>
      <Title>{title} - Newsfeed</Title>
      
     {/* فرم اضافه کردن پیام جدید */}
     <AddUpdate>
     <input type="text" placeholder="What’s new?" id="newUpdateInput" />
     <button onClick={() => {
       const inputElement = document.getElementById('newUpdateInput');


       if (inputElement instanceof HTMLInputElement) {
           const text = inputElement.value.trim(); // حذف فاصله‌های اضافی
           if (text) {
               onAddUpdate(text);
               inputElement.value = ""; // بعد از اضافه کردن، فیلد را خالی کن
           }
       }
     }}>
      Add
        </button>
      </AddUpdate>

   {/* نمایش لیست پیام‌ها */}
   <UpdatesContainer>
     {updates.map(update => (
        <UpdateBubble key={update.id}> 
        <h3>{update.by}</h3>
        <p>{update.text}</p>
        <div className="reactions">
          <button>❤️</button>
          <button>👍</button>
          <button>🤯</button>
          <button>😆</button>
        </div>
      </UpdateBubble>
     ))}
   </UpdatesContainer>
   </NewsfeedContainer>
  
  );
}

    
 // **Prop Types**
JarJarNewsfeed.propTypes = {
  onAddUpdate: PropTypes.func.isRequired,
  updates: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })).isRequired,
  title: PropTypes.string.isRequired,
};



// **Styled Components**
const Title = styled.h1`
    color: #ffcc00;
    font-size: 28px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 20px;
`;
const NewsfeedContainer = styled.div`
    background: transparent; /* حذف پس‌زمینه */
    padding: 20px;
    border-radius: 10px;
`;
const AddUpdate = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
`;

const UpdatesContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const UpdateBubble = styled.div`
    background: rgba(255, 255, 255, 0.6); /* پس‌زمینه سفید با شفافیت */
    border-radius: 15px; /* گرد کردن لبه‌ها */
    padding: 15px; /* فضای داخلی */
    margin: 10px 0; /* فاصله بین پست‌ها */
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2); /* سایه ملایم */
    backdrop-filter: blur(10px); /* محو کردن پس‌زمینه */
`;

const Reactions = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 5px;
`;


