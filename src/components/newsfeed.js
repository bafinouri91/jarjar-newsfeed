import React from 'react'
import PropTypes from 'prop-types'
import { update } from '../data'

// import ViewUpdate from './view-update'
// import AddUpdate from './add-update'

export default function JarJarNewsfeed({title, updates, onAddUpdate}) {
  
  return (
  <div>
    <h1>{title} - Newsfeed</h1>

    {/* Display updates list */}
    {
      updates.map(update => (
        <div key={update.id}>
          <h3>{update.by}</h3>
          <p>{update.text}</p>
          </div>)) 
    }

    {/* دکمه‌ای برای اضافه کردن آپدیت جدید (فقط برای تست) */}
    <button onClick={() => onAddUpdate("This is a new update!")}>Add Update</button>
    </div>
  );
}

    
 
JarJarNewsfeed.propTypes = {
  title: PropTypes.string.isRequired,
  updates: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    by: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  })).isRequired,
  onAddUpdate: PropTypes.func.isRequired,
};
