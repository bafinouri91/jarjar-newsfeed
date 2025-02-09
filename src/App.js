import React, {useCallback, useState,} from 'react'
import './App.css'
import data, {update } from './data'
import JarJarNewsfeed from './components/newsfeed'

export function App() {

  const [updates, setUpdates] = useState(data.updates)

    const handleAddUpdate = useCallback((text) => {
          const newUpdate = update ("User", text, "")
          setUpdates([newUpdate, ...updates])
         }, [updates])
          

  return (
      <div className='container'>
        {/* Display the newsfeed */}
        <JarJarNewsfeed
            title="Jar Jar"
            updates={updates}
            onAddUpdate={handleAddUpdate}
        />
      </div>
  );
}
